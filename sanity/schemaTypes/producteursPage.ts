import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const producteursPageSchema = defineType({
  name: 'producteursPage',
  title: 'Page Producteurs',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Nos Producteurs' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'Page Producteurs' }) },
})
