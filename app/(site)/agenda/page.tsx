import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { agendaPageQuery } from '@/sanity/lib/queries'
import type { PageHeroData } from '@/sanity/lib/queries'
import { PageHero } from '../_components/PageHero'

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
  const page = await client.fetch<PageHeroData | null>(agendaPageQuery as string).catch(() => null)

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
    </main>
  )
}
