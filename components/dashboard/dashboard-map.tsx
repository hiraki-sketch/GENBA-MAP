"use client";

import dynamic from "next/dynamic";

import type { AccidentMapPoint } from "@/lib/accidents";

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

export function DashboardMap({ points }: { points: AccidentMapPoint[] }) {
  return <DashboardMapPreview points={points} />;
}
