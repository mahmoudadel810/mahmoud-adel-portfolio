import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import { contact } from "@/content/profile";

const hasPhoto = existsSync(path.join(process.cwd(), "public", contact.photo));

/** 88px rounded square (64px on mobile); falls back to an "MA" mark if /public/me.jpg is missing. */
export function Avatar({ alt, size = "lg" }: { alt: string; size?: "lg" | "sm" }) {
  const box = size === "lg" ? "size-16 lg:size-[88px] rounded-[16px] lg:rounded-[20px]" : "size-9 rounded-[10px]";
  if (!hasPhoto) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={`${box} latin inline-flex shrink-0 items-center justify-center border border-border bg-surface font-mono text-sm font-medium text-accent`}
      >
        MA
      </span>
    );
  }
  return (
    <Image
      src={contact.photo}
      alt={alt}
      width={176}
      height={176}
      priority
      sizes={size === "lg" ? "(min-width: 1024px) 88px, 64px" : "36px"}
      className={`${box} shrink-0 border border-border object-cover`}
    />
  );
}
