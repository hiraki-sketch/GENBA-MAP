import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { AppShell } from "@/components/layout/app-shell";
import { PageCanvas } from "@/components/layout/page-canvas";

export default function Home() {
  return (
    <AppShell>
      <PageCanvas>
        <div className="flex flex-col gap-14">
          <DashboardHeader />
          <Suspense
            fallback={
              <p role="status" className="py-8 text-sm text-muted-foreground">
                読み込み中です...
              </p>
            }
          >
            <DashboardContent />
          </Suspense>
        </div>
      </PageCanvas>
    </AppShell>
  );
}
