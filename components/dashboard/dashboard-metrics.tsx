"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = { total: number; thisMonth: number; pending: number; monthLabel: string };

export function DashboardMetrics({ total, thisMonth, pending, monthLabel }: Props) {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
const stats = [
  {
    label: "事故総数",
    value: total,
    hint: "累計登録件数",
    emphasize: false,
    hoverClass: "hover:bg-red-400 focus-visible:bg-red-400",
    selectedClass: "bg-red-400",
  },
  {
    label: "今月の事故",
    value: thisMonth,
    hint: monthLabel,
    emphasize: false,
    hoverClass: "hover:bg-green-200 focus-visible:bg-green-200",
    selectedClass: "bg-green-200",
  },
  {
    label: "未対応",
    value: pending,
    hint: "要対応件数",
    emphasize: true,
    hoverClass: "hover:bg-blue-200 focus-visible:bg-blue-200",
    selectedClass: "bg-blue-200",
  },
] as const;

  return (
      <section aria-labelledby="dashboard-metrics" className="motion-safe:animate-in motion-safe:slide-in-from-left-8 motion-safe:fade-in motion-safe:duration-500">
        <h2 id="dashboard-metrics" className="sr-only">
          指標
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0">
          {stats.map((stat, index) => {
            const isSelected = selectedStat === stat.label;

            return (
              <div
                key={stat.label}
                className={cn(index > 0 && "sm:border-l sm:border-border")}
              >
                <button
                  type="button"
                  onClick={() => setSelectedStat(stat.label)}
                  className={cn(
                    "w-full rounded-md px-4 py-3 text-left transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    stat.hoverClass,
                    index > 0 && "sm:px-10",
                    isSelected && stat.selectedClass
                  )}
                >
                  <p className="text-[11px] tracking-[0.16em] text-muted-foreground">
                    {stat.label}
                  </p>
                  <p
                    className={cn(
                      "mt-3 font-mono text-[40px] leading-none font-medium tracking-tight",
                      stat.emphasize ? "text-primary" : "text-foreground"
                    )}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[12px] text-muted-foreground">
                    {stat.hint}
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      </section>

  );
}
