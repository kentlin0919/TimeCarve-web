-- Copy and run this SQL in your Supabase SQL Editor to enable role-based login

-- Function: get_identity_id
-- Returns the identity_id (1=Admin, 2=Teacher, 3=Student) for the current user.
-- Required for the Switch Case login logic.

CREATE OR REPLACE FUNCTION public.get_identity_id()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result_id INTEGER;
BEGIN
  -- Query the userinfo table for the identity_id matching the current auth.uid()
  SELECT identity_id INTO result_id
  FROM userinfo
  WHERE id = auth.uid();
  
  RETURN result_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_identity_id() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_identity_id() TO service_role;
