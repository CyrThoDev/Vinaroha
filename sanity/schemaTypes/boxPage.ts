import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export const boxPageSchema = defineType({
  name: 'boxPage',
  title: 'Page La Box',
  type: 'document',
  icon: PackageIcon,
  groups: [
    { name: 'hero', title: 'En-tête' },
    { name: 'offres', title: 'Offres' },
    { name: 'commentCaMarche', title: 'Comment ça marche' },
    { name: 'temoignage', title: 'Témoignage' },
    { name: 'faq', title: 'FAQ' },
  ],
  fields: [
    // ── En-tête ──────────────────────────────────────
    defineField({ name: 'eyebrow', title: 'Sur-titre', type: 'string', description: 'Ex : Abonnement', group: 'hero' }),
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : La Box', group: 'hero' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, group: 'hero' }),

    // ── Offres ───────────────────────────────────────
    defineField({ name: 'offresTitre', title: 'Titre de la section', type: 'string', description: 'Ex : À chacun sa box', group: 'offres' }),
    defineField({
      name: 'offres',
      title: 'Offres',
      type: 'array',
      group: 'offres',
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
    defineField({ name: 'abonnementTitre', title: 'Ligne durées', type: 'string', description: 'Ex : Abonnements de 3, 6 ou 12 mois', group: 'offres' }),
    defineField({ name: 'abonnementTexte', title: 'Précision tarifaire', type: 'string', description: 'Ex : Tarif dégressif suivant la durée d\'abonnement', group: 'offres' }),

    // ── Comment ça marche ────────────────────────────
    defineField({ name: 'commentCaMarcheTitre', title: 'Titre', type: 'string', description: 'Ex : Comment ça marche ?', group: 'commentCaMarche' }),
    defineField({ name: 'etape1Texte', title: 'Étape 1', type: 'string', description: 'Ex : Je m\'abonne à la box de mon choix', group: 'commentCaMarche' }),
    defineField({ name: 'etape2Texte', title: 'Étape 2', type: 'string', description: 'Ex : Je réceptionne ma commande à la cave le 10 du mois', group: 'commentCaMarche' }),
    defineField({ name: 'etape2Note', title: 'Étape 2 — précision', type: 'string', description: 'Ex : (Pas d\'expédition possible)', group: 'commentCaMarche' }),

    // ── Témoignage ───────────────────────────────────
    defineField({ name: 'temoignage', title: 'Citation', type: 'text', rows: 3, group: 'temoignage' }),
    defineField({ name: 'temoignageAuteur', title: 'Auteur', type: 'string', description: 'Ex : Claire, cliente depuis 2024 (optionnel)', group: 'temoignage' }),

    // ── FAQ ──────────────────────────────────────────
    defineField({ name: 'faqTitre', title: 'Titre de la section', type: 'string', description: 'Ex : FAQ', group: 'faq' }),
    defineField({
      name: 'faq',
      title: 'Questions / réponses',
      type: 'array',
      group: 'faq',
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
  preview: { prepare: () => ({ title: 'Page La Box' }) },
})
