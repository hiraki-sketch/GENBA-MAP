"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AccidentMapPicker = dynamic(
  () =>
    import("@/components/accidents/accident-map-picker").then(
      (mod) => mod.AccidentMapPicker
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[490px] flex-1 bg-[#ddd]" />,
  }
);

const accidentTypes = ["追突", "接触", "単独", "出会い頭", "その他"] as const;

function RequiredMark() {
  return <span className="font-normal text-[#fb2c36]">必須</span>;
}

export function AccidentRegisterForm() {
  const [accidentType, setAccidentType] =
    useState<(typeof accidentTypes)[number]>("追突");
  const [position, setPosition] = useState<[number, number] | null>(null);

  return (
    <div className="pt-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="rounded-[6px] border border-black/10 bg-white p-5">
            <h2 className="text-[11px] font-medium leading-[16.5px] tracking-[0.55px] text-[#6a7282] uppercase">
              事故情報
            </h2>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="gap-1 text-xs font-medium text-[#364153]">
                  発生日 <RequiredMark />
                </Label>
                <Input
                  type="date"
                  className="h-[37px] rounded border-black/10 bg-white text-sm focus-visible:ring-0"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="gap-1 text-xs font-medium text-[#364153]">
                  発生場所 <RequiredMark />
                </Label>
                <Input
                  placeholder="例：東名高速道路 海老名SA付近"
                  className="h-[37px] rounded border-black/10 bg-white text-sm placeholder:text-[#99a1af] focus-visible:ring-0"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="gap-1 text-xs font-medium text-[#364153]">
                  事故種別 <RequiredMark />
                </Label>
                <Select
                  value={accidentType}
                  onValueChange={(value) =>
                    setAccidentType(value as (typeof accidentTypes)[number])
                  }
                >
                  <SelectTrigger className="h-[39px] w-full rounded border-black/10 bg-white text-sm text-[#111827] focus-visible:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accidentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-[#364153]">
                  事故概要
                </Label>
                <Textarea
                  placeholder="事故の状況・損傷箇所・対応状況などを入力してください"
                  className="min-h-[97px] rounded border-black/10 bg-white text-sm placeholder:text-[#99a1af] focus-visible:ring-0"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-[#364153]">
                    緯度
                  </Label>
                  <Input
                    readOnly
                    value={position ? position[0].toFixed(6) : ""}
                    placeholder="地図をクリック"
                    className="h-[37px] rounded border-black/10 bg-white font-mono text-sm placeholder:text-[#99a1af] focus-visible:ring-0"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-[#364153]">
                    経度
                  </Label>
                  <Input
                    readOnly
                    value={position ? position[1].toFixed(6) : ""}
                    placeholder="地図をクリック"
                    className="h-[37px] rounded border-black/10 bg-white font-mono text-sm placeholder:text-[#99a1af] focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              type="button"
              className="h-auto flex-1 rounded bg-[#101828] py-2.5 text-sm font-medium text-white hover:bg-[#101828]/90"
            >
              登録
            </Button>
            <Button
              asChild
              type="button"
              variant="outline"
              className="h-auto flex-1 rounded border-black/10 bg-transparent py-2.5 text-sm font-medium text-[#364153] hover:bg-transparent"
            >
              <Link href="/accidents">キャンセル</Link>
            </Button>
          </div>
        </div>

        <div className="flex min-h-[558px] flex-col overflow-hidden rounded-[6px] border border-black/10 bg-white">
          <div className="border-b border-black/10 px-5 py-3.5">
            <p className="text-sm font-medium leading-5 text-[#101828]">
              地図から地点を選択
            </p>
            <p className="pt-0.5 text-[11px] leading-[16.5px] text-[#6a7282]">
              地図上をクリックしてピンを立ててください
            </p>
          </div>
          <AccidentMapPicker
            position={position}
            onPositionChange={setPosition}
          />
        </div>
      </div>
    </div>
  );
}
