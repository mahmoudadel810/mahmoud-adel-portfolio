// NEXT_PUBLIC_SITE_URL overrides this (set in Vercel); change both if you move to a custom domain (used for canonical URLs, sitemap and OG).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahmoudadel810-portfolio.vercel.app").replace(/\/$/, "");
