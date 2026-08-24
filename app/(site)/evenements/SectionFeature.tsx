import Link from 'next/link'
import { Asset } from '@/app/components/Asset'
import type { EvenementsSection } from '@/sanity/lib/queries'

type SectionFeatureProps = EvenementsSection & {
  imageSide: 'left' | 'right'
}

const COULEUR_HEX: Record<string, string> = {
  yellow: '#EBB132',
  green: '#357d4f',
  orange: '#D25200',
}

const COULEUR_BG: Record<string, string> = {
  yellow: 'bg-yellow',
  green: 'bg-green',
  orange: 'bg-orange',
}

export function SectionFeature({
  badge, couleur = 'yellow', titre, texte, points, ctaLabel, ctaLien, image, imageSide,
}: SectionFeatureProps) {
  const hex = COULEUR_HEX[couleur] ?? COULEUR_HEX.yellow
  const bg = COULEUR_BG[couleur] ?? COULEUR_BG.yellow

  const texteBloc = (
    <div className="flex flex-col gap-4">
      <span className={`inline-block ${bg} text-white rounded-full px-4 py-1 text-xs font-black uppercase  w-fit`}>
        {badge}
      </span>
      <h2 className="font-accent text-3xl md:text-4xl text-zinc-900 leading-none">
        {titre}
      </h2>
      <p className="text-zinc-600 leading-relaxed max-w-md">{texte}</p>

      {points && points.length > 0 && (
        <ul className="flex flex-col gap-3 mt-2">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              <Asset name="leaf" color={hex} className="w-4 mt-1 shrink-0 [&_svg]:w-full [&_svg]:h-auto" />
              <span className="text-zinc-700">{p}</span>
            </li>
          ))}
        </ul>
      )}

      {ctaLabel && (
        <Link
          href={ctaLien ?? '#'}
          className="font-fontjek text-2xl border-b border-zinc-400 pb-1 w-fit flex items-center gap-2 text-black transition-colors mt-2 hover:text-orange hover:border-orange"
        >
          {ctaLabel} &nbsp;⟶
        </Link>
      )}
    </div>
  )

  const imageBloc = (
    <div className="aspect-4/3 rounded-3xl overflow-hidden bg-linear-to-br from-green/15 via-yellow/10 to-orange/15">
      {image?.asset?.url && (
        <img src={image.asset.url} alt={titre ?? ''} className="w-full h-full object-cover" />
      )}
    </div>
  )

  return (
    <section className="bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {imageSide === 'left' ? (
          <>
            <div className="order-2 md:order-1">{imageBloc}</div>
            <div className="order-1 md:order-2">{texteBloc}</div>
          </>
        ) : (
          <>
            {texteBloc}
            {imageBloc}
          </>
        )}
      </div>
    </section>
  )
}
