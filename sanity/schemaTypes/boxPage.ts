import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export const boxPageSchema = defineType({
  name: 'boxPage',
  title: 'Page La Box',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : La Box' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'Page La Box' }) },
})
