import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const producteursPageSchema = defineType({
  name: 'producteursPage',
  title: 'Page Producteurs',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { name: 'hero', title: 'En-tête' },
    { name: 'rencontrer', title: 'Rencontre' },
    { name: 'galerie', title: 'Galerie' },
  ],
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Nos Producteurs', group: 'hero' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({ name: 'rencontrerTitre', title: 'Titre', type: 'string', description: 'Ex : Envie de rencontrer nos producteurs en vrai ?', group: 'rencontrer' }),
    defineField({ name: 'rencontrerTexte', title: 'Texte', type: 'text', rows: 3, group: 'rencontrer' }),
    defineField({
      name: 'galerie',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      group: 'galerie',
    }),
  ],
  preview: { prepare: () => ({ title: 'Page Producteurs' }) },
})
