import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

const NAV = [
  { label: 'Notre Cave',               href: '/cave'        },
  { label: 'Notre Box',                href: '/box'         },
  { label: 'Les Vignerons',            href: '/vignerons'   },
  { label: "L'Agenda",                 href: '/agenda'      },
  { label: 'Vos Événements & Cadeaux', href: '/evenements'  },
  { label: 'Contact',                  href: '/contact'     },
]

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await client.fetch(siteSettingsQuery as string).catch(() => null) as {
    adresse?: string
    telephone?: string
    socials?: { instagram?: string; facebook?: string; linkedin?: string }
  } | null

  return (
    <>
      {/* Top info bar */}
      <div className="bg-[#F7F2F0] border-b border-black/5 text-xs text-zinc-600 px-6 py-2 flex items-center justify-between">
        <span className="uppercase tracking-wide font-medium">
          VIN&apos;AROHA
          {settings?.adresse && ` · ${settings.adresse}`}
          {settings?.telephone && ` · ${settings.telephone}`}
        </span>
        <div className="flex items-center gap-3">
          {settings?.socials?.facebook && (
            <a href={settings.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-6 h-6 rounded-full border border-zinc-400 flex items-center justify-center text-[10px] font-bold hover:border-zinc-700 transition-colors">f</a>
          )}
          {settings?.socials?.linkedin && (
            <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-6 h-6 rounded-full border border-zinc-400 flex items-center justify-center text-[10px] font-bold hover:border-zinc-700 transition-colors">in</a>
          )}
          {settings?.socials?.instagram && (
            <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-6 h-6 rounded-full border border-zinc-400 flex items-center justify-center hover:border-zinc-700 transition-colors">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
          )}
        </div>
      </div>

      {/* Nav */}
      <header className="bg-[#F7F2F0]  px-6 py-4 flex items-center gap-8">
        <Link href="/" className="shrink-0">
          <img src="/logo-vinaroha.svg" alt="Vin'Aroha" className="h-9 w-auto" />
        </Link>
        <nav className="flex-1 flex items-center justify-center">
          <ul className="flex items-center gap-6">
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-xs font-semibold uppercase tracking-wide text-zinc-700 hover:text-[#c85912] transition-colors whitespace-nowrap"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {children}

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 text-xs py-8 px-6 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src="/logo-vinaroha.svg" alt="Vin'Aroha" className="h-7 w-auto brightness-0 invert" />
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-white transition-colors">CGV</Link>
            <a href="mailto:contact@vinaroha.fr" className="hover:text-white transition-colors">
              {settings?.adresse ?? 'contact@vinaroha.fr'}
            </a>
          </div>
          <Link href="/pro" className="hover:text-white transition-colors">Pro & Restaurateurs →</Link>
        </div>
        <p className="text-center text-[10px] text-zinc-600 mt-6 uppercase tracking-widest">
          L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération. +18 ans.
        </p>
      </footer>
    </>
  )
}
