"use client";

import { useState } from "react";

export function DeleteDialog({
  action,
  label = "Delete",
  message = "This cannot be undone.",
}: {
  action: () => Promise<void>;
  label?: string;
  message?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="text-sm text-red-300 hover:text-red-200">
        {label}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-[22px] border border-gold/20 bg-ink-elevated p-6">
            <h2 className="font-serif text-2xl text-ivory">Are you sure?</h2>
            <p className="mt-3 text-sm text-stone">{message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setOpen(false)} className="text-sm text-stone">
                Cancel
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={async () => {
                  setPending(true);
                  await action();
                }}
                className="rounded-full bg-red-500 px-4 py-2 text-sm text-white"
              >
                {pending ? "Deleting..." : "Confirm delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
