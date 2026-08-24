import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { evenementsPageQuery } from '@/sanity/lib/queries'
import type { EvenementsPageData, EvenementsSection } from '@/sanity/lib/queries'
import { EvenementsHero } from './EvenementsHero'
import { SectionFeature } from './SectionFeature'
import { CommentCaSePasse } from './CommentCaSePasse'
import { BandeauPhoto } from './BandeauPhoto'

export const metadata: Metadata = {
  title: 'Vos Événements & Cadeaux',
  description:
    "Privatisation de la cave, mariages et réceptions, cadeaux et entreprises : Vin'Aroha vous accompagne pour tous vos événements autour du vin.",
}

const SECTIONS_DEFAUT: EvenementsSection[] = [
  {
    badge: 'Privatisation de la cave',
    couleur: 'orange',
    titre: 'La cave rien que pour vous',
    texte:
      "Réservez l'espace pour une soirée entre amis, un anniversaire ou un moment d'équipe. On vous accueille comme à la maison, entouré de nos cuvées, avec de quoi grignoter et beaucoup à découvrir.",
    points: [
      'Soirées privées de 10 à 30 personnes, sur nos deux adresses',
      'Planches de saison et sélection de vins à déguster sur place',
      'Dégustation commentée en option, animée par Delphine',
    ],
    ctaLabel: 'Voir l\'ensemble de nos producteurs',
    ctaLien: '/producteurs',
  },
  {
    badge: 'Mariage et réception',
    couleur: 'green',
    titre: 'Le vin de vos grands jours',
    texte:
      "Mariage, baptême, grand anniversaire : on compose avec vous une sélection à la hauteur de l'occasion, dans votre budget, sans casse-tête. Vous choisissez l'ambiance, on choisit les bouteilles qui vont avec.",
    points: [
      'Sélection sur mesure selon vos plats et votre budget',
      'Conseil sur les quantités, pour ne manquer de rien ni gaspiller',
      'Cadeaux d\'entreprise & comités : devis, personnalisation, volumes',
    ],
    ctaLabel: 'Demander un devis',
    ctaLien: 'mailto:contact@vinaroha.com?subject=Demande de devis',
  },
  {
    badge: 'Cadeaux et entreprises',
    couleur: 'orange',
    titre: "Offrez autre chose qu'une bouteille",
    texte:
      "Un coffret pour un proche, une carte cadeau à composer soi-même, ou des attentions pour toute une équipe : on prépare des cadeaux qui ont du goût et qui font plaisir à coup sûr.",
    points: [
      "Coffrets cadeaux, cuvées naturelles choisies pour l'occasion",
      'Cartes cadeaux au montant de votre choix, en boutique ou à distance',
      'Cadeaux d\'entreprise & comités : devis, personnalisation, volumes',
    ],
    ctaLabel: 'Composer un cadeau',
    ctaLien: 'mailto:contact@vinaroha.com?subject=Composer un cadeau',
  },
]

export default async function EvenementsPage() {
  const page = await client.fetch<EvenementsPageData | null>(evenementsPageQuery as string).catch(() => null)
  const sections = page?.sections && page.sections.length > 0 ? page.sections : SECTIONS_DEFAUT

  return (
    <main>
      <EvenementsHero
        titre={page?.titre}
        description={page?.description}
        imageUrl={page?.image?.asset?.url}
      />

      {sections.map((section, i) => (
        <SectionFeature key={section.titre ?? i} {...section} imageSide={i % 2 === 0 ? 'right' : 'left'} />
      ))}

      <CommentCaSePasse titre={page?.commentCaMarcheTitre} etapes={page?.etapes} />

      <BandeauPhoto imageUrl={page?.bandeauImage?.asset?.url} />
    </main>
  )
}
