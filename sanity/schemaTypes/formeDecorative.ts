import { defineField, defineType } from 'sanity'

export const formeDecorativeSchema = defineType({
  name: 'formeDecorative',
  title: 'Forme décorative',
  type: 'object',
  fields: [
    defineField({
      name: 'remplissage',
      title: 'Remplissage',
      type: 'string',
      options: {
        list: [
          { title: 'Couleur de la charte', value: 'couleur' },
          { title: 'Image', value: 'image' },
        ],
        layout: 'radio',
      },
      initialValue: 'couleur',
    }),
    defineField({
      name: 'couleur',
      title: 'Couleur',
      type: 'string',
      options: {
        list: [
          { title: 'Orange', value: 'orange' },
          { title: 'Vert', value: 'vert' },
          { title: 'Jaune', value: 'jaune' },
        ],
        layout: 'radio',
      },
      hidden: ({ parent }) => parent?.remplissage !== 'couleur',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.remplissage !== 'image',
    }),
  ],
  preview: {
    select: { remplissage: 'remplissage', couleur: 'couleur' },
    prepare({ remplissage, couleur }) {
      return { title: 'Forme décorative', subtitle: remplissage === 'image' ? 'Image' : `Couleur : ${couleur ?? '—'}` }
    },
  },
})
