import { AppShell } from "@/components/layout/app-shell";
import { AccidentMapAccordion } from "@/components/map/accident-map-accordion";
import { MapPanelHeader } from "@/components/map/map-panel-header";

export default function MapPage() {
  return (
    <AppShell>
      <div className="flex flex-1 flex-col bg-background">
        <MapPanelHeader />
        <div className="p-4">
          <AccidentMapAccordion />
        </div>
      </div>
    </AppShell>
  );
}
