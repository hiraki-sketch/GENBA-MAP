"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type AccidentMapAccordionProps = {
  children?: React.ReactNode;
  defaultOpen?: boolean;
};

export function AccidentMapAccordion({
  children,
  defaultOpen = false,
}: AccidentMapAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full max-w-[450px] bg-white">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-[58px] w-full items-center gap-[18px] py-4"
      >
        <span className="min-w-0 flex-1 text-left text-base font-medium leading-6 text-[#0f172a]">
          事故発生　MAP
        </span>
        <span className="relative size-4 shrink-0 overflow-hidden">
          <Image
            src="/icons/map/chevron-down.svg"
            alt=""
            width={16}
            height={16}
            className={cn(
              "size-4 transition-transform duration-200",
              open && "rotate-180"
            )}
            unoptimized
          />
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#e2e8f0]"
        />
      </button>
      {open ? <div className="pb-4">{children}</div> : null}
    </div>
  );
}
