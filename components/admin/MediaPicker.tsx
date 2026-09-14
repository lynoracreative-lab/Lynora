"use client";

import { useState } from "react";
import { inputClass } from "@/components/admin/FormField";

type MediaItem = {
  id: string;
  title: string;
  fileUrl: string;
  fileType: string;
};

export function MediaPicker({
  name,
  defaultValue = "",
  label = "Image",
}: {
  name: string;
  defaultValue?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const response = await fetch(`/api/admin/media?q=${encodeURIComponent(q)}`);
    if (response.ok) {
      setItems(await response.json());
    }
  }

  async function upload(file: File) {
    setError("");
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Upload failed");
      return;
    }
    setValue(data.fileUrl);
    setOpen(false);
  }

  return (
    <div>
      <input type="hidden" name={name} value={value} />
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-16 w-16 rounded-xl object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-gold/15 text-[0.65rem] text-stone">
            None
          </div>
        )}
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            void load();
          }}
          className="rounded-full border border-gold/30 px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase text-gold"
        >
          {label}
        </button>
        {value ? (
          <button type="button" onClick={() => setValue("")} className="text-xs text-stone">
            Clear
          </button>
        ) : null}
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[80vh] w-full max-w-3xl overflow-auto rounded-[22px] border border-gold/20 bg-ink p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-2xl text-ivory">Media library</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-sm text-stone">
                Close
              </button>
            </div>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row">
              <input
                className={inputClass}
                placeholder="Search media"
                value={q}
                onChange={(event) => setQ(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void load();
                  }
                }}
              />
              <label className="rounded-full bg-gold px-4 py-3 text-center text-[0.7rem] tracking-[0.16em] uppercase text-ink">
                Upload new
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,application/pdf"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void upload(file);
                  }}
                />
              </label>
            </div>
            {error ? <p className="mb-3 text-sm text-red-300">{error}</p> : null}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setValue(item.fileUrl);
                    setOpen(false);
                  }}
                  className="overflow-hidden rounded-2xl border border-gold/15 text-left"
                >
                  {item.fileType === "IMAGE" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.fileUrl} alt={item.title} className="h-28 w-full object-cover" />
                  ) : (
                    <div className="flex h-28 items-center justify-center text-xs text-stone">{item.fileType}</div>
                  )}
                  <p className="truncate px-2 py-2 text-xs text-stone">{item.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
