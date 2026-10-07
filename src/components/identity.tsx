import { contact, type Content, type Locale } from "@/content/profile";
import { Avatar } from "./avatar";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "./icons";
import { LanguageSwitch } from "./language-switch";
import { MobileMenu } from "./mobile-bar";
import { CurrentSection, SectionNav } from "./section-nav";
import { ThemeToggle } from "./theme-toggle";
import { ExternalLink, buttonPrimary, buttonSecondary, iconButton } from "./ui";

type Props = { t: Content; locale: Locale };

function Availability({ text }: { text: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text">
      <span aria-hidden className="pulse-dot size-2 rounded-full bg-accent" />
      {text}
    </p>
  );
}

export function SiteControls({ t, locale }: Props) {
  return (
    <div className="flex items-center gap-1">
      <LanguageSwitch locale={locale} label={t.ui.switchLanguage} short={t.ui.languageShort} />
      <ThemeToggle labels={{ toggle: t.ui.themeToggle, light: t.ui.themeLight, dark: t.ui.themeDark }} />
    </div>
  );
}

function SocialLinks({ t }: { t: Content }) {
  return (
    <ul className="flex items-center gap-1">
      <li>
        <ExternalLink href={contact.github} className={iconButton} newTabLabel={t.ui.newTab} ariaLabel={`GitHub ${t.ui.newTab}`}>
          <GitHubIcon size={20} />
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={contact.linkedin} className={iconButton} newTabLabel={t.ui.newTab} ariaLabel={`LinkedIn ${t.ui.newTab}`}>
          <LinkedInIcon size={20} />
        </ExternalLink>
      </li>
    </ul>
  );
}

/** Identity block: the sticky start-side column on desktop, the first screen on mobile. */
export function Identity({ t, locale }: Props) {
  return (
    <header className="flex flex-col pt-8 lg:sticky lg:top-0 lg:h-dvh lg:max-h-dvh lg:justify-between lg:overflow-y-auto lg:py-12">
      <div>
        <Avatar alt={t.identity.photoAlt} />
        <h1 className="mt-5 text-name font-semibold leading-[1.08] tracking-tight text-text lg:text-name-lg">
          {t.identity.name}
        </h1>
        <p className="mt-3 text-lg font-medium text-text">{t.identity.title}</p>
        <p className="mt-4 max-w-[36ch] text-base text-muted">{t.identity.oneLiner}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
          <p className="inline-flex items-center gap-1.5 text-sm text-muted">
            <PinIcon size={15} />
            {t.identity.location}
          </p>
          <Availability text={t.identity.availability} />
        </div>

        <div className="mt-8 hidden lg:block">
          <SectionNav labels={t.ui.nav} ariaLabel={t.ui.primaryNav} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <a href={contact.cv} download={contact.cvFileName} className={buttonPrimary}>
            <DownloadIcon size={16} />
            {t.ui.downloadCv}
          </a>
          <a href={`mailto:${contact.email}`} className={buttonSecondary}>
            <MailIcon size={16} />
            {t.ui.emailMe}
          </a>
        </div>
      </div>

      <div className="mt-8 hidden items-center justify-between gap-4 lg:flex">
        <SocialLinks t={t} />
        <SiteControls t={t} locale={locale} />
      </div>
      <div className="mt-6 lg:hidden">
        <SocialLinks t={t} />
      </div>
    </header>
  );
}

/** Mobile (< 1024px) sticky top bar: initials, language, theme, menu. */
export function MobileTopBar({ t, locale }: Props) {
  return (
    <div className="sticky top-0 z-40 -mx-4 flex h-16 items-center justify-between border-b border-border bg-bg px-4 sm:-mx-6 sm:px-6 lg:hidden">
      <a href="#top" className="latin inline-flex size-11 items-center justify-center rounded-lg font-mono text-sm font-semibold text-accent" aria-label={t.identity.name}>
        MA
      </a>
      <span aria-hidden className="mx-1 h-4 w-px bg-border-strong" />
      <div className="min-w-0 flex-1 ps-2">
        <CurrentSection labels={t.ui.nav} />
      </div>
      <div className="flex items-center gap-1">
        <SiteControls t={t} locale={locale} />
        <MobileMenu
          labels={t.ui.nav}
          navLabel={t.ui.primaryNav}
          menuLabel={t.ui.menu}
          closeLabel={t.ui.closeMenu}
          cv={contact.cv}
          cvFileName={contact.cvFileName}
          cvLabel={t.ui.downloadCv}
        />
      </div>
    </div>
  );
}
