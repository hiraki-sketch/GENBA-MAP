import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { AppShell } from "@/components/layout/app-shell";
import { PageCanvas } from "@/components/layout/page-canvas";

export default function Home() {
  return (
    <AppShell>
      <PageCanvas>
        <DashboardContent />
      </PageCanvas>
    </AppShell>
  );
}
