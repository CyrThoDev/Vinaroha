import { defineField, defineType } from 'sanity'
import { HeartIcon } from '@sanity/icons'

export const evenementsPageSchema = defineType({
  name: 'evenementsPage',
  title: 'Page Vos Événements & Cadeaux',
  type: 'document',
  icon: HeartIcon,
  groups: [
    { name: 'hero', title: 'En-tête' },
    { name: 'sections', title: 'Sections' },
    { name: 'commentCaMarche', title: 'Comment ça se passe' },
    { name: 'bandeau', title: 'Bandeau photo' },
  ],
  fields: [
    // ── En-tête ──────────────────────────────────────
    defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : Vos événements & cadeaux', group: 'hero' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, group: 'hero' }),
    // ── Sections ─────────────────────────────────────
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'sections',
      of: [{
        type: 'object', name: 'section',
        fields: [
          defineField({ name: 'badge', title: 'Badge', type: 'string', description: 'Ex : Privatisation de la cave' }),
          defineField({
            name: 'couleur', title: 'Couleur du badge', type: 'string',
            options: { list: [{ title: 'Jaune', value: 'yellow' }, { title: 'Vert', value: 'green' }, { title: 'Orange', value: 'orange' }], layout: 'radio' },
            initialValue: 'yellow',
          }),
          defineField({ name: 'titre', title: 'Titre', type: 'string', description: 'Ex : La cave rien que pour vous' }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
          defineField({ name: 'points', title: 'Points clés', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'ctaLabel', title: "Libellé du lien", type: 'string', description: 'Ex : Demander un devis' }),
          defineField({ name: 'ctaLien', title: 'Lien', type: 'string', description: 'Ex : /producteurs ou mailto:contact@vinaroha.com' }),
          defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'titre', subtitle: 'badge', media: 'image' } },
      }],
    }),
    // ── Comment ça se passe ──────────────────────────
    defineField({ name: 'commentCaMarcheTitre', title: 'Titre de la section', type: 'string', description: 'Ex : Comment ça se passe ?', group: 'commentCaMarche' }),
    defineField({
      name: 'etapes',
      title: 'Étapes',
      type: 'array',
      group: 'commentCaMarche',
      of: [{
        type: 'object', name: 'etape',
        fields: [
          defineField({ name: 'label', title: 'Libellé', type: 'string', description: 'Ex : On échange' }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'label' } },
      }],
    }),
    // ── Bandeau photo ────────────────────────────────
    defineField({ name: 'bandeauImage', title: 'Photo', type: 'image', options: { hotspot: true }, group: 'bandeau' }),
  ],
  preview: { prepare: () => ({ title: 'Page Vos Événements & Cadeaux' }) },
})
