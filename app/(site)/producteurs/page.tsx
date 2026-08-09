import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { producteursPageQuery } from '@/sanity/lib/queries'
import type { PageHeroData } from '@/sanity/lib/queries'
import { PageHero } from '../_components/PageHero'

export const metadata: Metadata = {
  title: 'Nos Producteurs',
  description:
    "Découvrez les producteurs engagés sélectionnés par Vin'Aroha : vignerons naturels, bio et biodynamiques.",
}

export default async function ProducteursPage() {
  const page = await client.fetch<PageHeroData | null>(producteursPageQuery as string).catch(() => null)

  return (
    <main>
      <PageHero
        title={page?.titre ?? 'Nos Producteurs'}
        description={
          page?.description ??
          'Des femmes et des hommes engagés, choisis avec soin pour la qualité et l\'authenticité de leurs vins.'
        }
        imageUrl={page?.image?.asset?.url}
        color="#D25200"
        lightText
      />
    </main>
  )
}
