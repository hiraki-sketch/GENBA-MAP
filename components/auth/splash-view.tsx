import Link from "next/link";
import { MapPin, User } from "lucide-react";

import { AuthMark } from "@/components/auth/auth-mark";
import { SplashMapCanvas } from "@/components/auth/splash-map-canvas";
import { Button } from "@/components/ui/button";

export function SplashView() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[var(--splash-bg)]">
      <div className="pointer-events-none absolute inset-0 opacity-25 md:top-0 md:right-0 md:bottom-0 md:left-[36%] md:opacity-40">
        <SplashMapCanvas />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--splash-bg)] from-[12%] via-[var(--splash-bg)]/90 via-[42%] to-transparent to-[78%]" />

      <div className="relative z-10 flex min-h-svh max-w-full flex-col justify-center px-8 py-12 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-12 motion-safe:duration-700 md:max-w-[460px] md:px-14">
        <AuthMark size="xl" />

        <h1 className="mt-9 font-sans font-extrabold tracking-tight text-white">
          <span className="block text-[clamp(2.5rem,8vw,4.5rem)] leading-none">
            GENBA
          </span>
          <span className="mt-1 block bg-gradient-to-br from-[#fb923c] to-[#fbbf24] bg-clip-text text-[clamp(2.5rem,8vw,4.5rem)] leading-none text-transparent">
            MAP
          </span>
        </h1>

        <p className="mt-6 text-sm tracking-[0.08em] text-[rgba(180,215,255,0.9)]">
          現場マップ事故情報管理システム
        </p>

        <div className="mt-10 flex w-full max-w-[348px] flex-col gap-3">
          <Button
            asChild
            className="h-12 w-full rounded-xl bg-[var(--splash-brand)] text-sm text-white shadow-[0_6px_12px_rgba(232,81,0,0.45)] hover:bg-[#c94700] hover:text-white"
          >
            <Link href="/login">
              <User className="size-[15px]" />
              ログイン
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 w-full rounded-xl border-white/35 bg-white/8 text-sm text-white/90 hover:bg-white/14 hover:text-white"
          >
            <Link href="/signup">
              <User className="size-[15px]" />
              アカウントを作成
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute right-4 bottom-4 z-10 flex items-center gap-1.5 rounded-md bg-white/90 px-3 py-1.5 shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-8 motion-safe:delay-300 motion-safe:duration-700">
        <MapPin className="size-3 text-[#111827]" />
        <span className="text-[11px] text-[#111827]">
          愛媛ルート 今治 → 松山 → 宇和島
        </span>
      </div>
    </div>
  );
}
