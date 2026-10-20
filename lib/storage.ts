import { createHash, randomBytes } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import {
  ALLOWED_DOCUMENT_TYPES,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_DOCUMENT_SIZE,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
} from "@/lib/constants";

export type StoredFile = {
  fileName: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  fileType: "IMAGE" | "VIDEO" | "DOCUMENT" | "OTHER";
  width?: number;
  height?: number;
};

function extensionFromName(name: string, mimeType: string) {
  const fromName = path.extname(name).toLowerCase().replace(".", "");
  if (fromName) return fromName;
  if (mimeType === "image/jpeg") return "jpg";
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/avif") return "avif";
  if (mimeType === "video/mp4") return "mp4";
  if (mimeType === "application/pdf") return "pdf";
  return "bin";
}

function classify(mimeType: string) {
  if (ALLOWED_IMAGE_TYPES.includes(mimeType)) return "IMAGE" as const;
  if (ALLOWED_VIDEO_TYPES.includes(mimeType)) return "VIDEO" as const;
  if (ALLOWED_DOCUMENT_TYPES.includes(mimeType)) return "DOCUMENT" as const;
  return "OTHER" as const;
}

export function validateUpload(file: File) {
  const type = classify(file.type);
  if (type === "OTHER") {
    throw new Error("This file type is not allowed.");
  }
  if (type === "IMAGE" && file.size > MAX_IMAGE_SIZE) {
    throw new Error("Images must be 10MB or smaller.");
  }
  if (type === "VIDEO" && file.size > MAX_VIDEO_SIZE) {
    throw new Error("Videos must be 25MB or smaller.");
  }
  if (type === "DOCUMENT" && file.size > MAX_DOCUMENT_SIZE) {
    throw new Error("Documents must be 10MB or smaller.");
  }
  return type;
}

function safeFileName(originalName: string, mimeType: string) {
  const ext = extensionFromName(originalName, mimeType);
  const unique = `${Date.now()}-${randomBytes(8).toString("hex")}`;
  return `${unique}.${ext}`;
}

const UPLOAD_BUCKET = "uploads";

function supabaseSettings() {
  const baseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!baseUrl || !secretKey) {
    throw new Error("Supabase storage is not configured.");
  }
  return { baseUrl, secretKey };
}

function publicObjectUrl(baseUrl: string, fileName: string) {
  return `${baseUrl}/storage/v1/object/public/${UPLOAD_BUCKET}/${encodeURIComponent(fileName)}`;
}

async function supabaseRequest(path: string, init: RequestInit) {
  const { baseUrl, secretKey } = supabaseSettings();
  const headers = new Headers(init.headers);
  headers.set("apikey", secretKey);
  headers.set("Authorization", `Bearer ${secretKey}`);
  return fetch(`${baseUrl}${path}`, { ...init, headers });
}

async function ensureUploadsBucket() {
  const response = await supabaseRequest("/storage/v1/bucket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: UPLOAD_BUCKET,
      name: UPLOAD_BUCKET,
      public: true,
      file_size_limit: MAX_VIDEO_SIZE,
      allowed_mime_types: [
        ...ALLOWED_IMAGE_TYPES,
        ...ALLOWED_VIDEO_TYPES,
        ...ALLOWED_DOCUMENT_TYPES,
      ],
    }),
  });
  if (response.ok || response.status === 409) return;
  const detail = await response.text();
  if (detail.toLowerCase().includes("already exists")) return;
  throw new Error("Could not prepare image storage.");
}

async function dimensionsOf(buffer: Buffer, fileType: StoredFile["fileType"]) {
  if (fileType !== "IMAGE") return { width: undefined, height: undefined };
  try {
    const { imageSize } = await import("image-size");
    const size = imageSize(buffer);
    return { width: size.width, height: size.height };
  } catch {
    return { width: undefined, height: undefined };
  }
}

async function uploadLocal(buffer: Buffer, file: File): Promise<StoredFile> {
  const fileType = validateUpload(file);
  const fileName = safeFileName(file.name, file.type);
  const destDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(destDir, { recursive: true });
  await writeFile(path.join(destDir, fileName), buffer);

  const size = await dimensionsOf(buffer, fileType);

  return {
    fileName,
    fileUrl: `/uploads/${fileName}`,
    mimeType: file.type,
    fileSize: file.size,
    fileType,
    width: size.width,
    height: size.height,
  };
}

async function uploadSupabase(buffer: Buffer, file: File): Promise<StoredFile> {
  const fileType = validateUpload(file);
  const fileName = safeFileName(file.name, file.type);
  const { baseUrl } = supabaseSettings();
  await ensureUploadsBucket();

  const response = await supabaseRequest(`/storage/v1/object/${UPLOAD_BUCKET}/${encodeURIComponent(fileName)}`, {
    method: "POST",
    headers: {
      "Content-Type": file.type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "x-upsert": "true",
    },
    body: new Uint8Array(buffer),
  });
  if (!response.ok) {
    throw new Error("Image storage upload failed.");
  }

  const size = await dimensionsOf(buffer, fileType);
  return {
    fileName,
    fileUrl: publicObjectUrl(baseUrl, fileName),
    mimeType: file.type,
    fileSize: file.size,
    fileType,
    width: size.width,
    height: size.height,
  };
}

async function uploadCloudinary(buffer: Buffer, file: File): Promise<StoredFile> {
  const fileType = validateUpload(file);
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials are missing.");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "lynora";
  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(toSign).digest("hex");
  const body = new FormData();
  body.append("file", new Blob([new Uint8Array(buffer)], { type: file.type }), file.name);
  body.append("api_key", apiKey);
  body.append("timestamp", String(timestamp));
  body.append("signature", signature);
  body.append("folder", folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: "POST",
    body,
  });
  if (!response.ok) {
    throw new Error("Cloudinary upload failed.");
  }
  const data = (await response.json()) as {
    secure_url: string;
    original_filename: string;
    bytes: number;
    width?: number;
    height?: number;
  };

  return {
    fileName: path.basename(data.secure_url),
    fileUrl: data.secure_url,
    mimeType: file.type,
    fileSize: data.bytes || file.size,
    fileType,
    width: data.width,
    height: data.height,
  };
}

export async function uploadMediaFile(file: File): Promise<StoredFile> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const provider = process.env.STORAGE_PROVIDER || "local";
  if (provider === "cloudinary") {
    return uploadCloudinary(buffer, file);
  }
  if (provider === "supabase") {
    return uploadSupabase(buffer, file);
  }
  return uploadLocal(buffer, file);
}

function supabaseObjectName(fileUrl: string) {
  const { baseUrl } = supabaseSettings();
  const prefix = `${baseUrl}/storage/v1/object/public/${UPLOAD_BUCKET}/`;
  if (!fileUrl.startsWith(prefix)) return null;
  return decodeURIComponent(fileUrl.slice(prefix.length).split("?")[0]);
}

export async function deleteStoredFile(fileUrl: string) {
  const objectName = fileUrl.includes(`/storage/v1/object/public/${UPLOAD_BUCKET}/`)
    ? supabaseObjectName(fileUrl)
    : null;
  if (objectName) {
    const response = await supabaseRequest(`/storage/v1/object/${UPLOAD_BUCKET}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prefixes: [objectName] }),
    });
    if (!response.ok && response.status !== 404) {
      throw new Error("Could not delete the stored image.");
    }
    return;
  }

  if ((process.env.STORAGE_PROVIDER || "local") !== "local") return;
  if (!fileUrl.startsWith("/uploads/")) return;
  const fileName = path.basename(fileUrl);
  const fullPath = path.join(process.cwd(), "public", "uploads", fileName);
  try {
    await unlink(fullPath);
  } catch {
    // File may already have been removed.
  }
}
