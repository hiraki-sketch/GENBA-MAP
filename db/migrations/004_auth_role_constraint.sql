-- Better Auth expects a string column. Preserve the existing role values and restrictions.
ALTER TABLE users ALTER COLUMN role DROP DEFAULT;
ALTER TABLE users ALTER COLUMN role TYPE TEXT USING role::text;
ALTER TABLE users ALTER COLUMN role SET DEFAULT '一般';
ALTER TABLE users ADD CONSTRAINT users_role_check
  CHECK (role IN ('システム管理者', '一般'));
