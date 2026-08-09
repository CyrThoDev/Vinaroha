import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { homePageQuery, siteSettingsQuery, eventsQuery, producteurDuMoisQuery } from '@/sanity/lib/queries'
import type { SanityEvent } from '@/sanity/lib/queries'
import { CaveEtHalles } from './_components/home/CaveEtHalles'
import { BoxAbonnement } from './_components/home/BoxAbonnement'
import { ProchainesDates } from './_components/home/ProchainesDates'
import { ProducteurDuMois } from './_components/home/ProducteurDuMois'
import { CoupsDeCoeur } from './_components/home/CoupsDeCoeur'
import { EvenementsEtCadeaux } from './_components/home/EvenementsEtCadeaux'
import { ProRestaurateurs } from './_components/home/ProRestaurateurs'
import { Newsletter } from './_components/home/Newsletter'

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Vin'Aroha, votre cave à vins naturels à Mimizan (Landes). Découvrez nos sélections de producteurs engagés, notre box vin mensuelle et nos prochains événements.",
  openGraph: {
    title: "Vin'Aroha — Cave à vins naturels, Mimizan",
    description:
      "Votre cave à vins naturels à Mimizan. Box vin, dégustations, masterclasses et rencontres producteurs.",
  },
}

type PlageHoraire = { jours: string; heures: string }

type HomePage = {
  heroCave?: { photo?: { asset?: { url: string } }; titre?: string; texte?: string; ctaLabel?: string }
  hero?: { image?: { asset?: { url: string } } }
  agendaAffiche?: { asset?: { url: string } }
  coupsDeCoeur?: Array<{ _id: string; name: string; appellation?: string; prix?: number; type?: string; image?: { asset?: { url: string } }; producteur?: { name: string } }>
  coupsDeCoeurFond?: { asset?: { url: string } }
}

type Producteur = { _id: string; name: string; domaine?: string; region?: string; description?: PortableTextBlock[]; photo?: { asset?: { url: string } } }

type Settings = {
  horairesCave?: PlageHoraire[]
  horairesHalles?: PlageHoraire[]
}

export default async function HomePage() {
  const [homepage, settings, events, producteur] = await Promise.all([
    client.fetch<HomePage>(homePageQuery as string).catch(() => null),
    client.fetch<Settings>(siteSettingsQuery as string).catch(() => null),
    client.fetch<SanityEvent[]>(eventsQuery as string).catch(() => []),
    client.fetch<Producteur | null>(producteurDuMoisQuery as string).catch(() => null),
  ])

  const hero         = homepage?.hero
  const heroCave     = homepage?.heroCave
  const coupsDeCoeur = homepage?.coupsDeCoeur ?? []
  const horairesCave    = settings?.horairesCave   ?? []
  const horairesHalles  = settings?.horairesHalles ?? []
  const nextEvents   = events.slice(0, 5)

  return (
    <main>
      <CaveEtHalles
        horairesCave={horairesCave}
        horairesHalles={horairesHalles}
        photoUrl={heroCave?.photo?.asset?.url}
        titre={heroCave?.titre}
        texte={heroCave?.texte}
        ctaLabel={heroCave?.ctaLabel}
      />
      <BoxAbonnement imageUrl={hero?.image?.asset?.url} />
      <ProchainesDates events={nextEvents} posterUrl={homepage?.agendaAffiche?.asset?.url} />
      <ProducteurDuMois producteur={producteur ?? undefined} />
      <CoupsDeCoeur vins={coupsDeCoeur} backgroundImageUrl={homepage?.coupsDeCoeurFond?.asset?.url} />
      <EvenementsEtCadeaux />
      <ProRestaurateurs />
      <Newsletter />
    </main>
  )
}
