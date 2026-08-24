import { Asset } from '@/app/components/Asset'

type Avantage = { titre?: string; texte?: string }

type AvantagesProps = {
  titre?: string
  avantages?: Avantage[]
}

const AVANTAGES_DEFAUT: Avantage[] = [
  {
    titre: 'Vins naturels sélectionnés',
    texte: 'Une sélection de vins naturels, bio et biodynamiques choisis avec soin auprès de producteurs engagés.',
  },
  {
    titre: 'Accompagnement personnalisé',
    texte: "Un conseil sur-mesure pour composer une carte qui vous ressemble, adaptée à votre cuisine et à votre clientèle.",
  },
  {
    titre: 'Tarifs dégressifs',
    texte: 'Des tarifs professionnels avantageux, ajustés selon les volumes commandés.',
  },
  {
    titre: 'Flexibilité des volumes',
    texte: "Des quantités adaptées à votre activité, de la caisse ponctuelle à l'approvisionnement régulier.",
  },
]

export function Avantages({ titre, avantages }: AvantagesProps) {
  const items = avantages && avantages.length > 0 ? avantages : AVANTAGES_DEFAUT

  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-3xl md:text-4xl uppercase text-zinc-900 mb-12 text-center">
          {titre ?? 'Pourquoi nous faire confiance'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {items.map((a, i) => (
            <div key={a.titre ?? i} className="flex gap-4">
              <Asset name="leaf" color="#D25200" className="w-8 shrink-0 [&_svg]:w-full [&_svg]:h-auto" />
              <div>
                <p className="font-black text-zinc-900 mb-1">{a.titre}</p>
                <p className="text-zinc-600">{a.texte}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
