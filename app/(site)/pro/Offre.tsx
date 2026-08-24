type Service = { titre?: string; texte?: string }

type OffreProps = {
  titre?: string
  offre?: Service[]
}

const OFFRE_DEFAUT: Service[] = [
  {
    titre: 'Tarifs professionnels',
    texte: 'Une grille tarifaire dédiée aux professionnels, dégressive selon les volumes.',
  },
  {
    titre: 'Sélection sur-mesure pour votre carte',
    texte: "On compose avec vous une sélection adaptée à votre cuisine, votre ambiance et votre clientèle.",
  },
  {
    titre: 'Dégustations & formation d\'équipe',
    texte: "Des sessions de dégustation pour vous et votre équipe, afin de mieux présenter les vins à vos clients.",
  },
  {
    titre: 'Livraison',
    texte: 'Une livraison adaptée à votre rythme, avec un suivi de commande simple et réactif.',
  },
]

export function Offre({ titre, offre }: OffreProps) {
  const items = offre && offre.length > 0 ? offre : OFFRE_DEFAUT

  return (
    <section className="bg-[#EDE1C0] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-3xl md:text-4xl uppercase text-zinc-900 mb-12 text-center">
          {titre ?? 'Ce que nous proposons'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {items.map((s, i) => (
            <div key={s.titre ?? i} className="bg-background rounded-2xl p-6">
              <p className="font-black uppercase text-zinc-900 mb-2">{s.titre}</p>
              <p className="text-zinc-600">{s.texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
