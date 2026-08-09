import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePageSchema = defineType({
  name: 'homePage',
  title: "Page d'accueil",
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroCave',
      title: 'Hero — Poussez la porte de notre cave',
      type: 'object',
      description: "Grande section d'ouverture de la page d'accueil (photo + titre + texte + bouton vers la Cave).",
      fields: [
        defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Poussez la porte de notre cave' }),
        defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
        defineField({ name: 'ctaLabel', title: 'Texte du bouton', type: 'string', description: 'Ex : Découvrir la cave' }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'La Box (Abonnement)',
      type: 'object',
      description: "Contenu de la section « La Box » de la page d'accueil.",
      fields: [
        defineField({ name: 'image', title: 'Photo de la Box', type: 'image', options: { hotspot: true } }),
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
    defineField({
      name: 'coupsDeCoeurFond',
      title: 'Image de fond — Nos coups de cœur',
      type: 'image',
      options: { hotspot: true },
      description: "Visuel affiché en fond (semi-transparent) de la section « Nos coups de cœur ».",
    }),
  ],
  preview: { prepare: () => ({ title: "Page d'accueil" }) },
})
