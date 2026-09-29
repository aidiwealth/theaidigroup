-- 001_website_intake.sql
-- Website form submissions (pitch, service request, contact, email sign-up).
-- Lives in the Aidi OS database under its own schema so Aidi OS can adopt it later.
-- Apply once:  psql "$DATABASE_URL" -f db/changes/001_website_intake.sql

CREATE SCHEMA IF NOT EXISTS intake;

CREATE TABLE IF NOT EXISTS intake.submissions (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  kind          text        NOT NULL CHECK (kind IN ('pitch', 'service', 'contact', 'signup')),
  name          text,
  email         text        NOT NULL CHECK (position('@' IN email) > 1),
  company       text,
  payload       jsonb       NOT NULL DEFAULT '{}'::jsonb,
  source_page   text,
  status        text        NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'done', 'spam')),
  email_sent_at timestamptz,
  email_error   text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS submissions_kind_created_idx ON intake.submissions (kind, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS submissions_signup_email_uq ON intake.submissions (lower(email)) WHERE kind = 'signup';

-- Least-privilege role for the website: it can add rows and record email status, nothing else.
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'website_intake') THEN
    CREATE ROLE website_intake LOGIN PASSWORD 'CHANGE_ME_BEFORE_RUNNING';
  END IF;
END $$;
GRANT USAGE ON SCHEMA intake TO website_intake;
GRANT INSERT, SELECT (id, email, kind) ON intake.submissions TO website_intake;
GRANT UPDATE (email_sent_at, email_error) ON intake.submissions TO website_intake;
