import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const producteurSchema = defineType({
  name: 'producteur',
  title: 'Producteur',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom catalogue',
      type: 'string',
      description: 'Nom du domaine, ex : Château Barouillet',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'typeArticle',
      title: 'Type article',
      type: 'string',
      options: {
        list: [
          { title: 'Vin',              value: 'vin'            },
          { title: 'Champagne',        value: 'champagne'      },
          { title: 'Effervescent',     value: 'effervescent'   },
          { title: 'Bières',           value: 'bieres'         },
          { title: 'Rhum',             value: 'rhum'           },
          { title: 'Gin',              value: 'gin'            },
          { title: 'Armagnac',         value: 'armagnac'       },
          { title: 'Whisky / Bourbon', value: 'whisky-bourbon' },
          { title: 'Soft',             value: 'soft'           },
          { title: 'Épicerie',         value: 'epicerie'       },
        ],
      },
      initialValue: 'vin',
    }),
    defineField({
      name: 'region',
      title: 'Région',
      type: 'string',
    }),
    defineField({
      name: 'appellationPrincipale',
      title: 'Appellation principale',
      type: 'string',
      description: 'Ex : Bergerac / Pécharmant',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Bio', value: 'bio' },
          { title: 'Biodynamie', value: 'biodynamie' },
          { title: 'Nature', value: 'nature' },
          { title: 'Terra Vitis / HVE', value: 'terravitis-hve' },
          { title: 'Conventionnel', value: 'conventionnel' },
        ],
      },
    }),
    defineField({
      name: 'couleur',
      title: 'Couleur',
      type: 'string',
      description: 'Filtre spécifique aux vins',
      options: {
        list: [
          { title: 'Rouge', value: 'rouge' },
          { title: 'Blanc', value: 'blanc' },
          { title: 'Rosé', value: 'rose' },
          { title: 'Pétillant', value: 'petillant' },
        ],
      },
      hidden: ({ document }) => document?.typeArticle !== 'vin',
    }),
    defineField({
      name: 'styleBiere',
      title: 'Style',
      type: 'string',
      description: 'Filtre spécifique aux bières — texte libre, ex : Blonde, Ambrée, IPA...',
      hidden: ({ document }) => document?.typeArticle !== 'bieres',
    }),
    defineField({
      name: 'sucreOuSale',
      title: 'Sucré ou salé',
      type: 'string',
      description: 'Filtre spécifique à l\'épicerie',
      options: {
        list: [
          { title: 'Sucré', value: 'sucre' },
          { title: 'Salé', value: 'sale' },
        ],
      },
      hidden: ({ document }) => document?.typeArticle !== 'epicerie',
    }),
    defineField({
      name: 'idealApero',
      title: 'Idéal pour l\'apéro',
      type: 'boolean',
      initialValue: false,
      description: 'Filtre spécifique à l\'épicerie',
      hidden: ({ document }) => document?.typeArticle !== 'epicerie',
    }),
    defineField({
      name: 'prix',
      title: 'Prix (€)',
      type: 'number',
      description: 'Utilisé pour le filtre "gamme de prix", toutes catégories',
    }),
    defineField({
      name: 'origineLocale',
      title: 'Origine locale (Landes / Sud-Ouest)',
      type: 'boolean',
      initialValue: false,
      description: 'Utilisé pour le filtre "origine locale", toutes catégories',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Descriptif domaine',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'producteurDuMois',
      title: 'Producteur du mois',
      type: 'boolean',
      initialValue: false,
      description: 'Mis en avant sur la page d\'accueil et sur la page Nos Producteurs',
    }),
  ],
  orderings: [
    { title: 'Nom A→Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'region', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ?? 'Région non renseignée', media }
    },
  },
})
