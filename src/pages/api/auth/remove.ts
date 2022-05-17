import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '~/lib/supabase'

export default async function remove(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await supabase.auth.api.deleteAuthCookie(req, res, { redirectTo: '/' })
}
