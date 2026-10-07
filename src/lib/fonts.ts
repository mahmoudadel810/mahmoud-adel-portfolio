import { Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
export const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap", preload: false });

// IBM Plex Sans Arabic is self-hosted from /public/fonts (see globals.css) so it can be
// preloaded on Arabic pages only; Latin characters on Arabic pages fall through to Geist.
export const ARABIC_FONT_PRELOADS = ["400", "500", "600"].map((w) => `/fonts/plex-arabic-${w}.woff2`);

export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;
