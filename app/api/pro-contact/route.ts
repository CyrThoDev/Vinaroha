import { NextResponse } from 'next/server'
import { rateLimit, getClientIp } from '@/app/lib/rateLimit'
import { renderEmailLayout, renderEmailText, escapeHtml, nl2br } from '@/app/lib/email'

const BREVO_EMAIL_URL = 'https://api.brevo.com/v3/smtp/email'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEST_EMAIL = process.env.BOX_COMMANDE_EMAIL || 'contact@vinaroha.com'
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

export async function POST(req: Request) {
  const ip = getClientIp(req)
  const { ok, retryAfterSeconds } = rateLimit(`pro-contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)
  if (!ok) {
    return NextResponse.json(
      { error: 'Trop de demandes envoyées. Réessayez dans quelques minutes.' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    )
  }

  const { nom, etablissement, typeEtablissement, email, telephone, volumeEstime, carteExistante, message, website } = await req.json()

  // Honeypot : champ invisible qui ne doit jamais être rempli par un humain
  if (typeof website === 'string' && website.trim()) {
    return NextResponse.json({ success: true, message: 'Votre demande a bien été envoyée !' })
  }

  if (typeof nom !== 'string' || !nom.trim()) {
    return NextResponse.json({ error: 'Le nom est requis.' }, { status: 400 })
  }
  if (typeof etablissement !== 'string' || !etablissement.trim()) {
    return NextResponse.json({ error: "Le nom de l'établissement est requis." }, { status: 400 })
  }
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Configuration email manquante.' }, { status: 500 })
  }

  const rows = [
    typeEtablissement && { label: "Type d'établissement", value: escapeHtml(typeEtablissement) },
    { label: 'Nom', value: escapeHtml(nom) },
    { label: 'Email', value: escapeHtml(email) },
    telephone && { label: 'Téléphone', value: escapeHtml(telephone) },
    volumeEstime && { label: 'Volume estimé', value: escapeHtml(volumeEstime) },
    carteExistante && { label: 'Carte des vins', value: escapeHtml(carteExistante) },
  ].filter((r): r is { label: string; value: string } => Boolean(r))

  const layoutOptions = {
    preheader: `Nouvelle demande espace pro de ${etablissement}`,
    eyebrow: 'Espace pro',
    title: `Nouvelle demande — ${etablissement}`,
    rows,
    message: message ? { label: 'Message', value: nl2br(escapeHtml(message)) } : undefined,
    ctaLabel: `Répondre à ${nom}`,
    ctaUrl: `mailto:${email}`,
  }

  const htmlContent = renderEmailLayout(layoutOptions)
  const textContent = renderEmailText(layoutOptions)

  const res = await fetch(BREVO_EMAIL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: { name: "Site Vin'Aroha", email: DEST_EMAIL },
      to: [{ email: DEST_EMAIL, name: "Vin'Aroha" }],
      replyTo: { email, name: nom },
      subject: `Demande espace pro — ${etablissement}`,
      htmlContent,
      textContent,
    }),
  })

  if (res.ok) {
    return NextResponse.json({ success: true, message: 'Votre demande a bien été envoyée !' })
  }

  const error = await res.json().catch(() => null)
  return NextResponse.json({ error: error?.message ?? 'Une erreur est survenue.' }, { status: res.status })
}
