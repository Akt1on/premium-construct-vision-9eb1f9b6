
-- Replace insert policy with length-validated version
DROP POLICY "Anyone can submit a lead" ON public.leads;
CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 200
    AND char_length(phone) BETWEEN 5 AND 40
    AND (email IS NULL OR char_length(email) <= 320)
    AND (message IS NULL OR char_length(message) <= 4000)
  );

-- Lock down has_role: only callable by definer (used by RLS internally)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
