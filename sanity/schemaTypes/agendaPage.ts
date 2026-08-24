import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const agendaPageSchema = defineType({
  name: 'agendaPage',
  title: 'Page Agenda',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: "Ex : L'Agenda" }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'Page Agenda' }) },
})
