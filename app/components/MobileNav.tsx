'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { label: 'La Box',                   href: '/box'        },
  { label: 'La Cave',                  href: '/cave',       disabled: true },
  { label: 'Nos Producteurs',          href: '/producteurs' },
  { label: 'Agenda',                   href: '/agenda'     },
  { label: 'Vos Événements & Cadeaux', href: '/evenements', disabled: true },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        className="flex flex-col gap-1.5 p-2 -mr-2"
      >
        <span className="block w-6 h-0.5 bg-zinc-900" />
        <span className="block w-6 h-0.5 bg-zinc-900" />
        <span className="block w-4 h-0.5 bg-zinc-900 ml-auto" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          {/* Barre du haut */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Link href="/" onClick={() => setOpen(false)}>
              <img src="/logo-vinaroha.svg" alt="Vin'Aroha" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Liens */}
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {NAV.map(({ label, href, disabled }) => (
              disabled ? (
                <span
                  key={href}
                  aria-disabled="true"
                  className="font-accent text-2xl uppercase text-white/30 cursor-not-allowed py-3 border-b border-white/10 last:border-0"
                >
                  {label}
                </span>
              ) : (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="font-accent text-2xl uppercase text-white hover:text-yellow transition-colors py-3 border-b border-white/10 last:border-0"
                >
                  {label}
                </Link>
              )
            ))}
          </nav>

          {/* Bas */}
          <p className="px-8 pb-10 text-white/25 text-[0.625rem] uppercase ">
            L&apos;abus d&apos;alcool est dangereux pour la santé · +18 ans
          </p>
        </div>
      )}
    </>
  )
}
