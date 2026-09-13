import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const agendaPageHeroSchema = defineType({
  name: 'agendaPageHero',
  title: 'Page Agenda — En-tête',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: "Ex : L'Agenda" }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'En-tête' }) },
})

export const agendaPageEvenementsSchema = defineType({
  name: 'agendaPageEvenements',
  title: 'Page Agenda — Nos événements',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({ name: 'evenementsTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Nos événements' }),
    defineField({
      name: 'evenements',
      title: 'Types d\'événements',
      type: 'array',
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
  preview: { prepare: () => ({ title: 'Nos événements' }) },
})
