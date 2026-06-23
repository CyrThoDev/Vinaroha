import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const eventSchema = defineType({
  name: 'event',
  title: 'Événement',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date de début',
      type: 'datetime',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Date de fin',
      type: 'datetime',
      options: { dateFormat: 'DD/MM/YYYY', timeFormat: 'HH:mm' },
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Affiche',
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
      name: 'yurplanUrl',
      title: 'Lien Yurplan',
      type: 'url',
      description: 'URL de billetterie sur Yurplan',
    }),
    defineField({
      name: 'eventType',
      title: "Type d'événement",
      type: 'reference',
      to: [{ type: 'eventType' }],
    }),
  ],
  orderings: [
    {
      title: 'Date (prochains en premier)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      location: 'location',
      media: 'image',
    },
    prepare({ title, date, location, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
        : 'Sans date'
      return {
        title,
        subtitle: location ? `${formattedDate} · ${location}` : formattedDate,
        media,
      }
    },
  },
})
