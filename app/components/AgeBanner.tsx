'use client'

import { useState, useEffect } from 'react'

type State = 'loading' | 'pending' | 'confirmed' | 'refused'

export function AgeBanner() {
  const [state, setState] = useState<State>('loading')

  useEffect(() => {
    const stored = localStorage.getItem('age-verified')
    if (stored === 'yes') setState('confirmed')
    else if (stored === 'no') setState('refused')
    else setState('pending')
  }, [])

  const confirm = () => {
    localStorage.setItem('age-verified', 'yes')
    setState('confirmed')
  }

  const refuse = () => {
    localStorage.setItem('age-verified', 'no')
    setState('refused')
  }

  if (state === 'loading') return null

  // Bandeau légal permanent
  if (state === 'confirmed') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-t border-white/10 py-2 px-6 text-center pointer-events-none">
        <p className="text-[0.625rem] text-white/40 uppercase tracking-widest">
          L&apos;abus d&apos;alcool est dangereux pour la santé · À consommer avec modération · Interdit aux moins de 18 ans
        </p>
      </div>
    )
  }

  // Refus — message de redirection
  if (state === 'refused') {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-6 px-6 text-center">
        <img src="/logo-vinaroha.svg" alt="Vin'Aroha" className="h-12 w-auto opacity-40" />
        <p className="text-zinc-500  max-w-xs ">
          La vente d&apos;alcool est réservée aux personnes majeures.
          Vous devez avoir 18 ans ou plus pour accéder à ce site.
        </p>
        <button
          onClick={() => setState('pending')}
          className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-600 transition-colors"
        >
          J&apos;ai fait une erreur
        </button>
      </div>
    )
  }

  // Vérification d'âge
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-5">
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-white/10 rounded-2xl px-6 py-5 shadow-2xl flex flex-col sm:flex-row items-center gap-5">
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Accès au site</p>
          <p className="text-white font-black uppercase text-lg leading-tight">
            Avez-vous 18 ans ou plus&nbsp;?
          </p>
          <p className="text-white/40 text-xs mt-1">
            La loi française interdit la vente d&apos;alcool aux mineurs.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={refuse}
            className="text-xs text-white/40 hover:text-white transition-colors font-medium uppercase tracking-wide px-5 py-2.5 rounded-lg border border-white/15 hover:border-white/30"
          >
            Non
          </button>
          <button
            onClick={confirm}
            className="bg-orange text-white font-black uppercase tracking-widest text-xs px-8 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Oui, j&apos;ai 18 ans
          </button>
        </div>
      </div>
    </div>
  )
}
