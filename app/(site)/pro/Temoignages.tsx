type Temoignage = { citation?: string; auteur?: string; etablissement?: string }

type TemoignagesProps = {
  titre?: string
  temoignages?: Temoignage[]
}

const TEMOIGNAGES_DEFAUT: Temoignage[] = [
  {
    citation:
      "Une sélection toujours juste et un vrai accompagnement pour composer notre carte. Nos clients redemandent régulièrement les cuvées conseillées par l'équipe.",
    auteur: 'Julien',
    etablissement: 'Restaurant Le Comptoir',
  },
  {
    citation:
      "Réactifs, à l'écoute et de très bons conseils. La livraison est toujours dans les temps et les tarifs pro sont très corrects.",
    auteur: 'Camille',
    etablissement: 'Bistrot des Halles',
  },
  {
    citation:
      "On a fait déguster toute l'équipe avant d'arrêter notre carte : un vrai plus pour bien vendre les bouteilles en salle.",
    auteur: 'Marc',
    etablissement: 'La Table Marine',
  },
]

export function Temoignages({ titre, temoignages }: TemoignagesProps) {
  const items = temoignages && temoignages.length > 0 ? temoignages : TEMOIGNAGES_DEFAUT

  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-3xl md:text-4xl uppercase text-zinc-900 mb-12 text-center">
          {titre ?? 'Ils nous font confiance'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <div key={t.auteur ?? i} className="flex flex-col gap-4">
              <span className="font-black text-4xl text-zinc-300 leading-none" aria-hidden="true">&ldquo;</span>
              <p className="text-zinc-700 leading-relaxed">{t.citation}</p>
              <p className=" text-zinc-500 mt-auto">
                — {t.auteur}{t.etablissement ? `, ${t.etablissement}` : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
