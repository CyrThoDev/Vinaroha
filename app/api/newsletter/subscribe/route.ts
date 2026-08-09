import { NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3/contacts'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  const { email, website } = await req.json()

  // Honeypot : champ invisible qui ne doit jamais être rempli par un humain
  if (typeof website === 'string' && website.trim()) {
    return NextResponse.json({ success: true, message: 'Inscription réussie !' })
  }

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  const listId = Number(process.env.BREVO_LIST_ID)

  if (!apiKey || !listId) {
    return NextResponse.json({ error: 'Configuration newsletter manquante' }, { status: 500 })
  }

  const res = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
  })

  if (res.status === 201) {
    return NextResponse.json({ success: true, message: 'Inscription réussie !' })
  }
  if (res.status === 204) {
    return NextResponse.json({ success: true, message: 'Vous êtes déjà inscrit·e.' })
  }

  const error = await res.json().catch(() => null)
  return NextResponse.json({ error: error?.message ?? 'Une erreur est survenue.' }, { status: res.status })
}
