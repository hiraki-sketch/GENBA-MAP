"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { AuthMark } from "@/components/auth/auth-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    setPending(true);
    setLoginError(null);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });
      if (error) {
        setLoginError(
          "メールアドレスまたはパスワードが正しくありません。"
        );
        return;
      }
      router.replace("/");
      router.refresh();
    } catch {
      setLoginError(
        "ログイン処理に失敗しました。もう一度お試しください。"
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[var(--splash-bg)] px-4 py-8">
      <div className="flex w-full max-w-[380px] flex-col items-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-12 motion-safe:duration-700">
        <AuthMark size="lg" />
        <h1 className="mt-5 text-center text-[28px] font-extrabold tracking-tight text-white">
          GENBA MAP
        </h1>
        <p className="mt-1.5 text-center text-[13px] tracking-[0.06em] text-[rgba(148,198,255,0.8)]">
          事故情報管理システム
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full flex-col gap-3 rounded-[20px] border border-white/22 bg-white/10 px-7 py-7 backdrop-blur-md"
        >
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
              placeholder="パスワード"
              className="h-[45px] bg-white pl-9 text-[#111827] placeholder:text-[#111827]/50"
            />
          </div>
          <Button
            type="submit"
            disabled={pending}
            className="h-[47px] w-full rounded-xl bg-[var(--splash-brand)] text-white hover:bg-[#c94700]"
          >
            {pending ? "ログイン中..." : "ログイン"}
          </Button>
          <Link
            href="/reset-password"
            className="pt-1 text-center text-xs text-[rgba(148,198,255,0.7)] underline"
          >
            パスワードを忘れた場合
          </Link>
        </form>
          {loginError ? (
         <p role="alert" className="text-sm text-red-200">
         {loginError}
         </p>
          ) : null}
        <p className="mt-5 text-center text-[13px] text-[rgba(148,198,255,0.8)]">
          アカウントをお持ちでない方は{" "}
          <Link href="/signup" className="font-medium text-[#fb923c] underline">
            新規登録
          </Link>
        </p>
        <p className="mt-7 text-center text-[11px] text-[rgba(148,198,255,0.35)]">
          © 2026 GENBA MAP System
        </p>
      </div>
    </div>
  );
}
