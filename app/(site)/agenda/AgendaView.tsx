'use client'

import { useState, useMemo } from 'react'
import type { SanityEvent, SanityEventType } from '@/sanity/lib/queries'

// Charte Vin'Aroha : orange #c85912 · vert #357d4f · jaune #d7ac46
const COLOR_MAP: Record<string, { bg: string; text: string; dot: string; activeBg: string }> = {
  orange: { bg: 'bg-[#c85912]/10', text: 'text-[#c85912]', dot: 'bg-[#c85912]', activeBg: 'bg-[#c85912]' },
  vert:   { bg: 'bg-[#357d4f]/10', text: 'text-[#357d4f]', dot: 'bg-[#357d4f]', activeBg: 'bg-[#357d4f]' },
  jaune:  { bg: 'bg-[#d7ac46]/15', text: 'text-[#8a6b1c]', dot: 'bg-[#d7ac46]', activeBg: 'bg-[#d7ac46]' },
}
const DEFAULT_COLOR = { bg: 'bg-zinc-100', text: 'text-zinc-600', dot: 'bg-zinc-400', activeBg: 'bg-zinc-700' }

function colorFor(et: SanityEventType | null) {
  if (!et?.color) return DEFAULT_COLOR
  return COLOR_MAP[et.color] ?? DEFAULT_COLOR
}

const DAY_LABELS  = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const MONTH_LABELS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

function calendarCells(year: number, month: number) {
  const firstDow = new Date(year, month, 1).getDay()
  const offset = firstDow === 0 ? 6 : firstDow - 1
  const total = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = Array(offset).fill(null)
  for (let d = 1; d <= total; d++) cells.push(d)
  return cells
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export default function AgendaView({ events }: { events: SanityEvent[] }) {
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d }, [])

  const [view, setView]           = useState<'list' | 'calendar'>('list')
  const [activeTypes, setActive]  = useState<string[]>([])
  const [calDate, setCalDate]     = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  // Unique event types present in events
  const eventTypes = useMemo(() => {
    const map = new Map<string, SanityEventType>()
    events.forEach(e => { if (e.eventType) map.set(e.eventType._id, e.eventType) })
    return [...map.values()]
  }, [events])

  const toggleType = (id: string) =>
    setActive(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const filtered = useMemo(
    () => activeTypes.length === 0 ? events : events.filter(e => e.eventType && activeTypes.includes(e.eventType._id)),
    [events, activeTypes]
  )

  // Calendar
  const year  = calDate.getFullYear()
  const month = calDate.getMonth()
  const cells = calendarCells(year, month)
  const eventsOnDay = (day: number) =>
    filtered.filter(e => sameDay(new Date(e.date), new Date(year, month, day)))

  // List — upcoming only, grouped by month
  const upcoming = useMemo(
    () => filtered.filter(e => new Date(e.date) >= today),
    [filtered, today]
  )
  const grouped = useMemo(() => {
    const map = new Map<string, SanityEvent[]>()
    upcoming.forEach(e => {
      const key = new Date(e.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(e)
    })
    return map
  }, [upcoming])

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 mb-8">
        {/* View toggle */}
        <div className="flex gap-1 p-1 bg-zinc-100 rounded-lg w-fit">
          {(['list', 'calendar'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === v ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {v === 'list' ? 'Liste' : 'Calendrier'}
            </button>
          ))}
        </div>

        {/* Category pills */}
        {eventTypes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActive([])}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                activeTypes.length === 0
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
              }`}
            >
              Tout
            </button>
            {eventTypes.map(et => {
              const c = colorFor(et)
              const active = activeTypes.includes(et._id)
              return (
                <button
                  key={et._id}
                  onClick={() => toggleType(et._id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                    active
                      ? `${c.activeBg} text-white border-transparent`
                      : `bg-white ${c.text} border-zinc-200 hover:border-zinc-400`
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                  {et.name}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Calendar view */}
      {view === 'calendar' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCalDate(new Date(year, month - 1, 1))}
              className="p-2 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Mois précédent"
            >←</button>
            <span className="text-sm font-medium capitalize">{MONTH_LABELS[month]} {year}</span>
            <button
              onClick={() => setCalDate(new Date(year, month + 1, 1))}
              className="p-2 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Mois suivant"
            >→</button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {DAY_LABELS.map(d => (
              <div key={d} className="text-center text-[11px] font-medium text-zinc-400 py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-zinc-100 border border-zinc-100 rounded-xl overflow-hidden">
            {cells.map((day, i) => {
              if (day === null) return <div key={`e-${i}`} className="bg-white h-20 sm:h-24" />
              const dayEvents = eventsOnDay(day)
              const isToday   = sameDay(new Date(year, month, day), today)
              return (
                <div key={day} className="bg-white h-20 sm:h-24 p-1.5 flex flex-col">
                  <span className={`text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full mb-1 self-end ${
                    isToday ? 'bg-zinc-900 text-white' : 'text-zinc-400'
                  }`}>
                    {day}
                  </span>
                  <div className="flex flex-col gap-px overflow-hidden flex-1">
                    {dayEvents.slice(0, 2).map(ev => {
                      const c = colorFor(ev.eventType)
                      return (
                        <div key={ev._id} className={`text-[10px] px-1 py-0.5 rounded truncate leading-tight ${c.bg} ${c.text}`}>
                          {ev.title}
                        </div>
                      )
                    })}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] text-zinc-400 px-1">+{dayEvents.length - 2}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* List view */}
      {view === 'list' && (
        grouped.size === 0
          ? <p className="text-zinc-500 text-sm">Aucun événement à venir.</p>
          : (
            <div className="flex flex-col gap-10">
              {[...grouped.entries()].map(([label, evs]) => (
                <section key={label}>
                  <h2 className="text-xs font-semibold capitalize tracking-widest text-zinc-400 mb-4">
                    {label}
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {evs.map(ev => {
                      const c = colorFor(ev.eventType)
                      const d = new Date(ev.date)
                      const chip = (
                        <div className={`flex items-center gap-3 px-4 py-3 rounded-full ${c.bg} ${c.text} w-full`}>
                          <span className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                          <span className="font-medium truncate">{ev.title}</span>
                          <span className="ml-auto shrink-0 text-sm opacity-70 flex items-center gap-2">
                            {d.getDate().toString().padStart(2, '0')}{' '}
                            {d.toLocaleDateString('fr-FR', { month: 'short' })}
                            {' · '}
                            {fmtTime(ev.date)}
                            {ev.location && <span className="hidden sm:inline">· {ev.location}</span>}
                          </span>
                        </div>
                      )
                      return (
                        <li key={ev._id}>
                          {ev.yurplanUrl ? (
                            <a href={ev.yurplanUrl} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                              {chip}
                            </a>
                          ) : chip}
                        </li>
                      )
                    })}
                  </ul>
                </section>
              ))}
            </div>
          )
      )}
    </div>
  )
}
