"use client";

import { useRef, type ReactNode } from "react";
import type { SectionId } from "@/content/profile";
import { CloseIcon, DownloadIcon, MenuIcon } from "./icons";
import { SheetNav } from "./section-nav";
import { buttonPrimary, iconButton } from "./ui";

export function MobileMenu({
  labels,
  navLabel,
  menuLabel,
  closeLabel,
  cv,
  cvFileName,
  cvLabel,
  footer,
}: {
  labels: Record<SectionId, string>;
  navLabel: string;
  menuLabel: string;
  closeLabel: string;
  cv: string;
  cvFileName: string;
  cvLabel: string;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <>
      <button type="button" className={iconButton} aria-label={menuLabel} aria-haspopup="dialog" onClick={() => ref.current?.showModal()}>
        <MenuIcon size={20} />
      </button>
      <dialog
        ref={ref}
        aria-label={navLabel}
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
        className="m-0 ms-auto h-dvh max-h-none w-[min(22rem,88vw)] max-w-none border-s border-border bg-bg p-0 text-text backdrop:bg-black/50"
      >
        <div className="flex h-full flex-col px-5 pb-6">
          <div className="flex h-16 items-center justify-end">
            <button type="button" className={iconButton} aria-label={closeLabel} onClick={close} autoFocus>
              <CloseIcon size={20} />
            </button>
          </div>
          <SheetNav labels={labels} ariaLabel={navLabel} onNavigate={close} />
          <a href={cv} download={cvFileName} className={`${buttonPrimary} mt-8`}>
            <DownloadIcon size={16} />
            {cvLabel}
          </a>
          {footer}
        </div>
      </dialog>
    </>
  );
}
