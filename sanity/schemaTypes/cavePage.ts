import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const cavePageSchema = defineType({
  name: 'cavePage',
  title: 'Page La Cave',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'En-tête' },
    { name: 'valeurs', title: 'Vos valeurs' },
    { name: 'equipe', title: 'Notre équipe' },
    { name: 'projets', title: 'Vos projets' },
    { name: 'galerie', title: 'Galerie' },
  ],
  fields: [
    // ── En-tête ──────────────────────────────────────
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : La Cave', group: 'hero' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, group: 'hero' }),
    defineField({
      name: 'heroImages',
      title: 'Photos (carrousel)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      group: 'hero',
    }),
    // ── Vos valeurs ──────────────────────────────────
    defineField({ name: 'valeursTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Vos valeurs', group: 'valeurs' }),
    defineField({ name: 'valeursTexte', title: 'Texte', type: 'array', of: [{ type: 'block' }], group: 'valeurs' }),
    // ── Notre équipe ─────────────────────────────────
    defineField({ name: 'equipeTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Notre équipe', group: 'equipe' }),
    defineField({
      name: 'equipe',
      title: 'Membres de l’équipe',
      type: 'array',
      group: 'equipe',
      of: [{
        type: 'object', name: 'membre',
        fields: [
          defineField({ name: 'nom', title: 'Nom', type: 'string' }),
          defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'nom', media: 'photo' } },
      }],
    }),
    // ── Vos projets ──────────────────────────────────
    defineField({ name: 'projetsTitre', title: 'Titre de la section', type: 'string', description: 'Ex : La cave, aussi pour vos projets', group: 'projets' }),
    defineField({ name: 'projetsTexte', title: 'Texte', type: 'text', rows: 2, group: 'projets' }),
    defineField({
      name: 'projets',
      title: 'Cartes',
      type: 'array',
      group: 'projets',
      of: [{
        type: 'object', name: 'projet',
        fields: [
          defineField({ name: 'label', title: 'Libellé', type: 'string', description: 'Ex : Privatisation de la cave' }),
          defineField({ name: 'lien', title: 'Lien', type: 'string', description: 'Ex : /evenements' }),
        ],
        preview: { select: { title: 'label' } },
      }],
    }),
    // ── Galerie ──────────────────────────────────────
    defineField({
      name: 'galerie',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      group: 'galerie',
    }),
  ],
  preview: { prepare: () => ({ title: 'Page La Cave' }) },
})
