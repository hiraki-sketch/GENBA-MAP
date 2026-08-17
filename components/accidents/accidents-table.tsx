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

type AccidentStatus = "未対応" | "対応中" | "対応済";

type Accident = {
  id: string;
  date: string;
  location: string;
  type: string;
  driver: string;
  status: AccidentStatus;
};

const accidents: Accident[] = [
  {
    id: "ACC-008",
    date: "2026-08-05",
    location: "圏央道 桶川加納IC付近",
    type: "接触",
    driver: "渡辺 浩",
    status: "未対応",
  },
  {
    id: "ACC-007",
    date: "2026-08-03",
    location: "名神高速道路 栗東IC付近",
    type: "その他",
    driver: "小林 修",
    status: "未対応",
  },
  {
    id: "ACC-006",
    date: "2026-08-01",
    location: "仙台東部道路 仙台東IC付近",
    type: "単独",
    driver: "高橋 裕司",
    status: "未対応",
  },
  {
    id: "ACC-005",
    date: "2026-07-31",
    location: "東名高速道路 浜松SA付近",
    type: "出会い頭",
    driver: "伊藤 次郎",
    status: "対応中",
  },
  {
    id: "ACC-004",
    date: "2026-07-28",
    location: "阪神高速3号 生田川IC付近",
    type: "追突",
    driver: "山田 太郎",
    status: "対応中",
  },
  {
    id: "ACC-003",
    date: "2026-07-24",
    location: "国道1号線 静岡市葵区内",
    type: "単独",
    driver: "鈴木 誠",
    status: "対応済",
  },
  {
    id: "ACC-002",
    date: "2026-07-18",
    location: "首都高速3号 用賀IC付近",
    type: "接触",
    driver: "佐藤 健一",
    status: "対応済",
  },
  {
    id: "ACC-001",
    date: "2026-07-10",
    location: "東名高速道路 海老名SA付近",
    type: "追突",
    driver: "田中 浩二",
    status: "対応済",
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
  対応済: {
    className: "border-[#b9f8cf] bg-[#f0fdf4] text-[#008236]",
    icon: "/icons/accidents/status-done.svg",
  },
};

export function AccidentsTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="border-black/10 bg-[#f9fafb] hover:bg-[#f9fafb]">
            <TableHead className="h-[74px] px-4 text-[11px] font-medium text-[#6a7282]">
              No.
            </TableHead>
            <TableHead className="h-[74px] px-4 text-[11px] font-medium text-[#6a7282]">
              発生日
            </TableHead>
            <TableHead className="h-[74px] px-4 text-[11px] font-medium text-[#6a7282]">
              発生場所
            </TableHead>
            <TableHead className="h-[74px] px-4 text-[11px] font-medium text-[#6a7282]">
              事故種別
            </TableHead>
            <TableHead className="h-[74px] max-w-[60px] px-4 text-[11px] font-medium leading-[16.5px] whitespace-normal text-[#6a7282]">
              担当ドライバー
            </TableHead>
            <TableHead className="h-[74px] px-4 text-[11px] font-medium text-[#6a7282]">
              ステータス
            </TableHead>
            <TableHead className="h-[74px] px-4 text-[11px] font-medium text-[#6a7282]">
              詳細
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accidents.map((accident) => {
            const status = statusStyles[accident.status];

            return (
              <TableRow
                key={accident.id}
                className="h-[69px] border-black/10 hover:bg-transparent"
              >
                <TableCell className="px-4 font-mono text-xs text-[#99a1af]">
                  {accident.id}
                </TableCell>
                <TableCell className="px-4 font-mono text-sm text-[#364153]">
                  {accident.date}
                </TableCell>
                <TableCell className="max-w-[200px] truncate px-4 text-sm text-[#101828]">
                  {accident.location}
                </TableCell>
                <TableCell className="px-4">
                  <Badge
                    variant="outline"
                    className="h-auto rounded border-[#e5e7eb] bg-[#f3f4f6] px-2 py-0.5 text-xs font-medium text-[#4a5565]"
                  >
                    {accident.type}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 text-sm text-[#364153]">
                  {accident.driver}
                </TableCell>
                <TableCell className="px-4">
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
                      width={8}
                      height={11}
                      className="h-[11px] w-auto"
                      unoptimized
                    />
                    {accident.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4">
                  <Link
                    href={`/accidents/${accident.id}`}
                    className="inline-flex items-center gap-0.5 text-xs font-medium text-[#4a5565] underline"
                  >
                    詳細
                    <Image
                      src="/icons/accidents/detail-chevron.svg"
                      alt=""
                      width={9}
                      height={11}
                      className="h-[11px] w-auto"
                      unoptimized
                    />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
