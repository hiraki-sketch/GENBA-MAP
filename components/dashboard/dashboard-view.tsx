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

type AccidentStatus = "未対応" | "対応中";

type RecentAccident = {
  date: string;
  location: string;
  type: string;
  status: AccidentStatus;
};

const stats = [
  { label: "事故総数", value: "47", hint: "累計登録件数", emphasize: false },
  { label: "今月の事故", value: "6", hint: "2026年8月", emphasize: false },
  { label: "未対応", value: "3", hint: "要対応件数", emphasize: true },
] as const;

const recentAccidents: RecentAccident[] = [
  {
    date: "2026-08-05",
    location: "圏央道 桶川加納IC付近",
    type: "接触",
    status: "未対応",
  },
  {
    date: "2026-08-03",
    location: "名神高速道路 栗東IC付近",
    type: "その他",
    status: "未対応",
  },
  {
    date: "2026-08-01",
    location: "仙台東部道路 仙台東IC付近",
    type: "単独",
    status: "未対応",
  },
  {
    date: "2026-07-31",
    location: "東名高速道路 浜松SA付近",
    type: "出会い頭",
    status: "対応中",
  },
  {
    date: "2026-07-28",
    location: "阪神高速3号 生田川IC付近",
    type: "追突",
    status: "対応中",
  },
];

type DashboardViewProps = {
  mapPreview: React.ReactNode;
};

export function DashboardView({ mapPreview }: DashboardViewProps) {
  return (
    <div className="flex flex-col gap-14">
      <header className="flex flex-col gap-2">
        <p className="text-[11px] tracking-[0.18em] text-muted-foreground">
          運用状況
        </p>
        <h1 className="text-[28px] font-semibold leading-8 tracking-tight text-foreground">
          ダッシュボード
        </h1>
      </header>

      <section aria-labelledby="dashboard-metrics">
        <h2 id="dashboard-metrics" className="sr-only">
          指標
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "sm:px-0",
                index > 0 && "sm:border-l sm:border-border sm:pl-10"
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
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="dashboard-recent">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] tracking-[0.18em] text-muted-foreground">
              要対応
            </p>
            <h2
              id="dashboard-recent"
              className="text-base font-semibold tracking-tight text-foreground"
            >
              最近の事故
            </h2>
          </div>
          <Link
            href="/accidents"
            className="text-[13px] font-medium text-primary"
          >
            すべて見る
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="h-10 px-0 text-[11px] font-medium tracking-[0.12em] text-muted-foreground">
                発生日
              </TableHead>
              <TableHead className="h-10 text-[11px] font-medium tracking-[0.12em] text-muted-foreground">
                発生場所
              </TableHead>
              <TableHead className="h-10 text-[11px] font-medium tracking-[0.12em] text-muted-foreground">
                種別
              </TableHead>
              <TableHead className="h-10 pr-0 text-right text-[11px] font-medium tracking-[0.12em] text-muted-foreground">
                状況
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAccidents.map((accident) => (
              <TableRow
                key={`${accident.date}-${accident.location}`}
                className="border-border hover:bg-transparent"
              >
                <TableCell className="px-0 py-4 font-mono text-[13px] text-muted-foreground">
                  {accident.date}
                </TableCell>
                <TableCell className="max-w-[280px] truncate py-4 text-[13px] text-foreground">
                  {accident.location}
                </TableCell>
                <TableCell className="py-4 text-[13px] text-muted-foreground">
                  {accident.type}
                </TableCell>
                <TableCell
                  className={cn(
                    "pr-0 py-4 text-right text-[13px]",
                    accident.status === "未対応"
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
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
