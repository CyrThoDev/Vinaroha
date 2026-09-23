import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { producteursPageQuery, producteurDuMoisQuery, producteursListQuery, mergeSections } from '@/sanity/lib/queries'
import type { ProducteursPageData, SanityProducteur } from '@/sanity/lib/queries'
import { Asset } from '@/app/components/Asset'
import { PageHero } from '../_components/PageHero'
import { ProRestaurateurs } from '../_components/ProRestaurateurs'
import { ProducteurDuMoisSection } from './ProducteurDuMoisSection'
import { Catalogue } from './Catalogue'
import { RencontrerProducteurs } from './RencontrerProducteurs'
import { Galerie } from './Galerie'

export const revalidate = 30

export const metadata: Metadata = {
  title: 'Sur nos étagères',
  description:
    "Découvrez les producteurs engagés sélectionnés par Vin'Aroha : vignerons naturels, bio et biodynamiques.",
}

type ProducteurDuMois = {
  _id: string
  name: string
  region?: string
  appellationPrincipale?: string
  description?: PortableTextBlock[]
  photo?: { asset?: { url: string } }
}

export default async function ProducteursPage() {
  const [raw, producteur, producteurs] = await Promise.all([
    client.fetch<Record<string, unknown> | null>(producteursPageQuery as string).catch(() => null),
    client.fetch<ProducteurDuMois | null>(producteurDuMoisQuery as string).catch(() => null),
    client.fetch<SanityProducteur[]>(producteursListQuery as string).catch(() => []),
  ])
  const page = raw ? mergeSections<ProducteursPageData>(raw) : null

  return (
    <main>
      <PageHero
        title={page?.titre ?? 'Sur nos étagères'}
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
      <Catalogue
        producteurs={producteurs}
        icons={{
          vin: <Asset name="bouteillevin" color="#1a1a1a" className="h-full w-full [&_svg]:h-full [&_svg]:w-full" />,
          bieres: <Asset name="beer" color="#1a1a1a" className="h-full w-full [&_svg]:h-full [&_svg]:w-full" />,
          spiritueux: <Asset name="spirit" color="#1a1a1a" className="h-full w-full [&_svg]:h-full [&_svg]:w-full" />,
          bulles: <Asset name="bulles" color="#1a1a1a" className="h-full w-full [&_svg]:h-full [&_svg]:w-full" />,
          soft: <Asset name="soft" color="#1a1a1a" className="h-full w-full [&_svg]:h-full [&_svg]:w-full" />,
          epicerie: <Asset name="gift" color="#1a1a1a" className="h-full w-full [&_svg]:h-full [&_svg]:w-full" />,
        }}
      />
      <ProRestaurateurs />
      <RencontrerProducteurs titre={page?.rencontrerTitre} texte={page?.rencontrerTexte} />
      <Galerie images={(page?.galerie ?? []).map(i => i.asset?.url).filter((u): u is string => Boolean(u))} />
    </main>
  )
}
