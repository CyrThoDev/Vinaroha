import { Asset } from '@/app/components/Asset'
import { FAQAccordion } from './FAQAccordion'

type Question = {
  question?: string
  reponse?: string
}

type FAQProps = {
  titre?: string
  questions?: Question[]
}

const QUESTIONS_DEFAUT: Question[] = [
  {
    question: "Comment fonctionne l'abonnement ?",
    reponse:
      'Choisissez votre formule et la durée qui vous conviennent : vous recevez ensuite votre box chaque mois, à retirer directement à la cave.',
  },
  {
    question: 'Quels types de vins vais-je recevoir ?',
    reponse:
      "Des vins naturels, bio et biodynamiques sélectionnés par notre équipe selon la formule choisie (Découverte ou Épicurienne).",
  },
  {
    question: 'Puis-je offrir un abonnement ?',
    reponse:
      "Oui, vous pouvez offrir la box à un proche pour la durée de votre choix depuis la page « J'offre la box ».",
  },
]

export function FAQ({ titre, questions }: FAQProps) {
  const items = questions && questions.length > 0 ? questions : QUESTIONS_DEFAUT

  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start">

        <div>
          <h2 className="font-accent text-3xl md:text-4xl uppercase text-zinc-900 mb-8">{titre ?? 'FAQ'}</h2>
          <FAQAccordion questions={items} />
        </div>

        <div className="hidden md:block pt-16">
          <Asset name="bouteille" color="#EBB132" className="w-32 rotate-12 [&_svg]:w-full [&_svg]:h-auto" />
        </div>

      </div>
    </section>
  )
}
