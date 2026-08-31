"use client";

import dynamic from "next/dynamic";

import { DashboardView } from "@/components/dashboard/dashboard-view";

const DashboardMapPreview = dynamic(
  () =>
    import("@/components/dashboard/dashboard-map-preview").then(
      (mod) => mod.DashboardMapPreview
    ),
  {
    ssr: false,
    loading: () => <div className="h-full min-h-[360px] bg-muted" />,
  }
);

export function DashboardContent() {
  return <DashboardView mapPreview={<DashboardMapPreview />} />;
}
