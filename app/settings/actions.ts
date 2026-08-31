"use server";

import { revalidatePath } from "next/cache";

import { createDriver } from "@/lib/drivers";

export type CreateDriverFormState = {
  error?: string;
  createdId?: string;
} | null;

export async function createDriverAction(
  _prevState: CreateDriverFormState,
  formData: FormData
): Promise<CreateDriverFormState> {
  const raw = formData.get("name");
  const name = typeof raw === "string" ? raw.trim() : "";

  if (!name) {
    return { error: "氏名を入力してください。" };
  }

  if (name.length > 80) {
    return { error: "氏名は80文字以内で入力してください。" };
  }

  const driver = await createDriver(name);
  if (!driver) {
    return { error: "ドライバーの登録に失敗しました。" };
  }

  revalidatePath("/settings");
  revalidatePath("/accidents/new");

  return { createdId: driver.id };
}
