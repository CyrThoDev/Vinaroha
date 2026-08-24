import { FAQAccordionPro } from './FAQAccordionPro'

type Question = { question?: string; reponse?: string }

type FAQProProps = {
  titre?: string
  questions?: Question[]
}

const QUESTIONS_DEFAUT: Question[] = [
  {
    question: 'Quelle est la quantité minimum de commande ?',
    reponse:
      "Il n'y a pas de minimum imposé pour démarrer : on s'adapte à votre activité, de la caisse ponctuelle à l'approvisionnement régulier.",
  },
  {
    question: 'Quels sont les délais et la zone de livraison ?',
    reponse:
      'Nous livrons sur Mimizan et ses environs sous quelques jours. Pour les zones plus éloignées, on étudie ensemble la meilleure solution.',
  },
  {
    question: 'Comment se passe la facturation ?',
    reponse:
      'Vous bénéficiez de conditions de paiement professionnelles (facture à réception ou compte pro selon votre activité), à définir ensemble lors du premier échange.',
  },
  {
    question: 'Peut-on faire déguster l\'équipe avant de choisir ?',
    reponse:
      "Oui, c'est même recommandé : on organise volontiers une session de dégustation avec votre équipe avant de finaliser la sélection.",
  },
]

export function FAQPro({ titre, questions }: FAQProProps) {
  const items = questions && questions.length > 0 ? questions : QUESTIONS_DEFAUT

  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-accent text-3xl md:text-4xl uppercase text-zinc-900 mb-8">{titre ?? 'FAQ'}</h2>
        <FAQAccordionPro questions={items} />
      </div>
    </section>
  )
}
