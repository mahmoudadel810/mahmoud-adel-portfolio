// TODO: set NEXT_PUBLIC_SITE_URL in Vercel to the production domain (used for canonical URLs, sitemap and OG).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahmoud-adel.vercel.app").replace(/\/$/, "");
