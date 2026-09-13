import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const cavePageHeroSchema = defineType({
  name: 'cavePageHero',
  title: 'Page La Cave — En-tête',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : La Cave' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'heroImages',
      title: 'Photos (carrousel)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: { prepare: () => ({ title: 'En-tête' }) },
})

export const cavePageValeursSchema = defineType({
  name: 'cavePageValeurs',
  title: 'Page La Cave — Vos valeurs',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({ name: 'valeursTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Vos valeurs' }),
    defineField({ name: 'valeursTexte', title: 'Texte', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'valeursImage', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'Vos valeurs' }) },
})

export const cavePageEquipeSchema = defineType({
  name: 'cavePageEquipe',
  title: 'Page La Cave — Notre équipe',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({ name: 'equipeTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Notre équipe' }),
    defineField({
      name: 'equipe',
      title: 'Membres de l’équipe',
      type: 'array',
      of: [{
        type: 'object', name: 'membre',
        fields: [
          defineField({ name: 'nom', title: 'Nom', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'string', description: 'Ex : Fondatrice' }),
          defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'nom', media: 'photo' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Notre équipe' }) },
})

export const cavePageProjetsSchema = defineType({
  name: 'cavePageProjets',
  title: 'Page La Cave — Vos projets',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({ name: 'projetsTitre', title: 'Titre de la section', type: 'string', description: 'Ex : La cave, aussi pour vos projets' }),
    defineField({ name: 'projetsTexte', title: 'Texte', type: 'text', rows: 2 }),
    defineField({
      name: 'projets',
      title: 'Cartes',
      type: 'array',
      of: [{
        type: 'object', name: 'projet',
        fields: [
          defineField({ name: 'label', title: 'Libellé', type: 'string', description: 'Ex : Privatisation de la cave' }),
          defineField({ name: 'description', title: 'Description', type: 'string', description: 'Ex : Un lieu unique pour vos réceptions privées.' }),
          defineField({ name: 'lien', title: 'Lien', type: 'string', description: 'Ex : /evenements' }),
        ],
        preview: { select: { title: 'label' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Vos projets' }) },
})

export const cavePageAvisSchema = defineType({
  name: 'cavePageAvis',
  title: 'Page La Cave — Avis clients',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({ name: 'avisTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Ils en parlent mieux que nous' }),
    defineField({ name: 'googleNote', title: 'Note Google (/5)', type: 'number', validation: (r) => r.min(0).max(5) }),
    defineField({ name: 'googleAvisCount', title: "Nombre d'avis Google", type: 'number' }),
    defineField({ name: 'googleUrl', title: 'Lien vers les avis Google', type: 'url' }),
    defineField({
      name: 'avis',
      title: 'Avis mis en avant',
      type: 'array',
      of: [{
        type: 'object', name: 'avisClient',
        fields: [
          defineField({ name: 'citation', title: 'Avis', type: 'text', rows: 3 }),
          defineField({ name: 'auteur', title: 'Auteur', type: 'string' }),
        ],
        preview: { select: { title: 'auteur', subtitle: 'citation' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Avis clients' }) },
})

export const cavePageGalerieSchema = defineType({
  name: 'cavePageGalerie',
  title: 'Page La Cave — Galerie',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'galerie',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Galerie' }) },
})
