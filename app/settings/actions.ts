"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/lib/auth-session";
import { createDriver } from "@/lib/drivers";

export type CreateDriverFormState = {
  error?: string;
  createdId?: string;
} | null;

export async function createDriverAction(
  _prevState: CreateDriverFormState,
  formData: FormData
): Promise<CreateDriverFormState> {
  const session = await requireAdminSession();

  if (!session) {
    return { error: "ドライバーを登録する権限がありません。" };
  }

  const raw = formData.get("name");
  const name = typeof raw === "string" ? raw.trim() : "";

  if (!name) {
    return { error: "氏名を入力してください。" };
  }

  if (name.length > 80) {
    return { error: "氏名は80文字以内で入力してください。" };
  }

  try {
    const driver = await createDriver(name);

    if (!driver) {
      return { error: "ドライバーの登録に失敗しました。" };
    }

    revalidatePath("/settings");
    revalidatePath("/accidents/new");

    return { createdId: driver.id };
  } catch (error) {
    console.error("ドライバー登録に失敗しました。", error);

    return {
      error: "ドライバーを登録できませんでした。時間をおいて再度お試しください。",
    };
  }
}
