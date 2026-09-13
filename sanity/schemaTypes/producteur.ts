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
