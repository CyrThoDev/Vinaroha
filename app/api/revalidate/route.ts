import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'

const ALL_PATHS = ['/', '/box', '/cave', '/producteurs', '/agenda', '/evenements', '/pro']

// Mappe chaque type de document Sanity vers les pages qui le consomment
const TYPE_TO_PATHS: Record<string, string[]> = {
  homePage: ['/'],
  siteSettings: ALL_PATHS,
  event: ['/', '/agenda'],
  eventType: ['/', '/agenda'],
  producteur: ['/', '/producteurs'],

  boxPageHero: ['/box'],
  boxPageOffres: ['/box'],
  boxPageCommentCaMarche: ['/box'],
  boxPageTemoignage: ['/box'],
  boxPageFaq: ['/box'],

  cavePageHero: ['/cave'],
  cavePageValeurs: ['/cave'],
  cavePageEquipe: ['/cave'],
  cavePageProjets: ['/cave'],
  cavePageAvis: ['/cave'],
  cavePageGalerie: ['/cave'],

  agendaPageHero: ['/agenda'],
  agendaPageEvenements: ['/agenda'],

  proPageHero: ['/pro'],
  proPageAvantages: ['/pro'],
  proPageOffre: ['/pro'],
  proPageCommentCaMarche: ['/pro'],
  proPageTemoignages: ['/pro'],
  proPageFaq: ['/pro'],

  producteursPageHero: ['/producteurs'],
  producteursPageRencontrer: ['/producteurs'],
  producteursPageGalerie: ['/producteurs'],

  // Utilisée uniquement sur la home (badges de la section "Vos événements et cadeaux")
  evenementsPageSections: ['/', '/evenements'],
  evenementsPageHero: ['/evenements'],
  evenementsPageCommentCaMarche: ['/evenements'],
  evenementsPageBandeau: ['/evenements'],
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ revalidated: false, message: 'Secret invalide ou manquant' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const type = body?._type as string | undefined
  const paths = (type && TYPE_TO_PATHS[type]) || ALL_PATHS

  for (const path of paths) {
    revalidatePath(path)
  }

  return Response.json({ revalidated: true, type: type ?? null, paths, now: Date.now() })
}
