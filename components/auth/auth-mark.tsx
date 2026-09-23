import Image from "next/image";

import { cn } from "@/lib/utils";

type AuthMarkProps = {
  size?: "md" | "lg" | "xl";
};

const markSize = {
  md: { px: 64, className: "size-16" },
  lg: { px: 72, className: "size-[72px]" },
  xl: { px: 96, className: "size-24" },
} as const;

export function AuthMark({ size = "md" }: AuthMarkProps) {
  const { px, className } = markSize[size];

  return (
    <Image
      src="/icons/brand/logo.png"
      alt="GENBA MAP"
      width={px}
      height={px}
      priority
      className={cn(
        "shrink-0 rounded-full object-cover shadow-[0_8px_14px_rgba(232,81,0,0.45)]",
        className
      )}
    />
  );
}
