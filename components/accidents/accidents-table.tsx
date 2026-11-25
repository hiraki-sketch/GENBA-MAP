import Image from "next/image";
import Link from "next/link";
import type {
  AccidentRow,
  AccidentStatus,
} from "@/lib/accidents";

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

type AccidentsTableProps = {
  accidents: AccidentRow[];
};

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

export function AccidentsTable( {
  accidents,
}: AccidentsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="border-black/10 bg-muted hover:bg-muted">
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
                  {accident.public_id}
                </TableCell>

                <TableCell className="px-4 font-mono text-sm text-[#364153]">
                  {accident.occurred_on}
                </TableCell>

                <TableCell className="max-w-[200px] truncate px-4 text-sm text-[#101828]">
                  {accident.location_name ?? "未設定"}
                </TableCell>

                <TableCell className="px-4">
                  <Badge
                    variant="outline"
                    className="h-auto rounded border-[#e5e7eb] bg-muted px-2 py-0.5 text-xs font-medium text-[#4a5565]"
                  >
                    {accident.accident_type ?? "未設定"}
                  </Badge>
                </TableCell>
                
                <TableCell className="px-4 text-sm text-[#364153]">
                  {accident.driver_name ?? "未設定"}
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
                    href={`/accidents/${accident.public_id}`}
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
