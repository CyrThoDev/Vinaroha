import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const producteursPageHeroSchema = defineType({
  name: 'producteursPageHero',
  title: 'Page Producteurs — En-tête',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Nos Producteurs' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'En-tête' }) },
})

export const producteursPageRencontrerSchema = defineType({
  name: 'producteursPageRencontrer',
  title: 'Page Producteurs — Rencontre',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({ name: 'rencontrerTitre', title: 'Titre', type: 'string', description: 'Ex : Envie de rencontrer nos producteurs en vrai ?' }),
    defineField({ name: 'rencontrerTexte', title: 'Texte', type: 'text', rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'Rencontre' }) },
})

export const producteursPageGalerieSchema = defineType({
  name: 'producteursPageGalerie',
  title: 'Page Producteurs — Galerie',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'galerie',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Galerie' }) },
})
