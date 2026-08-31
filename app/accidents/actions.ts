"use server";

import { redirect } from "next/navigation";

import {
  accidentTypes,
  createAccident,
  type AccidentType,
} from "@/lib/accidents";
import { getDriverById } from "@/lib/drivers";

export type CreateAccidentFormState = {
  error: string;
} | null;

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readOptionalNumber(formData: FormData, key: string) {
  const value = readString(formData, key);
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function createAccidentAction(
  _prevState: CreateAccidentFormState,
  formData: FormData
): Promise<CreateAccidentFormState> {
  const occurredOn = readString(formData, "occurredOn");
  const locationName = readString(formData, "locationName");
  const accidentType = readString(formData, "accidentType");
  const summary = readString(formData, "summary");
  const driverId = readString(formData, "driverId");
  const lat = readOptionalNumber(formData, "lat");
  const lng = readOptionalNumber(formData, "lng");

  if (!occurredOn || !locationName) {
    return { error: "発生日と発生場所を入力してください。" };
  }

  if (!accidentTypes.includes(accidentType as AccidentType)) {
    return { error: "事故種別を選択してください。" };
  }

  if (!driverId) {
    return { error: "担当ドライバーを選択してください。" };
  }

  const driver = await getDriverById(driverId);
  if (!driver) {
    return { error: "選択したドライバーが見つかりません。" };
  }

  await createAccident({
    occurredOn,
    locationName,
    accidentType: accidentType as AccidentType,
    summary: summary || null,
    lat,
    lng,
    driverId,
  });

  redirect("/accidents");
}
