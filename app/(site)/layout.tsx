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
  type PlageHoraire = { jours: string; heures: string }
  const settings = await client.fetch(siteSettingsQuery as string).catch(() => null) as {
    adresse?: string
    telephone?: string
    socials?: { instagram?: string; facebook?: string; linkedin?: string }
    horairesCave?: PlageHoraire[]
    horairesHalles?: PlageHoraire[]
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
      <header className="sticky top-0 z-50 bg-[#F7F2F0] border-b border-black/5 px-6 py-4 flex items-center gap-8">
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
      <footer className="bg-black text-white mt-20">

        {/* ── CORPS DU FOOTER ────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10">

          {/* Col 1 — Logo + contact + socials */}
          <div className="flex flex-col gap-6">
            <img src="/logo-vinaroha.svg" alt="Vin'Aroha" className="h-10 w-auto brightness-0 invert" />
            <div className="flex flex-col gap-3 text-sm text-white/55">
              {settings?.adresse && (
                <div className="flex items-start gap-2.5">
                  <svg className="shrink-0 mt-0.5 text-white/30" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  <span className="leading-relaxed">{settings.adresse}</span>
                </div>
              )}
              {settings?.telephone && (
                <div className="flex items-center gap-2.5">
                  <svg className="shrink-0 text-white/30" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.13 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                  <a href={`tel:${settings.telephone}`} className="hover:text-white transition-colors">{settings.telephone}</a>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <svg className="shrink-0 text-white/30" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:contact@vinaroha.fr" className="hover:text-white transition-colors">contact@vinaroha.fr</a>
              </div>
              {!settings?.adresse && (
                <p className="text-white/25 text-xs italic">Adresse à renseigner dans le studio</p>
              )}
            </div>
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3">
              {settings?.socials?.facebook && (
                <a href={settings.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold text-white/60 hover:border-orange hover:text-orange transition-colors">f</a>
              )}
              {settings?.socials?.linkedin && (
                <a href={settings.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold text-white/60 hover:border-orange hover:text-orange transition-colors">in</a>
              )}
              {settings?.socials?.instagram && (
                <a href={settings.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-orange hover:text-orange transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-orange mb-5">Navigation</p>
            <ul className="flex flex-col gap-3">
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Horaires */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-orange mb-5">Horaires</p>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-jaune mb-2">La Cave</p>
                {(settings?.horairesCave ?? []).length > 0 ? (
                  <ul className="flex flex-col gap-1.5">
                    {settings!.horairesCave!.map((p, i) => (
                      <li key={i} className="text-xs text-white/55 leading-snug">
                        <span className="text-white/80">{p.jours}</span>
                        <br />{p.heures}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-white/25 italic">À renseigner dans le studio</p>
                )}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-jaune mb-2">Les Halles</p>
                {(settings?.horairesHalles ?? []).length > 0 ? (
                  <ul className="flex flex-col gap-1.5">
                    {settings!.horairesHalles!.map((p, i) => (
                      <li key={i} className="text-xs text-white/55 leading-snug">
                        <span className="text-white/80">{p.jours}</span>
                        <br />{p.heures}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-white/25 italic">À renseigner dans le studio</p>
                )}
              </div>
            </div>
          </div>

          {/* Col 4 — Accès Pro */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-orange mb-5">Espace Pro</p>
            <div className="border border-jaune/40 rounded-2xl p-6 flex flex-col gap-4">
              <div>
                <p className="font-black uppercase text-base leading-tight mb-2">Pro & Restaurateurs</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Vous êtes professionnel de la restauration ou de l'hôtellerie&nbsp;? Accédez à notre offre dédiée&nbsp;: tarifs, commandes et accompagnement sur mesure.
                </p>
              </div>
              <Link
                href="/pro"
                className="inline-flex items-center gap-2 bg-jaune text-black font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:opacity-90 transition-opacity w-fit"
              >
                Accès espace pro
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>

        </div>

        {/* ── BAS DE PAGE ────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/30">
          <span>© {new Date().getFullYear()} Vin&apos;Aroha — Tous droits réservés</span>
          <div className="flex items-center gap-5">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-white transition-colors">CGV</Link>
          </div>
          <span className="uppercase tracking-widest text-white/20 text-[9px] text-center">
            L&apos;abus d&apos;alcool est dangereux pour la santé · +18 ans
          </span>
        </div>

      </footer>
    </>
  )
}
