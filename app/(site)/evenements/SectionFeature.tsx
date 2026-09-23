import Link from 'next/link'
import { Asset } from '@/app/components/Asset'
import type { EvenementsSection } from '@/sanity/lib/queries'

type SectionFeatureProps = EvenementsSection & {
  imageSide: 'left' | 'right'
  leafColor2?: string
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
  badge, couleur = 'yellow', titre, texte, points, ctaLabel, ctaLien, image, imageSide, leafColor2 = '#FCF7EA',
}: SectionFeatureProps) {
  const hex = COULEUR_HEX[couleur] ?? COULEUR_HEX.yellow
  const bg = COULEUR_BG[couleur] ?? COULEUR_BG.yellow

  const texteBloc = (
    <div className="flex flex-col gap-4">
      <span className={`inline-block ${bg} text-white rounded-lg px-6 py-2.5 text-base font-black uppercase -rotate-2 w-fit`}>
        {badge}
      </span>
      <h2 className="font-accent text-4xl md:text-5xl uppercase text-zinc-900 leading-none">
        {titre}
      </h2>
      <p className="text-zinc-600 leading-relaxed max-w-md">{texte}</p>

      {points && points.length > 0 && (
        <ul className="flex flex-col gap-3 mt-2">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              <Asset name="leaf" color={hex} color2={leafColor2} className="w-8 mt-1 shrink-0 [&_svg]:w-full [&_svg]:h-auto" />
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

      {ctaLien?.startsWith('mailto:') && (
        <p className="text-zinc-400 text-sm">
          Vous pouvez aussi nous écrire directement à{' '}
          {ctaLien.replace('mailto:', '').split('?')[0].replace('@', '(@)')}
        </p>
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
    <section className="bg-background py-12 lg:py-16 px-6">
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
