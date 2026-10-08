import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ revalidated: false, message: 'Secret invalide ou manquant' }, { status: 401 })
  }

  revalidatePath('/', 'layout')

  return Response.json({ revalidated: true, now: Date.now() })
}
