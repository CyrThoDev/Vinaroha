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
    <section className="bg-background py-16 px-6 relative overflow-hidden">

      {/* Verres déco entrecroisés */}
      <div className="hidden md:flex absolute -top-12 right-16 items-end z-10 pointer-events-none select-none">
        <div className="rotate-30 translate-x-10 origin-bottom">
          <Asset name="glass" color="#000000" className="w-24 [&_svg]:w-full [&_svg]:h-auto" />
        </div>
        <div className="-rotate-30 -translate-x-10 origin-bottom">
          <Asset name="glass" color="#000000" className="w-24 [&_svg]:w-full [&_svg]:h-auto" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="font-accent text-3xl md:text-4xl uppercase text-zinc-900 mb-14">
          {titre ?? 'À chacun sa box'}
        </h2>

        <div className="flex flex-col gap-12">
          {items.map((offre, i) => (
            <div key={offre.nom ?? i} className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-3 md:gap-10 items-start">
              <div>
                <p className="font-lovelo text-3xl uppercase leading-none text-zinc-900">La Box</p>
                <p className="font-railey text-3xl text-yellow -mt-1">{offre.nom}</p>
              </div>
              <div className="flex flex-col gap-1 max-w-md">
                <p className="text-zinc-800">{offre.description}</p>
                <p className="italic text-zinc-500 ">{offre.detail}</p>
                <p className="font-black text-yellow mt-2">{offre.prix}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14 flex flex-col gap-1">
          <p className="font-black uppercase text-zinc-900">{abonnementTitre ?? 'Abonnements de 3, 6 ou 12 mois'}</p>
          <p className="text-zinc-600">{abonnementTexte ?? "Tarif dégressif suivant la durée d'abonnement"}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 mt-10">
          <Link
            href="/box/abonnement"
            className="font-fontjek text-2xl border-b border-zinc-400 pb-1 hover:border-orange hover:text-orange transition-colors"
          >
            Je m&apos;abonne &nbsp;⟶
          </Link>
          <Link
            href="/box/offrir"
            className="font-fontjek text-2xl border-b border-zinc-400 pb-1 flex items-center gap-2 hover:border-orange hover:text-orange transition-colors"
          >
            J&apos;offre la box
            <Asset name="gift" color="#000000" className="w-6 [&_svg]:w-full [&_svg]:h-auto" />
            &nbsp;⟶
          </Link>
        </div>
      </div>
    </section>
  )
}
