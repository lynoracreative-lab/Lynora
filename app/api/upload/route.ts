import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { uploadMediaFile } from "@/lib/storage";

export async function POST(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const stored = await uploadMediaFile(file);
    const media = await prisma.media.create({
      data: {
        fileName: stored.fileName,
        title: file.name.replace(/\.[^.]+$/, ""),
        fileUrl: stored.fileUrl,
        fileType: stored.fileType,
        mimeType: stored.mimeType,
        fileSize: stored.fileSize,
        width: stored.width,
        height: stored.height,
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
