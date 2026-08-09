'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MobileNav } from './MobileNav'

const NAV = [
  { label: 'La Box',                   href: '/box'         },
  { label: 'La Cave',                  href: '/cave'        },
  { label: 'Nos Producteurs',          href: '/producteurs' },
  { label: 'Vos Événements & Cadeaux', href: '/evenements'  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      {/* Zone logo — uniquement sur la home */}
      {isHome && (
        <div className="bg-background py-10 hidden md:flex flex-col items-center justify-center">
          <Link href="/">
            <img src="/logo-vinaroha.svg" alt="Vin'Aroha" className="w-72 h-auto" />
          </Link>
        </div>
      )}

      <header className={`sticky top-0 z-50 bg-background px-6 ${isHome ? 'pt-4 pb-10' : 'py-4'}`}>
        {isHome ? (
          <nav className="hidden md:flex items-center justify-center">
            <ul className="flex items-center gap-12">
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-accent text-xl leading-relaxed uppercase hover:text-yellow transition-colors whitespace-nowrap"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto">
            <Link href="/">
              <img src="/logo-vinaroha.svg" alt="Vin'Aroha" className="h-12 w-auto" />
            </Link>
            <nav>
              <ul className="flex items-center gap-10">
                {NAV.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-accent text-xl leading-relaxed uppercase hover:text-yellow transition-colors whitespace-nowrap"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Mobile — identique sur toutes les pages */}
        <div className="md:hidden flex items-center justify-between">
          <Link href="/">
            <img src="/logo-vinaroha.svg" alt="Vin'Aroha" className="h-8 w-auto" />
          </Link>
          <MobileNav />
        </div>
      </header>
    </>
  )
}
