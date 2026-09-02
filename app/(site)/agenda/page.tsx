import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { agendaPageQuery, eventsQuery } from '@/sanity/lib/queries'
import type { AgendaPageData, SanityEvent } from '@/sanity/lib/queries'
import { PageHero } from '../_components/PageHero'
import { NosEvenements } from './NosEvenements'
import AgendaView from './AgendaView'

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Retrouvez tous les événements Vin'Aroha à Mimizan : dégustations, masterclasses, rencontres producteurs, apéros et événements sur-mesure. Inscrivez-vous en ligne.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Agenda — Vin'Aroha, Mimizan",
    description:
      "Dégustations, masterclasses, rencontres producteurs et apéros à Mimizan (Landes). Réservez votre place.",
  },
}

export default async function AgendaPage() {
  const [page, events] = await Promise.all([
    client.fetch<AgendaPageData | null>(agendaPageQuery as string).catch(() => null),
    client.fetch<SanityEvent[]>(eventsQuery as string).catch(() => []),
  ])

  return (
    <main>
      <PageHero
        title={page?.titre ?? "L'Agenda"}
        description={
          page?.description ??
          'Dégustations, masterclasses, rencontres producteurs... Tous nos événements, en un seul endroit.'
        }
        imageUrl={page?.image?.asset?.url}
        color="#357d4f"
        lightText
        titleFont="accent"
      />
      <NosEvenements titre={page?.evenementsTitre} evenements={page?.evenements} />
      <section className="bg-background py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-accent text-2xl sm:text-3xl md:text-4xl uppercase text-zinc-900 mb-6 sm:mb-10">
            Nos prochaines dates
          </h2>
          <AgendaView events={events} />
        </div>
      </section>
    </main>
  )
}
