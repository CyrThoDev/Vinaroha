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
  title: 'Coordonnées',
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
      name: 'whatsapp',
      title: 'Numéro WhatsApp',
      type: 'string',
      description: 'Format international sans espaces ni « + », ex : 33612345678. Utilisé pour le bouton WhatsApp de l\'espace pro.',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude — La Cave',
      type: 'number',
      description: 'Coordonnée GPS de la cave, pour la carte. Ex : 44.2140973',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude — La Cave',
      type: 'number',
      description: 'Coordonnée GPS de la cave, pour la carte. Ex : -1.293793',
    }),
    defineField({
      name: 'latitudeHalles',
      title: 'Latitude — Les Halles',
      type: 'number',
      description: 'Coordonnée GPS des Halles, pour la carte (2e repère).',
    }),
    defineField({
      name: 'longitudeHalles',
      title: 'Longitude — Les Halles',
      type: 'number',
      description: 'Coordonnée GPS des Halles, pour la carte (2e repère).',
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
  preview: { prepare: () => ({ title: 'Coordonnées' }) },
})

export { plageHoraire }
