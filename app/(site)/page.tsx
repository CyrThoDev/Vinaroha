import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { homePageQuery, siteSettingsQuery, eventsQuery } from '@/sanity/lib/queries'
import type { SanityEvent } from '@/sanity/lib/queries'
import { Asset } from '@/app/components/Asset'
import { NewsletterForm } from '@/app/components/NewsletterForm'

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Vin'Aroha, votre cave à vins naturels à Mimizan (Landes). Découvrez nos sélections de vignerons engagés, notre box vin mensuelle et nos prochains événements.",
  openGraph: {
    title: "Vin'Aroha — Cave à vins naturels, Mimizan",
    description:
      "Votre cave à vins naturels à Mimizan. Box vin, dégustations, masterclasses et rencontres vignerons.",
  },
}

type PlageHoraire = { jours: string; heures: string }

type HomePage = {
  hero?: { surtitre?: string; titre?: string; ctaLabel?: string; ctaUrl?: string; image?: { asset?: { url: string } } }
  vigneronDuMois?: { _id: string; name: string; domaine?: string; region?: string; citation?: string; photo?: { asset?: { url: string } } }
  coupsDeCoeur?: Array<{ _id: string; name: string; appellation?: string; prix?: number; type?: string; image?: { asset?: { url: string } }; vigneron?: { name: string } }>
}

type Settings = {
  horairesCave?: PlageHoraire[]
  horairesHalles?: PlageHoraire[]
}

function fmtDate(iso: string) {
  const d = new Date(iso)
  return {
    day: d.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase().replace('.', ''),
    date: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).toUpperCase(),
  }
}

export default async function HomePage() {
  const [homepage, settings, events] = await Promise.all([
    client.fetch<HomePage>(homePageQuery as string).catch(() => null),
    client.fetch<Settings>(siteSettingsQuery as string).catch(() => null),
    client.fetch<SanityEvent[]>(eventsQuery as string).catch(() => []),
  ])

  const hero         = homepage?.hero
  const coupsDeCoeur = homepage?.coupsDeCoeur ?? []
  const vigneron     = homepage?.vigneronDuMois
  const horairesCave    = settings?.horairesCave   ?? []
  const horairesHalles  = settings?.horairesHalles ?? []
  const nextEvents   = events.slice(0, 3)

  return (
    <main>

      {/* ── 1 & 2. CAVE + HALLES ─────────────────────────────────── */}
      <section className=" max-w-7xl mx-auto bg-background overflow-hidden">

        {/* ── Hero full-bleed : image + texte ── */}
        <div className=" grid grid-cols-1 md:grid-cols-2 items-center relative">

          {/* Image — plein bord gauche, aucune contrainte de largeur */}
          <Asset
            name="topandbottom"
            imageUrl="/images/photo_acceuil_hero.png"
            alt="L'équipe Vin'Aroha"
            className="w-full flex justify-center [&_svg]:w-auto [&_svg]:h-auto [&_svg]:max-h-[40rem] [&_svg]:max-w-full [&_svg]:block"
          />

          {/* Titre + texte + CTA */}
          <div className="  flex flex-col gap-6 relative px-8 py-16 md:px-12">
            <h2 className="font-accent text-6xl md:text-7xl lg:text-8xl leading-none uppercase text-zinc-900">
              Poussez la porte de notre cave
            </h2>
            <p className="max-w-md">
              Une équipe passionnée vous accueille pour vous guider dans la découverte de vins naturels,
              bio et biodynamiques choisis avec soin auprès de vignerons engagés.
            </p>
            <Link
              href="/cave"
              className="font-semibold text-black hover:text-orange transition-colors w-fit flex items-center gap-2 border-b border-zinc-400 pb-0.5 hover:border-orange"
            >
              Découvrir la cave &nbsp;⟶
            </Link>

            {/* Badge horaires */}
            <div className="absolute -right-6 bottom-8 md:-right-10 md:bottom-12 w-48 h-48 rounded-full bg-orange text-white flex flex-col items-center justify-center text-center p-5 shadow-xl z-10">
              <p className="font-accent text-lg font-bold mb-1">Horaires</p>
              <p className="text-[0.5rem] font-black uppercase tracking-widest text-white/70 mb-1">Côté Cave</p>
              {horairesCave.length > 0 ? horairesCave.map((p, i) => (
                <p key={i} className="text-[0.5rem] leading-snug">{p.jours}<br />{p.heures}</p>
              )) : (
                <p className="text-[0.5rem] leading-snug">Mer–Sam<br />10h–12h30 / 16h–19h30</p>
              )}
              <p className="text-[0.5rem] font-black uppercase tracking-widest text-white/70 mt-2 mb-1">Côté Halles</p>
              {horairesHalles.length > 0 ? horairesHalles.map((p, i) => (
                <p key={i} className="text-[0.5rem] leading-snug">{p.jours}<br />{p.heures}</p>
              )) : (
                <p className="text-[0.5rem] leading-snug">Sam, Dim & Jours fériés<br />9h30–13h</p>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* ── Grille bas : LA CAVE / LES HALLES en mosaïque ── */}
          <div className="relative grid grid-cols-2 gap-6">

            {/* Col gauche */}
            <div className="flex flex-col gap-6">
              {/* Badge LA CAVE */}
              <div>
                <span className="inline-block bg-yellow rounded-lg border-yellow/60  font-accent font-bold text-2xl px-5 py-2 text-zinc-900">
                  La Cave
                </span>
              </div>
              <p className="text-zinc-600  ">
                Un espace chaleureux dédié au conseil, à la découverte et au partage.
                Venez rencontrer notre équipe, déguster et repartir avec la bouteille qui vous correspond.
                Nous sélectionnons des vins naturels et vivants, avec une attention particulière au terroir.
              </p>
              {/* Photo les halles (bas gauche) */}
              <div className="aspect-4/3 rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&q=80"
                  alt="Les Halles de Mimizan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Col droite */}
            <div className="flex flex-col gap-6 mt-12">
              {/* Photo la cave (haut droite) */}
              <div className="aspect-4/3 rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=700&q=80"
                  alt="Notre Cave"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Badge LES HALLES */}
              <div>
                <span className="inline-block bg-yellow border rounded-lg border-yellow/60 font-accent font-bold text-2xl px-5 py-2 text-zinc-900">
                  Les Halles
                </span>
              </div>
              <p className="text-zinc-600  ">
                Notre espace aux Halles de Mimizan, pour retrouver une sélection de vins au cœur du marché.
                Une adresse de proximité pour les amateurs curieux. Venez nous rendre visite le week-end.
              </p>
            </div>

            {/* Feuille décorative centrée */}
            <Asset
              name="leaf"
              color="#357d4f"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 w-24 [&_svg]:w-full [&_svg]:h-auto"
            />

          </div>
        </div>
      </section>

      {/* ── 3. ABONNEMENT LA BOX ─────────────────────────────────── */}
      <section className="bg-orange text-white overflow-hidden relative">
        <div className="pointer-events-none absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #c85912 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[0.625rem] font-black uppercase tracking-[0.25em] text-orange mb-2">Abonnement</p>
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-none">La Box</h2>
            </div>
            <p className="text-white/60   max-w-md">
              {hero?.surtitre ?? 'Chaque mois, une sélection de cuvées naturelles choisies par Delphine, accompagnée des histoires de vins et ceux qui les font. À déguster chez vous ou à offrir.'}
            </p>
            <a
              href={hero?.ctaUrl ?? '/box'}
              className="inline-block border-2 border-white/40 text-white font-black uppercase tracking-widest text-xs px-10 py-3.5 rounded-lg hover:border-white hover:bg-white hover:text-black transition-all w-fit"
            >
              {hero?.ctaLabel ?? 'Découvrir la box'}
            </a>
          </div>
          <div className="flex items-center justify-center">
            {hero?.image?.asset?.url ? (
              <img src={hero.image.asset.url} alt="La Box" className="max-h-80 object-contain drop-shadow-2xl" />
            ) : (
              <div className="w-48 h-72 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-white/20 text-xs">
                Visuel box
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. NOS COUPS DE CŒUR ─────────────────────────────────── */}
      <section className="bg-green py-20 overflow-hidden relative">
        <svg className="absolute -left-24 top-0 opacity-10 pointer-events-none" width="400" height="400" viewBox="0 0 400 400"><ellipse cx="200" cy="200" rx="200" ry="180" fill="white" /></svg>
        <svg className="absolute -right-24 bottom-0 opacity-10 pointer-events-none" width="350" height="350" viewBox="0 0 350 350"><ellipse cx="175" cy="175" rx="175" ry="155" fill="white" /></svg>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-5">Nos coups de cœur</h2>
            <p className="text-white/70 max-w-xl mx-auto  ">
              Chaque mois, notre équipe sélectionne trois vins qui nous ont particulièrement touchés —
              des découvertes, des classiques revisités, des vignerons qui nous ressemblent.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {coupsDeCoeur.length > 0 ? coupsDeCoeur.map((vin) => (
              <div key={vin._id} className="flex flex-col items-center text-center">
                <div className="h-64 flex items-end justify-center mb-6">
                  {vin.image?.asset?.url
                    ? <img src={vin.image.asset.url} alt={vin.name} className="max-h-full object-contain drop-shadow-xl" />
                    : <div className="w-16 h-52 bg-white/10 rounded-lg" />}
                </div>
                <Link href="/vignerons" className="font-black text-white uppercase text-xs tracking-wide hover:text-yellow transition-colors">
                  {vin.vigneron?.name ?? 'Voir le vigneron'}
                </Link>
                <p className="text-white/50 text-xs mt-1.5 ">
                  {vin.name}{vin.appellation ? ` · ${vin.appellation}` : ''}{vin.prix ? ` · ${vin.prix} €` : ''}
                </p>
              </div>
            )) : [1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="h-64 flex items-end justify-center mb-6">
                  <div className="w-16 h-52 bg-white/10 rounded-lg" />
                </div>
                <p className="font-black text-white uppercase text-xs tracking-wide">Vin d&apos;Aroha</p>
                <p className="text-white/30 text-xs mt-1.5">À renseigner dans le studio</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. VIGNERON DU MOIS ──────────────────────────────────── */}
      {vigneron && (
        <section className="bg-background max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-orange mb-4">Le vigneron du mois</p>
              <h2 className="text-4xl font-black uppercase mb-2">{vigneron.name}</h2>
              {vigneron.domaine && <p className="text-zinc-500 ">{vigneron.domaine}</p>}
              {vigneron.region  && <p className="text-zinc-500  mb-6">{vigneron.region}</p>}
              {vigneron.citation && (
                <blockquote className="border-l-4 border-orange pl-5 text-zinc-700 italic   mb-8">
                  &ldquo;{vigneron.citation}&rdquo;
                </blockquote>
              )}
              <Link href="/vignerons" className="inline-block border-2 border-zinc-900 text-zinc-900 font-black uppercase tracking-widest text-xs px-8 py-3 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors">
                Voir l&apos;ensemble de nos vignerons
              </Link>
            </div>
            {vigneron.photo?.asset?.url && (
              <div className="aspect-3/4 rounded-2xl overflow-hidden">
                <img src={vigneron.photo.asset.url} alt={vigneron.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 6. LES PROCHAINES DATES ──────────────────────────────── */}
      <section className="bg-orange text-white py-20 overflow-hidden relative">
        <svg className="absolute -right-20 top-0 opacity-10 pointer-events-none" width="400" height="400" viewBox="0 0 400 400"><ellipse cx="200" cy="200" rx="200" ry="180" fill="white" /></svg>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">Les prochaines<br />dates</h2>
            <Link href="/agenda" className="text-xs font-black uppercase tracking-widest text-white/70 hover:text-white transition-colors">
              Voir tous les événements →
            </Link>
          </div>

          {nextEvents.length > 0 ? (
            <div className="flex flex-col divide-y divide-white/20">
              {nextEvents.map((ev) => {
                const { day, date } = fmtDate(ev.date)
                return (
                  <div key={ev._id} className="flex items-center gap-6 py-5">
                    {/* Date pill */}
                    <div className="shrink-0 w-20 text-center">
                      <p className="text-[0.625rem] font-black uppercase tracking-widest text-white/60">{day}</p>
                      <p className="text-lg font-black leading-tight">{date}</p>
                    </div>
                    <div className="w-px h-8 bg-white/20 shrink-0" />
                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <p className="font-black uppercase  leading-tight truncate">{ev.title}</p>
                      {ev.location && <p className="text-white/60 text-xs mt-0.5">{ev.location}</p>}
                    </div>
                    {/* CTA */}
                    {ev.yurplanUrl && (
                      <a href={ev.yurplanUrl} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 border border-white/40 text-white font-black uppercase tracking-widest text-[0.625rem] px-5 py-2 rounded-lg hover:bg-white hover:text-orange transition-colors">
                        Réserver
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-white/40  italic">Aucun événement à venir pour le moment.</p>
          )}
        </div>
      </section>

      {/* ── 7. NEWSLETTER ────────────────────────────────────────── */}
      <section className="bg-yellow py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
          <div>
            <h2 className="text-2xl font-black uppercase mb-2">Restez informés</h2>
            <p className="text-zinc-600  max-w-md mx-auto">
              Nouveaux arrivages, événements à la cave, coups de cœur du mois — une fois par mois, dans votre boîte mail.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {/* ── 8. PRO / RESTAURATEURS ───────────────────────────────── */}
      <section className="bg-background py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="border border-zinc-300 rounded-lg px-10 py-12 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <p className="text-2xl font-black text-orange italic mb-3">
                Professionnels, restaurateurs&nbsp;?
              </p>
              <p className="text-zinc-500   max-w-sm">
                Un espace dédié pour vos commandes, tarifs pros et sélections pour vos cartes.
              </p>
            </div>
            <Link
              href="/pro"
              className="shrink-0 font-black uppercase tracking-widest  text-black hover:text-orange transition-colors flex items-center gap-2"
            >
              Votre espace dédié
              <span className="text-base">→</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
