ALTER TABLE public.fleet
  ADD COLUMN IF NOT EXISTS price_text text,
  ADD COLUMN IF NOT EXISTS category text;

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS year text,
  ADD COLUMN IF NOT EXISTS metric text;