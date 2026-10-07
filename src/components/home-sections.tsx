import Link from "next/link";
import {
  contact,
  projectsMeta,
  type Content,
  type HighlightId,
  type Locale,
  type ProjectMeta,
} from "@/content/profile";
import { diagrams } from "@/generated/diagrams";
import { CopyEmail } from "./copy-email";
import { HighlightDiagram } from "./highlight-diagrams";
import { LazyDiagram } from "./lazy-diagram";
import { ArrowIcon, ArrowUpRightIcon, ChevronIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { Chip, ExternalLink, Label, Ltr, SectionHeading, buttonPrimary, buttonSecondary, cx } from "./ui";

type Props = { t: Content; locale: Locale };

function Section({
  id,
  index,
  title,
  locale,
  children,
}: {
  id: string;
  index: number;
  title: string;
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 py-12 lg:scroll-mt-16 lg:py-16 first:pt-6 lg:first:pt-16">
      <SectionHeading id={id} index={index} title={title} locale={locale} />
      {children}
    </section>
  );
}

/* ------------------------------- About ------------------------------- */

export function About({ t, locale }: Props) {
  return (
    <Section id="about" index={1} title={t.ui.nav.about} locale={locale}>
      <div className="max-w-[70ch] space-y-5 text-body text-muted">
        {t.about.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <ul className="mt-8 flex flex-wrap gap-2">
        {t.about.stats.map((s) => (
          <li key={s}>
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {locale === "en" ? <span className="font-mono text-xs">{s}</span> : s}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ----------------------------- Experience ----------------------------- */

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative ps-4">
      <span aria-hidden className="absolute start-0 top-[0.7em] size-1 rounded-full bg-border-strong" />
      {children}
    </li>
  );
}

export function Experience({ t, locale }: Props) {
  return (
    <Section id="experience" index={2} title={t.ui.nav.experience} locale={locale}>
      <ol className="group/list -mx-4 flex flex-col gap-2">
        {t.experience.map((role) => (
          <li
            key={role.company}
            data-reveal
            className="rounded-xl px-4 py-5 transition-[opacity,background-color] duration-150 lg:grid lg:grid-cols-[auto_1fr] lg:gap-6 lg:group-hover/list:opacity-60 lg:hover:!opacity-100 lg:hover:bg-surface"
          >
            <p className="mb-2 whitespace-nowrap font-mono text-xs leading-6 text-muted lg:mb-0 lg:min-w-[9rem] latin">
              <span className={locale === "ar" ? "font-sans text-sm" : ""}>{role.dates}</span>
            </p>
            <div>
              <h3 className="text-base font-medium leading-snug text-text">
                {role.title} <span className="text-muted">·</span> <Ltr>{role.company}</Ltr>
              </h3>
              <p className="mt-0.5 text-sm text-muted">{role.location}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {role.featured.map((i) => (
                  <Bullet key={i}>{role.bullets[i]}</Bullet>
                ))}
              </ul>
              {role.bullets.length > role.featured.length && (
                <details className="group/more mt-2">
                  <summary className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-medium text-accent">
                    <span className="when-closed">{t.ui.showAll(role.bullets.length)}</span>
                    <span className="when-open">{t.ui.showLess}</span>
                    <ChevronIcon size={15} className="transition-transform duration-150 group-open/more:rotate-180" />
                  </summary>
                  <ul className="mt-1 space-y-2 text-sm text-muted">
                    {role.bullets.map((b, i) =>
                      role.featured.includes(i) ? null : <Bullet key={i}>{b}</Bullet>,
                    )}
                  </ul>
                </details>
              )}
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {role.tech.map((tech) => (
                  <li key={tech}>
                    <Chip>{tech}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <a
        href={contact.cv}
        download={contact.cvFileName}
        className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-text hover:text-accent"
      >
        {t.ui.viewResume}
        <ArrowIcon size={16} className="transition-transform duration-150 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
      </a>
    </Section>
  );
}

/* ----------------------------- Highlights ----------------------------- */

const HIGHLIGHT_ORDER: HighlightId[] = ["idempotent", "agents", "tenants", "grading"];
// Alternating wide/narrow on a 5-column grid: 3+2, then 2+3.
const SPANS = ["md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-3"];

export function Highlights({ t, locale }: Props) {
  return (
    <Section id="highlights" index={3} title={t.ui.nav.highlights} locale={locale}>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-5">
        {HIGHLIGHT_ORDER.map((id, i) => {
          const h = t.highlights[id];
          return (
            <li
              key={id}
              data-reveal
              className={cx("hl-card flex flex-col justify-between gap-6 rounded-xl border border-border bg-surface p-5 transition-colors duration-150 hover:border-border-strong", SPANS[i])}
            >
              <div>
                <h3 className="text-base font-medium text-text">{h.title}</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  <div>
                    <dt className="sr-only">{t.ui.problemLabel}</dt>
                    <dd className="text-muted">{h.problem}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="sr-only">{t.ui.resultLabel}</dt>
                    <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-accent" />
                    <dd className="text-text">{h.result}</dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-col items-start gap-3">
                <HighlightDiagram id={id} label={h.diagramLabel} />
                {h.badge && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                    <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                    {h.badge}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/* ------------------------------ Projects ------------------------------ */

function viewBoxRatio(svg: string): number {
  const m = svg.match(/viewBox="[\d.-]+ [\d.-]+ ([\d.]+) ([\d.]+)"/);
  return m ? Number(m[1]) / Number(m[2]) : 16 / 9;
}

export function DiagramPanel({
  svg,
  alt,
  caption,
  className,
  wide,
  scrollHint,
  lazySrc,
}: {
  svg: string;
  alt: string;
  caption: string;
  className?: string;
  /** Wide diagrams scroll sideways on phones instead of shrinking to unreadable text. */
  wide?: boolean;
  scrollHint?: string;
  /** Load the SVG from /public/diagrams when it scrolls near (keeps the home page light). */
  lazySrc?: string;
}) {
  const body = lazySrc ? (
    <div role="img" aria-label={alt} dir="ltr" className="diagram latin flex items-center justify-center px-4 py-5 [&_svg]:max-h-56">
      <LazyDiagram src={lazySrc} ratio={viewBoxRatio(svg)} />
    </div>
  ) : (
    <div
      role="img"
      aria-label={alt}
      dir="ltr"
      className={cx(
        "diagram latin flex items-center justify-center px-4 py-5 [&_svg]:max-h-56",
        wide && "min-w-[620px] sm:min-w-0",
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
  return (
    <figure className={cx("overflow-hidden rounded-xl border border-border bg-bg", className)}>
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
        </span>
        <figcaption className="text-xs text-muted">{caption}</figcaption>
        {wide && scrollHint && <span className="ms-auto text-xs text-muted sm:hidden">⇆ <span className="sr-only">{scrollHint}</span></span>}
      </div>
      {wide ? (
        <div tabIndex={0} aria-label={scrollHint} className="overflow-x-auto overscroll-x-contain">
          {body}
        </div>
      ) : (
        body
      )}
    </figure>
  );
}

function ProjectLinks({ meta, t }: { meta: ProjectMeta; t: Content }) {
  const pill =
    "inline-flex h-11 md:h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-text transition-colors duration-150 hover:border-accent hover:text-accent";
  return (
    <ul className="flex flex-wrap gap-2">
      {meta.live && (
        <li>
          <ExternalLink href={meta.live} className={pill} newTabLabel={t.ui.newTab}>
            {t.ui.live}
            <ArrowUpRightIcon size={14} />
          </ExternalLink>
        </li>
      )}
      {meta.code.map((repo) => (
        <li key={repo.href}>
          <ExternalLink href={repo.href} className={pill} newTabLabel={t.ui.newTab}>
            <GitHubIcon size={14} />
            {meta.code.length > 1 ? (
              <>
                {t.ui.code} <span className="latin font-mono text-[11px] text-muted">{repo.label}</span>
              </>
            ) : (
              t.ui.code
            )}
          </ExternalLink>
        </li>
      ))}
      {meta.apiDocs && (
        <li>
          <ExternalLink href={meta.apiDocs} className={pill} newTabLabel={t.ui.newTab}>
            {t.ui.apiDocs}
            <ArrowUpRightIcon size={14} />
          </ExternalLink>
        </li>
      )}
    </ul>
  );
}

export function StackChips({ stack, max, t }: { stack: string[]; max?: number; t: Content }) {
  const shown = max ? stack.slice(0, max) : stack;
  const rest = stack.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((s) => (
        <li key={s}>
          <Chip>{s}</Chip>
        </li>
      ))}
      {rest > 0 && (
        <li>
          <Chip className="text-accent" >
            <span title={stack.slice(max).join(", ")}>{t.ui.moreStack(rest)}</span>
          </Chip>
        </li>
      )}
    </ul>
  );
}

export function Projects({ t, locale }: Props) {
  return (
    <Section id="projects" index={4} title={t.ui.nav.projects} locale={locale}>
      <ul className="flex flex-col gap-4">
        {projectsMeta.map((meta) => {
          const p = t.projects[meta.slug];
          const titleHref = meta.caseStudy ? null : meta.live ?? meta.code[0]?.href;
          const titleInner = (
            <>
              {p.title}
              <ArrowIcon
                size={16}
                className="ms-1.5 inline-block transition-transform duration-150 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              />
            </>
          );
          return (
            <li key={meta.slug} data-reveal>
              <article className="group grid gap-5 rounded-xl border border-transparent p-4 transition-colors duration-150 hover:border-border hover:bg-surface sm:-mx-4 md:grid-cols-[minmax(0,17rem)_1fr] md:items-start">
                <div className="overflow-hidden rounded-xl">
                  <DiagramPanel
                    svg={diagrams[meta.slug].compact}
                    lazySrc={`/diagrams/${meta.slug}-compact.svg`}
                    alt={p.diagramAlt}
                    caption={t.ui.architectureLabel}
                    className="transition-transform duration-150 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-3">
                  <h3 className="text-lg font-medium leading-snug text-text">
                    {meta.caseStudy ? (
                      <Link href={`/${locale}/projects/${meta.slug}`} className="hover:text-accent">
                        {titleInner}
                      </Link>
                    ) : titleHref ? (
                      <ExternalLink href={titleHref} className="hover:text-accent" newTabLabel={t.ui.newTab}>
                        {titleInner}
                      </ExternalLink>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p className="text-sm text-muted">{p.oneLiner}</p>
                  <StackChips stack={meta.stack} max={6} t={t} />
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-3">
                    <ProjectLinks meta={meta} t={t} />
                    {meta.caseStudy && (
                      <Link
                        href={`/${locale}/projects/${meta.slug}`}
                        className="group/cs inline-flex min-h-11 md:min-h-9 items-center gap-1.5 text-sm font-medium text-accent"
                      >
                        {t.ui.readCaseStudy}
                        <ArrowIcon
                          size={15}
                          className="transition-transform duration-150 group-hover/cs:translate-x-1 rtl:-scale-x-100 rtl:group-hover/cs:-translate-x-1"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {/* More on GitHub */}
      <div data-reveal className="mt-8 flex flex-col gap-4 rounded-xl border border-dashed border-border-strong p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[52ch] text-sm text-muted">{t.ui.moreProjectsNote}</p>
        <ExternalLink href={contact.github} className={cx(buttonSecondary, "shrink-0")} newTabLabel={t.ui.newTab}>
          <GitHubIcon size={16} />
          {t.ui.moreProjectsCta}
          <span className="latin font-mono text-xs text-muted">@mahmoudadel810</span>
        </ExternalLink>
      </div>
    </Section>
  );
}

/* ------------------------------- Skills ------------------------------- */

export function Skills({ t, locale }: Props) {
  return (
    <Section id="skills" index={5} title={t.ui.nav.skills} locale={locale}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
        {t.skills.map((g) => (
          <div key={g.group} data-reveal>
            <h3 className="mb-3 text-sm font-medium text-text">{g.group}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li key={s}>
                  <Chip>{s}</Chip>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-2">
        <div>
          <h3 className="mb-4">
            <Label locale={locale}>{t.ui.educationTitle}</Label>
          </h3>
          <ul className="space-y-4">
            {t.education.map((e) => (
              <li key={e.degree}>
                <p className="text-sm font-medium text-text">{e.degree}</p>
                <p className="text-sm text-muted">{e.school}</p>
                <p className="text-xs text-muted latin font-mono">
                  <span className={locale === "ar" ? "font-sans text-sm" : ""}>{e.dates}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4">
            <Label locale={locale}>{t.ui.languagesTitle}</Label>
          </h3>
          <ul className="space-y-3">
            {t.languages.map((l) => (
              <li key={l.name} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <span className="font-medium text-text">{l.name}</span>
                <span className="text-muted">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------- Contact ------------------------------ */

export function Contact({ t, locale }: Props) {
  return (
    <Section id="contact" index={6} title={t.ui.nav.contact} locale={locale}>
      <p className="max-w-[60ch] text-xl leading-relaxed text-text">{t.contact.lead}</p>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <a href={`mailto:${contact.email}`} className={buttonPrimary}>
          <MailIcon size={16} />
          <span className="latin font-mono text-sm">{contact.email}</span>
        </a>
        <CopyEmail email={contact.email} labels={{ copy: t.ui.copyEmail, copied: t.ui.copied, failed: t.ui.copyFailed }} />
      </div>
      <ul className="mt-6 flex flex-wrap gap-2">
        <li>
          <ExternalLink href={contact.linkedin} className={buttonSecondary} newTabLabel={t.ui.newTab}>
            <LinkedInIcon size={16} />
            LinkedIn
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={contact.github} className={buttonSecondary} newTabLabel={t.ui.newTab}>
            <GitHubIcon size={16} />
            GitHub
          </ExternalLink>
        </li>
        <li>
          <a href={contact.cv} download={contact.cvFileName} className={buttonSecondary}>
            <DownloadIcon size={16} />
            {t.ui.downloadCv}
          </a>
        </li>
      </ul>
    </Section>
  );
}

export function Footer({ t }: { t: Content }) {
  return (
    <footer className="border-t border-border py-8 text-xs text-muted">
      <p>{t.ui.footer}</p>
    </footer>
  );
}
