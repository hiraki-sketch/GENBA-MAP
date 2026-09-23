import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { AccidentRow } from "@/lib/accidents";
import { DashboardMetrics } from "./dashboard-metrics";

type DashboardViewProps = {
  mapPreview: React.ReactNode;
  recentAccidents: AccidentRow[];
  total: number;
  thisMonth: number;
  pending: number;
  monthLabel: string;
};

export function DashboardView({ mapPreview, recentAccidents, total, thisMonth, pending, monthLabel }: DashboardViewProps) {
  return (
    <div className="flex flex-col gap-14">
      <DashboardMetrics total={total} thisMonth={thisMonth} pending={pending} monthLabel={monthLabel} />

      <section aria-labelledby="dashboard-recent" className="rounded-lg border border-slate-200 bg-white p-5 text-slate-900 shadow-sm sm:p-6 motion-safe:animate-in motion-safe:slide-in-from-right-8 motion-safe:fade-in motion-safe:duration-500">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] tracking-[0.18em] text-slate-600">
              要対応
            </p>
            <h2
              id="dashboard-recent"
              className="text-base font-semibold tracking-tight text-slate-900"
            >
              最近の事故
            </h2>
          </div>
          <Link
            href="/accidents"
            className="text-[13px] font-medium text-violet-700"
          >
            すべて見る
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="h-10 px-0 text-[11px] font-medium tracking-[0.12em] text-slate-600">
                発生日
              </TableHead>
              <TableHead className="h-10 text-[11px] font-medium tracking-[0.12em] text-slate-600">
                発生場所
              </TableHead>
              <TableHead className="h-10 text-[11px] font-medium tracking-[0.12em] text-slate-600">
                種別
              </TableHead>
              <TableHead className="h-10 pr-0 text-right text-[11px] font-medium tracking-[0.12em] text-slate-600">
                状況
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAccidents.length === 0 && (
              <TableRow><TableCell colSpan={4} className="py-8 text-center text-slate-600">事故はまだ登録されていません。</TableCell></TableRow>
            )}
            {recentAccidents.map((accident) => (
              <TableRow
                key={accident.id}
                className="border-slate-200 hover:bg-transparent"
              >
                <TableCell className="px-0 py-4 font-mono text-[13px] text-slate-600">
                  {accident.occurred_on}
                </TableCell>
                <TableCell className="max-w-[280px] truncate py-4 text-[13px] text-slate-900">
                  {accident.location_name}
                </TableCell>
                <TableCell className="py-4 text-[13px] text-slate-600">
                  {accident.accident_type}
                </TableCell>
                <TableCell
                  className={cn(
                    "pr-0 py-4 text-right text-[13px]",
                    accident.status === "未対応"
                      ? "font-medium text-violet-700"
                      : "text-slate-600"
                  )}
                >
                  {accident.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section aria-labelledby="dashboard-map">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] tracking-[0.18em] text-muted-foreground">
              発生地点
            </p>
            <h2
              id="dashboard-map"
              className="text-base font-semibold tracking-tight text-foreground"
            >
              事故発生マップ
            </h2>
          </div>
          <Link href="/map" className="text-[13px] font-medium text-primary">
            拡大
          </Link>
        </div>
        <div className="h-[360px] overflow-hidden border border-border bg-muted">
          {mapPreview}
        </div>
      </section>
    </div>
  );
}
