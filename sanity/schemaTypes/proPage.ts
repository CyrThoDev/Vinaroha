import { defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const proPageHeroSchema = defineType({
  name: 'proPageHero',
  title: 'Page Pro & Restaurateurs — En-tête',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Professionnels & restaurateurs' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'En-tête' }) },
})

export const proPageAvantagesSchema = defineType({
  name: 'proPageAvantages',
  title: 'Page Pro & Restaurateurs — Avantages',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({ name: 'avantagesTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Pourquoi nous faire confiance' }),
    defineField({
      name: 'avantages', title: 'Avantages', type: 'array',
      of: [{
        type: 'object', name: 'avantage',
        fields: [
          defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Vins naturels sélectionnés' }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'titre' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Avantages' }) },
})

export const proPageOffreSchema = defineType({
  name: 'proPageOffre',
  title: 'Page Pro & Restaurateurs — Notre offre',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({ name: 'offreTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Ce que nous proposons' }),
    defineField({
      name: 'offre', title: 'Services', type: 'array',
      of: [{
        type: 'object', name: 'service',
        fields: [
          defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Tarifs professionnels' }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'titre' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Notre offre' }) },
})

export const proPageCommentCaMarcheSchema = defineType({
  name: 'proPageCommentCaMarche',
  title: 'Page Pro & Restaurateurs — Comment ça marche',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({ name: 'commentCaMarcheTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Comment ça marche ?' }),
    defineField({
      name: 'etapes', title: 'Étapes', type: 'array',
      of: [{
        type: 'object', name: 'etape',
        fields: [
          defineField({ name: 'label', title: 'Libellé', type: 'string', description: 'Ex : On échange' }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'label' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Comment ça marche' }) },
})

export const proPageTemoignagesSchema = defineType({
  name: 'proPageTemoignages',
  title: 'Page Pro & Restaurateurs — Témoignages',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({ name: 'temoignagesTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Ils nous font confiance' }),
    defineField({
      name: 'temoignages', title: 'Témoignages', type: 'array',
      of: [{
        type: 'object', name: 'temoignage',
        fields: [
          defineField({ name: 'citation', title: 'Citation', type: 'text', rows: 3 }),
          defineField({ name: 'auteur', title: 'Auteur', type: 'string', description: 'Ex : Julien' }),
          defineField({ name: 'etablissement', title: 'Établissement', type: 'string', description: 'Ex : Restaurant Le Comptoir' }),
        ],
        preview: { select: { title: 'auteur', subtitle: 'etablissement' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Témoignages' }) },
})

export const proPageFaqSchema = defineType({
  name: 'proPageFaq',
  title: 'Page Pro & Restaurateurs — FAQ',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({ name: 'faqTitre', title: 'Titre de la section', type: 'string', description: 'Ex : FAQ' }),
    defineField({
      name: 'faq', title: 'Questions / réponses', type: 'array',
      of: [{
        type: 'object', name: 'question',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'question' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'FAQ' }) },
})
