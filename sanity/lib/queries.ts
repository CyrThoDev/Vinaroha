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
  heroCave {
    photo { asset->{ url } },
    titre,
    texte,
    ctaLabel
  },
  hero {
    image { asset->{ url } }
  },
  agendaAffiche { asset->{ url } },
  "coupsDeCoeur": coupsDeCoeur[]->{
    _id, name, appellation, prix, type,
    image { asset->{ url } },
    "producteur": producteur->{ name }
  },
  coupsDeCoeurFond { asset->{ url } }
}`

export const producteurDuMoisQuery = groq`*[_type == "producteur" && producteurDuMois == true][0]{
  _id, name, domaine, region, description, photo { asset->{ url } }
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  adresse, telephone, email, socials, horairesCave, horairesHalles
}`

const pageHeroFields = groq`titre, description, image { asset->{ url } }`

export const boxPageQuery = groq`*[_type == "boxPage"][0] { ${pageHeroFields} }`
export const producteursPageQuery = groq`*[_type == "producteursPage"][0] { ${pageHeroFields} }`
export const agendaPageQuery = groq`*[_type == "agendaPage"][0] { ${pageHeroFields} }`

export interface PageHeroData {
  titre?: string
  description?: string
  image?: { asset?: { url: string } }
}

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
