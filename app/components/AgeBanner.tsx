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

  // Le bandeau orange du footer porte déjà la mention légale une fois l'âge confirmé
  if (state === 'confirmed') return null

  // Refus — message de redirection
  if (state === 'refused') {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-6 px-6 text-center">
        <img src="/logo-vinaroha.svg" alt="Vin'Aroha" className="h-12 w-auto opacity-40" />
        <p className="text-sm max-w-xs">
          Ce site présente des produits alcoolisés.
          Son accès est réservé aux personnes majeures.
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
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-2xl px-6 py-6 shadow-2xl flex flex-col items-center text-center gap-5">
        <div>
          <p className="text-xs font-black uppercase  text-white/40 mb-1">Accès au site</p>
          <p className="text-white font-black uppercase text-lg leading-tight">
            Avez-vous 18 ans ou plus&nbsp;?
          </p>
          <p className="text-white/40 text-sm mt-1">
            Ce site présente des produits alcoolisés, dont l&apos;accès est réservé aux personnes majeures.
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
            className="bg-orange text-white font-black uppercase  text-xs px-8 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Oui, j&apos;ai 18 ans ou plus
          </button>
        </div>
      </div>
    </div>
  )
}
