import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

const plageHoraire = defineType({
  name: 'plageHoraire',
  type: 'object',
  fields: [
    defineField({ name: 'jours', title: 'Jours', type: 'string' }),
    defineField({ name: 'heures', title: 'Heures', type: 'string' }),
  ],
  preview: { select: { title: 'jours', subtitle: 'heures' } },
})

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'adresse',
      title: 'Adresse',
      type: 'string',
    }),
    defineField({
      name: 'telephone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'socials',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
      ],
    }),
    defineField({
      name: 'horairesCave',
      title: 'Horaires — La Cave',
      type: 'array',
      of: [{ type: 'plageHoraire' }],
    }),
    defineField({
      name: 'horairesHalles',
      title: 'Horaires — Les Halles',
      type: 'array',
      of: [{ type: 'plageHoraire' }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Paramètres du site' }) },
})

export { plageHoraire }
