"use client";

import { useEffect, useRef } from "react";

/** Fetches a themed diagram SVG (from /public/diagrams) when it nears the viewport and inlines it. */
export function LazyDiagram({ src, ratio }: { src: string; ratio: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const load = () =>
      fetch(src)
        .then((r) => (r.ok ? r.text() : ""))
        .then((svg) => {
          if (!cancelled && svg.startsWith("<svg")) el.innerHTML = svg;
        })
        .catch(() => {});
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          load();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [src]);
  // Reserve the diagram's aspect ratio so nothing shifts when it arrives.
  return <div ref={ref} className="w-full [&_svg]:mx-auto" style={{ aspectRatio: ratio }} />;
}
