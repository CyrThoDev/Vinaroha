import Link from 'next/link'
import { Asset } from '@/app/components/Asset'

type Projet = { label?: string; lien?: string }

type LaCaveProjetsProps = {
  titre?: string
  texte?: string
  projets?: Projet[]
}

const PROJETS_DEFAUT: Projet[] = [
  { label: 'Privatisation de la cave', lien: '/evenements' },
  { label: 'Mariages et réceptions',   lien: '/evenements' },
  { label: 'Cadeaux et entreprises',   lien: '/evenements' },
]

export function LaCaveProjets({ titre, texte, projets }: LaCaveProjetsProps) {
  const items = projets && projets.length > 0 ? projets : PROJETS_DEFAUT

  return (
    <section className="bg-background pb-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-accent text-3xl md:text-4xl uppercase text-zinc-900 mb-4">
          {titre ?? 'La cave, aussi pour vos projets'}
        </h2>
        <p className="text-zinc-600 max-w-xl mx-auto mb-12">
          {texte ?? 'Un accompagnement sur-mesure pour tous vos événements, privés comme professionnels.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <Link key={p.label ?? i} href={p.lien ?? '/evenements'} className="relative group aspect-4/3">
              <Asset
                name="square"
                color="#EBB132"
                stretchToFill
                className="absolute inset-0 w-full h-full pointer-events-none [&_svg]:w-full [&_svg]:h-full"
              />
              <div className="relative h-full flex flex-col items-center justify-center gap-2 px-4 text-center text-white">
                <p className="font-black">{p.label}</p>
                <span className="group-hover:translate-x-1 transition-transform">⟶</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
