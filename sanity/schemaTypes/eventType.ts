import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const eventTypeSchema = defineType({
  name: 'eventType',
  title: "Type d'événement",
  type: 'document',
  icon: TagIcon,
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
      name: 'color',
      title: 'Couleur',
      type: 'string',
      options: {
        list: [
          { title: 'Orange', value: 'orange' },
          { title: 'Vert',   value: 'vert'   },
          { title: 'Jaune',  value: 'jaune'  },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'color' },
  },
})
