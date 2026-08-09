import Link from 'next/link'
import { Asset } from '@/app/components/Asset'
import type { SanityEvent } from '@/sanity/lib/queries'

function fmtDate(iso: string) {
  const d = new Date(iso)
  return {
    day: d.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase().replace('.', ''),
    date: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).toUpperCase(),
  }
}

type ProchainesDatesProps = {
  events: SanityEvent[]
  posterUrl?: string
}

export function ProchainesDates({ events, posterUrl }: ProchainesDatesProps) {
  return (
    <section className="bg-green text-white py-16 overflow-hidden relative">
      {/* Bouteille décorative haut droite */}
      <Asset
        name="bouteille"
        color="#ffffff"
        className="absolute top-4 right-6 w-24 opacity-30 pointer-events-none [&_svg]:w-full [&_svg]:h-auto"
      />
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="font-accent text-5xl md:text-6xl uppercase leading-none mb-10">Les prochaines dates</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Col gauche — affiche gérée depuis la page d'accueil */}
          <div className="aspect-square overflow-hidden rounded-sm ">
            {posterUrl ? (
              <img src={posterUrl} alt="Les prochaines dates" className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20  italic">Affiche à venir</div>
            )}
          </div>

          {/* Col droite — liste + CTA */}
          <div className="flex flex-col">
            <div className="divide-y divide-white/20">
              {events.length > 0 ? events.map((ev) => {
                const { day, date } = fmtDate(ev.date)
                return (
                  <div key={ev._id} className="py-6 flex gap-8 items-start">
                    <span className="font-black uppercase text-yellow shrink-0 w-28 ">{day} {date}</span>
                    <div>
                      <p className="font-black leading-tight">{ev.title}</p>
                      {ev.location && <p className="text-white/60  italic mt-0.5">avec {ev.location}</p>}
                    </div>
                  </div>
                )
              }) : (
                <p className="py-6 text-white/40 italic">Aucun événement à venir pour le moment.</p>
              )}
            </div>

            <Link
              href="/agenda"
              className="mt-10 font-fontjek text-2xl text-white flex items-center gap-4 border-b border-white/40 pb-2 w-fit hover:border-white transition-colors"
            >
              Voir tout l&apos;agenda &nbsp;⟶
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
