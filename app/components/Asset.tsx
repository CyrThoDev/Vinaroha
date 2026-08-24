import fs from 'fs'
import path from 'path'

const ASSETS = {
  leaf:         'leaf.svg',
  glass:        'glass.svg',
  bouteille:    'bouteille.svg',
  bouteillevin: 'bouteillevin.svg',
  beer:         'beer.svg',
  spirit:       'spirit.svg',
  grapes:       'grapes.svg',
  gift:         'gift.svg',
  square:       'square.svg',
  rounded:      'rounded.svg',
  rectangle:    'rectangle.svg',
  topandbottom: 'topandbottom.svg',
  logo2:        'logo-2.svg',
} as const

export type AssetName = keyof typeof ASSETS

export function Asset({
  name,
  color,
  color2,
  imageUrl,
  stretchToFill,
  cover,
  className,
  alt = '',
}: {
  name: AssetName
  /** Remplace la 1re couleur du SVG (ex: "#357d4f") */
  color?: string
  /** Remplace la 2e couleur unique du SVG (ex: "#EBB132") */
  color2?: string
  /** Remplace le fill par une image (le SVG clip la photo à sa forme) */
  imageUrl?: string
  /** Force le SVG à s'étirer pour remplir son container (déforme la forme si le ratio diffère) */
  stretchToFill?: boolean
  /** Redimensionne le SVG à l'échelle (sans déformation) pour remplir son container, quitte à rogner les bords */
  cover?: boolean
  className?: string
  alt?: string
}) {
  const filePath = path.join(process.cwd(), 'public/assets', ASSETS[name])
  let svg = fs.readFileSync(filePath, 'utf-8')

  if (stretchToFill) {
    if (/preserveAspectRatio="/.test(svg)) {
      svg = svg.replace(/preserveAspectRatio="[^"]*"/, 'preserveAspectRatio="none"')
    } else {
      svg = svg.replace(/<svg([^>]*)>/, '<svg$1 preserveAspectRatio="none">')
    }
    svg = svg.replace(/(<svg[^>]*)\s+width="[^"]*"/, '$1 width="100%"')
    svg = svg.replace(/(<svg[^>]*)\s+height="[^"]*"/, '$1 height="100%"')
  } else if (cover) {
    if (/preserveAspectRatio="/.test(svg)) {
      svg = svg.replace(/preserveAspectRatio="[^"]*"/, 'preserveAspectRatio="xMidYMid slice"')
    } else {
      svg = svg.replace(/<svg([^>]*)>/, '<svg$1 preserveAspectRatio="xMidYMid slice">')
    }
    svg = svg.replace(/(<svg[^>]*)\s+width="[^"]*"/, '$1 width="100%"')
    svg = svg.replace(/(<svg[^>]*)\s+height="[^"]*"/, '$1 height="100%"')
  }

  if (imageUrl) {
    // Remplace le(s) path coloré(s) par un élément <image> : les clipPaths du SVG découpent l'image à la forme
    const viewBox = svg.match(/viewBox="[^"]*\s+[^"]*\s+([\d.]+)\s+([\d.]+)"/)
    const [imgWidth, imgHeight] = viewBox ? [viewBox[1], viewBox[2]] : ['1154', '1501']
    svg = svg.replace(
      /<path fill="#[0-9a-fA-F]{6}" d="[^"]*" fill-opacity="[^"]*" fill-rule="nonzero"\/>/g,
      `<image href="${imageUrl}" x="0" y="0" width="${imgWidth}" height="${imgHeight}" preserveAspectRatio="xMidYMid slice" />`
    )
  } else if (color) {
    if (color2) {
      // Remplace chaque couleur unique dans l'ordre d'apparition
      const unique = [...new Set([...svg.matchAll(/fill="#([0-9a-fA-F]{6})"/g)].map(m => m[1]))]
      if (unique[0]) svg = svg.replaceAll(`fill="#${unique[0]}"`, `fill="${color}"`)
      if (unique[1]) svg = svg.replaceAll(`fill="#${unique[1]}"`, `fill="${color2}"`)
    } else {
      svg = svg.replace(/fill="#[0-9a-fA-F]{6}"/g, `fill="${color}"`)
    }
  }

  return (
    <div
      className={className}
      aria-hidden={alt ? undefined : true}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
