"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useActionState, useState } from "react";

import { createAccidentAction } from "@/app/accidents/actions";
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
import type { DriverRow } from "@/lib/drivers";

const AccidentMapPicker = dynamic(
  () =>
    import("@/components/accidents/accident-map-picker").then(
      (mod) => mod.AccidentMapPicker
    ),
  {
    ssr: false,
    loading: () => <div className="min-h-[490px] flex-1 bg-muted" />,
  }
);

const accidentTypes = ["追突", "接触", "単独", "出会い頭", "その他"] as const;

function RequiredMark() {
  return <span className="font-normal text-[#fb2c36]">必須</span>;
}

type AccidentRegisterFormProps = {
  drivers: DriverRow[];
};

export function AccidentRegisterForm({ drivers }: AccidentRegisterFormProps) {
  const [accidentType, setAccidentType] =
    useState<(typeof accidentTypes)[number]>("追突");
  const [driverId, setDriverId] = useState("");
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [state, formAction, pending] = useActionState(
    createAccidentAction,
    null
  );

  return (
    <form action={formAction} className="pt-6">
      <input type="hidden" name="accidentType" value={accidentType} />
      <input type="hidden" name="driverId" value={driverId} />
      <input
        type="hidden"
        name="lat"
        value={position ? String(position[0]) : ""}
      />
      <input
        type="hidden"
        name="lng"
        value={position ? String(position[1]) : ""}
      />

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
                  name="occurredOn"
                  required
                  className="h-[37px] rounded border-black/10 bg-white text-sm focus-visible:ring-0"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="gap-1 text-xs font-medium text-[#364153]">
                  発生場所 <RequiredMark />
                </Label>
                <Input
                  name="locationName"
                  required
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
                <Label className="gap-1 text-xs font-medium text-[#364153]">
                  担当ドライバー <RequiredMark />
                </Label>
                <Select value={driverId || undefined} onValueChange={setDriverId}>
                  <SelectTrigger className="h-[39px] w-full rounded border-black/10 bg-white text-sm text-[#111827] focus-visible:ring-0">
                    <SelectValue placeholder="ドライバーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name}
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
                  name="summary"
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

          {state?.error ? (
            <p className="mt-3 text-sm text-[#c10007]">{state.error}</p>
          ) : null}

          <div className="mt-4 flex gap-3">
            <Button
              type="submit"
              disabled={pending}
              className="h-auto flex-1 rounded bg-[#101828] py-2.5 text-sm font-medium text-white hover:bg-[#101828]/90"
            >
              {pending ? "登録中..." : "登録"}
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
              現在地付近を開きます。事故地点をタップしてピンを合わせてください
            </p>
          </div>
          <AccidentMapPicker
            position={position}
            onPositionChange={setPosition}
          />
        </div>
      </div>
    </form>
  );
}
