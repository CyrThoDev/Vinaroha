import type { Metadata } from 'next'
import { PageHero } from '../../_components/PageHero'
import { CommandeForm } from '../CommandeForm'

export const metadata: Metadata = {
  title: 'Offrir la Box',
  description: "Offrez la Box Vin'Aroha : choisissez la formule et la durée, nous nous chargeons de l'envoi.",
}

export default function OffrirBoxPage() {
  return (
    <main>
      <PageHero
        eyebrow="Cadeau"
        title="J'offre la Box"
        description="Faites plaisir à un proche amateur de vin : choisissez la formule et la durée, on s'occupe du reste."
      />
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <CommandeForm type="offrir" />
        </div>
      </section>
    </main>
  )
}
