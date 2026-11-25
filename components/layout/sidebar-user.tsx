"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type SidebarUserProps = {
  name: string;
  email: string;
};

export function SidebarUser({ name, email }: SidebarUserProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setPending(true);

    try {
      await authClient.signOut();
      router.replace("/login");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-4">
      <div>
        <p className="truncate text-[13px] font-medium leading-5 text-foreground">
          {name}
        </p>
        <p className="truncate text-[11px] leading-4 text-muted-foreground">
          {email}
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={pending}
        onClick={() => void handleSignOut()}
        className="h-8 w-full justify-center text-[12px]"
      >
        {pending ? "ログアウト中..." : "ログアウト"}
      </Button>
    </div>
  );
}
