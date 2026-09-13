import Link from 'next/link'
import { Asset } from '@/app/components/Asset'

type Projet = { label?: string; description?: string; lien?: string }

type LaCaveProjetsProps = {
  titre?: string
  texte?: string
  projets?: Projet[]
}

const PROJETS_DEFAUT: Projet[] = [
  { label: 'Privatisation de la cave', description: 'Un lieu unique pour vos réceptions privées.',        lien: '/evenements' },
  { label: 'Mariages et réceptions',   description: 'Célébrez vos plus grands moments entourés de vignes.', lien: '/evenements' },
  { label: 'Cadeaux et entreprises',   description: 'Coffrets et séminaires sur mesure.',                   lien: '/evenements' },
]

const COULEUR = '#EBB132'

export function LaCaveProjets({ titre, texte, projets }: LaCaveProjetsProps) {
  const items = projets && projets.length > 0 ? projets : PROJETS_DEFAUT

  return (
    <section className="bg-background pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-4xl md:text-5xl uppercase leading-none mb-4 text-zinc-900">
          {titre ?? 'La cave, aussi pour vos projets'}
        </h2>
        <p className="max-w-xl mb-12">
          {texte ?? 'Un accompagnement sur-mesure pour tous vos événements, privés comme professionnels.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {items.map((p, i) => (
            <Link
              key={p.label ?? i}
              href={p.lien ?? '/evenements'}
              className="relative group block w-full max-w-64 mx-auto aspect-square overflow-hidden transition-transform hover:scale-[1.03]"
            >
              <Asset
                name="square"
                color={COULEUR}
                className="absolute inset-0 w-full h-full pointer-events-none [&_svg]:w-full [&_svg]:h-full"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-7 text-white text-center">
                <p className="font-accent text-lg uppercase leading-tight">
                  {p.label}
                </p>
                {p.description && (
                  <p className="text-white/90 mt-1">
                    {p.description}
                  </p>
                )}
                <span className="font-fontjek text-2xl mt-4 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all">
                  ⟶
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
