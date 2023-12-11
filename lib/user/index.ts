'use server'

import { createSupabaseServerClient } from '../supabase-server'

export const readSession = async () => {
  const supabase = await createSupabaseServerClient()
  const session = supabase.auth.getSession()
  return session
}
