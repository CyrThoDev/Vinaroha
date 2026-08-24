import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { cavePageQuery } from '@/sanity/lib/queries'
import type { CavePageData } from '@/sanity/lib/queries'
import { CaveHero } from './CaveHero'
import { CaveHeroCard } from './CaveHeroCard'
import { VosValeurs } from './VosValeurs'
import { NotreEquipe } from './NotreEquipe'
import { LaCaveProjets } from './LaCaveProjets'
import { Galerie } from './Galerie'

export const metadata: Metadata = {
  title: 'La Cave',
  description:
    "La cave Vin'Aroha à Mimizan : un lieu de rencontre et de dégustation autour de vins naturels, bio et biodynamiques choisis avec soin.",
}

export default async function CavePage() {
  const page = await client.fetch<CavePageData | null>(cavePageQuery as string).catch(() => null)

  return (
    <main>
      <CaveHero
        images={(page?.heroImages ?? []).map(i => i.asset?.url).filter((u): u is string => Boolean(u))}
      >
        <CaveHeroCard titre={page?.titre} description={page?.description} />
      </CaveHero>
      <VosValeurs titre={page?.valeursTitre} texte={page?.valeursTexte} />
      <NotreEquipe titre={page?.equipeTitre} equipe={page?.equipe} />
      <LaCaveProjets titre={page?.projetsTitre} texte={page?.projetsTexte} projets={page?.projets} />
      <Galerie images={(page?.galerie ?? []).map(i => i.asset?.url).filter((u): u is string => Boolean(u))} />
    </main>
  )
}
