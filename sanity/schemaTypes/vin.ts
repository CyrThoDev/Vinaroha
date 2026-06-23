import { defineField, defineType } from 'sanity'
import { BasketIcon } from '@sanity/icons'

export const vinSchema = defineType({
  name: 'vin',
  title: 'Vin',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'vigneron',
      title: 'Vigneron',
      type: 'reference',
      to: [{ type: 'vigneron' }],
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Rouge',      value: 'rouge'      },
          { title: 'Blanc',      value: 'blanc'      },
          { title: 'Rosé',       value: 'rose'       },
          { title: 'Pétillant', value: 'petillant'  },
          { title: 'Orange',     value: 'orange'     },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'appellation',
      title: 'Appellation',
      type: 'string',
    }),
    defineField({
      name: 'millesime',
      title: 'Millésime',
      type: 'number',
    }),
    defineField({
      name: 'prix',
      title: 'Prix (€)',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coupDeCoeur',
      title: 'Coup de cœur du mois',
      type: 'boolean',
      initialValue: false,
      description: 'Mis en avant sur la page d\'accueil',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'appellation', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ?? '', media }
    },
  },
})
