import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { homePageQuery, siteSettingsQuery, eventsQuery, vigneronDuMoisQuery } from '@/sanity/lib/queries'
import type { SanityEvent } from '@/sanity/lib/queries'
import { CaveEtHalles } from './_components/home/CaveEtHalles'
import { BoxAbonnement } from './_components/home/BoxAbonnement'
import { ProchainesDates } from './_components/home/ProchainesDates'
import { VigneronDuMois } from './_components/home/VigneronDuMois'
import { CoupsDeCoeur } from './_components/home/CoupsDeCoeur'
import { EvenementsEtCadeaux } from './_components/home/EvenementsEtCadeaux'
import { ProRestaurateurs } from './_components/home/ProRestaurateurs'
import { Newsletter } from './_components/home/Newsletter'

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
  hero?: { ctaLabel?: string; ctaUrl?: string; image?: { asset?: { url: string } } }
  agendaAffiche?: { asset?: { url: string } }
  coupsDeCoeur?: Array<{ _id: string; name: string; appellation?: string; prix?: number; type?: string; image?: { asset?: { url: string } }; vigneron?: { name: string } }>
}

type Vigneron = { _id: string; name: string; domaine?: string; region?: string; description?: PortableTextBlock[]; photo?: { asset?: { url: string } } }

type Settings = {
  horairesCave?: PlageHoraire[]
  horairesHalles?: PlageHoraire[]
}

export default async function HomePage() {
  const [homepage, settings, events, vigneron] = await Promise.all([
    client.fetch<HomePage>(homePageQuery as string).catch(() => null),
    client.fetch<Settings>(siteSettingsQuery as string).catch(() => null),
    client.fetch<SanityEvent[]>(eventsQuery as string).catch(() => []),
    client.fetch<Vigneron | null>(vigneronDuMoisQuery as string).catch(() => null),
  ])

  const hero         = homepage?.hero
  const coupsDeCoeur = homepage?.coupsDeCoeur ?? []
  const horairesCave    = settings?.horairesCave   ?? []
  const horairesHalles  = settings?.horairesHalles ?? []
  const nextEvents   = events.slice(0, 5)

  return (
    <main>
      <CaveEtHalles horairesCave={horairesCave} horairesHalles={horairesHalles} />
      <BoxAbonnement ctaUrl={hero?.ctaUrl} ctaLabel={hero?.ctaLabel} imageUrl={hero?.image?.asset?.url} />
      <ProchainesDates events={nextEvents} posterUrl={homepage?.agendaAffiche?.asset?.url} />
      <VigneronDuMois vigneron={vigneron ?? undefined} />
      <CoupsDeCoeur vins={coupsDeCoeur} />
      <EvenementsEtCadeaux />
      <ProRestaurateurs />
      <Newsletter />
    </main>
  )
}
