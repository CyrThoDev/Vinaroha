import { groq } from 'next-sanity'
import type { PortableTextBlock } from '@portabletext/react'

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
  _id, name, domaine, region, description, descriptionDomaine, photo { asset->{ url } }
}`

export const produitsQuery = groq`*[_type == "vin"] | order(name asc) {
  _id, name, categorie, type, region, appellation,
  image { asset->{ url } }
}`

export interface SanityProduit {
  _id: string
  name: string
  categorie: 'vin' | 'biere' | 'spiritueux' | null
  type: string | null
  region: string | null
  appellation: string | null
  image: { asset?: { url: string } } | null
}

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  adresse, telephone, email, socials, horairesCave, horairesHalles
}`

const pageHeroFields = groq`titre, description, image { asset->{ url } }`

export const producteursPageQuery = groq`*[_type == "producteursPage"][0] {
  ${pageHeroFields},
  rencontrerTitre,
  rencontrerTexte,
  galerie[] { asset->{ url } }
}`
export const agendaPageQuery = groq`*[_type == "agendaPage"][0] { ${pageHeroFields} }`

export interface ProducteursPageData extends PageHeroData {
  rencontrerTitre?: string
  rencontrerTexte?: string
  galerie?: Array<{ asset?: { url: string } }>
}

export const boxPageQuery = groq`*[_type == "boxPage"][0] {
  eyebrow,
  ${pageHeroFields},
  offresTitre,
  offres[] { nom, description, detail, prix },
  abonnementTitre,
  abonnementTexte,
  commentCaMarcheTitre,
  etape1Texte,
  etape2Texte,
  etape2Note,
  temoignage,
  temoignageAuteur,
  faqTitre,
  faq[] { question, reponse }
}`

export interface PageHeroData {
  titre?: string
  description?: string
  image?: { asset?: { url: string } }
}

export interface BoxPageData extends PageHeroData {
  eyebrow?: string
  offresTitre?: string
  offres?: Array<{ nom?: string; description?: string; detail?: string; prix?: string }>
  abonnementTitre?: string
  abonnementTexte?: string
  commentCaMarcheTitre?: string
  etape1Texte?: string
  etape2Texte?: string
  etape2Note?: string
  temoignage?: string
  temoignageAuteur?: string
  faqTitre?: string
  faq?: Array<{ question?: string; reponse?: string }>
}

export const cavePageQuery = groq`*[_type == "cavePage"][0] {
  titre,
  description,
  heroImages[] { asset->{ url } },
  valeursTitre,
  valeursTexte,
  equipeTitre,
  equipe[] { nom, photo { asset->{ url } } },
  projetsTitre,
  projetsTexte,
  projets[] { label, lien },
  galerie[] { asset->{ url } }
}`

export interface CavePageData {
  titre?: string
  description?: string
  heroImages?: Array<{ asset?: { url: string } }>
  valeursTitre?: string
  valeursTexte?: PortableTextBlock[]
  equipeTitre?: string
  equipe?: Array<{ nom?: string; photo?: { asset?: { url: string } } }>
  projetsTitre?: string
  projetsTexte?: string
  projets?: Array<{ label?: string; lien?: string }>
  galerie?: Array<{ asset?: { url: string } }>
}

export const evenementsPageQuery = groq`*[_type == "evenementsPage"][0] {
  titre,
  description,
  image { asset->{ url } },
  sections[] {
    badge, couleur, titre, texte, points, ctaLabel, ctaLien,
    image { asset->{ url } }
  },
  commentCaMarcheTitre,
  etapes[] { label, texte },
  bandeauImage { asset->{ url } }
}`

export interface EvenementsSection {
  badge?: string
  couleur?: 'yellow' | 'green' | 'orange'
  titre?: string
  texte?: string
  points?: string[]
  ctaLabel?: string
  ctaLien?: string
  image?: { asset?: { url: string } }
}

export interface EvenementsPageData {
  titre?: string
  description?: string
  image?: { asset?: { url: string } }
  sections?: EvenementsSection[]
  commentCaMarcheTitre?: string
  etapes?: Array<{ label?: string; texte?: string }>
  bandeauImage?: { asset?: { url: string } }
}

export const proPageQuery = groq`*[_type == "proPage"][0] {
  titre,
  description,
  image { asset->{ url } },
  avantagesTitre,
  avantages[] { titre, texte },
  offreTitre,
  offre[] { titre, texte },
  commentCaMarcheTitre,
  etapes[] { label, texte },
  temoignagesTitre,
  temoignages[] { citation, auteur, etablissement },
  faqTitre,
  faq[] { question, reponse }
}`

export interface ProPageData {
  titre?: string
  description?: string
  image?: { asset?: { url: string } }
  avantagesTitre?: string
  avantages?: Array<{ titre?: string; texte?: string }>
  offreTitre?: string
  offre?: Array<{ titre?: string; texte?: string }>
  commentCaMarcheTitre?: string
  etapes?: Array<{ label?: string; texte?: string }>
  temoignagesTitre?: string
  temoignages?: Array<{ citation?: string; auteur?: string; etablissement?: string }>
  faqTitre?: string
  faq?: Array<{ question?: string; reponse?: string }>
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
