import type { Metadata } from "next";
import type { Locale } from "@/content/profile";
import { SITE_URL } from "./site";

/** Canonical + hreflang alternates for a locale-relative path ("" for home). */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      en: `${SITE_URL}/en${path}`,
      ar: `${SITE_URL}/ar${path}`,
      "x-default": `${SITE_URL}/en${path}`,
    },
  };
}
