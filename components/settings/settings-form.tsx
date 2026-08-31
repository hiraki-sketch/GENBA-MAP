"use client";

import Image from "next/image";
import { useState } from "react";

import { DriversMaster } from "@/components/settings/drivers-master";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DriverRow } from "@/lib/drivers";

type SettingsFormProps = {
  drivers: DriverRow[];
};

export function SettingsForm({ drivers }: SettingsFormProps) {
  const [displayName, setDisplayName] = useState("管理者 平木");
  const [email, setEmail] = useState("yamada@genba-map.jp");

  return (
    <div className="mx-auto flex w-full max-w-[680px] flex-col p-7">
      <h1 className="text-lg font-semibold leading-7 text-[#101828]">設定</h1>

      <div className="mt-6 rounded-[6px] border border-black/10 bg-white p-5">
        <h2 className="text-[11px] font-medium leading-[16.5px] tracking-[0.55px] text-[#6a7282] uppercase">
          ユーザー情報
        </h2>

        <div className="mt-4 flex items-center gap-4 border-b border-black/10 pb-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb]">
            <Image
              src="/icons/settings/user-lg.svg"
              alt=""
              width={20}
              height={20}
              className="size-5"
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-5 text-[#101828]">
              管理者 平木
            </p>
            <p className="pt-0.5 text-xs leading-4 text-[#6a7282]">
              システム管理者
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-medium text-[#364153]">表示名</Label>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-3 size-[13px] -translate-y-1/2 overflow-hidden">
                <Image
                  src="/icons/settings/user-field.svg"
                  alt=""
                  width={13}
                  height={13}
                  className="size-[13px]"
                  unoptimized
                />
              </span>
              <Input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="h-[37px] rounded border-black/10 bg-white pr-3 pl-9 text-sm text-[#111827] focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-medium text-[#364153]">
              メールアドレス
            </Label>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-3 size-[13px] -translate-y-1/2 overflow-hidden">
                <Image
                  src="/icons/settings/mail-field.svg"
                  alt=""
                  width={13}
                  height={13}
                  className="size-[13px]"
                  unoptimized
                />
              </span>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-[37px] rounded border-black/10 bg-white pr-3 pl-9 text-sm text-[#111827] focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <DriversMaster drivers={drivers} />
      </div>

      <div className="mt-4 rounded-[6px] border border-black/10 bg-white p-5">
        <h2 className="text-[11px] font-medium leading-[16.5px] tracking-[0.55px] text-[#6a7282] uppercase">
          システム情報
        </h2>

        <dl className="mt-3">
          <div className="flex items-center justify-between border-b border-black/10 py-2.5">
            <dt className="text-sm text-[#4a5565]">システム名</dt>
            <dd className="text-sm text-[#101828]">GENBA MAP</dd>
          </div>
          <div className="flex items-center justify-between border-b border-black/10 py-2.5">
            <dt className="text-sm text-[#4a5565]">バージョン</dt>
            <dd className="font-mono text-sm text-[#101828]">v1.0.0</dd>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <dt className="text-sm text-[#4a5565]">権限</dt>
            <dd className="text-sm text-[#101828]">システム管理者</dd>
          </div>
        </dl>
      </div>

      <div className="mt-5">
        <Button
          type="button"
          className="h-10 w-[110px] rounded bg-[#101828] text-sm font-medium text-white hover:bg-[#101828]/90"
        >
          変更を保存
        </Button>
      </div>
    </div>
  );
}
