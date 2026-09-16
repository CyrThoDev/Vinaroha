'use client'

import { useState } from 'react'

type Avis = { citation?: string; auteur?: string }

export function AvisSlider({ avis }: { avis: Avis[] }) {
  const [index, setIndex] = useState(0)
  const total = avis.length
  const current = avis[index]

  if (total === 0) return null

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="max-w-2xl min-h-40 text-center flex flex-col gap-3">
        <span className="font-black text-4xl text-zinc-300 leading-none" aria-hidden="true">&ldquo;</span>
        <p className="text-zinc-700 -mt-4">{current.citation}</p>
        {current.auteur && <p className="text-zinc-500 text-sm">- {current.auteur}</p>}
      </div>

      {total > 1 && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIndex((i) => (i - 1 + total) % total)}
            aria-label="Avis précédent"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#232526" strokeWidth="2.5"><path d="M15 6l-6 6 6 6" /></svg>
          </button>

          <div className="flex gap-1.5">
            {avis.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Avis ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-zinc-900' : 'bg-zinc-300'}`}
              />
            ))}
          </div>

          <button
            onClick={() => setIndex((i) => (i + 1) % total)}
            aria-label="Avis suivant"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#232526" strokeWidth="2.5"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      )}
    </div>
  )
}
