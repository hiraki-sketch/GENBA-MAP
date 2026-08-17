import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function AccidentsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold leading-7 text-[#101828]">
        事故一覧
      </h1>

      <Button
        asChild
        className="h-auto gap-1.5 rounded bg-[#101828] px-3.5 py-2 text-sm font-medium leading-5 text-white hover:bg-[#101828]/90"
      >
        <Link href="/accidents/new">
          <span className="relative size-[14px] shrink-0 overflow-hidden">
            <Image
              src="/icons/accidents/register.svg"
              alt=""
              width={14}
              height={14}
              className="size-[14px]"
              unoptimized
            />
          </span>
          事故を登録
        </Link>
      </Button>
    </div>
  );
}
