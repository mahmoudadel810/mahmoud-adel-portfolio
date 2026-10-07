import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  caseStudySlugs,
  getContent,
  getProjectMeta,
  isCaseStudySlug,
  type CaseStudySlug,
} from "@/content/profile";
import { isLocale, locales } from "@/i18n/routing";
import Link from "next/link";
import { alternatesFor } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { diagrams } from "@/generated/diagrams";
import { DiagramPanel, StackChips } from "@/components/home-sections";
import { SiteControls } from "@/components/identity";
import { ArrowIcon, ArrowUpRightIcon, GitHubIcon } from "@/components/icons";
import { ExternalLink, Label, Ltr, buttonPrimary, buttonSecondary } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => caseStudySlugs.map((slug) => ({ locale, slug })));
}

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isCaseStudySlug(slug)) return {};
  const t = getContent(locale);
  const p = t.projects[slug];
  const title = `${p.title} — ${p.oneLiner.replace(/\.$/, "")}`;
  return {
    title,
    description: t.caseStudies[slug].overview,
    alternates: alternatesFor(locale, `/projects/${slug}`),
    openGraph: {
      title,
      description: t.caseStudies[slug].overview,
      type: "article",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      siteName: t.identity.name,
      url: `${SITE_URL}/${locale}/projects/${slug}`,
    },
  };
}

const SECTION_KEYS = ["overview", "problem", "built", "architecture", "decisions", "links"] as const;

export default async function CaseStudyPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isCaseStudySlug(slug)) notFound();
  setRequestLocale(locale);

  const t = getContent(locale);
  const meta = getProjectMeta(slug);
  const p = t.projects[slug];
  const cs = t.caseStudies[slug];
  const s = t.ui.caseStudySections;

  const index = caseStudySlugs.indexOf(slug);
  const prev: CaseStudySlug | undefined = caseStudySlugs[index - 1];
  const next: CaseStudySlug | undefined = caseStudySlugs[index + 1];

  const arrow = "rtl:-scale-x-100";

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
      <header className="sticky top-0 z-40 -mx-4 flex h-16 items-center justify-between border-b border-border bg-bg px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <Link
          href={`/${locale}#projects`}
          className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-text"
        >
          <ArrowIcon size={16} className={`rotate-180 transition-transform duration-150 group-hover:-translate-x-1 ${arrow} rtl:group-hover:translate-x-1`} />
          {t.ui.allProjects}
        </Link>
        <SiteControls t={t} locale={locale} />
      </header>

      <div className="mx-auto max-w-[1040px] lg:grid lg:grid-cols-[minmax(0,720px)_1fr] lg:gap-16">
        <main id="main" tabIndex={-1} className="min-w-0 pb-16 pt-10 outline-none lg:pt-16">
          {/* Header (not revealed: it is the LCP area) */}
          <div>
            <Label locale={locale}>{t.ui.nav.projects}</Label>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-text sm:text-name">{p.title}</h1>
            <p className="mt-3 text-lg text-muted">{p.oneLiner}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {meta.live && (
                <ExternalLink href={meta.live} className={buttonPrimary} newTabLabel={t.ui.newTab}>
                  {t.ui.live}
                  <ArrowUpRightIcon size={16} />
                </ExternalLink>
              )}
              {meta.code.map((repo) => (
                <ExternalLink key={repo.href} href={repo.href} className={buttonSecondary} newTabLabel={t.ui.newTab}>
                  <GitHubIcon size={16} />
                  {t.ui.code}
                  {meta.code.length > 1 && <span className="latin font-mono text-xs text-muted">{repo.label}</span>}
                </ExternalLink>
              ))}
            </div>
            <div className="mt-6">
              <StackChips stack={meta.stack} t={t} />
            </div>
          </div>

          <DiagramPanel
            svg={diagrams[slug].compact}
            alt={p.diagramAlt}
            caption={t.ui.architectureLabel}
            className="mt-10 [&_svg]:!max-h-44"
          />

          <article className="mt-4">
            <CsSection id="overview" title={s.overview}>
              <p>{cs.overview}</p>
            </CsSection>

            <CsSection id="problem" title={s.problem}>
              <p>{cs.problem}</p>
            </CsSection>

            <CsSection id="built" title={s.built}>
              <ul className="space-y-3">
                {p.built.map((b) => (
                  <li key={b} className="relative ps-5">
                    <span aria-hidden className="absolute start-0 top-[0.75em] h-px w-2.5 bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </CsSection>

            <CsSection id="architecture" title={s.architecture}>
              <p>{cs.architectureNote}</p>
              <DiagramPanel svg={diagrams[slug].full} alt={p.diagramAlt} caption={t.ui.architectureLabel} wide scrollHint={t.ui.scrollDiagram} className="mt-6 [&_svg]:!max-h-[26rem]" />
            </CsSection>

            <CsSection id="decisions" title={s.decisions}>
              <ol className="space-y-3">
                {cs.decisions.map((d, i) => (
                  <li key={d.title} data-reveal className="rounded-xl border border-border bg-surface p-5">
                    <div className="flex items-start gap-3">
                      <span className="latin mt-0.5 font-mono text-label text-accent" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base font-medium text-text">{d.title}</h3>
                        <dl className="mt-3 space-y-2 text-sm">
                          <div>
                            <dt className="inline font-medium text-text">{t.ui.decisionWhy}: </dt>
                            <dd className="inline text-muted">{d.why}</dd>
                          </div>
                          <div>
                            <dt className="inline font-medium text-text">{t.ui.decisionTradeoff}: </dt>
                            <dd className="inline text-muted">{d.tradeoff}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </CsSection>

            <CsSection id="links" title={s.links}>
              <ul className="space-y-2">
                {[
                  ...(meta.live ? [{ label: t.ui.live, href: meta.live }] : []),
                  ...meta.code.map((r) => ({ label: `${t.ui.code} · ${r.label}`, href: r.href })),
                  ...(meta.apiDocs ? [{ label: t.ui.apiDocs, href: meta.apiDocs }] : []),
                ].map((l) => (
                  <li key={l.href} className="flex flex-wrap items-baseline gap-x-3">
                    <span className="min-w-24 text-sm text-text">{l.label}</span>
                    <ExternalLink href={l.href} className="break-all text-sm text-accent underline-offset-4 hover:underline" newTabLabel={t.ui.newTab}>
                      <Ltr>{l.href.replace(/^https:\/\//, "")}</Ltr>
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </CsSection>
          </article>

          {/* Previous / next */}
          <nav aria-label={t.ui.allProjects} className="mt-16 grid grid-cols-2 gap-3 border-t border-border pt-8">
            {prev ? (
              <Link href={`/${locale}/projects/${prev}`} className="group rounded-xl border border-border p-4 hover:border-accent">
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <ArrowIcon size={14} className={`rotate-180 ${arrow}`} />
                  {t.ui.previousProject}
                </span>
                <span className="mt-1 block font-medium text-text group-hover:text-accent">{t.projects[prev].title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/${locale}/projects/${next}`} className="group rounded-xl border border-border p-4 text-end hover:border-accent">
                <span className="flex items-center justify-end gap-1.5 text-xs text-muted">
                  {t.ui.nextProject}
                  <ArrowIcon size={14} className={arrow} />
                </span>
                <span className="mt-1 block font-medium text-text group-hover:text-accent">{t.projects[next].title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </main>

        {/* Mini table of contents (desktop) */}
        <aside className="hidden lg:block">
          <nav aria-label={t.ui.onThisPage} className="sticky top-28 mt-16">
            <Label locale={locale}>{t.ui.onThisPage}</Label>
            <ul className="mt-4 space-y-1 border-s border-border">
              {SECTION_KEYS.map((key) => (
                <li key={key}>
                  <a href={`#${key}`} className="-ms-px flex min-h-8 items-center border-s border-transparent ps-4 text-sm text-muted hover:border-accent hover:text-text">
                    {s[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}

function CsSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 pt-12">
      <h2 id={`${id}-h`} className="mb-4 flex items-center gap-3 text-xl font-semibold text-text">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        {title}
      </h2>
      <div className="text-body text-muted [&_p]:max-w-[70ch]">{children}</div>
    </section>
  );
}
