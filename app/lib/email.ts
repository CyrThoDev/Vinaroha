// Gabarit d'email transactionnel : structure en tableaux + CSS inline uniquement,
// pas de SVG ni de police custom, pour un rendu fiable sur Outlook/Gmail/Apple Mail/etc.

const COLORS = {
  orange: '#D25200',
  green: '#357d4f',
  yellow: '#EBB132',
  cream: '#FCF7EA',
  dark: '#232526',
}

// Pile de polices système "modernes" : chaque client mail affiche sa police native
// (Segoe UI sur Outlook/Windows, Roboto sur Gmail Android, Helvetica Neue sur Apple Mail/iOS),
// avec Arial en dernier repli universel. Pas de police custom chargée à distance.
const FONT = "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function nl2br(value: string): string {
  return value.replace(/\n/g, '<br/>')
}

export type EmailRow = { label: string; value: string }

export type EmailLayoutOptions = {
  preheader?: string
  eyebrow?: string
  title: string
  intro?: string
  rows?: EmailRow[]
  message?: { label: string; value: string }
  outro?: string
  ctaLabel?: string
  ctaUrl?: string
}

export function renderEmailLayout({
  preheader,
  eyebrow,
  title,
  intro,
  rows,
  message,
  outro,
  ctaLabel,
  ctaUrl,
}: EmailLayoutOptions): string {
  const rowsHtml = rows && rows.length > 0
    ? rows.map(r => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eadfc7;font-family:${FONT};font-size:13px;color:#8a8a8a;width:150px;vertical-align:top;white-space:nowrap;">${escapeHtml(r.label)}</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #eadfc7;font-family:${FONT};font-size:14px;color:${COLORS.dark};font-weight:bold;vertical-align:top;">${r.value}</td>
        </tr>`).join('')
    : ''

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.cream};">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>` : ''}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cream};padding:24px 0;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background-color:${COLORS.orange};padding:26px 24px;text-align:center;">
            <span style="font-family:${FONT};font-size:20px;font-weight:bold;letter-spacing:2px;color:#ffffff;text-transform:uppercase;">&#127863; Vin&#39;Aroha</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 28px;">
            ${eyebrow ? `<p style="margin:0 0 8px;font-family:${FONT};font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${COLORS.green};">${escapeHtml(eyebrow)}</p>` : ''}
            <h1 style="margin:0 0 16px;font-family:${FONT};font-size:23px;line-height:1.3;color:${COLORS.dark};">${escapeHtml(title)}</h1>
            ${intro ? `<p style="margin:0 0 20px;font-family:${FONT};font-size:15px;line-height:1.6;color:#4b4b4b;">${intro}</p>` : ''}
            ${rowsHtml ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:${message ? '20' : '4'}px;">${rowsHtml}</table>` : ''}
            ${message ? `
            <p style="margin:20px 0 6px;font-family:${FONT};font-size:13px;font-weight:bold;color:#8a8a8a;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(message.label)}</p>
            <div style="background-color:${COLORS.cream};border-left:3px solid ${COLORS.yellow};padding:14px 18px;border-radius:6px;font-family:${FONT};font-size:14px;line-height:1.6;color:#4b4b4b;">${message.value}</div>` : ''}
            ${ctaLabel && ctaUrl ? `
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
              <tr>
                <td style="border-radius:8px;background-color:${COLORS.green};">
                  <a href="${ctaUrl}" style="display:inline-block;padding:12px 26px;font-family:${FONT};font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(ctaLabel)}</a>
                </td>
              </tr>
            </table>` : ''}
            ${outro ? `<p style="margin:24px 0 0;font-family:${FONT};font-size:15px;line-height:1.6;color:#4b4b4b;">${outro}</p>` : ''}
          </td>
        </tr>
        <tr>
          <td style="background-color:${COLORS.dark};padding:20px 24px;text-align:center;">
            <p style="margin:0 0 4px;font-family:${FONT};font-size:12px;color:#ffffff;">Vin&#39;Aroha &middot; 10 Rue de la Poste, Halles Mimizan-Plage</p>
            <p style="margin:0;font-family:${FONT};font-size:12px;">
              <a href="mailto:contact@vinaroha.com" style="color:${COLORS.yellow};text-decoration:none;">contact@vinaroha.com</a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

export function renderEmailText({
  title,
  intro,
  rows,
  message,
  outro,
}: {
  title: string
  intro?: string
  rows?: EmailRow[]
  message?: { label: string; value: string }
  outro?: string
}): string {
  const lines = [title, '']
  if (intro) lines.push(intro.replace(/<[^>]+>/g, ''), '')
  if (rows) {
    for (const r of rows) lines.push(`${r.label} : ${r.value.replace(/<[^>]+>/g, '')}`)
    lines.push('')
  }
  if (message) {
    lines.push(`${message.label} :`, message.value.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, ''), '')
  }
  if (outro) lines.push(outro.replace(/<[^>]+>/g, ''))
  lines.push('', "Vin'Aroha · 10 Rue de la Poste, Halles Mimizan-Plage · contact@vinaroha.com")
  return lines.join('\n')
}

export { nl2br }
