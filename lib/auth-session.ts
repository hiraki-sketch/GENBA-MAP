import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

type SessionUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function requireAdminSession() {
  const session = await requireSession();
  const role = (session.user as SessionUser).role;

  if (role !== "システム管理者") {
    return null;
  }

  return session;
}
