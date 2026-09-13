import { type SchemaTypeDefinition } from 'sanity'
import { eventSchema } from './event'
import { eventTypeSchema } from './eventType'
import { siteSettingsSchema, plageHoraire } from './siteSettings'
import { producteurSchema } from './producteur'
import { homePageSchema } from './homePage'
import {
  boxPageHeroSchema,
  boxPageOffresSchema,
  boxPageCommentCaMarcheSchema,
  boxPageTemoignageSchema,
  boxPageFaqSchema,
} from './boxPage'
import {
  producteursPageHeroSchema,
  producteursPageRencontrerSchema,
  producteursPageGalerieSchema,
} from './producteursPage'
import {
  agendaPageHeroSchema,
  agendaPageEvenementsSchema,
} from './agendaPage'
import {
  cavePageHeroSchema,
  cavePageValeursSchema,
  cavePageEquipeSchema,
  cavePageProjetsSchema,
  cavePageAvisSchema,
  cavePageGalerieSchema,
} from './cavePage'
import {
  evenementsPageHeroSchema,
  evenementsPageSectionsSchema,
  evenementsPageCommentCaMarcheSchema,
  evenementsPageBandeauSchema,
} from './evenementsPage'
import {
  proPageHeroSchema,
  proPageAvantagesSchema,
  proPageOffreSchema,
  proPageCommentCaMarcheSchema,
  proPageTemoignagesSchema,
  proPageFaqSchema,
} from './proPage'
import { formeDecorativeSchema } from './formeDecorative'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons
    siteSettingsSchema,
    homePageSchema,
    boxPageHeroSchema,
    boxPageOffresSchema,
    boxPageCommentCaMarcheSchema,
    boxPageTemoignageSchema,
    boxPageFaqSchema,
    producteursPageHeroSchema,
    producteursPageRencontrerSchema,
    producteursPageGalerieSchema,
    agendaPageHeroSchema,
    agendaPageEvenementsSchema,
    cavePageHeroSchema,
    cavePageValeursSchema,
    cavePageEquipeSchema,
    cavePageProjetsSchema,
    cavePageAvisSchema,
    cavePageGalerieSchema,
    evenementsPageHeroSchema,
    evenementsPageSectionsSchema,
    evenementsPageCommentCaMarcheSchema,
    evenementsPageBandeauSchema,
    proPageHeroSchema,
    proPageAvantagesSchema,
    proPageOffreSchema,
    proPageCommentCaMarcheSchema,
    proPageTemoignagesSchema,
    proPageFaqSchema,
    // Documents
    producteurSchema,
    eventTypeSchema,
    eventSchema,
    // Objects
    plageHoraire,
    formeDecorativeSchema,
  ],
}
