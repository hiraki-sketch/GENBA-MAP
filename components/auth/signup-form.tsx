"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent } from "react";
import { Lock, Mail, User } from "lucide-react";

import { AuthMark } from "@/components/auth/auth-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center overflow-y-auto bg-[var(--splash-bg)] px-4 py-8">
      <div className="flex w-full max-w-[380px] flex-col items-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-12 motion-safe:duration-700">
        <AuthMark size="lg" />
        <h1 className="mt-5 text-center text-2xl font-extrabold tracking-tight text-white">
          アカウントを作成
        </h1>
        <p className="mt-1.5 text-center text-[13px] tracking-[0.04em] text-[rgba(148,198,255,0.8)]">
          現場マップ事故情報管理システム
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-7 flex w-full flex-col gap-2.5 rounded-[20px] border border-white/22 bg-white/10 px-7 py-7 backdrop-blur-md"
        >
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#111827]/45" />
            <Input
              type="text"
              name="name"
              required
              placeholder="氏名"
              className="h-[45px] bg-white pl-9 text-[#111827] placeholder:text-[#111827]/50"
            />
          </div>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#111827]/45" />
            <Input
              type="email"
              name="email"
              required
              placeholder="メールアドレス"
              className="h-[45px] bg-white pl-9 text-[#111827] placeholder:text-[#111827]/50"
            />
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#111827]/45" />
            <Input
              type="password"
              name="password"
              required
              minLength={8}
              placeholder="パスワード（8文字以上）"
              className="h-[45px] bg-white pl-9 text-[#111827] placeholder:text-[#111827]/50"
            />
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#111827]/45" />
            <Input
              type="password"
              name="passwordConfirm"
              required
              minLength={8}
              placeholder="パスワード（確認）"
              className="h-[45px] bg-white pl-9 text-[#111827] placeholder:text-[#111827]/50"
            />
          </div>
          <Button
            type="submit"
            className="mt-1 h-[47px] w-full rounded-xl bg-[var(--splash-brand)] text-white hover:bg-[#c94700]"
          >
            アカウントを作成
          </Button>
        </form>

        <p className="mt-5 text-center text-[13px] text-[rgba(148,198,255,0.8)]">
          すでにアカウントをお持ちの方は{" "}
          <Link href="/login" className="font-medium text-[#fb923c] underline">
            ログイン
          </Link>
        </p>
        <p className="mt-7 text-center text-[11px] text-[rgba(148,198,255,0.35)]">
          © 2026 GENBA MAP System
        </p>
      </div>
    </div>
  );
}
