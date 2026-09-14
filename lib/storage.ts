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

async function uploadLocal(buffer: Buffer, file: File): Promise<StoredFile> {
  const fileType = validateUpload(file);
  const fileName = safeFileName(file.name, file.type);
  const destDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(destDir, { recursive: true });
  await writeFile(path.join(destDir, fileName), buffer);

  let width: number | undefined;
  let height: number | undefined;
  if (fileType === "IMAGE") {
    try {
      const { imageSize } = await import("image-size");
      const size = imageSize(buffer);
      width = size.width;
      height = size.height;
    } catch {
      // Dimensions are optional metadata.
    }
  }

  return {
    fileName,
    fileUrl: `/uploads/${fileName}`,
    mimeType: file.type,
    fileSize: file.size,
    fileType,
    width,
    height,
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
  return uploadLocal(buffer, file);
}

export async function deleteStoredFile(fileUrl: string) {
  if (!fileUrl.startsWith("/uploads/")) return;
  const fileName = path.basename(fileUrl);
  const fullPath = path.join(process.cwd(), "public", "uploads", fileName);
  try {
    await unlink(fullPath);
  } catch {
    // File may already have been removed.
  }
}
