"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/profile";

export function LanguageSwitch({ locale, label, short }: { locale: Locale; label: string; short: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const target: Locale = locale === "en" ? "ar" : "en";
  // Swap the locale prefix and keep the rest of the path (e.g. the case-study slug).
  const href = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${target}`);

  return (
    <Link
      href={href}
      prefetch={false}
      hrefLang={target}
      lang={target}
      aria-label={label}
      title={label}
      className="inline-flex h-11 min-w-11 items-center justify-center rounded-lg px-2 text-sm font-medium text-muted transition-[color,background-color,transform] duration-150 hover:bg-surface hover:text-text active:scale-95"
    >
      <span className={target === "en" ? "font-mono" : ""}>{short}</span>
    </Link>
  );
}
