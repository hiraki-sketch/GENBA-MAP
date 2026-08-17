"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const filters = ["すべて", "未対応", "対応中", "対応済"] as const;

type MapFilter = (typeof filters)[number];

export function MapPanelHeader() {
  const [activeFilter, setActiveFilter] = useState<MapFilter>("すべて");

  return (
    <div className="flex flex-col border-b border-black/10 p-4">
      <h1 className="text-sm font-semibold leading-5 text-[#101828]">マップ</h1>

      <div className="relative mt-3 w-full max-w-[255px]">
        <span className="pointer-events-none absolute top-1/2 left-2.5 size-[13px] -translate-y-1/2 overflow-hidden">
          <Image
            src="/icons/map/search.svg"
            alt=""
            width={13}
            height={13}
            className="size-[13px]"
            unoptimized
          />
        </span>
        <Input
          type="search"
          placeholder="場所・ドライバーで検索"
          className="h-[29px] rounded border-black/10 bg-white py-1.5 pr-3 pl-8 text-xs placeholder:text-[#99a1af] focus-visible:ring-0"
        />
      </div>

      <div className="mt-3 flex gap-1.5">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <Button
              key={filter}
              type="button"
              variant="outline"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "h-auto rounded px-2.5 py-1 text-[11px] font-medium leading-[16.5px]",
                isActive
                  ? "border-[#101828] bg-[#101828] text-white hover:bg-[#101828] hover:text-white"
                  : "border-black/10 bg-white text-[#4a5565] hover:bg-white hover:text-[#4a5565]"
              )}
            >
              {filter}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
