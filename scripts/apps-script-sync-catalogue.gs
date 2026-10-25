/**
 * À coller dans le Google Sheet de Delphine : Extensions > Apps Script.
 * Ajoute un menu "Vin'Aroha" > "Synchroniser avec le site" dans la barre du Sheet.
 *
 * Ne synchronise que les lignes modifiées depuis la dernière synchro : une colonne
 * "Sync (auto)" est ajoutée/gérée automatiquement à la fin du tableau pour mémoriser
 * l'état déjà envoyé de chaque ligne (empreinte du contenu). Ne pas modifier cette colonne
 * à la main — elle sert uniquement au script.
 *
 * Avant d'utiliser :
 * 1. Remplacer SITE_URL ci-dessous par l'URL réelle du site (vinaroha.com tant que le DNS
 *    n'est pas basculé sur Vercel, utiliser l'URL *.vercel.app de la prod à la place).
 * 2. Remplacer SYNC_SECRET par la valeur de CATALOGUE_SYNC_SECRET (voir .env.local).
 * 3. Adapter SHEET_NAME si l'onglet ne s'appelle pas "Feuille 1".
 */

const SITE_URL = 'https://vinaroha.vercel.app' // à remplacer par https://vinaroha.com une fois le DNS basculé sur Vercel
const SYNC_SECRET = 'COLLER_ICI_LE_SECRET'
const SHEET_NAME = 'Feuille 1'
const SYNC_COLUMN_HEADER = 'Sync (auto)'

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Vin'Aroha")
    .addItem('Synchroniser avec le site', 'syncCatalogue')
    .addToUi()
}

// Normalise un en-tête de colonne pour matcher sans se soucier des accents/majuscules.
function normalizeHeader_(h) {
  return String(h)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

// Empreinte courte et stable du contenu d'une ligne, pour détecter si elle a changé.
function hashRow_(values) {
  const raw = values.join('|')
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, raw, Utilities.Charset.UTF_8)
  return digest.map((b) => (b < 0 ? b + 256 : b).toString(16).padStart(2, '0')).join('')
}

function syncCatalogue() {
  const ui = SpreadsheetApp.getUi()
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
  if (!sheet) {
    ui.alert(`Onglet "${SHEET_NAME}" introuvable.`)
    return
  }

  const data = sheet.getDataRange().getValues()
  const headers = data[0].map(normalizeHeader_)

  const col = (name) => headers.indexOf(normalizeHeader_(name))
  const idx = {
    nom: col('Nom catalogue'),
    typeArticle: col('Type article'),
    region: col('REGION'),
    appellation: col('APPELLATION PRINCIPALE'),
    bio: col('BIo'),
    biodynamie: col('Biodynamie'),
    nature: col('Nature'),
    terravitisHve: col('Terra vitis/HVE'),
    raisonnee: col('Raisonnee'),
    description: col('Descriptif domaine'),
  }

  const missing = Object.keys(idx).filter((k) => idx[k] === -1)
  if (missing.length > 0) {
    ui.alert(`Colonnes introuvables dans l'en-tête : ${missing.join(', ')}. Vérifie les intitulés de colonnes.`)
    return
  }

  // Colonne de suivi "Sync (auto)" : on la crée à la fin du tableau si elle n'existe pas encore.
  let syncColIndex = col(SYNC_COLUMN_HEADER)
  if (syncColIndex === -1) {
    syncColIndex = headers.length
    sheet.getRange(1, syncColIndex + 1).setValue(SYNC_COLUMN_HEADER)
  }

  const fieldIdx = [
    idx.nom, idx.typeArticle, idx.region, idx.appellation,
    idx.bio, idx.biodynamie, idx.nature, idx.terravitisHve, idx.raisonnee, idx.description,
  ]

  const toSend = [] // { row, payload }
  for (let r = 1; r < data.length; r++) {
    const line = data[r]
    const nom = String(line[idx.nom] || '').trim()
    if (!nom) continue

    const currentHash = hashRow_(fieldIdx.map((i) => line[i]))
    const storedHash = String(line[syncColIndex] || '')
    if (currentHash === storedHash) continue // ligne inchangée depuis la dernière synchro

    toSend.push({
      sheetRow: r + 1, // numéro réel 1-indexé dans le Sheet
      hash: currentHash,
      payload: {
        row: r + 1,
        nom,
        typeArticle: String(line[idx.typeArticle] || '').trim(),
        region: String(line[idx.region] || '').trim(),
        appellation: String(line[idx.appellation] || '').trim(),
        bio: String(line[idx.bio] || '').trim().toLowerCase() === 'x',
        biodynamie: String(line[idx.biodynamie] || '').trim().toLowerCase() === 'x',
        nature: String(line[idx.nature] || '').trim().toLowerCase() === 'x',
        terravitisHve: String(line[idx.terravitisHve] || '').trim().toLowerCase() === 'x',
        raisonnee: String(line[idx.raisonnee] || '').trim().toLowerCase() === 'x',
        description: String(line[idx.description] || '').trim(),
      },
    })
  }

  if (toSend.length === 0) {
    ui.alert('Aucune modification détectée depuis la dernière synchro — rien à envoyer.')
    return
  }

  const response = UrlFetchApp.fetch(`${SITE_URL}/api/sync-catalogue?secret=${encodeURIComponent(SYNC_SECRET)}`, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ rows: toSend.map((s) => s.payload) }),
    muteHttpExceptions: true,
  })

  const code = response.getResponseCode()
  let result
  try {
    result = JSON.parse(response.getContentText())
  } catch (e) {
    ui.alert(`Réponse illisible du serveur (code ${code}) :\n${response.getContentText().slice(0, 500)}`)
    return
  }

  if (code !== 200 || !result.success) {
    ui.alert(`Échec de la synchro : ${result.message || 'erreur inconnue'}`)
    return
  }

  // Marque comme synchronisées (met à jour la colonne "Sync (auto)") toutes les lignes envoyées
  // SAUF celles qui ont été ignorées par le serveur (erreurs) : elles seront retentées au prochain lancement.
  const erroredRows = new Set((result.errors || []).map((e) => e.row))
  toSend.forEach((s) => {
    if (erroredRows.has(s.sheetRow)) return
    sheet.getRange(s.sheetRow, syncColIndex + 1).setValue(s.hash)
  })

  let message = `✅ ${toSend.length} ligne(s) modifiée(s) détectée(s), ${result.synced} synchronisée(s)\n` +
    `— ${result.created} créé(s), ${result.updated} mis à jour\n`

  if (result.errors && result.errors.length > 0) {
    message += `\n⚠️ ${result.errors.length} ligne(s) ignorée(s) (seront retentées au prochain lancement) :\n`
    message += result.errors.slice(0, 15).map((e) => `Ligne ${e.row} : ${e.message}`).join('\n')
    if (result.errors.length > 15) message += `\n… et ${result.errors.length - 15} de plus.`
  }

  ui.alert(message)
}
