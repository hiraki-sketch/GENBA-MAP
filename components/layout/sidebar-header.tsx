import Image from "next/image";

import { SidebarHeader as ShadcnSidebarHeader } from "@/components/ui/sidebar";

export function SidebarHeader() {
  return (
    <ShadcnSidebarHeader className="flex-row items-center gap-3 px-5 py-6">
      <Image
        src="/icons/brand/logo.png"
        alt=""
        width={28}
        height={28}
        className="size-7 rounded-full object-cover"
      />

      <span className="text-[13px] font-semibold tracking-[0.18em] text-foreground">
        GENBA MAP
      </span>
    </ShadcnSidebarHeader>
  );
}
