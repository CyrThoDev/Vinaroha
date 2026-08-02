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
              color2="#EBB132"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 w-48 [&_svg]:w-full [&_svg]:h-auto"
            />

          </div>
        </div>
      </section>

      {/* ── 3. ABONNEMENT LA BOX ─────────────────────────────────── */}
      <section className="bg-orange text-white overflow-hidden relative">
        <div className="pointer-events-none absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #c85912 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
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

      {/* ── 4. LES PROCHAINES DATES ──────────────────────────────── */}
      <section className="bg-green text-white py-16 overflow-hidden relative">
        {/* Bouteille décorative haut droite */}
        <Asset
          name="bouteille"
          color="#ffffff"
          className="absolute top-4 right-6 w-24 opacity-30 pointer-events-none [&_svg]:w-full [&_svg]:h-auto"
        />
        <div className="relative max-w-6xl mx-auto px-6">
          <h2 className="font-accent text-5xl uppercase leading-none mb-10">Les prochaines dates</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Col gauche — affiche du 1er événement */}
            <div className="aspect-square overflow-hidden rounded-sm bg-white/10">
              {nextEvents[0]?.image?.asset?.url ? (
                <img src={nextEvents[0].image.asset.url} alt={nextEvents[0].title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-xs italic">Affiche à venir</div>
              )}
            </div>

            {/* Col droite — liste + CTA */}
            <div className="flex flex-col">
              <div className="divide-y divide-white/20">
                {nextEvents.length > 0 ? nextEvents.map((ev) => {
                  const { day, date } = fmtDate(ev.date)
                  return (
                    <div key={ev._id} className="py-6 flex gap-8 items-start">
                      <span className="font-black uppercase text-yellow shrink-0 w-28 text-sm">{day} {date}</span>
                      <div>
                        <p className="font-black leading-tight">{ev.title}</p>
                        {ev.location && <p className="text-white/60 text-sm italic mt-0.5">avec {ev.location}</p>}
                      </div>
                    </div>
                  )
                }) : (
                  <p className="py-6 text-white/40 italic">Aucun événement à venir pour le moment.</p>
                )}
              </div>

              <Link
                href="/agenda"
                className="mt-10 font-accent text-3xl text-white flex items-center gap-4 border-b border-white/40 pb-2 w-fit hover:border-white transition-colors"
              >
                Voir tout l&apos;agenda &nbsp;⟶
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. VIGNERON DU MOIS ──────────────────────────────────── */}
      <section className="bg-background py-16 px-6 overflow-hidden relative">

        {/* Bouteille déco bas-gauche */}
        <div className="absolute bottom-0 left-0 pointer-events-none select-none">
          <Asset name="bouteille" color="#E56B00" className="w-20 opacity-50 [&_svg]:w-full [&_svg]:h-auto" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Col gauche — texte */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="font-accent text-5xl md:text-6xl uppercase leading-none text-zinc-900">
                  Le vigneron du mois
                </h2>
                <p className="font-accent text-2xl uppercase text-orange mt-3">
                  {vigneron?.name ?? 'Vigneron du mois'}
                </p>
                {(vigneron?.domaine || vigneron?.region) && (
                  <p className="text-zinc-500 text-sm mt-1">
                    {[vigneron.domaine, vigneron.region].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>

              {vigneron?.citation ? (
                <p className="text-zinc-600 leading-relaxed">{vigneron.citation}</p>
              ) : (
                <p className="text-zinc-400 italic text-sm">Renseignez la citation dans le studio Sanity</p>
              )}

              <Link
                href="/vignerons"
                className="font-script text-2xl text-zinc-800 flex items-center gap-3 border-b border-zinc-300 pb-1 w-fit hover:border-zinc-900 transition-colors group"
              >
                Voir l&apos;ensemble de nos vignerons
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Link>
            </div>

            {/* Col droite — photo topandbottom + leaf déco */}
            <div className="relative">
              {/* Leaf déco haut-droite */}
              <div className="absolute -top-6 -right-6 pointer-events-none select-none z-10">
                <Asset name="leaf" color="#E56B00" color2="#EBB132" className="w-28 [&_svg]:w-full [&_svg]:h-auto" />
              </div>

              {vigneron?.photo?.asset?.url ? (
                <Asset
                  name="topandbottom"
                  imageUrl={vigneron.photo.asset.url}
                  alt={vigneron.name}
                  className="w-full [&_svg]:w-full [&_svg]:h-auto"
                />
              ) : (
                <div className="aspect-square rounded-3xl bg-zinc-100 flex items-center justify-center">
                  <p className="text-zinc-300 text-xs">Photo à ajouter dans le studio</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. NOS COUPS DE CŒUR ─────────────────────────────────── */}
      <section className="bg-green py-16 px-6 overflow-hidden relative">

        {/* Leaf déco haut-droite */}
        <div className="absolute top-8 -right-4 pointer-events-none select-none">
          <Asset name="leaf" color="#E56B00" color2="#EBB132" className="w-32 opacity-70 [&_svg]:w-full [&_svg]:h-auto" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <h2 className="font-accent text-5xl md:text-6xl uppercase text-white leading-none mb-14">
            Nos coups de cœur
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coupsDeCoeur.length > 0 ? coupsDeCoeur.map((vin) => (
              <div key={vin._id} className="bg-background rounded-3xl overflow-hidden flex flex-col">
                <div className="flex items-end justify-center pt-10 pb-6 px-8 min-h-56">
                  {vin.image?.asset?.url ? (
                    <img src={vin.image.asset.url} alt={vin.name} className="max-h-44 object-contain drop-shadow-lg" />
                  ) : (
                    <div className="w-14 h-44 bg-zinc-200 rounded-lg" />
                  )}
                </div>
                <div className="bg-white px-6 py-5 flex flex-col gap-1 flex-1">
                  <p className="font-black uppercase text-xs tracking-widest text-zinc-900">{vin.name}</p>
                  {vin.appellation && <p className="text-zinc-500 text-xs">{vin.appellation}</p>}
                  {vin.vigneron?.name && <p className="text-zinc-400 text-xs">{vin.vigneron.name}</p>}
                  {vin.prix && <p className="font-black text-orange text-sm mt-2">{vin.prix}&nbsp;€</p>}
                </div>
              </div>
            )) : [0, 1, 2].map((i) => (
              <div key={i} className="bg-background rounded-3xl overflow-hidden flex flex-col">
                <div className="flex items-end justify-center pt-10 pb-6 px-8 min-h-56">
                  <div className="w-14 h-44 bg-zinc-200 rounded-lg" />
                </div>
                <div className="bg-white px-6 py-5 flex flex-col gap-1 flex-1">
                  <p className="font-black uppercase text-xs tracking-widest text-zinc-900">Vin d&apos;Aroha</p>
                  <p className="text-zinc-300 text-xs italic">À renseigner dans le studio</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. VOS ÉVÉNEMENTS & CADEAUX ─────────────────────────── */}
      <section className="bg-background py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-accent text-5xl uppercase leading-none mb-4 text-zinc-900">
            Vos événements et cadeaux
          </h2>
          <p className="text-zinc-500 max-w-xl mb-12">
            Privatisation, mariages, séminaires ou coffrets cadeaux — nous imaginons avec vous des moments autour du vin, sur mesure et inoubliables.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { label: 'Privatisation de la cave', href: '/evenements' },
              { label: 'Mariages et réceptions',   href: '/evenements' },
              { label: 'Cadeaux et entreprises',   href: '/evenements' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="relative group block">
                <Asset
                  name="square"
                  color="#357d4f"
                  className="w-full [&_svg]:w-full [&_svg]:h-auto"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 text-center">
                  <p className="font-accent text-2xl uppercase leading-tight mb-3">{label}</p>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. PRO / RESTAURATEURS ───────────────────────────────── */}
      <section className="bg-background pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="border border-zinc-300 rounded-lg px-10 py-12 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <p className="text-2xl font-black font-fontjek text-yellow italic mb-3">
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

      {/* ── 8. NEWSLETTER ────────────────────────────────────────── */}
      <section className="bg-yellow py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-accent text-5xl uppercase leading-none mb-4 text-zinc-900">Restez informés&nbsp;!</h2>
            <p className="text-zinc-700 max-w-sm">
              Nouveaux arrivages, événements à la cave, coups de cœur du mois — une fois par mois, dans votre boîte mail.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

    </main>
  )
}
