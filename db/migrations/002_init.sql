CREATE TYPE accident_type AS ENUM ('追突', '接触', '単独', '出会い頭', 'その他');
CREATE TYPE accident_status AS ENUM ('未対応', '対応中', '対応済');
CREATE TYPE user_role AS ENUM ('システム管理者', '一般');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT '一般',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE SEQUENCE accident_public_id_seq START 1;

CREATE TABLE accidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id TEXT NOT NULL UNIQUE DEFAULT ('ACC-' || LPAD(nextval('accident_public_id_seq')::text, 3, '0')),
  occurred_on DATE NOT NULL,
  location_name TEXT NOT NULL,
  accident_type accident_type NOT NULL,
  summary TEXT,
  location GEOGRAPHY(Point, 4326),
  status accident_status NOT NULL DEFAULT '未対応',
  driver_id UUID REFERENCES drivers (id) ON DELETE SET NULL,
  created_by UUID REFERENCES users (id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX accidents_occurred_on_idx ON accidents (occurred_on DESC);
CREATE INDEX accidents_status_idx ON accidents (status);
CREATE INDEX accidents_location_gix ON accidents USING GIST (location);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_set_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER accidents_set_updated_at
  BEFORE UPDATE ON accidents
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
