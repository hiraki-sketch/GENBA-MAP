import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
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
  { label: "事故総数", value: "47", hint: "累計登録件数" },
  { label: "今月の事故", value: "6", hint: "2026年8月" },
  { label: "未対応", value: "3", hint: "要対応件数" },
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

const statusStyles: Record<
  AccidentStatus,
  { className: string; icon: string }
> = {
  未対応: {
    className: "border-[#ffc9c9] bg-[#fef2f2] text-[#c10007]",
    icon: "/icons/accidents/status-pending.svg",
  },
  対応中: {
    className: "border-[#fee685] bg-[#fffbeb] text-[#bb4d00]",
    icon: "/icons/accidents/status-in-progress.svg",
  },
};

type DashboardViewProps = {
  mapPreview: React.ReactNode;
};

export function DashboardView({ mapPreview }: DashboardViewProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col p-7">
      <h1 className="text-lg font-semibold leading-7 text-[#101828]">
        ダッシュボード
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[6px] border border-black/10 bg-white px-5 py-4"
          >
            <p className="text-xs leading-4 text-[#6a7282]">{stat.label}</p>
            <p className="pt-1 font-mono text-[32px] leading-8 font-semibold text-[#101828]">
              {stat.value}
            </p>
            <p className="pt-1 text-[11px] leading-[16.5px] text-[#99a1af]">
              {stat.hint}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-5">
        <div className="overflow-hidden rounded-[6px] border border-black/10 bg-white lg:col-span-3">
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
            <h2 className="text-sm font-medium leading-5 text-[#101828]">
              最近の事故
            </h2>
            <Link
              href="/accidents"
              className="inline-flex items-center gap-0.5 text-xs font-medium text-[#6a7282]"
            >
              すべて見る
              <Image
                src="/icons/dashboard/chevron.svg"
                alt=""
                width={12}
                height={12}
                className="size-3"
                unoptimized
              />
            </Link>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-black/10 hover:bg-transparent">
                <TableHead className="h-9 px-5 text-[11px] font-medium text-[#6a7282]">
                  発生日
                </TableHead>
                <TableHead className="h-9 px-4 text-[11px] font-medium text-[#6a7282]">
                  発生場所
                </TableHead>
                <TableHead className="h-9 px-4 text-[11px] font-medium text-[#6a7282]">
                  種別
                </TableHead>
                <TableHead className="h-9 px-4 text-[11px] font-medium text-[#6a7282]">
                  状況
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAccidents.map((accident) => {
                const status = statusStyles[accident.status];

                return (
                  <TableRow
                    key={`${accident.date}-${accident.location}`}
                    className="border-black/10 hover:bg-transparent"
                  >
                    <TableCell className="px-5 py-5 font-mono text-xs text-[#4a5565]">
                      {accident.date}
                    </TableCell>
                    <TableCell className="max-w-[160px] truncate px-4 py-5 text-xs text-[#101828]">
                      {accident.location}
                    </TableCell>
                    <TableCell className="px-4 py-5">
                      <Badge
                        variant="outline"
                        className="h-auto rounded border-[#e5e7eb] bg-[#f3f4f6] px-2 py-0.5 text-xs font-medium text-[#4a5565]"
                      >
                        {accident.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-5">
                      <Badge
                        variant="outline"
                        className={cn(
                          "h-auto gap-1 rounded px-2 py-0.5 text-xs font-medium",
                          status.className
                        )}
                      >
                        <Image
                          src={status.icon}
                          alt=""
                          width={6}
                          height={11}
                          className="h-[11px] w-auto"
                          unoptimized
                        />
                        {accident.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="flex min-h-[300px] flex-col overflow-hidden rounded-[6px] border border-black/10 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
            <h2 className="text-sm font-medium leading-5 text-[#101828]">
              事故発生マップ
            </h2>
            <Link
              href="/map"
              className="inline-flex items-center gap-0.5 text-xs font-medium text-[#6a7282]"
            >
              拡大
              <Image
                src="/icons/dashboard/expand.svg"
                alt=""
                width={10}
                height={12}
                className="h-3 w-auto"
                unoptimized
              />
            </Link>
          </div>
          <div className="min-h-0 flex-1 bg-[#ddd]">{mapPreview}</div>
        </div>
      </div>

      <div className="mt-4 rounded-[6px] border border-black/10 bg-white px-5 py-4">
        <h2 className="text-[11px] font-medium leading-[16.5px] tracking-[0.55px] text-[#6a7282] uppercase">
          ユーザー情報
        </h2>
        <div className="mt-3 flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb]">
            <Image
              src="/icons/dashboard/user.svg"
              alt=""
              width={18}
              height={18}
              className="size-[18px]"
              unoptimized
            />
          </div>
          <div className="grid flex-1 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-[11px] leading-[16.5px] text-[#6a7282]">
                表示名
              </p>
              <p className="pt-0.5 text-sm leading-5 text-[#101828]">
                管理者 山田
              </p>
            </div>
            <div>
              <p className="text-[11px] leading-[16.5px] text-[#6a7282]">
                メールアドレス
              </p>
              <p className="pt-0.5 text-sm leading-5 text-[#101828]">
                yamada@genba-map.jp
              </p>
            </div>
            <div>
              <p className="text-[11px] leading-[16.5px] text-[#6a7282]">権限</p>
              <p className="pt-0.5 text-sm leading-5 text-[#101828]">
                システム管理者
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
