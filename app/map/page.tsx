import { AppShell } from "@/components/layout/app-shell";
import { MapView } from "@/components/map/map-view";

export default function MapPage() {
  return (
    <AppShell>
      <div className="flex min-h-0 flex-1 flex-col bg-background">
        <MapView />
        <div className="min-h-[420px] flex-1">
        </div>
      </div>
    </AppShell>
  );
}
