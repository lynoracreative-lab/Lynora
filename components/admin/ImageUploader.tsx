"use client";

import { useState } from "react";

export function ImageUploader({ onUploaded }: { onUploaded?: (url: string) => void }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <div>
      <label className="inline-flex cursor-pointer rounded-full border border-gold/30 px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-gold">
        {pending ? "Uploading..." : "Upload file"}
        <input
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,application/pdf,.doc,.docx"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            setPending(true);
            setError("");
            const body = new FormData();
            body.append("file", file);
            const response = await fetch("/api/upload", { method: "POST", body });
            const data = await response.json();
            setPending(false);
            if (!response.ok) {
              setError(data.error || "Upload failed");
              return;
            }
            onUploaded?.(data.fileUrl);
          }}
        />
      </label>
      {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
