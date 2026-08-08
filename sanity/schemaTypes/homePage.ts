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
      title: 'La Box (Abonnement)',
      type: 'object',
      description: "Contenu de la section « La Box » de la page d'accueil.",
      fields: [
        defineField({ name: 'image', title: 'Photo de la Box', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'ctaLabel', title: 'Texte du bouton', type: 'string', description: 'Ex : Découvrez la box' }),
        defineField({ name: 'ctaUrl', title: 'Lien du bouton', type: 'url' }),
      ],
    }),
    defineField({
      name: 'agendaAffiche',
      title: 'Affiche — Les prochaines dates',
      type: 'image',
      options: { hotspot: true },
      description: "Visuel affiché dans la section « Les prochaines dates » de la page d'accueil, indépendant de l'affiche des événements.",
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
