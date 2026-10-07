"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./icons";

const subscribe = () => () => {};

export function ThemeToggle({ labels }: { labels: { toggle: string; light: string; dark: string } }) {
  const { resolvedTheme, setTheme } = useTheme();
  // The resolved theme is only known on the client; render a neutral label until then.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted ? resolvedTheme !== "light" : true;
  const label = mounted ? (isDark ? labels.light : labels.dark) : labels.toggle;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-surface hover:text-text"
    >
      {mounted && !isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
