import { defineField, defineType } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const proPageSchema = defineType({
  name: 'proPage',
  title: 'Page Pro & Restaurateurs',
  type: 'document',
  icon: CaseIcon,
  groups: [
    { name: 'hero', title: 'En-tête' },
    { name: 'avantages', title: 'Avantages' },
    { name: 'offre', title: 'Notre offre' },
    { name: 'commentCaMarche', title: 'Comment ça marche' },
    { name: 'temoignages', title: 'Témoignages' },
    { name: 'faq', title: 'FAQ' },
  ],
  fields: [
    // ── En-tête ──────────────────────────────────────
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Professionnels & restaurateurs', group: 'hero' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, group: 'hero' }),
    // ── Avantages ────────────────────────────────────
    defineField({ name: 'avantagesTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Pourquoi nous faire confiance', group: 'avantages' }),
    defineField({
      name: 'avantages', title: 'Avantages', type: 'array', group: 'avantages',
      of: [{
        type: 'object', name: 'avantage',
        fields: [
          defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Vins naturels sélectionnés' }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'titre' } },
      }],
    }),
    // ── Notre offre ──────────────────────────────────
    defineField({ name: 'offreTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Ce que nous proposons', group: 'offre' }),
    defineField({
      name: 'offre', title: 'Services', type: 'array', group: 'offre',
      of: [{
        type: 'object', name: 'service',
        fields: [
          defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Tarifs professionnels' }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'titre' } },
      }],
    }),
    // ── Comment ça marche ────────────────────────────
    defineField({ name: 'commentCaMarcheTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Comment ça marche ?', group: 'commentCaMarche' }),
    defineField({
      name: 'etapes', title: 'Étapes', type: 'array', group: 'commentCaMarche',
      of: [{
        type: 'object', name: 'etape',
        fields: [
          defineField({ name: 'label', title: 'Libellé', type: 'string', description: 'Ex : On échange' }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'label' } },
      }],
    }),
    // ── Témoignages ──────────────────────────────────
    defineField({ name: 'temoignagesTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Ils nous font confiance', group: 'temoignages' }),
    defineField({
      name: 'temoignages', title: 'Témoignages', type: 'array', group: 'temoignages',
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
    // ── FAQ ───────────────────────────────────────────
    defineField({ name: 'faqTitre', title: 'Titre de la section', type: 'string', description: 'Ex : FAQ', group: 'faq' }),
    defineField({
      name: 'faq', title: 'Questions / réponses', type: 'array', group: 'faq',
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
  preview: { prepare: () => ({ title: 'Page Pro & Restaurateurs' }) },
})
