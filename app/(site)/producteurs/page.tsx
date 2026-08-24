import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { producteursPageQuery, producteurDuMoisQuery, produitsQuery } from '@/sanity/lib/queries'
import type { ProducteursPageData, SanityProduit } from '@/sanity/lib/queries'
import { Asset } from '@/app/components/Asset'
import { PageHero } from '../_components/PageHero'
import { ProRestaurateurs } from '../_components/ProRestaurateurs'
import { ProducteurDuMoisSection } from './ProducteurDuMoisSection'
import { Etageres } from './Etageres'
import { RencontrerProducteurs } from './RencontrerProducteurs'
import { Galerie } from './Galerie'

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
    client.fetch<ProducteursPageData | null>(producteursPageQuery as string).catch(() => null),
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
        imageShape="topandbottom"
        decoVigne
      />
      <ProducteurDuMoisSection producteur={producteur ?? undefined} />
      <Etageres
        produits={produits}
        icons={{
          vin: <Asset name="bouteillevin" color="#1a1a1a" className="h-24 w-auto [&_svg]:h-full [&_svg]:w-auto" />,
          biere: <Asset name="beer" color="#1a1a1a" className="h-24 w-auto [&_svg]:h-full [&_svg]:w-auto" />,
          spiritueux: <Asset name="spirit" color="#1a1a1a" className="h-24 w-auto [&_svg]:h-full [&_svg]:w-auto" />,
        }}
      />
      <ProRestaurateurs />
      <RencontrerProducteurs titre={page?.rencontrerTitre} texte={page?.rencontrerTexte} />
      <Galerie images={(page?.galerie ?? []).map(i => i.asset?.url).filter((u): u is string => Boolean(u))} />
    </main>
  )
}
