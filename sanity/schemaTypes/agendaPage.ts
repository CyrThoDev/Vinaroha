import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const agendaPageSchema = defineType({
  name: 'agendaPage',
  title: 'Page Agenda',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    { name: 'hero', title: 'En-tête' },
    { name: 'evenements', title: 'Nos événements' },
  ],
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: "Ex : L'Agenda", group: 'hero' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({ name: 'evenementsTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Nos événements', group: 'evenements' }),
    defineField({
      name: 'evenements',
      title: 'Types d\'événements',
      type: 'array',
      group: 'evenements',
      of: [{
        type: 'object', name: 'typeEvenement',
        fields: [
          defineField({ name: 'label', title: 'Titre', type: 'string', description: 'Ex : Dégustations' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'ctaLabel', title: 'Libellé du lien (optionnel)', type: 'string', description: 'Ex : Découvrir nos producteurs' }),
          defineField({ name: 'ctaLien', title: 'Lien', type: 'string', description: 'Ex : /producteurs' }),
        ],
        preview: { select: { title: 'label', media: 'image' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Page Agenda' }) },
})
