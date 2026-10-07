import Link from "next/link";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";

// Fallback for paths outside any locale (the middleware normally redirects those to /en).
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="flex min-h-dvh items-center justify-center px-4">
        <main className="max-w-md text-center">
          <p className="font-mono text-label uppercase tracking-[0.14em] text-accent">404</p>
          <h1 className="mt-4 text-2xl font-semibold">This page doesn&apos;t exist</h1>
          <p className="mt-3 text-muted">
            <Link href="/en" className="text-accent underline">Go to the home page</Link>
            {" · "}
            <Link href="/ar" lang="ar" className="text-accent underline">الصفحة الرئيسية</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
