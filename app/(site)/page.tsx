import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { homePageQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { FormeShape, type FormeDecorative } from '@/app/components/shapes/Shape'

type PlageHoraire = { jours: string; heures: string }

type HomePage = {
  hero?: {
    surtitre?: string; titre?: string; ctaLabel?: string; ctaUrl?: string
    image?: { asset?: { url: string } }
    forme?: FormeDecorative
  }
  vigneronDuMois?: {
    _id: string; name: string; domaine?: string; region?: string
    citation?: string; photo?: { asset?: { url: string } }
  }
  coupsDeCoeur?: Array<{
    _id: string; name: string; appellation?: string; prix?: number
    type?: string; image?: { asset?: { url: string } }
    vigneron?: { name: string }
  }>
}

type Settings = {
  horairesCave?: PlageHoraire[]
  horairesHalles?: PlageHoraire[]
}

export default async function HomePage() {
  const [homepage, settings] = await Promise.all([
    client.fetch<HomePage>(homePageQuery as string).catch(() => null),
    client.fetch<Settings>(siteSettingsQuery as string).catch(() => null),
  ])

  const hero           = homepage?.hero
  const coupsDeCoeur   = homepage?.coupsDeCoeur ?? []
  const vigneron       = homepage?.vigneronDuMois
  const horairesCave   = settings?.horairesCave ?? []
  const horairesHalles = settings?.horairesHalles ?? []
  const hasHoraires    = horairesCave.length > 0 || horairesHalles.length > 0

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-[#F7F2F0] relative overflow-hidden min-h-160 flex items-center">
        <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none">
          <FormeShape forme={hero?.forme} variant="carre" id="hero" className="w-full h-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-zinc-900 z-10">
            {hero?.surtitre ? (
              <span className="inline-block bg-[#d7ac46] text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                {hero.surtitre}
              </span>
            ) : (
              <span className="inline-block bg-[#d7ac46] text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Coffret du Supporter
              </span>
            )}
            <h1 className="text-5xl md:text-6xl font-black uppercase leading-[1.05] mb-10 whitespace-pre-line">
              {hero?.titre ?? 'Notre Box\ndu Mois'}
            </h1>
            <a
              href={hero?.ctaUrl ?? '/box'}
              className="inline-block border-2 border-[#c85912] text-[#c85912] font-black uppercase tracking-widest text-sm px-10 py-3 rounded-full hover:bg-[#c85912] hover:text-white transition-colors"
            >
              {hero?.ctaLabel ?? 'Réservez-la'}
            </a>
          </div>

          <div className="flex justify-center items-center z-10">
            {hero?.image?.asset?.url ? (
              <img src={hero.image.asset.url} alt={hero.titre ?? 'Box du mois'} className="max-h-96 object-contain drop-shadow-xl" />
            ) : (
              <div className="w-64 h-80 bg-[#e8e0dc] rounded-2xl flex items-center justify-center text-zinc-400 text-sm">
                Image produit
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── NOTRE CAVE + LES HALLES ──────────────────────────────── */}
      <section className="bg-[#F7F2F0] max-w-6xl mx-auto px-6 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#e8e0dc]">
              <img
                src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80"
                alt="Notre Cave"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-black uppercase mb-3">Notre Cave</h2>
            <p className="text-zinc-600 leading-relaxed text-sm">
              Un espace chaleureux dédié au conseil, à la découverte et au partage.
              Venez rencontrer notre équipe, déguster et repartir avec la bouteille qui vous correspond.
            </p>
          </div>

          <div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#e8e0dc]">
              <img
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80"
                alt="Les Halles"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-black uppercase mb-3">Les Halles</h2>
            <p className="text-zinc-600 leading-relaxed text-sm">
              Notre espace aux Halles de Mimizan, pour retrouver une sélection de vins au cœur du marché.
              Une adresse de proximité pour les amateurs curieux.
            </p>
          </div>
        </div>

        {/* Badge horaires */}
        <div className="md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 mt-10 md:mt-0 flex justify-center md:block">
          <div className="w-52 h-52 bg-[#6b2737] rounded-full flex flex-col items-center justify-center text-white text-center p-5 shadow-xl">
            <p className="font-black text-[10px] uppercase tracking-widest mb-2">Nos Horaires</p>
            {hasHoraires ? (
              <>
                {horairesCave.length > 0 && (
                  <div className="mb-2">
                    <p className="font-bold text-[9px] text-[#d7ac46] uppercase mb-1">La Cave</p>
                    {horairesCave.map((p, i) => (
                      <p key={i} className="text-[8px] leading-snug opacity-90">{p.jours}<br />{p.heures}</p>
                    ))}
                  </div>
                )}
                {horairesHalles.length > 0 && (
                  <div>
                    <p className="font-bold text-[9px] text-[#d7ac46] uppercase mb-1">Les Halles</p>
                    {horairesHalles.map((p, i) => (
                      <p key={i} className="text-[8px] leading-snug opacity-90">{p.jours}<br />{p.heures}</p>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="mb-2">
                  <p className="font-bold text-[9px] text-[#d7ac46] uppercase mb-1">La Cave</p>
                  <p className="text-[8px] leading-snug opacity-90">Lundi · 16h – 20h</p>
                  <p className="text-[8px] leading-snug opacity-90">Mar–Ven · 10h–13h / 16h–20h</p>
                  <p className="text-[8px] leading-snug opacity-90">Sam–Dim · 10h–13h / 16h–20h</p>
                </div>
                <div>
                  <p className="font-bold text-[9px] text-[#d7ac46] uppercase mb-1">Les Halles</p>
                  <p className="text-[8px] leading-snug opacity-90">Lundi · 16h – 20h</p>
                  <p className="text-[8px] leading-snug opacity-90">Mar–Ven · 10h–13h / 16h–20h</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── COUPS DE CŒUR ────────────────────────────────────────── */}
      <section className="bg-[#357d4f] py-20 overflow-hidden relative">
        <svg className="absolute -left-24 top-0 opacity-10 pointer-events-none" width="400" height="400" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <ellipse cx="200" cy="200" rx="200" ry="180" fill="white" />
        </svg>
        <svg className="absolute -right-24 bottom-0 opacity-10 pointer-events-none" width="350" height="350" viewBox="0 0 350 350" fill="none" aria-hidden="true">
          <ellipse cx="175" cy="175" rx="175" ry="155" fill="white" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Nos coups de cœur</h2>
            <p className="text-white/70 max-w-xl mx-auto text-sm leading-relaxed">
              Chaque mois, notre équipe sélectionne trois vins qui nous ont particulièrement touchés —
              des découvertes, des classiques revisités, des vignerons qui nous ressemblent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {coupsDeCoeur.length > 0 ? coupsDeCoeur.map((vin) => (
              <div key={vin._id} className="flex flex-col items-center text-center">
                <div className="h-64 flex items-end justify-center mb-6">
                  {vin.image?.asset?.url ? (
                    <img src={vin.image.asset.url} alt={vin.name} className="max-h-full object-contain drop-shadow-xl" />
                  ) : (
                    <div className="w-16 h-52 bg-white/10 rounded-lg" />
                  )}
                </div>
                <Link href="/vignerons" className="font-black text-white uppercase text-xs tracking-wide hover:text-[#d7ac46] transition-colors">
                  {vin.vigneron?.name ?? 'Voir le vigneron'}
                </Link>
                <p className="text-white/50 text-xs mt-1.5 leading-relaxed">
                  {vin.name}{vin.appellation ? ` · ${vin.appellation}` : ''}{vin.prix ? ` · ${vin.prix} €` : ''}
                </p>
              </div>
            )) : [1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="h-64 flex items-end justify-center mb-6">
                  <div className="w-16 h-52 bg-white/10 rounded-lg" />
                </div>
                <Link href="/vignerons" className="font-black text-white uppercase text-xs tracking-wide hover:text-[#d7ac46] transition-colors">
                  Lien vers la page nos vignerons
                </Link>
                <p className="text-white/30 text-xs mt-1.5">À renseigner dans le studio</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIGNERON DU MOIS ─────────────────────────────────────── */}
      {vigneron && (
        <section className="bg-[#F7F2F0] max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#c85912] mb-4">Vigneron du mois</p>
              <h2 className="text-4xl font-black uppercase mb-2">{vigneron.name}</h2>
              {vigneron.domaine && <p className="text-zinc-500 text-sm">{vigneron.domaine}</p>}
              {vigneron.region  && <p className="text-zinc-500 text-sm mb-6">{vigneron.region}</p>}
              {vigneron.citation && (
                <blockquote className="border-l-4 border-[#c85912] pl-5 text-zinc-700 italic text-sm leading-relaxed mb-8">
                  &ldquo;{vigneron.citation}&rdquo;
                </blockquote>
              )}
              <Link href="/vignerons" className="inline-block border-2 border-zinc-900 text-zinc-900 font-black uppercase tracking-widest text-xs px-8 py-3 rounded-full hover:bg-zinc-900 hover:text-white transition-colors">
                Découvrir ses vins
              </Link>
            </div>
            {vigneron.photo?.asset?.url && (
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img src={vigneron.photo.asset.url} alt={vigneron.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── BANDEAU LÉGAL ────────────────────────────────────────── */}
      <div className="bg-red-50 border-t border-red-100 text-center py-4 px-6">
        <p className="text-red-700 text-xs font-medium uppercase tracking-wide">
          L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération. Interdit aux moins de 18 ans.
        </p>
      </div>

    </main>
  )
}
