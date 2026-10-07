import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getContent } from "@/content/profile";
import { isLocale } from "@/i18n/routing";
import { Identity, MobileTopBar } from "@/components/identity";
import { About, Contact, Experience, Footer, Highlights, Projects, Skills } from "@/components/home-sections";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = getContent(locale);

  return (
    <div id="top" className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
      <MobileTopBar t={t} locale={locale} />
      <div className="lg:flex lg:gap-16">
        <div className="lg:w-[40%] lg:shrink-0">
          <Identity t={t} locale={locale} />
        </div>
        <main id="main" tabIndex={-1} className="min-w-0 outline-none lg:w-[60%]">
          <About t={t} locale={locale} />
          <Experience t={t} locale={locale} />
          <Highlights t={t} locale={locale} />
          <Projects t={t} locale={locale} />
          <Skills t={t} locale={locale} />
          <Contact t={t} locale={locale} />
          <Footer t={t} />
        </main>
      </div>
    </div>
  );
}
