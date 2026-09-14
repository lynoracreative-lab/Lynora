"use client";

import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/admin/ImageUploader";

export function MediaUploadButton() {
  const router = useRouter();
  return <ImageUploader onUploaded={() => router.refresh()} />;
}
