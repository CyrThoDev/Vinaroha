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
  id?: string // identifiant stable assigné une fois pour toutes par Apps Script à cette ligne — ne change jamais, même si le nom est modifié
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

type ExistingDoc = {
  _id: string
  name?: string
  typeArticle?: string
  region?: string
  appellationPrincipale?: string
  certifications?: string[]
  description?: Array<{ children?: Array<{ text?: string }> }>
}

// Détecte les régions "presque identiques" (même texte une fois les accents/tirets/espaces
// neutralisés) mais orthographiées différemment — ex: "Sud-Ouest" vs "Sud Ouest", ou les 3
// variantes de "Nouvelle-Zélande" qu'on a trouvées dans le catalogue, qui fragmentaient le
// filtre région du site en plusieurs catégories au lieu d'une seule.
function normalizeRegion(s: string): string {
  return s
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[-\s]+/g, ' ')
    .trim()
}

function descriptionText(doc: ExistingDoc | undefined): string {
  return (doc?.description ?? [])
    .map((block) => (block.children ?? []).map((c) => c.text ?? '').join(''))
    .join('\n\n')
    .trim()
}

// Compare l'état actuel du document Sanity (avant écriture) aux champs qui vont être écrits, pour
// que Delphine voie précisément ce qu'une synchro va changer avant de la valider (étape de
// prévisualisation) — jamais juste "X lignes modifiées" sans savoir quoi.
function buildFieldChanges(old: ExistingDoc | undefined, p: {
  nom: string
  typeArticle: string
  patchFields: Record<string, unknown>
}): string[] {
  const changes: string[] = []

  if ((old?.name ?? '') !== p.nom) {
    changes.push(`nom : "${old?.name || '—'}" → "${p.nom}"`)
  }
  if ((old?.typeArticle ?? '') !== p.typeArticle) {
    changes.push(`type : "${old?.typeArticle || '—'}" → "${p.typeArticle}"`)
  }
  const newRegion = (p.patchFields.region as string) || ''
  if ((old?.region ?? '') !== newRegion) {
    changes.push(`région : "${old?.region || '—'}" → "${newRegion || '—'}"`)
  }
  const newAppellation = (p.patchFields.appellationPrincipale as string) || ''
  if ((old?.appellationPrincipale ?? '') !== newAppellation) {
    changes.push(`appellation : "${old?.appellationPrincipale || '—'}" → "${newAppellation || '—'}"`)
  }

  const oldCerts = new Set(old?.certifications ?? [])
  const newCerts = new Set((p.patchFields.certifications as string[]) ?? [])
  const added = [...newCerts].filter((c) => !oldCerts.has(c))
  const removed = [...oldCerts].filter((c) => !newCerts.has(c))
  if (added.length > 0 || removed.length > 0) {
    const parts = [...added.map((c) => `+${c}`), ...removed.map((c) => `-${c}`)]
    changes.push(`certifications : ${parts.join(' ')}`)
  }

  const oldDesc = descriptionText(old)
  const newDescBlocks = (p.patchFields.description as Array<{ children: Array<{ text: string }> }>) ?? []
  const newDesc = newDescBlocks.map((b) => b.children.map((c) => c.text).join('')).join('\n\n').trim()
  if (oldDesc !== newDesc) {
    changes.push('description modifiée')
  }

  return changes
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.CATALOGUE_SYNC_SECRET || secret !== process.env.CATALOGUE_SYNC_SECRET) {
    return Response.json({ success: false, message: 'Secret invalide ou manquant' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const rows: SheetRow[] | undefined = body?.rows
  const dryRun = Boolean(body?.dryRun)

  if (!Array.isArray(rows)) {
    return Response.json({ success: false, message: 'Corps de requête invalide : "rows" doit être un tableau.' }, { status: 400 })
  }

  const errors: { row: number; message: string }[] = []
  const toSync: { row: number; id: string; docKey: string; nom: string; slug: string; typeArticle: string; patchFields: Record<string, unknown> }[] = []
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

    // Même nom + même type = doublon probable (erreur de saisie dans le Sheet) → signalé, ligne ignorée.
    const nameTypeKey = slugify(`${nom}-${typeArticle}`)
    if (seenSlugs.has(nameTypeKey)) {
      errors.push({ row: line, message: `Doublon détecté pour "${nom}" (même nom et même type qu'une ligne précédente) — ligne ignorée.` })
      return
    }
    seenSlugs.add(nameTypeKey)

    const certifications = [
      row.bio && 'bio',
      row.biodynamie && 'biodynamie',
      row.nature && 'nature',
      row.terravitisHve && 'terravitis-hve',
      row.raisonnee && 'raisonnee',
    ].filter((c): c is string => Boolean(c))

    // L'identité du document Sanity (_id) doit être stable même si le nom change dans le Sheet —
    // on utilise l'id permanent assigné par Apps Script à la ligne, pas un slug dérivé du nom
    // (sinon renommer un produit créerait une nouvelle fiche au lieu de mettre à jour l'existante).
    const docKey = row.id?.trim() || nameTypeKey
    // Le slug (URL de la fiche) reprend l'identifiant nom+type, pas juste le nom : deux fiches
    // d'un même domaine (ex: Vin + Armagnac) ont forcément des types différents donc des ids —
    // et donc des slugs — distincts. slugify(nom) seul créait des collisions (ex: les fiches Vin
    // et Armagnac de "Château Monluc" avaient toutes les deux le slug "chateau-monluc").
    const slug = docKey

    toSync.push({
      row: line,
      id: `producteur.sheet-${docKey}`,
      docKey,
      nom,
      slug,
      typeArticle,
      patchFields: {
        name: nom,
        slug: { _type: 'slug', current: slug },
        typeArticle,
        // "|| ''" et non "|| undefined" : un champ undefined est supprimé par JSON.stringify
        // avant l'envoi à Sanity, donc .set() l'ignore silencieusement et l'ancienne valeur
        // reste en place — vider la cellule dans le Sheet ne l'aurait alors jamais effacée ici.
        region: row.region?.trim() || '',
        appellationPrincipale: row.appellation?.trim() || '',
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

  // Lecture complète (pas juste l'id) des documents existants : nécessaire pour construire le
  // diff champ par champ affiché à Delphine en prévisualisation (dryRun) avant toute écriture.
  const existingDocs = await writeClient.fetch<ExistingDoc[]>(
    `*[_type == "producteur" && _id in $ids]{_id, name, typeArticle, region, appellationPrincipale, certifications, description}`,
    { ids: toSync.map((p) => p.id) }
  )
  const existingById = new Map(existingDocs.map((d) => [d._id, d]))

  // Toutes les régions déjà utilisées ailleurs dans le catalogue (tous producteurs, pas
  // seulement ceux de cette synchro), pour repérer une orthographe différente d'une région
  // qui existe déjà — sans ça, "Sud-Ouest" et "Sud Ouest" cohabitent et fragmentent le filtre
  // région du site en plusieurs catégories au lieu d'une seule.
  const allRegions = await writeClient.fetch<string[]>(
    `array::unique(*[_type == "producteur" && defined(region)].region)`
  )
  const regionsByNorm = new Map<string, Set<string>>()
  for (const r of allRegions) {
    const norm = normalizeRegion(r)
    if (!regionsByNorm.has(norm)) regionsByNorm.set(norm, new Set())
    regionsByNorm.get(norm)!.add(r)
  }

  const warnings: { row: number; message: string }[] = []
  for (const p of toSync) {
    const region = (p.patchFields.region as string) || ''
    if (!region) continue
    const norm = normalizeRegion(region)
    const known = regionsByNorm.get(norm)
    if (known && !known.has(region)) {
      warnings.push({
        row: p.row,
        message: `"${p.nom}" : la région "${region}" ressemble à "${[...known].join('" / "')}" déjà utilisée ailleurs dans le catalogue — vérifie l'orthographe dans le Sheet avant de valider.`,
      })
    }
  }

  const changes = toSync.map((p) => {
    const old = existingById.get(p.id)
    return old
      ? { row: p.row, nom: p.nom, kind: 'updated' as const, fields: buildFieldChanges(old, p) }
      : { row: p.row, nom: p.nom, kind: 'created' as const, fields: [`type : ${p.typeArticle}`, ...(p.patchFields.region ? [`région : ${p.patchFields.region}`] : [])] }
  })
  const created = toSync.filter((p) => !existingById.has(p.id)).length
  const updated = toSync.length - created

  // Prévisualisation : on calcule et renvoie le diff sans jamais toucher à Sanity, pour que
  // Delphine puisse valider ou annuler avant qu'une seule ligne ne soit réellement écrite.
  if (dryRun) {
    return Response.json({
      success: true,
      dryRun: true,
      totalRows: toSync.length,
      created,
      updated,
      errors,
      warnings,
      changes,
    })
  }

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

  return Response.json({
    success: true,
    synced: toSync.length,
    created,
    updated,
    errors,
    warnings,
    changes,
    // Pour chaque ligne traitée avec succès, l'id permanent à mémoriser côté Sheet (colonne
    // "ID (auto)") — garantit que les prochaines synchros de cette ligne mettront à jour la
    // même fiche Sanity même si le nom change.
    syncedRows: toSync.map((p) => ({ row: p.row, id: p.docKey })),
  })
}
