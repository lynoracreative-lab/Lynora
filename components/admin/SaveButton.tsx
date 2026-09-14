"use client";

import { useFormStatus } from "react-dom";

export function SaveButton({ children = "Save" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-gold px-5 py-2.5 text-[0.7rem] tracking-[0.18em] uppercase text-ink disabled:opacity-60"
    >
      {pending ? "Saving..." : children}
    </button>
  );
}
