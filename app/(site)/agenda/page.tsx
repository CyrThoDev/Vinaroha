import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { eventsQuery } from '@/sanity/lib/queries'
import type { SanityEvent } from '@/sanity/lib/queries'
import AgendaView from './AgendaView'

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Retrouvez tous les événements Vin'Aroha à Mimizan : dégustations, masterclasses, rencontres vignerons, apéros et événements sur-mesure. Inscrivez-vous en ligne.",
  openGraph: {
    title: "Agenda — Vin'Aroha, Mimizan",
    description:
      "Dégustations, masterclasses, rencontres vignerons et apéros à Mimizan (Landes). Réservez votre place.",
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
    label: 'Rencontres Vignerons',
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
  const events = await client.fetch<SanityEvent[]>(eventsQuery as string)

  return (
    <main>

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="bg-black text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 py-28 md:py-40">
          <p className="text-orange text-[0.625rem] font-black uppercase tracking-[0.3em] mb-6">
            Vin'Aroha
          </p>
          <h1 className="font-accent text-[clamp(5rem,18vw,14rem)] leading-[0.85] uppercase">
            L'Agenda
          </h1>
          <p className="text-white/50 mt-8 max-w-sm  ">
            Dégustations, masterclasses, rencontres vignerons... Tous nos événements, en un seul endroit.
          </p>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-150 h-150 border border-white/5 rounded-full translate-x-1/2 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-87.5 h-87.5 border border-white/10 rounded-full translate-x-1/3 pointer-events-none" aria-hidden="true" />
      </section>

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
