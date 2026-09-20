import Link from 'next/link'
import { Asset } from '@/app/components/Asset'

type Projet = { label?: string; description?: string; lien?: string }

type LaCaveProjetsProps = {
  eyebrow?: string
  titre?: string
  texte?: string
  ctaLabel?: string
  ctaLien?: string
  projets?: Projet[]
}

const PROJETS_DEFAUT: Projet[] = [
  { label: 'Privatisation de la cave', description: 'Un lieu chaleureux pour vos réceptions privées.',              lien: '/evenements' },
  { label: 'Mariages & réceptions',    description: 'Des cuvées choisies pour accompagner vos grands moments.',     lien: '/evenements' },
  { label: 'Cadeaux d’entreprise',     description: 'Coffrets et sélections personnalisés, à votre image.',         lien: '/evenements' },
]

export function LaCaveProjets({ eyebrow, titre, texte, ctaLabel, ctaLien, projets }: LaCaveProjetsProps) {
  const items = projets && projets.length > 0 ? projets : PROJETS_DEFAUT

  return (
    <section className="bg-background py-12 lg:py-24 px-6">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Col gauche — texte, CTA, illustration */}
        <div className="flex flex-col gap-4">
          <p className="font-black uppercase text-xs md:text-sm tracking-wide text-orange">
            {eyebrow ?? 'Pour vos moments à partager'}
          </p>
          <h2 className="font-accent text-4xl md:text-5xl uppercase leading-none text-zinc-900">
            {titre ?? 'La cave, aussi pour vos projets'}
          </h2>
          <p className="max-w-md text-zinc-600">
            {texte ?? 'Un accompagnement sur-mesure pour tous vos événements, privés comme professionnels.'}
          </p>
          <Link
            href={ctaLien ?? '/evenements'}
            className="font-fontjek text-2xl text-zinc-900 flex items-center gap-2 border-b border-zinc-400 pb-1 w-fit mt-2 hover:text-orange hover:border-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow"
          >
            {ctaLabel ?? 'Parlons de votre projet'} &nbsp;⟶
          </Link>

          <div className="hidden md:flex flex-col items-start gap-3 mt-8">
            <Asset name="bouteille" color="#D25200" className="w-16 [&_svg]:w-full [&_svg]:h-auto" />
          </div>
        </div>

        {/* Col droite — liste numérotée */}
        <div className="flex flex-col divide-y divide-zinc-900/10 border-t border-zinc-900/10">
          {items.map((p, i) => (
            <Link
              key={p.label ?? i}
              href={p.lien ?? '/evenements'}
              className="group flex items-center gap-4 sm:gap-6 min-h-11 py-5 sm:py-6 px-3 -mx-3  transition-colors hover:bg-zinc-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow"
            >
              <span className="font-accent text-3xl md:text-4xl text-orange shrink-0 w-10 md:w-12">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="w-px self-stretch bg-zinc-900/10 shrink-0" aria-hidden="true" />
              <span className="flex-1 min-w-0">
                <span className="block font-accent uppercase text-lg md:text-xl text-zinc-900 leading-tight">
                  {p.label}
                </span>
                {p.description && (
                  <span className="block text-zinc-500 text-sm mt-1">
                    {p.description}
                  </span>
                )}
              </span>
              <span className="font-fontjek text-2xl text-zinc-900 shrink-0 transition-transform group-hover:translate-x-1">
                ⟶
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
