'use client'

import { useState, useMemo } from 'react'
import type { SanityEvent, SanityEventType } from '@/sanity/lib/queries'

function fmtDate(iso: string) {
  const d = new Date(iso)
  const weekday = d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')
  const month = d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')
  return {
    label: `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${d.getDate()} ${month}`,
    time: `${d.getHours()}h${d.getMinutes().toString().padStart(2, '0')}`,
  }
}

export default function AgendaView({ events }: { events: SanityEvent[] }) {
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }, [])

  const [activeType, setActiveType] = useState<string | null>(null)

  const eventTypes = useMemo(() => {
    const map = new Map<string, SanityEventType>()
    events.forEach(e => { if (e.eventType) map.set(e.eventType._id, e.eventType) })
    return [...map.values()]
  }, [events])

  const upcoming = useMemo(
    () => events.filter(e =>
      new Date(e.date) >= today &&
      (!activeType || e.eventType?._id === activeType)
    ),
    [events, today, activeType]
  )

  return (
    <div>

      {/* ── FILTRES ─────────────────────────────────────── */}
      {eventTypes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-10">
          <button
            onClick={() => setActiveType(null)}
            className={`rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-base sm:text-base border transition-colors ${
              activeType === null
                ? 'bg-green text-white border-green'
                : 'border-zinc-400 text-zinc-700 hover:border-green hover:text-green'
            }`}
          >
            Tout
          </button>

          {eventTypes.map(et => (
            <button
              key={et._id}
              onClick={() => setActiveType(et._id)}
              className={`rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-base sm:text-base border transition-colors ${
                activeType === et._id
                  ? 'bg-green text-white border-green'
                  : 'border-zinc-400 text-zinc-700 hover:border-green hover:text-green'
              }`}
            >
              {et.name}
            </button>
          ))}
        </div>
      )}

      {/* ── LISTE DES ÉVÉNEMENTS ────────────────────────── */}
      {upcoming.length === 0 ? (
        <div className="text-center py-16 sm:py-24 text-zinc-400">
          <p className="text-base sm:text-base">Aucun événement à venir.</p>
          <p className="mt-2 opacity-70 text-base sm:text-base">Revenez bientôt ou suivez-nous sur les réseaux !</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-zinc-200">
          {upcoming.map(ev => {
            const { label, time } = fmtDate(ev.date)
            const tarif = ev.tarif ? `${ev.tarif}${ev.surReservation ? ' sur réservation' : ''}` : null
            const details = [
              ev.intervenant ? `avec ${ev.intervenant}` : null,
              time,
              ev.location,
              tarif,
            ].filter(Boolean).join(' · ')

            return (
              <article key={ev._id} className="py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10">

                <div className="shrink-0 sm:w-32">
                  <p className="font-fontjek text-xl sm:text-2xl text-zinc-900">{label}</p>
                </div>

                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-black text-base sm:text-lg text-black leading-tight">{ev.title}</h3>
                    {details && <p className="text-zinc-500 text-base sm:text-base mt-0.5">{details}</p>}
                    {ev.eventType && (
                      <span className="inline-block bg-green text-white text-base font-black px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mt-2">
                        {ev.eventType.name}
                      </span>
                    )}
                  </div>

                  {ev.yurplanUrl && (
                    <a
                      href={ev.yurplanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 font-fontjek text-base sm:text-lg border-b border-zinc-400 pb-0.5 text-black hover:text-green hover:border-green transition-colors w-fit"
                    >
                      Inscription
                    </a>
                  )}
                </div>

              </article>
            )
          })}
        </div>
      )}

    </div>
  )
}
