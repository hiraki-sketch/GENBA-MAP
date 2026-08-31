"use client";

import { useActionState } from "react";

import { createDriverAction } from "@/app/settings/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DriverRow } from "@/lib/drivers";

type DriversMasterProps = {
  drivers: DriverRow[];
};

export function DriversMaster({ drivers }: DriversMasterProps) {
  const [state, formAction, pending] = useActionState(
    createDriverAction,
    null
  );

  return (
    <div className="rounded-[6px] border border-black/10 bg-white p-5">
      <h2 className="text-[11px] font-medium leading-[16.5px] tracking-[0.55px] text-[#6a7282] uppercase">
        ドライバー
      </h2>
      <p className="mt-1 text-xs leading-4 text-[#6a7282]">
        氏名を登録すると ID が自動で発行され、事故登録の選択肢に出ます。
      </p>

      <form action={formAction} className="mt-4 flex items-end gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Label htmlFor="driver-name" className="text-xs font-medium text-[#364153]">
            氏名
          </Label>
          <Input
            id="driver-name"
            name="name"
            key={state?.createdId ?? "driver-name"}
            required
            maxLength={80}
            placeholder="例：田中 浩二"
            className="h-[37px] rounded border-black/10 bg-white text-sm placeholder:text-[#99a1af] focus-visible:ring-0"
          />
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="h-[37px] rounded bg-[#101828] px-4 text-sm font-medium text-white hover:bg-[#101828]/90"
        >
          {pending ? "登録中..." : "登録"}
        </Button>
      </form>

      {state?.error ? (
        <p className="mt-2 text-sm text-[#c10007]">{state.error}</p>
      ) : null}

      <ul className="mt-4 divide-y divide-black/10 border-t border-black/10">
        {drivers.map((driver) => (
          <li
            key={driver.id}
            className="flex items-baseline justify-between gap-4 py-2.5"
          >
            <span className="text-sm text-[#101828]">{driver.name}</span>
            <span className="truncate font-mono text-[11px] text-[#99a1af]">
              {driver.id}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
