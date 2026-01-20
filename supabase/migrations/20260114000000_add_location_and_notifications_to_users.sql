-- Add location and notification settings to users table

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS last_location geography(POINT, 4326),
ADD COLUMN IF NOT EXISTS is_notification_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS is_location_sharing_enabled boolean DEFAULT true;

-- Update RLS to allow users to update their own location and settings
CREATE POLICY "Users can update their own location and settings" 
ON public.users 
FOR UPDATE 
USING (auth.uid()::text = clerk_user_id) 
WITH CHECK (auth.uid()::text = clerk_user_id);
