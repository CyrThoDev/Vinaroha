import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { CookieBanner } from '@/app/components/CookieBanner'
import { AgeBanner } from '@/app/components/AgeBanner'
import { MobileNav } from '@/app/components/MobileNav'
import { Asset } from '@/app/components/Asset'

const NAV = [
  { label: 'La Box',                   href: '/box'         },
  { label: 'La Cave',                  href: '/cave'        },
  { label: 'Nos Vignerons',            href: '/vignerons'   },
  { label: 'Agenda',                   href: '/agenda'      },
  { label: 'Vos Événements & Cadeaux', href: '/evenements'  },
]

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  type PlageHoraire = { jours: string; heures: string }
  const settings = await client.fetch(siteSettingsQuery as string).catch(() => null) as {
    adresse?: string
    telephone?: string
    socials?: { instagram?: string; facebook?: string; linkedin?: string }
    horairesCave?: PlageHoraire[]
    horairesHalles?: PlageHoraire[]
  } | null

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LiquorStore',
    name: "Vin'Aroha",
    description:
      "Cave à vins naturels et de terroir à Mimizan (Landes). Dégustations, masterclasses, rencontres vignerons et box vin mensuelle.",
    url: 'https://vinaroha.com',
    email: 'contact@vinaroha.com',
    ...(settings?.telephone ? { telephone: settings.telephone } : {}),
    ...(settings?.adresse
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: settings.adresse,
            addressLocality: 'Mimizan',
            postalCode: '40200',
            addressCountry: 'FR',
          },
        }
      : {
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Mimizan',
            postalCode: '40200',
            addressCountry: 'FR',
          },
        }),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.2008,
      longitude: -1.2319,
    },
    priceRange: '€€',
    servesCuisine: 'Vins naturels, vins de terroir',
    ...(settings?.socials
      ? {
          sameAs: [
            settings.socials.instagram,
            settings.socials.facebook,
            settings.socials.linkedin,
          ].filter(Boolean),
        }
      : {}),
    image: 'https://vinaroha.com/og-image.jpg',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Barre adresse & réseaux sociaux */}
      <div className="bg-black px-6 py-2 flex justify-between items-center gap-2.5">
        {/* Adresse */}
        {settings?.adresse ? (
          <p className="text-background/60 text-xs flex items-center gap-1.5">
            <svg className="shrink-0" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            {settings.adresse}
          </p>
        ) : (
          <span />
        )}
        {/* Réseaux sociaux */}
        <div className="flex items-center gap-2.5">
          {settings?.socials?.instagram && (
            <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="#357d4f" stroke="none"/></svg>
            </a>
          )}
          {settings?.socials?.facebook && (
            <a href={settings.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-8 h-8 bg-background rounded-full flex items-center justify-center font-black text-black hover:opacity-80 transition-opacity">f</a>
          )}
          {/* Fallback affiché si aucun réseau n'est encore renseigné dans Sanity */}
          {!settings?.socials && (
            <>
              <span className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="#357d4f" stroke="none"/></svg>
              </span>
              <span className="w-8 h-8 bg-background rounded-full flex items-center justify-center font-black text-black">f</span>
            </>
          )}
        </div>
      </div>

      {/* Zone logo */}
      <div className="bg-background py-10 hidden md:flex flex-col items-center justify-center">
        <Link href="/">
          <img src="/logo-vinaroha.svg" alt="Vin'Aroha" className="w-72 h-auto" />
        </Link>
      </div>

      {/* Nav sticky */}
      <header className="sticky top-0 z-50 bg-background px-6 pb-10">
        {/* Desktop */}
        <nav className="hidden md:flex items-center justify-center">
          <ul className="flex items-center gap-12">
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-accent text-xl leading-relaxed uppercase hover:text-yellow transition-colors backgroundspace-nowrap"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Mobile */}
        <div className="md:hidden flex items-center justify-between">
          <Link href="/">
            <img src="/logo-vinaroha.svg" alt="Vin'Aroha" className="h-8 w-auto" />
          </Link>
          <MobileNav />
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="bg-black text-background">

        {/* ── CORPS DU FOOTER ────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-12 grid grid-cols-1 sm:grid-cols-3 gap-10 border-b border-background/10">

          {/* Col 1 — Logo + email + socials */}
          <div className="flex flex-col gap-6">
            <Asset name="logo2" color="#FCF7EA" className="self-start [&_svg]:h-28 [&_svg]:w-auto" />
            <a href="mailto:contact@vinaroha.com" className="self-center text-background hover:text-background underline text-sm transition-colors">
              contact@vinaroha.com
            </a>
            <div className="self-center flex items-center gap-3">
              {settings?.socials?.instagram && (
                <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-9 h-9 bg-background rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#232526" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="#232526" stroke="none"/></svg>
                </a>
              )}
              {settings?.socials?.facebook && (
                <a href={settings.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="w-9 h-9 bg-background rounded-full flex items-center justify-center font-black text-black hover:opacity-80 transition-opacity">f</a>
              )}
              {!settings?.socials && (
                <>
                  <span className="w-9 h-9 bg-background rounded-full flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#232526" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="#232526" stroke="none"/></svg>
                  </span>
                  <span className="w-9 h-9 bg-background rounded-full flex items-center justify-center font-black text-black">f</span>
                </>
              )}
            </div>
          </div>

          {/* Col 2 — Horaires */}
          <div className="flex flex-col items-center gap-6">
            <div>
              <p className="font-script text-2xl mb-1">La cave</p>
              {(settings?.horairesCave ?? []).length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {settings!.horairesCave!.map((p, i) => (
                    <li key={i} className="text-sm text-background/60">{p.jours} {p.heures}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-background/25 italic">À renseigner dans le studio</p>
              )}
            </div>
            <div>
              <p className="font-script text-2xl mb-1">Les Halles</p>
              {(settings?.horairesHalles ?? []).length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {settings!.horairesHalles!.map((p, i) => (
                    <li key={i} className="text-sm text-background/60">{p.jours} {p.heures}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-background/25 italic">À renseigner dans le studio</p>
              )}
            </div>
          </div>

          {/* Col 3 — Navigation */}
          <div>
            <ul className="flex flex-col items-end gap-3">
              <li><Link href="/cave" className="text-background/60 hover:text-background transition-colors">La cave</Link></li>
              <li><Link href="/vignerons" className="text-background/60 hover:text-background transition-colors">Nos vignerons</Link></li>
              <li><Link href="/agenda" className="text-background/60 hover:text-background transition-colors">L&apos;agenda</Link></li>
              <li><Link href="/evenements" className="text-background/60 hover:text-background transition-colors">Vos évènements et cadeaux</Link></li>
            </ul>
          </div>

        </div>

      </footer>
      <AgeBanner />
      <CookieBanner />

      {/* Bandeau orange fixe — copyright + légal alcool */}
      <div className="h-8" aria-hidden="true" />
      <div className="fixed bottom-0 inset-x-0 z-[60] bg-orange py-1.5 select-none">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
          <span className="text-[0.5625rem] text-white/70 shrink-0">© {new Date().getFullYear()} Vin&apos;Aroha</span>
          <span className="text-[0.5625rem] uppercase tracking-widest text-white/90 text-center">
            L&apos;abus d&apos;alcool est dangereux pour la santé · Interdit aux moins de 18 ans
          </span>
          <div className="flex gap-4 shrink-0">
            <Link href="/mentions-legales" className="text-[0.5625rem] text-white/70 hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/cgv" className="text-[0.5625rem] text-white/70 hover:text-white transition-colors">CGV</Link>
          </div>
        </div>
in      </div>
    </>
  )
}
