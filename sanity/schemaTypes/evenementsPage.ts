import { defineField, defineType } from 'sanity'
import { HeartIcon } from '@sanity/icons'

export const evenementsPageHeroSchema = defineType({
  name: 'evenementsPageHero',
  title: 'Page Vos Événements & Cadeaux — En-tête',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Vos événements & cadeaux' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'En-tête' }) },
})

export const evenementsPageSectionsSchema = defineType({
  name: 'evenementsPageSections',
  title: 'Page Vos Événements & Cadeaux — Sections',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{
        type: 'object', name: 'section',
        fields: [
          defineField({ name: 'badge', title: 'Badge', type: 'string', description: 'Ex : Privatisation de la cave' }),
          defineField({
            name: 'couleur', title: 'Couleur du badge', type: 'string',
            options: { list: [{ title: 'Jaune', value: 'yellow' }, { title: 'Vert', value: 'green' }, { title: 'Orange', value: 'orange' }], layout: 'radio' },
            initialValue: 'yellow',
          }),
          defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : La cave rien que pour vous' }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
          defineField({ name: 'points', title: 'Points clés', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'ctaLabel', title: "Libellé du lien", type: 'string', description: 'Ex : Demander un devis' }),
          defineField({ name: 'ctaLien', title: 'Lien', type: 'string', description: 'Ex : /producteurs ou mailto:contact@vinaroha.com' }),
          defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'titre', subtitle: 'badge', media: 'image' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Sections' }) },
})

export const evenementsPageCommentCaMarcheSchema = defineType({
  name: 'evenementsPageCommentCaMarche',
  title: 'Page Vos Événements & Cadeaux — Comment ça se passe',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({ name: 'commentCaMarcheTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Comment ça se passe ?' }),
    defineField({
      name: 'etapes',
      title: 'Étapes',
      type: 'array',
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
  preview: { prepare: () => ({ title: 'Comment ça se passe' }) },
})

export const evenementsPageBandeauSchema = defineType({
  name: 'evenementsPageBandeau',
  title: 'Page Vos Événements & Cadeaux — Bandeau photo',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({ name: 'bandeauImage', title: 'Photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'Bandeau photo' }) },
})
