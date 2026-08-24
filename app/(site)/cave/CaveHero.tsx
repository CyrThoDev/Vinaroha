'use client'

import { useState, type ReactNode } from 'react'

type CaveHeroProps = {
  images?: string[]
  children?: ReactNode
}

export function CaveHero({ images, children }: CaveHeroProps) {
  const [index, setIndex] = useState(0)
  const photos = images && images.length > 0 ? images : []
  const current = photos[index]

  return (
    <section className="relative h-80 md:h-[28rem] overflow-hidden bg-linear-to-br from-green/15 via-yellow/10 to-orange/15">
      {current ? (
        <img src={current} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-zinc-400 italic">Photos à ajouter dans le studio</p>
        </div>
      )}

      {photos.length > 1 && (
        <button
          onClick={() => setIndex((i) => (i + 1) % photos.length)}
          aria-label="Photo suivante"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#232526" strokeWidth="2.5"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      )}

      {children}
    </section>
  )
}
