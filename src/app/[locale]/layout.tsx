import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { contact, getContent, type Locale } from "@/content/profile";
import { isLocale, locales } from "@/i18n/routing";
import { preload } from "react-dom";
import { ARABIC_FONT_PRELOADS, fontVariables } from "@/lib/fonts";
import { alternatesFor } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/components/theme-provider";
import { RevealObserver } from "@/components/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getContent(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: `%s · ${t.identity.name}` },
    description: t.meta.description,
    alternates: alternatesFor(locale, ""),
    authors: [{ name: getContent("en").identity.name, url: contact.linkedin }],
    openGraph: {
      type: "profile",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      siteName: t.identity.name,
      title: t.meta.title,
      description: t.meta.description,
      url: `${SITE_URL}/${locale}`,
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
  };
}

function personJsonLd(locale: Locale) {
  const t = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: getContent("en").identity.name,
    alternateName: getContent("ar").identity.name,
    jobTitle: t.identity.title,
    description: t.identity.oneLiner,
    email: `mailto:${contact.email}`,
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}${contact.photo}`,
    address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
    sameAs: [contact.linkedin, contact.github],
    knowsLanguage: ["ar", "en"],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = getContent(locale);
  if (locale === "ar") {
    for (const href of ARABIC_FONT_PRELOADS) preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-on-accent focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {t.ui.skipToContent}
        </a>
        <ThemeProvider>
          {children}
          <RevealObserver />
        </ThemeProvider>
      </body>
    </html>
  );
}
