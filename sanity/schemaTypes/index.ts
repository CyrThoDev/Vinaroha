import { type SchemaTypeDefinition } from 'sanity'
import { pageType } from './page'
import { eventSchema } from './event'
import { eventTypeSchema } from './eventType'
import { siteSettingsSchema, plageHoraire } from './siteSettings'
import { vigneronSchema } from './vigneron'
import { vinSchema } from './vin'
import { homePageSchema } from './homePage'
import { formeDecorativeSchema } from './formeDecorative'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons
    siteSettingsSchema,
    homePageSchema,
    // Documents
    vigneronSchema,
    vinSchema,
    eventTypeSchema,
    eventSchema,
    pageType,
    // Objects
    plageHoraire,
    formeDecorativeSchema,
  ],
}