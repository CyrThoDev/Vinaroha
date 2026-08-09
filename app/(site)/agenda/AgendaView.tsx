'use client'

import { useState, useMemo } from 'react'
import type { SanityEvent, SanityEventType } from '@/sanity/lib/queries'

const MONTHS_FR = ['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.']

function fmtDate(iso: string) {
  const d = new Date(iso)
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: MONTHS_FR[d.getMonth()],
    time: d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  }
}

const TAG_COLOR: Record<string, string> = {
  orange: 'bg-orange/10 text-orange border-orange/20',
  vert:   'bg-green/10 text-green border-green/20',
  jaune:  'bg-yellow/15 text-yellow border-yellow/30',
}

const PILL_ACTIVE: Record<string, string> = {
  orange: 'bg-orange/10 text-orange border-orange',
  vert:   'bg-green/10 text-green border-green',
  jaune:  'bg-yellow/15 text-yellow border-yellow',
}

const CHECK_ACTIVE: Record<string, string> = {
  orange: 'bg-orange border-orange',
  vert:   'bg-green border-green',
  jaune:  'bg-yellow border-yellow',
}

function Checkmark() {
  return (
    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
      <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AgendaView({ events }: { events: SanityEvent[] }) {
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d }, [])

  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set())

  const eventTypes = useMemo(() => {
    const map = new Map<string, SanityEventType>()
    events.forEach(e => { if (e.eventType) map.set(e.eventType._id, e.eventType) })
    return [...map.values()]
  }, [events])

  const toggle = (id: string) =>
    setActiveTypes(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })

  const upcoming = useMemo(
    () => events.filter(e =>
      new Date(e.date) >= today &&
      (activeTypes.size === 0 || (e.eventType && activeTypes.has(e.eventType._id)))
    ),
    [events, today, activeTypes]
  )

  return (
    <div>

      {/* ── FILTRES ─────────────────────────────────────── */}
      {eventTypes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">

          <button
            onClick={() => setActiveTypes(new Set())}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border  font-medium transition-all ${
              activeTypes.size === 0
                ? 'bg-black text-white border-black'
                : 'bg-white  border-zinc-200 hover:border-zinc-400'
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
              activeTypes.size === 0 ? 'bg-white border-white' : 'border-zinc-300'
            }`}>
              {activeTypes.size === 0 && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                  <path d="M1 3l2 2 4-4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            Tous les événements
          </button>

          {eventTypes.map(et => {
            const active = activeTypes.has(et._id)
            const colorKey = et.color ?? ''
            return (
              <button
                key={et._id}
                onClick={() => toggle(et._id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border  font-medium transition-all ${
                  active
                    ? (PILL_ACTIVE[colorKey] ?? 'bg-zinc-100 text-zinc-700 border-zinc-400')
                    : 'bg-white  border-zinc-200 hover:border-zinc-400'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                  active
                    ? (CHECK_ACTIVE[colorKey] ?? 'bg-zinc-700 border-zinc-700')
                    : 'border-zinc-300'
                }`}>
                  {active && <Checkmark />}
                </span>
                {et.name}
              </button>
            )
          })}
        </div>
      )}

      {/* ── LISTE DES ÉVÉNEMENTS ────────────────────────── */}
      {upcoming.length === 0 ? (
        <div className="text-center py-24 text-zinc-400">
          <p className="text-base">Aucun événement à venir.</p>
          <p className=" mt-2 opacity-70">Revenez bientôt ou suivez-nous sur les réseaux !</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-zinc-200">
          {upcoming.map(ev => {
            const { day, month, time } = fmtDate(ev.date)
            const colorKey = ev.eventType?.color ?? ''
            const tagCls = TAG_COLOR[colorKey] ?? 'bg-zinc-100 text-zinc-600 border-zinc-200'

            return (
              <article key={ev._id} className="py-8 flex gap-6 sm:gap-10 items-start">

                {/* Bloc date */}
                <div className="shrink-0 w-12 sm:w-14 text-center">
                  <div className="text-3xl sm:text-4xl font-black leading-none text-black">{day}</div>
                  <div className="text-[0.625rem] font-semibold uppercase tracking-widest text-zinc-400 mt-1">{month}</div>
                  <div className="text-[0.6875rem] text-zinc-400 mt-1">{time}</div>
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="min-w-0">
                      {ev.eventType && (
                        <span className={`inline-block text-[0.625rem] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border mb-2 ${tagCls}`}>
                          {ev.eventType.name}
                        </span>
                      )}
                      <h3 className="font-black text-lg sm:text-xl text-black leading-tight">{ev.title}</h3>
                      {ev.location && (
                        <p className=" text-zinc-400 mt-1 flex items-center gap-1.5">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                            <circle cx="12" cy="9" r="2.5"/>
                          </svg>
                          {ev.location}
                        </p>
                      )}
                      {ev.description && (
                        <p className="   mt-2 max-w-lg">
                          {ev.description}
                        </p>
                      )}
                    </div>

                    {ev.yurplanUrl && (
                      <a
                        href={ev.yurplanUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 self-start inline-flex items-center gap-2 bg-orange text-white font-black uppercase tracking-widest  px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Inscription
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

              </article>
            )
          })}
        </div>
      )}

    </div>
  )
}
