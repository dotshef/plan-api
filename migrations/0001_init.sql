-- Enable gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE posts (
  id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT         NOT NULL,
  content    TEXT         NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);
