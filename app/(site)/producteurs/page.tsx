import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { producteursPageQuery, producteurDuMoisQuery, produitsQuery } from '@/sanity/lib/queries'
import type { PageHeroData, SanityProduit } from '@/sanity/lib/queries'
import { PageHero } from '../_components/PageHero'
import { ProducteurDuMoisSection } from './ProducteurDuMoisSection'
import { Etageres } from './Etageres'

export const metadata: Metadata = {
  title: 'Nos Producteurs',
  description:
    "Découvrez les producteurs engagés sélectionnés par Vin'Aroha : vignerons naturels, bio et biodynamiques.",
}

type ProducteurDuMois = {
  _id: string
  name: string
  domaine?: string
  description?: PortableTextBlock[]
  descriptionDomaine?: PortableTextBlock[]
  photo?: { asset?: { url: string } }
}

export default async function ProducteursPage() {
  const [page, producteur, produits] = await Promise.all([
    client.fetch<PageHeroData | null>(producteursPageQuery as string).catch(() => null),
    client.fetch<ProducteurDuMois | null>(producteurDuMoisQuery as string).catch(() => null),
    client.fetch<SanityProduit[]>(produitsQuery as string).catch(() => []),
  ])

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
        titleFont="accent"
      />
      <ProducteurDuMoisSection producteur={producteur ?? undefined} />
      <Etageres produits={produits} />
    </main>
  )
}
