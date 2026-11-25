
import { query } from "@/lib/db";


export const accidentTypes = [
  "追突",
  "接触",
  "単独",
  "出会い頭",
  "その他",
] as const;

export const accidentStatuses = ["未対応", "対応中", "対応済"] as const;

export type AccidentType = (typeof accidentTypes)[number];
export type AccidentStatus = (typeof accidentStatuses)[number];
export const NearbyRadii = [500, 1000, 3000] as const;
export type NearbyRadius = (typeof NearbyRadii)[number];

export type AccidentMapBounds = {
  west: number;
  south: number;
  east: number;
  north: number;
};

export type AccidentRow = {
  id: string;
  public_id: string;
  occurred_on: string;
  location_name: string;
  accident_type: AccidentType;
  summary: string | null;
  lat: number | null;
  lng: number | null;
  status: AccidentStatus;
  driver_id: string | null;
  driver_name: string | null;
  created_by: string | null;
  created_at: Date;
  updated_at: Date;
};

export type AccidentMapPoint = {
  public_id: string;
  lat: number;
  lng: number;
  status: AccidentStatus;
};

export type NearbyAccidentSearch = {
  lat: number;
  lng: number;
  radiusMeters: NearbyRadius;
  status?: AccidentStatus;
}
const accidentSelect = `
  a.id,
  a.public_id,
  a.occurred_on::text AS occurred_on,
  a.location_name,
  a.accident_type,
  a.summary,
  ST_Y(a.location::geometry) AS lat,
  ST_X(a.location::geometry) AS lng,
  a.status,
  a.driver_id,
  d.name AS driver_name,
  a.created_by,
  a.created_at,
  a.updated_at
`;

export async function listAccidents() {
  return query<AccidentRow>(
    `
      SELECT ${accidentSelect}
      FROM accidents a
      LEFT JOIN drivers d ON d.id = a.driver_id
      ORDER BY a.occurred_on DESC, a.public_id DESC
    `
  );
}

export async function listAccidentMapPoints
(bounds?: AccidentMapBounds,
  status?: AccidentStatus
) {
  return query<AccidentMapPoint>(
    `
      SELECT
        public_id,
        ST_Y(location::geometry) AS lat,
        ST_X(location::geometry) AS lng,
        status
      FROM accidents
      WHERE location IS NOT NULL
        AND CASE
          WHEN $1::float8 IS NULL THEN TRUE
          ELSE ST_Intersects(
            location,
            ST_MakeEnvelope($1, $2, $3, $4, 4326)::geography
          )
        END
        AND CASE
          WHEN $5::text IS NULL THEN TRUE
          ELSE status ::text =$5::text
        END
    `,
    [
      bounds?.west ?? null,
      bounds?.south ?? null,
      bounds?.east ?? null,
      bounds?.north ?? null,
      status ?? null,
    ]
  );
}
export async function listNearbyAccidentMapPoints({

  lat,
  lng,
  radiusMeters,
  status,
}: NearbyAccidentSearch) {
  return query<AccidentMapPoint>(
    `
    SELECT
    public_id,
    ST_Y(location::geometry) AS lat,
    ST_X(location::geometry) AS lng,
    status
    FROM accidents
    WHERE location IS NOT NULL 
    AND ST_DWithin(
      location,
      ST_SetSRID(ST_MakePoint($2,$1),4326)::geography,
      $3
    )
    AND (
      $4::text IS null
      OR status::text = $4::text
    )
    `,
    [
      lat,
      lng,
      radiusMeters,
      status ?? null,
    ]
  );
}

export type CreateAccidentInput = {
  occurredOn: string;
  locationName: string;
  accidentType: AccidentType;
  summary?: string | null;
  lat?: number | null;
  lng?: number | null;
  driverId?: string | null;
  createdBy?: string | null;
};

export async function createAccident(input: CreateAccidentInput) {
  const rows = await query<AccidentRow>(
    `
      INSERT INTO accidents (
        occurred_on,
        location_name,
        accident_type,
        summary,
        location,
        driver_id,
        created_by
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        CASE
          WHEN $5::float8 IS NULL OR $6::float8 IS NULL THEN NULL
          ELSE ST_SetSRID(ST_MakePoint($6, $5), 4326)::geography
        END,
        $7,
        $8
      )
      RETURNING
        id,
        public_id,
        occurred_on::text AS occurred_on,
        location_name,
        accident_type,
        summary,
        ST_Y(location::geometry) AS lat,
        ST_X(location::geometry) AS lng,
        status,
        driver_id,
        NULL::text AS driver_name,
        created_by,
        created_at,
        updated_at
    `,
    [
      input.occurredOn,
      input.locationName,
      input.accidentType,
      input.summary ?? null,
      input.lat ?? null,
      input.lng ?? null,
      input.driverId ?? null,
      input.createdBy ?? null,
    ]
  );

  return rows[0];
}
