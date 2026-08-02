import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePageSchema = defineType({
  name: 'homePage',
  title: "Page d'accueil",
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'surtitre', title: 'Sur-titre', type: 'string', description: 'Ex : Coffret du Supporter' }),
        defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Notre Box du Mois' }),
        defineField({ name: 'image', title: 'Image du produit', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'ctaLabel', title: 'Texte du bouton', type: 'string', description: 'Ex : Réservez-la' }),
        defineField({ name: 'ctaUrl', title: 'Lien du bouton', type: 'url' }),
        defineField({ name: 'forme', title: 'Forme décorative', type: 'formeDecorative' }),
      ],
    }),
    defineField({
      name: 'vigneronDuMois',
      title: 'Vigneron du mois',
      type: 'reference',
      to: [{ type: 'vigneron' }],
    }),
    defineField({
      name: 'coupsDeCoeur',
      title: 'Coups de cœur du mois',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'vin' }] }],
      validation: (r) => r.max(3),
      description: '3 vins maximum',
    }),
  ],
  preview: { prepare: () => ({ title: "Page d'accueil" }) },
})
