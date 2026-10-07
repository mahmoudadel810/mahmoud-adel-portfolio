import type { ReactNode } from "react";
import type { Locale } from "@/content/profile";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Mono uppercase label in English; a plain label in Arabic (no uppercase/tracking on Arabic). */
export function Label({ locale, children, className }: { locale: Locale; children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        locale === "en" ? "font-mono text-label uppercase tracking-[0.14em]" : "text-sm font-medium",
        "text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      dir="ltr"
      className={cx(
        "inline-flex items-center rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-xs leading-5 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ExternalLink({
  href,
  children,
  className,
  newTabLabel,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  newTabLabel: string;
  ariaLabel?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}

export function SectionHeading({
  id,
  index,
  title,
  locale,
}: {
  id: string;
  index: number;
  title: string;
  locale: Locale;
}) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="latin font-mono text-label text-accent" aria-hidden>
        {String(index).padStart(2, "0")}
      </span>
      <h2 id={`${id}-title`} className="shrink-0">
        <Label locale={locale} className="text-text">
          {title}
        </Label>
      </h2>
      <span aria-hidden className="relative h-px flex-1 bg-border">
        <span className="absolute -top-[2px] end-0 size-[5px] rounded-full border border-border-strong bg-bg" />
      </span>
    </div>
  );
}

export const buttonPrimary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-on-accent transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97]";
export const buttonSecondary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border-strong px-4 text-sm font-medium text-text transition-[color,border-color,transform] duration-150 hover:border-accent hover:text-accent active:scale-[0.97]";
export const iconButton =
  "inline-flex size-11 items-center justify-center rounded-lg text-muted transition-[color,background-color,transform] duration-150 hover:bg-surface hover:text-text active:scale-95";

/** Keep Latin tokens (URLs, emails, tech names) left-to-right inside Arabic text. */
export function Ltr({ children }: { children: ReactNode }) {
  return <bdi dir="ltr">{children}</bdi>;
}
