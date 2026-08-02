'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div className="max-w-3xl mx-auto bg-zinc-900 border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl pointer-events-auto flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Icône */}
        <span className="text-2xl shrink-0" aria-hidden="true">🍪</span>

        {/* Texte */}
        <p className=" text-white/60  flex-1">
          On utilise des cookies pour analyser l&apos;audience et améliorer votre expérience.
          {' '}
          <Link href="/mentions-legales" className="text-white/80 underline underline-offset-2 hover:text-white transition-colors">
            En savoir plus
          </Link>
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-xs text-white/40 hover:text-white transition-colors font-medium uppercase tracking-wide"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="bg-orange text-white font-black uppercase tracking-widest text-xs px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
