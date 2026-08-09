import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { boxPageQuery } from '@/sanity/lib/queries'
import type { PageHeroData } from '@/sanity/lib/queries'
import { PageHero } from '../_components/PageHero'
import { OffresBox } from './OffresBox'
import { CommentCaMarche } from './CommentCaMarche'
import { Temoignage } from './Temoignage'
import { FAQ } from './FAQ'

export const metadata: Metadata = {
  title: 'La Box',
  description:
    "La Box Vin'Aroha : chaque mois, une sélection de cuvées naturelles dénichées par Delphine, à déguster chez vous ou à offrir.",
}

const DESCRIPTION_DEFAUT = [
  'Deux vins par mois spécialement sélectionnés par notre équipe',
  'Des fiches explicatives pour découvrir les vignerons et leur terroir',
  "Un livret d'initiation pour bien démarrer",
].join('\n')

export default async function BoxPage() {
  const page = await client.fetch<PageHeroData | null>(boxPageQuery as string).catch(() => null)

  return (
    <main>
      <PageHero
        eyebrow="Abonnement"
        title={page?.titre ?? 'La Box'}
        description={page?.description ?? DESCRIPTION_DEFAUT}
        imageUrl={page?.image?.asset?.url}
      />
      <OffresBox />
      <CommentCaMarche />
      <Temoignage />
      <FAQ />
    </main>
  )
}
