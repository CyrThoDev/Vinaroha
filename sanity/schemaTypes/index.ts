import { type SchemaTypeDefinition } from 'sanity'
import { pageType } from './page'
import { eventSchema } from './event'
import { eventTypeSchema } from './eventType'
import { siteSettingsSchema, plageHoraire } from './siteSettings'
import { producteurSchema } from './producteur'
import { vinSchema } from './vin'
import { homePageSchema } from './homePage'
import { boxPageSchema } from './boxPage'
import { producteursPageSchema } from './producteursPage'
import { agendaPageSchema } from './agendaPage'
import { formeDecorativeSchema } from './formeDecorative'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons
    siteSettingsSchema,
    homePageSchema,
    boxPageSchema,
    producteursPageSchema,
    agendaPageSchema,
    // Documents
    producteurSchema,
    vinSchema,
    eventTypeSchema,
    eventSchema,
    pageType,
    // Objects
    plageHoraire,
    formeDecorativeSchema,
  ],
}