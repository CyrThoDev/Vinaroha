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
      name: 'domaine',
      title: 'Domaine',
      type: 'string',
    }),
    defineField({
      name: 'region',
      title: 'Région',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'cepages',
      title: 'Cépages',
      type: 'string',
    }),
    defineField({
      name: 'ethique',
      title: 'Éthique / Certification',
      type: 'string',
      description: 'Ex : Agriculture biologique, biodynamie, nature…',
    }),
    defineField({
      name: 'siteWeb',
      title: 'Site web',
      type: 'url',
    }),
    defineField({
      name: 'producteurDuMois',
      title: 'Producteur du mois',
      type: 'boolean',
      initialValue: false,
      description: 'Mis en avant sur la page d\'accueil',
    }),
  ],
  orderings: [
    { title: 'Nom A→Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'domaine', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ?? 'Domaine non renseigné', media }
    },
  },
})
