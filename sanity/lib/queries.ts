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
  intervenant,
  tarif,
  surReservation,
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
    _id, name, region, appellationPrincipale,
    photo { asset->{ url } }
  },
  coupsDeCoeurFond { asset->{ url } }
}`

export const producteurDuMoisQuery = groq`*[_type == "producteur" && producteurDuMois == true][0]{
  _id, name, region, appellationPrincipale, description, photo { asset->{ url } }
}`

export const producteursListQuery = groq`*[_type == "producteur"] | order(name asc) {
  _id, name, typeArticle, region, appellationPrincipale, certifications, description, photo { asset->{ url } },
  couleur, styleBiere, sucreOuSale, idealApero, prix, origineLocale
}`

export interface SanityProducteur {
  _id: string
  name: string
  typeArticle: string | null
  region: string | null
  appellationPrincipale: string | null
  certifications: string[] | null
  description: PortableTextBlock[] | null
  photo: { asset?: { url: string } } | null
  couleur: string | null
  styleBiere: string | null
  sucreOuSale: string | null
  idealApero: boolean | null
  prix: number | null
  origineLocale: boolean | null
}


export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  adresse, telephone, whatsapp, email, latitude, longitude, latitudeHalles, longitudeHalles, socials, horairesCave, horairesHalles
}`

const pageHeroFields = groq`titre, description, image { asset->{ url } }`

// Fusionne les sections d'une page découpée en plusieurs documents (un par section
// dans le Studio) en un seul objet plat, dans la forme attendue par les composants.
export function mergeSections<T>(sections: Record<string, unknown>): T {
  return Object.assign({}, ...Object.values(sections)) as T
}

export const producteursPageQuery = groq`{
  "hero": *[_type == "producteursPageHero"][0] { ${pageHeroFields} },
  "rencontrer": *[_type == "producteursPageRencontrer"][0] { rencontrerTitre, rencontrerTexte },
  "galerieDoc": *[_type == "producteursPageGalerie"][0] { galerie[] { asset->{ url } } }
}`
export const agendaPageQuery = groq`{
  "hero": *[_type == "agendaPageHero"][0] { ${pageHeroFields} },
  "evenementsDoc": *[_type == "agendaPageEvenements"][0] {
    evenementsTitre,
    evenements[] { label, description, image { asset->{ url } }, ctaLabel, ctaLien }
  }
}`

export interface AgendaPageData extends PageHeroData {
  evenementsTitre?: string
  evenements?: Array<{
    label?: string
    description?: string
    image?: { asset?: { url: string } }
    ctaLabel?: string
    ctaLien?: string
  }>
}

export interface ProducteursPageData extends PageHeroData {
  rencontrerTitre?: string
  rencontrerTexte?: string
  galerie?: Array<{ asset?: { url: string } }>
}

export const boxPageQuery = groq`{
  "hero": *[_type == "boxPageHero"][0] { eyebrow, ${pageHeroFields} },
  "offresDoc": *[_type == "boxPageOffres"][0] {
    offresTitre,
    offres[] { nom, description, detail, prix },
    abonnementTitre,
    abonnementTexte
  },
  "commentCaMarche": *[_type == "boxPageCommentCaMarche"][0] {
    commentCaMarcheTitre, etape1Texte, etape2Texte, etape2Note
  },
  "temoignageDoc": *[_type == "boxPageTemoignage"][0] { temoignage, temoignageAuteur },
  "faqDoc": *[_type == "boxPageFaq"][0] { faqTitre, faq[] { question, reponse } }
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

export const cavePageQuery = groq`{
  "hero": *[_type == "cavePageHero"][0] { titre, description, heroImages[] { asset->{ url } } },
  "valeurs": *[_type == "cavePageValeurs"][0] { valeursTitre, valeursTexte, valeursImage { asset->{ url } } },
  "equipe": *[_type == "cavePageEquipe"][0] { equipeTitre, equipe[] { nom, description, photo { asset->{ url } } } },
  "projets": *[_type == "cavePageProjets"][0] { projetsEyebrow, projetsTitre, projetsTexte, projetsCtaLabel, projetsCtaLien, projets[] { label, description, lien } },
  "avisDoc": *[_type == "cavePageAvis"][0] { avisTitre, googleNote, googleAvisCount, googleUrl, avis[] { citation, auteur } },
  "galerieDoc": *[_type == "cavePageGalerie"][0] { galerie[] { asset->{ url } } }
}`

export interface CavePageData {
  titre?: string
  description?: string
  heroImages?: Array<{ asset?: { url: string } }>
  valeursTitre?: string
  valeursTexte?: PortableTextBlock[]
  valeursImage?: { asset?: { url: string } }
  equipeTitre?: string
  equipe?: Array<{ nom?: string; description?: string; photo?: { asset?: { url: string } } }>
  projetsEyebrow?: string
  projetsTitre?: string
  projetsTexte?: string
  projetsCtaLabel?: string
  projetsCtaLien?: string
  projets?: Array<{ label?: string; description?: string; lien?: string }>
  avisTitre?: string
  googleNote?: number
  googleAvisCount?: number
  googleUrl?: string
  avis?: Array<{ citation?: string; auteur?: string }>
  galerie?: Array<{ asset?: { url: string } }>
}

export const evenementsPageQuery = groq`{
  "hero": *[_type == "evenementsPageHero"][0] { titre, description, image { asset->{ url } } },
  "sectionsDoc": *[_type == "evenementsPageSections"][0] {
    sections[] {
      badge, couleur, titre, texte, points, ctaLabel, ctaLien,
      image { asset->{ url } }
    }
  },
  "commentCaMarche": *[_type == "evenementsPageCommentCaMarche"][0] { commentCaMarcheTitre, etapes[] { label, texte } },
  "bandeau": *[_type == "evenementsPageBandeau"][0] { bandeauImage { asset->{ url } } }
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

export const proPageQuery = groq`{
  "hero": *[_type == "proPageHero"][0] { titre, description, image { asset->{ url } } },
  "avantagesDoc": *[_type == "proPageAvantages"][0] { avantagesTitre, avantages[] { titre, texte } },
  "offreDoc": *[_type == "proPageOffre"][0] { offreTitre, offre[] { titre, texte } },
  "commentCaMarche": *[_type == "proPageCommentCaMarche"][0] { commentCaMarcheTitre, etapes[] { label, texte } },
  "temoignagesDoc": *[_type == "proPageTemoignages"][0] { temoignagesTitre, temoignages[] { citation, auteur, etablissement } },
  "faqDoc": *[_type == "proPageFaq"][0] { faqTitre, faq[] { question, reponse } }
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
  intervenant: string | null
  tarif: string | null
  surReservation: boolean | null
  eventType: SanityEventType | null
  yurplanUrl: string | null
  image: { asset: { url: string; metadata: { dimensions: { width: number; height: number } } } } | null
}
