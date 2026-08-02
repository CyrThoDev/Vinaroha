import { SHAPES, type ShapeVariant } from './shapes'

const BRAND_COLORS: Record<string, string> = {
  orange: '#c85912',
  vert: '#357d4f',
  jaune: '#EBB132',
}

export interface FormeDecorative {
  variante: ShapeVariant
  remplissage: 'couleur' | 'image'
  couleur?: string
  image?: { asset?: { url: string } }
}

export function Shape({
  variant,
  fill,
  imageUrl,
  className,
  id,
}: {
  variant: ShapeVariant
  fill?: string
  imageUrl?: string
  className?: string
  id?: string
}) {
  const shape = SHAPES[variant]
  const clipId = `shape-${variant}-${id ?? 'default'}`

  return (
    <svg className={className} width="100%" height="100%" viewBox={shape.viewBox} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform={shape.transform}>
        {imageUrl && (
          <defs>
            <clipPath id={clipId}>
              <path d={shape.path} />
            </clipPath>
          </defs>
        )}
        <path d={shape.path} fill={imageUrl ? 'none' : (fill ?? BRAND_COLORS.orange)} />
        {imageUrl && (
          <image
            href={imageUrl}
            x="91" y="280" width="413" height="195"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        )}
      </g>
    </svg>
  )
}

/** Renders a `formeDecorative` Sanity object directly. */
export function FormeShape({
  forme,
  variant,
  className,
  id,
}: {
  forme?: FormeDecorative | null
  variant: ShapeVariant
  className?: string
  id?: string
}) {
  if (!forme) return <Shape variant={variant} className={className} id={id} />

  if (forme.remplissage === 'image' && forme.image?.asset?.url) {
    return <Shape variant={variant} imageUrl={forme.image.asset.url} className={className} id={id} />
  }

  return <Shape variant={variant} fill={BRAND_COLORS[forme.couleur ?? 'orange']} className={className} id={id} />
}
