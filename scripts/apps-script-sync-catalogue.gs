/**
 * À coller dans le Google Sheet de Delphine : Extensions > Apps Script.
 * Ajoute un menu "Vin'Aroha" > "Synchroniser avec le site" dans la barre du Sheet.
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

  const rows = data.slice(1)
    .filter((r) => String(r[idx.nom]).trim() !== '')
    .map((r) => ({
      nom: String(r[idx.nom]).trim(),
      typeArticle: String(r[idx.typeArticle]).trim(),
      region: String(r[idx.region]).trim(),
      appellation: String(r[idx.appellation]).trim(),
      bio: String(r[idx.bio]).trim().toLowerCase() === 'x',
      biodynamie: String(r[idx.biodynamie]).trim().toLowerCase() === 'x',
      nature: String(r[idx.nature]).trim().toLowerCase() === 'x',
      terravitisHve: String(r[idx.terravitisHve]).trim().toLowerCase() === 'x',
      raisonnee: String(r[idx.raisonnee]).trim().toLowerCase() === 'x',
      description: String(r[idx.description]).trim(),
    }))

  if (rows.length === 0) {
    ui.alert('Aucune ligne avec un nom renseigné — rien à synchroniser.')
    return
  }

  const response = UrlFetchApp.fetch(`${SITE_URL}/api/sync-catalogue?secret=${encodeURIComponent(SYNC_SECRET)}`, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ rows }),
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

  let message = `✅ ${result.synced} produit(s) synchronisé(s)\n` +
    `— ${result.created} créé(s), ${result.updated} mis à jour\n`

  if (result.errors && result.errors.length > 0) {
    message += `\n⚠️ ${result.errors.length} ligne(s) ignorée(s) :\n`
    message += result.errors.slice(0, 15).map((e) => `Ligne ${e.row} : ${e.message}`).join('\n')
    if (result.errors.length > 15) message += `\n… et ${result.errors.length - 15} de plus.`
  }

  ui.alert(message)
}
