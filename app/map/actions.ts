"use server";

import {
  listNearbyAccidentMapPoints,
  listAccidentMapPoints,
  accidentStatuses,
  NearbyRadii,
  type AccidentMapBounds,
  type AccidentStatus,
  type NearbyRadius,
} from "@/lib/accidents";
import { requireSession } from "@/lib/auth-session";

export async function searchMapPointsAction(
  bounds: AccidentMapBounds,
  status?: AccidentStatus | "すべて"
) {
  await requireSession();

  if (
    !Number.isFinite(bounds.west) ||
    !Number.isFinite(bounds.south) ||
    !Number.isFinite(bounds.east) ||
    !Number.isFinite(bounds.north) ||
    bounds.west > bounds.east ||
    bounds.south > bounds.north
  ) {
    return [];
  }

  const nextStatus = accidentStatuses.includes(status as AccidentStatus)
    ? (status as AccidentStatus)
    : undefined;

  return listAccidentMapPoints(bounds, nextStatus);
}

export async function searchNearbyMapPointsAction(input: {
  lat: number;
  lng: number;
  radiusMeters: number;
  status?: AccidentStatus | "すべて";
}) {
  await requireSession();

  const { lat, lng, radiusMeters, status } = input;

  const validCoordinates =
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180;

  const validRadius = NearbyRadii.includes(radiusMeters as NearbyRadius);

  if (!validCoordinates || !validRadius) {
    return [];
  }

  const nextStatus = accidentStatuses.includes(status as AccidentStatus)
    ? (status as AccidentStatus)
    : undefined;

  return listNearbyAccidentMapPoints({
    lat,
    lng,
    radiusMeters: radiusMeters as NearbyRadius,
    status: nextStatus,
  });
}
