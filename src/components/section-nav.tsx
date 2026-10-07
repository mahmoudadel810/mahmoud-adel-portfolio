"use client";

import { useEffect, useState } from "react";
import type { SectionId } from "@/content/profile";
import { cx } from "./ui";

export const SECTION_IDS: SectionId[] = ["about", "experience", "highlights", "projects", "skills", "contact"];

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>("about");
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        // At the very bottom, the last section wins even if it's short.
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
          setActive(SECTION_IDS[SECTION_IDS.length - 1]);
          return;
        }
        const first = SECTION_IDS.find((id) => (visible.get(id) ?? 0) > 0);
        if (first) setActive(first);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.01, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function SectionNav({ labels, ariaLabel }: { labels: Record<SectionId, string>; ariaLabel: string }) {
  const active = useActiveSection();
  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex flex-col">
        {SECTION_IDS.map((id) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className="group flex min-h-9 items-center gap-4 py-1"
              >
                <span
                  aria-hidden
                  className={cx(
                    "h-px transition-all duration-150",
                    isActive ? "w-16 bg-accent" : "w-8 bg-border-strong group-hover:w-16 group-hover:bg-muted",
                  )}
                />
                <span
                  className={cx(
                    "text-sm transition-colors duration-150",
                    isActive ? "font-medium text-text" : "text-muted group-hover:text-text",
                  )}
                >
                  {labels[id]}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SheetNav({
  labels,
  ariaLabel,
  onNavigate,
}: {
  labels: Record<SectionId, string>;
  ariaLabel: string;
  onNavigate: () => void;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex flex-col">
        {SECTION_IDS.map((id) => (
          <li key={id} className="border-b border-border">
            <a href={`#${id}`} onClick={onNavigate} className="flex min-h-12 items-center text-lg text-text">
              {labels[id]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Mobile top bar: the section currently being read. */
export function CurrentSection({ labels }: { labels: Record<SectionId, string> }) {
  const active = useActiveSection();
  return (
    <span aria-hidden className="truncate text-sm text-muted">
      {labels[active]}
    </span>
  );
}
