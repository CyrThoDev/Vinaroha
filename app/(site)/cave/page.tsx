import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { cavePageQuery, mergeSections, siteSettingsQuery } from '@/sanity/lib/queries'
import type { CavePageData } from '@/sanity/lib/queries'
import { CaveHero } from './CaveHero'
import { InfosPratiques } from './InfosPratiques'
import { VosValeurs } from './VosValeurs'
import { DecouvrirProducteurs } from './DecouvrirProducteurs'
import { NotreEquipe } from './NotreEquipe'
import { LaCaveProjets } from './LaCaveProjets'
import { AvisClients } from './AvisClients'
import { Galerie } from './Galerie'
import { ProRestaurateurs } from '../_components/ProRestaurateurs'
import { getGoogleReviews } from '@/app/lib/googlePlaces'

export const revalidate = 30

export const metadata: Metadata = {
  title: 'La Cave',
  description:
    "La cave Vin'Aroha à Mimizan : un lieu de rencontre et de dégustation autour de vins naturels, bio et biodynamiques choisis avec soin.",
}

type SiteSettings = {
  adresse?: string
  telephone?: string
  latitude?: number
  longitude?: number
  latitudeHalles?: number
  longitudeHalles?: number
  horairesCave?: Array<{ jours?: string; heures?: string }>
  horairesHalles?: Array<{ jours?: string; heures?: string }>
}

// Fiche Google Business de la cave — volontairement en dur (pas modifiable depuis le Studio).
const GOOGLE_PLACE_ID = 'ChIJUwi7LzKPUw0R4bPDQxb8Iy8'

export default async function CavePage() {
  const [raw, settings] = await Promise.all([
    client.fetch<Record<string, unknown> | null>(cavePageQuery as string).catch(() => null),
    client.fetch<SiteSettings | null>(siteSettingsQuery as string).catch(() => null),
  ])
  const page = raw ? mergeSections<CavePageData>(raw) : null
  const googleReviews = await getGoogleReviews(GOOGLE_PLACE_ID)

  return (
    <main>
      <CaveHero
        images={(page?.heroImages ?? []).map(i => i.asset?.url).filter((u): u is string => Boolean(u))}
      />
      <InfosPratiques
        titre={page?.titre}
        description={page?.description}
        adresse={settings?.adresse}
        telephone={settings?.telephone}
        latitude={settings?.latitude}
        longitude={settings?.longitude}
        latitudeHalles={settings?.latitudeHalles}
        longitudeHalles={settings?.longitudeHalles}
        horairesCave={settings?.horairesCave}
        horairesHalles={settings?.horairesHalles}
      />
       <NotreEquipe titre={page?.equipeTitre} equipe={page?.equipe} />
      <VosValeurs titre={page?.valeursTitre} texte={page?.valeursTexte} imageUrl={page?.valeursImage?.asset?.url} />
     
      <DecouvrirProducteurs />
      <AvisClients
        titre={page?.avisTitre}
        googleNote={googleReviews?.note ?? page?.googleNote}
        googleAvisCount={googleReviews?.avisCount ?? page?.googleAvisCount}
        googleUrl={googleReviews?.url ?? page?.googleUrl}
        avis={googleReviews?.avis ?? page?.avis}
      />
            <LaCaveProjets
              eyebrow={page?.projetsEyebrow}
              titre={page?.projetsTitre}
              texte={page?.projetsTexte}
              ctaLabel={page?.projetsCtaLabel}
              ctaLien={page?.projetsCtaLien}
              projets={page?.projets}
            />

      <ProRestaurateurs />
      <Galerie images={(page?.galerie ?? []).map(i => i.asset?.url).filter((u): u is string => Boolean(u))} />
    </main>
  )
}
