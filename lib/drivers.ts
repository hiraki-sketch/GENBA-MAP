import { query } from "@/lib/db";

export type DriverRow = {
  id: string;
  name: string;
};

export async function listDrivers() {
  return query<DriverRow>(
    `
      SELECT id, name
      FROM drivers
      ORDER BY name
    `
  );
}

export async function getDriverById(id: string) {
  const rows = await query<DriverRow>(
    `
      SELECT id, name
      FROM drivers
      WHERE id = $1
    `,
    [id]
  );

  return rows[0] ?? null;
}

export async function createDriver(name: string) {
  const rows = await query<DriverRow>(
    `
      INSERT INTO drivers (name)
      VALUES ($1)
      RETURNING id, name
    `,
    [name]
  );

  return rows[0];
}
