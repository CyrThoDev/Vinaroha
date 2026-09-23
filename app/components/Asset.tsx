import fs from 'fs'
import path from 'path'
import type { ReactNode } from 'react'

const ASSETS = {
  leaf:         'leaf.svg',
  glass:        'glass.svg',
  bouteille:    'bouteille.svg',
  bouteillevin: 'bouteillevin.svg',
  beer:         'beer.svg',
  spirit:       'spirit.svg',
  bulles:       'bulles.svg',
  soft:         'soft.svg',
  grapes:       'grapes.svg',
  gift:         'gift.svg',
  box:          'box.svg',
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
  children,
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
  /** Contenu React (ex: une carte interactive) clippé dans la forme du SVG, à la place d'une couleur ou d'une image statique */
  children?: ReactNode
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

  if (children) {
    // Clippe du contenu React vivant (ex: une carte interactive) à la forme du SVG.
    // On ne peut pas réutiliser le SVG mis à l'échelle (comme pour une image) : un contenu
    // interactif comme Leaflet mesure sa propre taille en pixels réels, et un
    // <foreignObject> dans un SVG étiré (preserveAspectRatio="none") applique un facteur
    // d'échelle non-uniforme qui désynchronise sa taille visuelle de sa taille mesurée en JS
    // (boutons de zoom minuscules, coordonnées de clic fausses). On normalise donc le path du
    // clipPath en coordonnées relatives (0..1) et on l'applique en CSS clip-path directement
    // sur le contenu, à sa vraie taille — sans jamais mettre le contenu à l'échelle.
    const viewBoxAttr = svg.match(/viewBox="([^"]*)"/)?.[1] ?? '0 0 1500 1500'
    const [, , vbWidthStr, vbHeightStr] = viewBoxAttr.split(/\s+/)
    const vbWidth = parseFloat(vbWidthStr) || 1500
    const vbHeight = parseFloat(vbHeightStr) || 1500
    const clipId = svg.match(/<g clip-path="url\(#([^)]+)\)"/)?.[1]
    const clipBlock = clipId
      ? svg.match(new RegExp(`<clipPath id="${clipId}">([\\s\\S]*?)</clipPath>`))?.[1]
      : undefined
    const combinedD = clipBlock
      ? [...clipBlock.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map(m => m[1]).join(' ')
      : ''
    // Notre normalisation suppose des coordonnées toujours par paires (x, y) : valable pour
    // M/L/C/S/Q/T mais pas pour H/V/A (paramètres asymétriques) — on ne clippe pas dans ce cas.
    const canNormalize = combinedD.length > 0 && !/[HVAhva]/.test(combinedD)

    if (canNormalize) {
      let isX = true
      const normalizedD = combinedD.replace(/-?\d+\.?\d*/g, (num) => {
        const value = parseFloat(num) / (isX ? vbWidth : vbHeight)
        isX = !isX
        return value.toFixed(6)
      })
      const uid = Math.random().toString(36).slice(2, 10)
      const boxClipId = `asset-clip-${uid}`

      return (
        <div className={className} style={{ position: 'relative' }}>
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
            <defs>
              <clipPath id={boxClipId} clipPathUnits="objectBoundingBox">
                <path d={normalizedD} />
              </clipPath>
            </defs>
          </svg>
          <div style={{ width: '100%', height: '100%', clipPath: `url(#${boxClipId})` }}>
            {children}
          </div>
        </div>
      )
    }

    // Repli : forme non normalisable (H/V/A) → on ne clippe pas, on affiche le contenu tel quel.
    return <div className={className}>{children}</div>
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

  // Rend les id (clipPath, etc.) uniques : sans ça, plusieurs instances du même
  // asset sur une page partagent le même id et certains navigateurs ne résolvent
  // alors le clip-path que pour l'une d'entre elles (les autres restent non-clippées).
  const uid = Math.random().toString(36).slice(2, 10)
  const ids = [...new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]))]
  for (const id of ids) {
    svg = svg.replaceAll(`id="${id}"`, `id="${id}-${uid}"`)
    svg = svg.replaceAll(`url(#${id})`, `url(#${id}-${uid})`)
    svg = svg.replaceAll(`xlink:href="#${id}"`, `xlink:href="#${id}-${uid}"`)
    svg = svg.replaceAll(`href="#${id}"`, `href="#${id}-${uid}"`)
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
