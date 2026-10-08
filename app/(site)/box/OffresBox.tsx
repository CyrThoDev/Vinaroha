import Link from 'next/link'
import { Asset } from '@/app/components/Asset'

type Offre = {
  nom?: string
  description?: string
  detail?: string
  prix?: string
}

type OffresBoxProps = {
  titre?: string
  offres?: Offre[]
  abonnementTitre?: string
  abonnementTexte?: string
}

const OFFRES_DEFAUT: Offre[] = [
  {
    nom: 'Découverte',
    description: "Des vins accessibles pour l'apéritif ou le repas",
    detail: '2 bouteilles par box',
    prix: 'À partir de 25€ par mois',
  },
  {
    nom: 'Épicurienne',
    description: 'Des vins haut de gamme étonnants et leurs recettes associées pour tester de nouveaux accords.',
    detail: '2 bouteilles par box',
    prix: 'À partir de 40€ par mois',
  },
]

export function OffresBox({ titre, offres, abonnementTitre, abonnementTexte }: OffresBoxProps) {
  const items = offres && offres.length > 0 ? offres : OFFRES_DEFAUT

  return (
    <section className="bg-background py-20 px-6 relative">

      {/* Verres déco entrecroisés — chevauchent le rectangle du hero */}
      <div className="hidden md:flex absolute -top-32 right-16 items-end z-10 pointer-events-none select-none">
        <div className="rotate-30 translate-x-10 origin-bottom">
          <Asset name="glass" color="#000000" className="w-24 [&_svg]:w-full [&_svg]:h-auto" />
        </div>
        <div className="-rotate-30 -translate-x-10 origin-bottom">
          <Asset name="glass" color="#000000" className="w-24 [&_svg]:w-full [&_svg]:h-auto" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-4xl md:text-5xl uppercase leading-none text-zinc-900 mb-14">
          {titre ?? 'À chacun sa box'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {items.map((offre, i) => (
            <div key={offre.nom ?? i} className="border border-zinc-400 rounded-2xl p-8 flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-1 lg:gap-4">
                <div>
                  <p className="font-lovelo text-3xl uppercase leading-none text-zinc-900">La Box</p>
                  <p className="font-railey text-3xl text-yellow -mt-1">{offre.nom}</p>
                </div>
                <p className="font-accent text-lg lg:text-2xl font-black text-yellow text-left lg:text-right leading-tight shrink-0">
                  {offre.prix}
                </p>
              </div>
              <p className="text-zinc-800">{offre.description}</p>
              <p className="font-accent text-zinc-500">{offre.detail}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 flex flex-col gap-1">
          <p className="font-accent text-3xl md:text-4xl uppercase text-zinc-900">{abonnementTitre ?? 'Abonnements de 3, 6 ou 12 mois'}</p>
          <p className="text-zinc-600">{abonnementTexte ?? "Tarif dégressif suivant la durée d'abonnement"}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12">
          <Link
            href="/box/abonnement"
            className="inline-flex items-center gap-2 bg-black text-white rounded-lg font-accent text-2xl leading-snug px-6 py-2.5 w-fit hover:opacity-80 transition-opacity"
          >
            Je m&apos;abonne &nbsp;⟶
          </Link>
          <Link
            href="/box/offrir"
            className="inline-flex items-center gap-2 border-2 border-zinc-900 text-zinc-900 rounded-lg font-accent text-2xl leading-snug px-6 py-2.5 w-fit hover:bg-zinc-900 hover:text-white transition-colors"
          >
            J&apos;offre la box
            <Asset name="gift" color="currentColor" className="w-6 [&_svg]:w-full [&_svg]:h-auto" />
            &nbsp;⟶
          </Link>
        </div>
      </div>
    </section>
  )
}
