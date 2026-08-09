import { groq } from 'next-sanity'

const eventFields = groq`
  _id,
  title,
  description,
  "slug": slug.current,
  date,
  endDate,
  location,
  "eventType": eventType->{ _id, name, "slug": slug.current, color },
  yurplanUrl,
  image { asset->{ url, metadata { dimensions } } }
`

export const eventsQuery = groq`*[_type == "event" && date >= now()] | order(date asc) { ${eventFields} }`

export const allEventsQuery = groq`*[_type == "event"] | order(date asc) { ${eventFields} }`

export interface SanityEventType {
  _id: string
  name: string
  slug: string
  color: string
}

export const homePageQuery = groq`*[_type == "homePage"][0] {
  hero {
    ctaLabel,
    ctaUrl,
    image { asset->{ url } }
  },
  agendaAffiche { asset->{ url } },
  "coupsDeCoeur": coupsDeCoeur[]->{
    _id, name, appellation, prix, type,
    image { asset->{ url } },
    "vigneron": vigneron->{ name }
  }
}`

export const vigneronDuMoisQuery = groq`*[_type == "vigneron" && vigneronDuMois == true][0]{
  _id, name, domaine, region, description, photo { asset->{ url } }
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  adresse, telephone, email, socials, horairesCave, horairesHalles
}`

export interface SanityEvent {
  _id: string
  title: string
  description: string | null
  slug: string
  date: string
  endDate: string | null
  location: string | null
  eventType: SanityEventType | null
  yurplanUrl: string | null
  image: { asset: { url: string; metadata: { dimensions: { width: number; height: number } } } } | null
}
