import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { eventsQuery, agendaPageQuery } from '@/sanity/lib/queries'
import type { SanityEvent, PageHeroData } from '@/sanity/lib/queries'
import { PageHero } from '../_components/PageHero'
import AgendaView from './AgendaView'

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Retrouvez tous les événements Vin'Aroha à Mimizan : dégustations, masterclasses, rencontres producteurs, apéros et événements sur-mesure. Inscrivez-vous en ligne.",
  openGraph: {
    title: "Agenda — Vin'Aroha, Mimizan",
    description:
      "Dégustations, masterclasses, rencontres producteurs et apéros à Mimizan (Landes). Réservez votre place.",
  },
}

const EVENT_TYPES = [
  {
    id: 'degustation',
    label: 'Dégustation',
    description: "Venez découvrir nos sélections autour d'un verre, guidés par notre équipe.",
    bg: 'bg-green',
    text: 'text-white',
  },
  {
    id: 'mariages',
    label: 'Mariages',
    description: 'Un accompagnement sur-mesure pour sublimer votre grand jour.',
    bg: 'bg-yellow',
    text: 'text-black',
  },
  {
    id: 'masterclass',
    label: 'Masterclass',
    description: 'Approfondissez vos connaissances avec nos ateliers thématiques.',
    bg: 'bg-orange',
    text: 'text-white',
  },
  {
    id: 'rencontres',
    label: 'Rencontres Producteurs',
    description: 'Partez à la rencontre des femmes et des hommes qui font le vin.',
    bg: 'bg-black',
    text: 'text-white',
  },
  {
    id: 'aperos',
    label: 'Apéros',
    description: 'Moments conviviaux et décontractés autour de belles bouteilles.',
    bg: 'bg-zinc-200',
    text: 'text-zinc-900',
  },
  {
    id: 'sur-mesure',
    label: 'Sur-mesure',
    description: 'Concevons ensemble votre événement : EVJ, séminaires, repas professionnels...',
    bg: 'bg-zinc-900',
    text: 'text-white',
  },
]

export default async function AgendaPage() {
  const [events, page] = await Promise.all([
    client.fetch<SanityEvent[]>(eventsQuery as string),
    client.fetch<PageHeroData | null>(agendaPageQuery as string).catch(() => null),
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
      />

      {/* ── NOS ÉVÉNEMENTS ────────────────────────────── */}
      <section className="bg-background py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <h2 className="font-accent text-[clamp(2.5rem,7vw,6rem)] uppercase leading-none">
              Nos événements
            </h2>
            <p className="  max-w-xs ">
              Six façons de célébrer le vin à nos côtés.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {EVENT_TYPES.map(type => (
              <div
                key={type.id}
                className={`${type.bg} ${type.text} rounded-3xl p-8 md:p-10 flex flex-col gap-4 min-h-50`}
              >
                <p className="font-black uppercase text-xs tracking-widest leading-tight">
                  {type.label}
                </p>
                <p className="text-[0.8rem]  opacity-60 mt-auto">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENDA FILTRABLE ──────────────────────────── */}
      <section className="bg-background pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="border-t border-black/15 pt-16">
            <h2 className="font-accent text-[clamp(2.5rem,7vw,6rem)] uppercase leading-none mb-14">
              Agenda
            </h2>
            <AgendaView events={events} />
          </div>
        </div>
      </section>

    </main>
  )
}
