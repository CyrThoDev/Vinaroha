import { NextResponse } from 'next/server'

const BREVO_EMAIL_URL = 'https://api.brevo.com/v3/smtp/email'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEST_EMAIL = process.env.BOX_COMMANDE_EMAIL || 'contact@vinaroha.com'

const FORMULES: Record<string, string> = {
  decouverte: 'La Box Découverte',
  epicurienne: 'La Box Épicurienne',
}

const TYPES: Record<string, string> = {
  abonnement: 'Nouvel abonnement',
  offrir: 'Box à offrir',
}

export async function POST(req: Request) {
  const { type, formule, duree, nom, email, telephone, message, website } = await req.json()

  // Honeypot : champ invisible qui ne doit jamais être rempli par un humain
  if (typeof website === 'string' && website.trim()) {
    return NextResponse.json({ success: true, message: 'Votre demande a bien été envoyée !' })
  }

  if (typeof nom !== 'string' || !nom.trim()) {
    return NextResponse.json({ error: 'Le nom est requis.' }, { status: 400 })
  }
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
  }
  if (typeof formule !== 'string' || !FORMULES[formule]) {
    return NextResponse.json({ error: 'Formule invalide.' }, { status: 400 })
  }
  if (typeof duree !== 'string' || !duree.trim()) {
    return NextResponse.json({ error: 'Durée invalide.' }, { status: 400 })
  }
  if (typeof type !== 'string' || !TYPES[type]) {
    return NextResponse.json({ error: 'Type de demande invalide.' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Configuration email manquante.' }, { status: 500 })
  }

  const htmlContent = `
    <h2>${TYPES[type]} — ${FORMULES[formule]}</h2>
    <p><strong>Durée :</strong> ${duree}</p>
    <p><strong>Nom :</strong> ${nom}</p>
    <p><strong>Email :</strong> ${email}</p>
    ${telephone ? `<p><strong>Téléphone :</strong> ${telephone}</p>` : ''}
    ${message ? `<p><strong>Message :</strong><br/>${String(message).replace(/\n/g, '<br/>')}</p>` : ''}
  `

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
      subject: `${TYPES[type]} — ${FORMULES[formule]} (${duree})`,
      htmlContent,
    }),
  })

  if (res.ok) {
    return NextResponse.json({ success: true, message: 'Votre demande a bien été envoyée !' })
  }

  const error = await res.json().catch(() => null)
  return NextResponse.json({ error: error?.message ?? 'Une erreur est survenue.' }, { status: res.status })
}
