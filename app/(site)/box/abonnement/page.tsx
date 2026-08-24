import type { Metadata } from 'next'
import { PageHero } from '../../_components/PageHero'
import { CommandeForm } from '../CommandeForm'

export const metadata: Metadata = {
  title: "Je m'abonne à la Box",
  description: "Choisissez votre formule et la durée de votre abonnement à la Box Vin'Aroha.",
}

export default function AbonnementBoxPage() {
  return (
    <main>
      <PageHero
        eyebrow="Abonnement"
        title="Je m'abonne"
        description="Choisissez la formule et la durée qui vous conviennent, nous nous occupons du reste."
      />
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <CommandeForm type="abonnement" />
        </div>
      </section>
    </main>
  )
}
