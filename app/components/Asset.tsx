import fs from 'fs'
import path from 'path'

const ASSETS = {
  leaf:         'leaf.svg',
  glass:        'glass.svg',
  gift:         'gift.svg',
  square:       'square.svg',
  topandbottom: 'topandbottom.svg',
  logo2:        'logo-2.svg',
} as const

export type AssetName = keyof typeof ASSETS

export function Asset({
  name,
  color,
  imageUrl,
  className,
  alt = '',
}: {
  name: AssetName
  /** Remplace toutes les couleurs du SVG par cette valeur (ex: "#ffffff") */
  color?: string
  /** Remplace le fill par une image (le SVG clip la photo à sa forme) */
  imageUrl?: string
  className?: string
  alt?: string
}) {
  const filePath = path.join(process.cwd(), 'public/assets', ASSETS[name])
  let svg = fs.readFileSync(filePath, 'utf-8')

  if (imageUrl) {
    // Remplace le(s) path coloré(s) par un élément <image> : les clipPaths du SVG découpent l'image à la forme
    svg = svg.replace(
      /<path fill="#[0-9a-fA-F]{6}" d="[^"]*" fill-opacity="[^"]*" fill-rule="nonzero"\/>/g,
      `<image href="${imageUrl}" x="0" y="0" width="1154" height="1501" preserveAspectRatio="xMidYMid slice" />`
    )
  } else if (color) {
    svg = svg.replace(/fill="#[0-9a-fA-F]{6}"/g, `fill="${color}"`)
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
