import Link from 'next/link'
import { Asset } from '@/app/components/Asset'

type Evenement = {
  label?: string
  description?: string
  image?: { asset?: { url: string } }
  ctaLabel?: string
  ctaLien?: string
}

type NosEvenementsProps = {
  titre?: string
  evenements?: Evenement[]
}

const EVENEMENTS_DEFAUT: Evenement[] = [
  {
    label: 'Dégustations',
    description: 'Trois cuvées, un vigneron ou un thème, et les conseils de Delphine. Le rendez-vous régulier de la cave.',
  },
  {
    label: 'Apéros',
    description: 'Le verre du week-end aux Halles ou à la cave, avec planches de saison et cuvée du moment.',
  },
  {
    label: 'Masterclass',
    description: 'Un sujet, une heure trente, verre en main : les vins naturels, les accords, les régions. Pour les curieux.',
  },
  {
    label: 'Rencontres producteurs',
    description: 'Celles et ceux qui font nos vins viennent les raconter eux-mêmes. Ça finit rarement à l\'heure.',
    ctaLabel: 'Découvrir nos producteurs',
    ctaLien: '/producteurs',
  },
  {
    label: 'Sur mesure',
    description: 'Privatisation, anniversaire, moment d\'équipe : dites-nous votre projet, on s\'occupe du reste.',
    ctaLabel: 'En savoir plus',
    ctaLien: '/evenements',
  },
]

const PHOTO_SIZE = 'w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36'

function Photo({ ev }: { ev: Evenement }) {
  return (
    <div className={`${PHOTO_SIZE} shrink-0`}>
      {ev.image?.asset?.url ? (
        <Asset
          name="rounded"
          imageUrl={ev.image.asset.url}
          alt={ev.label}
          className="w-full h-full [&_svg]:w-full [&_svg]:h-full"
        />
      ) : (
        <Asset name="rounded" color="#e4e4e7" className="w-full h-full [&_svg]:w-full [&_svg]:h-full" />
      )}
    </div>
  )
}

function CtaLink({ ev }: { ev: Evenement }) {
  if (!ev.ctaLabel) return null
  return (
    <Link
      href={ev.ctaLien ?? '#'}
      className="font-fontjek text-base sm:text-lg border-b border-zinc-400 pb-0.5 inline-block text-black hover:text-green hover:border-green transition-colors mt-1"
    >
      {ev.ctaLabel} &nbsp;⟶
    </Link>
  )
}

// Carte empilée (photo en haut, texte centré dessous) — utilisée en desktop pour les catégories sans lien.
function CarteEmpilee({ ev }: { ev: Evenement }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 min-w-0">
      <Photo ev={ev} />
      <p className="font-black uppercase text-base text-zinc-900">{ev.label}</p>
      <p className="text-zinc-600 text-base max-w-56">{ev.description}</p>
      <CtaLink ev={ev} />
    </div>
  )
}

// Carte horizontale (photo à gauche, texte à droite) — utilisée en mobile pour toutes les catégories, et en desktop pour celles avec lien.
function CarteHorizontale({ ev }: { ev: Evenement }) {
  return (
    <div className="flex items-center gap-4">
      <Photo ev={ev} />
      <div className="flex flex-col items-start text-left gap-1 min-w-0">
        <p className="font-black uppercase text-base md:text-base text-zinc-900">{ev.label}</p>
        <p className="text-zinc-600 text-base max-w-56">{ev.description}</p>
        <CtaLink ev={ev} />
      </div>
    </div>
  )
}

export function NosEvenements({ titre, evenements }: NosEvenementsProps) {
  const items = evenements && evenements.length > 0 ? evenements : EVENEMENTS_DEFAUT
  const sansLien = items.filter((ev) => !ev.ctaLabel)
  const avecLien = items.filter((ev) => ev.ctaLabel)

  return (
    <section className="bg-background py-12 md:py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-accent text-2xl sm:text-3xl md:text-4xl uppercase text-zinc-900 mb-8 md:mb-12">
          {titre ?? 'Nos événements'}
        </h2>

        {/* Mobile — liste une colonne, même mise en forme pour toutes les catégories */}
        <div className="flex flex-col gap-8 md:hidden">
          {items.map((ev, i) => <CarteHorizontale key={ev.label ?? i} ev={ev} />)}
        </div>

        {/* Desktop — grille centrée pour les catégories sans lien, rangée centrée pour celles avec lien */}
        <div className="hidden md:flex md:flex-col md:gap-10 lg:gap-14">
          <div className="grid grid-cols-3 gap-x-6 lg:gap-x-8">
            {sansLien.map((ev, i) => <CarteEmpilee key={ev.label ?? i} ev={ev} />)}
          </div>
          {avecLien.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 lg:gap-x-16">
              {avecLien.map((ev, i) => <CarteHorizontale key={ev.label ?? i} ev={ev} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
