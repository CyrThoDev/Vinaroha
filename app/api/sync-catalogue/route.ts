import type { NextRequest } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

// Déclenché à la demande depuis un menu Google Apps Script dans le Google Sheet de Delphine.
// Le Sheet reste la seule source de saisie pour ces champs ; prix/photo/couleur/producteur du
// mois restent gérés à la main dans le Studio et ne sont jamais touchés ici (seuls les champs
// listés dans patchFields sont modifiés, jamais un createOrReplace du document entier).
//
// Toutes les écritures sont regroupées dans une seule transaction Sanity : peu importe le
// nombre de lignes synchronisées, ça ne déclenche qu'un seul webhook de revalidation côté site
// (cf incident ISR writes Vercel — une écriture par ligne aurait reproduit le même problème).
//
// Côté Apps Script, seules les lignes dont le contenu a changé depuis la dernière synchro sont
// envoyées (empreinte stockée dans une colonne "Sync (auto)" du Sheet) — "row" dans chaque ligne
// reçue ici est donc le vrai numéro de ligne dans le Sheet, pas une position dans ce tableau.

type SheetRow = {
  row?: number // numéro de ligne réel dans le Sheet, fourni par Apps Script (synchro partielle : seules les lignes modifiées sont envoyées)
  nom?: string
  typeArticle?: string
  region?: string
  appellation?: string
  bio?: boolean
  biodynamie?: boolean
  nature?: boolean
  terravitisHve?: boolean
  raisonnee?: boolean
  description?: string
}

// Valeurs brutes de la colonne "Type article" du Sheet → valeur typeArticle Sanity.
// Quand une nouvelle valeur apparaît dans le Sheet et n'est pas reconnue, elle ressort en
// erreur de synchro (voir "Type article … inconnu" plus bas) : l'ajouter ici, rattachée à une
// catégorie Sanity existante quand c'est possible (ex. les boissons sans alcool → "soft").
const TYPE_ARTICLE_MAP: Record<string, string> = {
  VIN: 'vin',
  CHAMPAGNE: 'champagne',
  EFFERVESCENT: 'effervescent',
  BIERES: 'bieres',
  BIÈRES: 'bieres',
  RHUM: 'rhum',
  GIN: 'gin',
  ARMAGNAC: 'armagnac',
  WHISKY: 'whisky-bourbon',
  'WHISKY-BOURBON': 'whisky-bourbon',
  BOURBON: 'whisky-bourbon',
  SPIRITUEUX: 'spiritueux',
  SOFT: 'soft',
  TONIC: 'tonic',
  'APERITIF SANS ALCOOL': 'soft',
  'APÉRITIF SANS ALCOOL': 'soft',
  'BOISSONS SANS ALCOOL': 'soft',
  'BOISSON SANS ALCOOL': 'soft',
  EPICERIE: 'epicerie',
  ÉPICERIE: 'epicerie',
}

function slugify(input: string): string {
  return input
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // enlève les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.CATALOGUE_SYNC_SECRET || secret !== process.env.CATALOGUE_SYNC_SECRET) {
    return Response.json({ success: false, message: 'Secret invalide ou manquant' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const rows: SheetRow[] | undefined = body?.rows

  if (!Array.isArray(rows)) {
    return Response.json({ success: false, message: 'Corps de requête invalide : "rows" doit être un tableau.' }, { status: 400 })
  }

  const errors: { row: number; message: string }[] = []
  const toSync: { id: string; nom: string; slug: string; typeArticle: string; patchFields: Record<string, unknown> }[] = []
  const seenSlugs = new Set<string>()

  rows.forEach((row, i) => {
    const line = row.row ?? i + 2 // ligne réelle dans le Sheet (1 = en-têtes) — fournie par Apps Script
    const nom = row.nom?.trim()

    if (!nom) {
      errors.push({ row: line, message: 'Nom catalogue manquant — ligne ignorée.' })
      return
    }

    const typeRaw = row.typeArticle?.trim().toUpperCase()
    const typeArticle = typeRaw ? TYPE_ARTICLE_MAP[typeRaw] : undefined
    if (typeRaw && !typeArticle) {
      errors.push({ row: line, message: `"${nom}" : Type article "${row.typeArticle}" inconnu — ligne ignorée. Types valides : ${Object.keys(TYPE_ARTICLE_MAP).join(', ')}.` })
      return
    }
    if (!typeArticle) {
      errors.push({ row: line, message: `"${nom}" : Type article manquant — ligne ignorée.` })
      return
    }

    // Même nom + même type = doublon. Même nom mais type différent (ex. un domaine qui produit
    // à la fois un vin et un rhum) = deux fiches distinctes, légitimes.
    const slug = slugify(`${nom}-${typeArticle}`)
    if (seenSlugs.has(slug)) {
      errors.push({ row: line, message: `Doublon détecté pour "${nom}" (même nom et même type qu'une ligne précédente) — ligne ignorée.` })
      return
    }
    seenSlugs.add(slug)

    const certifications = [
      row.bio && 'bio',
      row.biodynamie && 'biodynamie',
      row.nature && 'nature',
      row.terravitisHve && 'terravitis-hve',
      row.raisonnee && 'raisonnee',
    ].filter((c): c is string => Boolean(c))

    toSync.push({
      id: `producteur.sheet-${slug}`,
      nom,
      slug,
      typeArticle,
      patchFields: {
        name: nom,
        slug: { _type: 'slug', current: slug },
        typeArticle,
        region: row.region?.trim() || undefined,
        appellationPrincipale: row.appellation?.trim() || undefined,
        certifications,
        description: row.description?.trim()
          ? [{ _type: 'block', style: 'normal', children: [{ _type: 'span', text: row.description.trim() }] }]
          : [],
      },
    })
  })

  if (toSync.length === 0) {
    return Response.json({ success: false, message: 'Aucune ligne valide à synchroniser.', errors }, { status: 400 })
  }

  // Un seul read pour savoir quels documents existent déjà (juste pour un décompte créés/mis à jour lisible par Delphine).
  const existingIds = new Set<string>(
    await writeClient.fetch<string[]>(
      `*[_type == "producteur" && _id in $ids]._id`,
      { ids: toSync.map((p) => p.id) }
    )
  )

  const tx = writeClient.transaction()
  for (const p of toSync) {
    tx.createIfNotExists({
      _id: p.id,
      _type: 'producteur',
      name: p.nom,
      slug: { _type: 'slug', current: p.slug },
      typeArticle: p.typeArticle,
    })
    tx.patch(p.id, (patch) => patch.set(p.patchFields))
  }

  try {
    await tx.commit()
  } catch (err) {
    return Response.json({
      success: false,
      message: `Échec de l'écriture dans Sanity : ${err instanceof Error ? err.message : String(err)}`,
      errors,
    }, { status: 500 })
  }

  const created = toSync.filter((p) => !existingIds.has(p.id)).length
  const updated = toSync.length - created

  return Response.json({
    success: true,
    synced: toSync.length,
    created,
    updated,
    errors,
  })
}
