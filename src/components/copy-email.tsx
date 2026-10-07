"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";
import { iconButton } from "./ui";

export function CopyEmail({ email, labels }: { email: string; labels: { copy: string; copied: string; failed: string } }) {
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let success = false;
    try {
      await navigator.clipboard.writeText(email);
      success = true;
    } catch {
      success = false;
    }
    setOk(success);
    setMessage(success ? labels.copied : labels.failed);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2600);
  }

  return (
    <>
      <button type="button" onClick={copy} className={`${iconButton} border border-border-strong`} aria-label={labels.copy} title={labels.copy}>
        {ok && message ? <CheckIcon className="text-accent" /> : <CopyIcon />}
      </button>
      {/* Toast */}
      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        {message && (
          <div className="pointer-events-auto rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm text-text shadow-lg shadow-black/20">
            {message}
          </div>
        )}
      </div>
    </>
  );
}
