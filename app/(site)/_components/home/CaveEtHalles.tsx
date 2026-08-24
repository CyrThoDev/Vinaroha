import Link from 'next/link'
import { Asset } from '@/app/components/Asset'

type PlageHoraire = { jours: string; heures: string }

type CaveEtHallesProps = {
  horairesCave: PlageHoraire[]
  horairesHalles: PlageHoraire[]
  photoUrl?: string
  titre?: string
  texte?: string
  ctaLabel?: string
}

export function CaveEtHalles({ horairesCave, horairesHalles, photoUrl, titre, texte, ctaLabel }: CaveEtHallesProps) {
  return (
    <section className=" max-w-7xl mx-auto bg-background overflow-hidden">

      {/* ── Hero full-bleed : image + texte ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 items-center relative">

        {/* Image — plein bord gauche, aucune contrainte de largeur */}
        <Asset
          name="topandbottom"
          imageUrl={photoUrl ?? '/images/photo_acceuil_hero.png'}
          alt="L'équipe Vin'Aroha"
          className="w-full flex justify-center [&_svg]:w-auto [&_svg]:h-auto [&_svg]:max-h-128 [&_svg]:max-w-full [&_svg]:block"
        />

        {/* Titre + texte + CTA */}
        <div className="flex flex-col gap-4 px-6 md:px-0 py-12 md:py-16">
          <h1 className="font-accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none uppercase text-zinc-900">
            {titre ?? 'Poussez la porte de notre cave'}
          </h1>
          <p className="max-w-md">
            {texte ?? "Une équipe passionnée vous accueille pour vous guider dans la découverte de vins naturels, bio et biodynamiques choisis avec soin auprès de producteurs engagés."}
          </p>
          <span
            aria-disabled="true"
            className="font-semibold text-2xl font-fontjek text-zinc-400 w-fit flex items-center gap-2 border-b border-zinc-300 pb-0.5 cursor-not-allowed"
          >
            {ctaLabel ?? 'Découvrir la cave'} &nbsp;⟶
          </span>
        </div>

        {/* Badge horaires — cercle centré en flux sur mobile, flottant en absolu dès md */}
        <div className="md:hidden flex items-center justify-center py-6">
          <div className="w-52 h-52 rounded-full bg-orange text-white flex flex-col items-center justify-center text-center p-5 shadow-xl">
            <p className="font-accent text-2xl font-bold mb-1">Horaires</p>
            <p className="text-[0.75rem] font-black uppercase  text-white/70 mb-1">Côté Cave</p>
            {horairesCave.length > 0 ? horairesCave.map((p, i) => (
              <p key={i} className="text-[0.75rem] leading-snug">{p.jours}<br />{p.heures}</p>
            )) : (
              <p className="text-[0.75rem] leading-snug">Mer–Sam<br />10h–12h30 / 16h–19h30</p>
            )}
            <p className="text-[0.75rem] font-black uppercase  text-white/70 mt-2 mb-1">Côté Halles</p>
            {horairesHalles.length > 0 ? horairesHalles.map((p, i) => (
              <p key={i} className="text-[0.75rem] leading-snug">{p.jours}<br />{p.heures}</p>
            )) : (
              <p className="text-[0.75rem] leading-snug">Sam, Dim & Jours fériés<br />9h30–13h</p>
            )}
          </div>
        </div>

        {/* Badge horaires — absolu en bas de la grille hero, dès md */}
        <div className="hidden md:flex absolute -bottom-10 right-10 translate-y-1/2 w-52 h-52 rounded-full bg-orange text-white flex-col items-center justify-center text-center p-5 shadow-xl z-10">
          <p className="font-accent text-2xl font-bold mb-1">Horaires</p>
          <p className="text-[0.75rem] font-black uppercase  text-white/70 mb-1">Côté Cave</p>
          {horairesCave.length > 0 ? horairesCave.map((p, i) => (
            <p key={i} className="text-[0.75rem] leading-snug">{p.jours}<br />{p.heures}</p>
          )) : (
            <p className="text-[0.75rem] leading-snug">Mer–Sam<br />10h–12h30 / 16h–19h30</p>
          )}
          <p className="text-[0.75rem] font-black uppercase  text-white/70 mt-2 mb-1">Côté Halles</p>
          {horairesHalles.length > 0 ? horairesHalles.map((p, i) => (
            <p key={i} className="text-[0.75rem] leading-snug">{p.jours}<br />{p.heures}</p>
          )) : (
            <p className="text-[0.75rem] leading-snug">Sam, Dim & Jours fériés<br />9h30–13h</p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 ">
        {/* ── Grille 2×2 : La Cave (gauche) face à sa photo (droite), puis photo Halles (gauche) face aux Halles (droite) ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">

          {/* [1,1] Texte La Cave */}
          <div className="order-1 flex flex-col gap-4 justify-center">
            <span className="inline-block bg-yellow rounded-lg font-accent font-bold text-2xl px-5 py-2 text-zinc-900 w-fit">
              La Cave
            </span>
            <p className="text-zinc-600">
              Un espace chaleureux dédié au conseil, à la découverte et au partage.
              Venez rencontrer notre équipe, déguster et repartir avec la bouteille qui vous correspond.
              Nous sélectionnons des vins naturels et vivants, avec une attention particulière au terroir.
            </p>
          </div>

          {/* [1,2] Photo La Cave */}
          <div className="order-2 aspect-video rounded-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=700&q=80"
              alt="Notre Cave"
              className="w-full h-full object-cover"
            />
          </div>

          {/* [2,2] Texte Les Halles — avant sa photo sur mobile, après sur desktop */}
          <div className="order-3 md:order-4 flex flex-col gap-4 justify-center">
            <span className="inline-block bg-yellow rounded-lg font-accent font-bold text-2xl px-5 py-2 text-zinc-900 w-fit">
              Les Halles
            </span>
            <p className="text-zinc-600">
              Notre espace aux Halles de Mimizan, pour retrouver une sélection de vins au cœur du marché.
              Une adresse de proximité pour les amateurs curieux. Venez nous rendre visite le week-end.
            </p>
          </div>

          {/* [2,1] Photo Les Halles */}
          <div className="order-4 md:order-3 aspect-video rounded-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&q=80"
              alt="Les Halles de Mimizan"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Feuille décorative centrée — visible dès md, la mise en page 2x2 seule justifie son positionnement */}
          <Asset
            name="leaf"
            color="#357d4f"
            color2="#EBB132"
            className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 w-48 [&_svg]:w-full [&_svg]:h-auto"
          />

        </div>
      </div>
    </section>
  )
}
