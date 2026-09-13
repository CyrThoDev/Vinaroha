import type { StructureResolver } from 'sanity/structure'

// Élément de menu "singleton" : pointe toujours vers le même document (id === type),
// pour ne jamais permettre d'en créer un second par erreur.
const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .id(type)
    .title(title)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type))

// Dossier listant les sections d'une page à onglets, une sous l'autre.
const pageFolder = (
  S: Parameters<StructureResolver>[0],
  title: string,
  sections: Array<{ type: string; title: string }>
) =>
  S.listItem()
    .title(title)
    .child(
      S.list()
        .title(title)
        .items(sections.map(({ type, title: sectionTitle }) => singleton(S, type, sectionTitle)))
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.documentTypeListItem('siteSettings').title('Coordonnées'),
      S.documentTypeListItem('homePage').title("Page d'accueil"),

      S.divider(),

      pageFolder(S, 'Page La Box', [
        { type: 'boxPageHero', title: 'En-tête' },
        { type: 'boxPageOffres', title: 'Offres' },
        { type: 'boxPageCommentCaMarche', title: 'Comment ça marche' },
        { type: 'boxPageTemoignage', title: 'Témoignage' },
        { type: 'boxPageFaq', title: 'FAQ' },
      ]),
      pageFolder(S, 'Page Producteurs', [
        { type: 'producteursPageHero', title: 'En-tête' },
        { type: 'producteursPageRencontrer', title: 'Rencontre' },
        { type: 'producteursPageGalerie', title: 'Galerie' },
      ]),
      pageFolder(S, 'Page Agenda', [
        { type: 'agendaPageHero', title: 'En-tête' },
        { type: 'agendaPageEvenements', title: 'Nos événements' },
      ]),
      pageFolder(S, 'Page La Cave', [
        { type: 'cavePageHero', title: 'En-tête' },
        { type: 'cavePageValeurs', title: 'Vos valeurs' },
        { type: 'cavePageEquipe', title: 'Notre équipe' },
        { type: 'cavePageProjets', title: 'Vos projets' },
        { type: 'cavePageAvis', title: 'Avis clients' },
        { type: 'cavePageGalerie', title: 'Galerie' },
      ]),
      pageFolder(S, 'Page Vos Événements & Cadeaux', [
        { type: 'evenementsPageHero', title: 'En-tête' },
        { type: 'evenementsPageSections', title: 'Sections' },
        { type: 'evenementsPageCommentCaMarche', title: 'Comment ça se passe' },
        { type: 'evenementsPageBandeau', title: 'Bandeau photo' },
      ]),
      pageFolder(S, 'Page Pro & Restaurateurs', [
        { type: 'proPageHero', title: 'En-tête' },
        { type: 'proPageAvantages', title: 'Avantages' },
        { type: 'proPageOffre', title: 'Notre offre' },
        { type: 'proPageCommentCaMarche', title: 'Comment ça marche' },
        { type: 'proPageTemoignages', title: 'Témoignages' },
        { type: 'proPageFaq', title: 'FAQ' },
      ]),

      S.divider(),

      S.documentTypeListItem('producteur').title('Producteurs'),
      S.documentTypeListItem('eventType').title("Types d'événements"),
      S.documentTypeListItem('event').title('Événements'),
    ])
