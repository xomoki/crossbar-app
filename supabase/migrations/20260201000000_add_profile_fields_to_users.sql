-- Add profile fields to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS company_name text,
ADD COLUMN IF NOT EXISTS position text,
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS x_url text,
ADD COLUMN IF NOT EXISTS facebook_url text,
ADD COLUMN IF NOT EXISTS linkedin_url text,
ADD COLUMN IF NOT EXISTS youtrust_url text;
