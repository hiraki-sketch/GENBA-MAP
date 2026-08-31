import { MapPin } from "lucide-react";

import { SidebarHeader as ShadcnSidebarHeader } from "@/components/ui/sidebar";

export function SidebarHeader() {
  return (
    <ShadcnSidebarHeader className="flex-row items-center gap-3 px-5 py-6">
      <div className="flex size-7 items-center justify-center bg-primary">
        <MapPin className="size-4 text-primary-foreground" strokeWidth={2} />
      </div>

      <span className="text-[13px] font-semibold tracking-[0.18em] text-foreground">
        GENBA MAP
      </span>
    </ShadcnSidebarHeader>
  );
}
