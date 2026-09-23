"use client";

import dynamic from "next/dynamic";

const SplashMap = dynamic(
  () => import("@/components/auth/splash-map").then((mod) => mod.SplashMap),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-[var(--splash-bg)]" />,
  }
);

export function SplashMapCanvas() {
  return <SplashMap />;
}
