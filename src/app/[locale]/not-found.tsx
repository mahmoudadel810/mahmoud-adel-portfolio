import { getLocale } from "next-intl/server";
import { getContent, type Locale } from "@/content/profile";
import Link from "next/link";
import { SiteControls } from "@/components/identity";
import { ArrowIcon } from "@/components/icons";
import { Label, buttonPrimary } from "@/components/ui";

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const t = getContent(locale);
  return (
    <div className="mx-auto flex min-h-dvh max-w-[1200px] flex-col px-4 sm:px-6 lg:px-10">
      <div className="flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="latin inline-flex size-11 items-center justify-center font-mono text-sm font-semibold text-accent" aria-label={t.identity.name}>
          MA
        </Link>
        <SiteControls t={t} locale={locale} />
      </div>
      <main id="main" className="flex flex-1 items-center">
        <div className="max-w-xl">
          <div className="flex items-center gap-3" aria-hidden>
            <span className="latin font-mono text-label text-accent">404</span>
            <span className="h-px w-16 bg-border-strong" />
            <span className="size-[5px] rounded-full border border-border-strong" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-text">{t.ui.notFoundTitle}</h1>
          <p className="mt-4 text-body text-muted">{t.ui.notFoundBody}</p>
          <Link href={`/${locale}`} className={`${buttonPrimary} mt-8`}>
            <ArrowIcon size={16} className="rotate-180 rtl:-scale-x-100" />
            {t.ui.backHome}
          </Link>
          <div className="mt-12">
            <Label locale={locale}>{t.identity.name}</Label>
          </div>
        </div>
      </main>
    </div>
  );
}
