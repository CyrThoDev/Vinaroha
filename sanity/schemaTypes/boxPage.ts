import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export const boxPageHeroSchema = defineType({
  name: 'boxPageHero',
  title: 'Page La Box — En-tête',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({ name: 'eyebrow', title: 'Sur-titre', type: 'string', description: 'Ex : Abonnement' }),
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : La Box' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'En-tête' }) },
})

export const boxPageOffresSchema = defineType({
  name: 'boxPageOffres',
  title: 'Page La Box — Offres',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({ name: 'offresTitre', title: 'Titre de la section', type: 'string', description: 'Ex : À chacun sa box' }),
    defineField({
      name: 'offres',
      title: 'Offres',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'offre',
          fields: [
            defineField({ name: 'nom', title: 'Nom de la formule', type: 'string', description: 'Ex : Découverte' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({ name: 'detail', title: 'Détail', type: 'string', description: 'Ex : 2 bouteilles par box' }),
            defineField({ name: 'prix', title: 'Prix', type: 'string', description: 'Ex : À partir de 25€ par mois' }),
          ],
          preview: {
            select: { title: 'nom', subtitle: 'prix' },
          },
        },
      ],
    }),
    defineField({ name: 'abonnementTitre', title: 'Ligne durées', type: 'string', description: 'Ex : Abonnements de 3, 6 ou 12 mois' }),
    defineField({ name: 'abonnementTexte', title: 'Précision tarifaire', type: 'string', description: 'Ex : Tarif dégressif suivant la durée d\'abonnement' }),
  ],
  preview: { prepare: () => ({ title: 'Offres' }) },
})

export const boxPageCommentCaMarcheSchema = defineType({
  name: 'boxPageCommentCaMarche',
  title: 'Page La Box — Comment ça marche',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({ name: 'commentCaMarcheTitre', title: 'Titre', type: 'string', description: 'Ex : Comment ça marche ?' }),
    defineField({ name: 'etape1Texte', title: 'Étape 1', type: 'string', description: 'Ex : Je m\'abonne à la box de mon choix' }),
    defineField({ name: 'etape2Texte', title: 'Étape 2', type: 'string', description: 'Ex : Je réceptionne ma commande à la cave le 10 du mois' }),
    defineField({ name: 'etape2Note', title: 'Étape 2 — précision', type: 'string', description: 'Ex : (Pas d\'expédition possible)' }),
  ],
  preview: { prepare: () => ({ title: 'Comment ça marche' }) },
})

export const boxPageTemoignageSchema = defineType({
  name: 'boxPageTemoignage',
  title: 'Page La Box — Témoignage',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({ name: 'temoignage', title: 'Citation', type: 'text', rows: 3 }),
    defineField({ name: 'temoignageAuteur', title: 'Auteur', type: 'string', description: 'Ex : Claire, cliente depuis 2024 (optionnel)' }),
  ],
  preview: { prepare: () => ({ title: 'Témoignage' }) },
})

export const boxPageFaqSchema = defineType({
  name: 'boxPageFaq',
  title: 'Page La Box — FAQ',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({ name: 'faqTitre', title: 'Titre de la section', type: 'string', description: 'Ex : FAQ' }),
    defineField({
      name: 'faq',
      title: 'Questions / réponses',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'question',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'FAQ' }) },
})
