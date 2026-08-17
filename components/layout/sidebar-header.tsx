import { MapPin } from "lucide-react";

import { SidebarHeader as ShadcnSidebarHeader } from "@/components/ui/sidebar";

export function SidebarHeader() {
  return (
    <ShadcnSidebarHeader className="flex-row items-center gap-2.5 p-4">
      <div className="flex h-[33px] w-7 items-center justify-center rounded bg-sidebar-primary">
        <MapPin
          className="size-5 text-sidebar-primary-foreground"
          strokeWidth={2}
        />
      </div>

      <span className="text-sm font-semibold leading-5 tracking-[0.35px] text-sidebar-foreground">
        GENBA MAP
      </span>
    </ShadcnSidebarHeader>
  );
}
