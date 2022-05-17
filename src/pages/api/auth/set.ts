import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '~/lib/supabase'

export default async function set(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res)
}
