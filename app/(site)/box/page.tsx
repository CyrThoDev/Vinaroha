import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { boxPageQuery } from '@/sanity/lib/queries'
import type { PageHeroData } from '@/sanity/lib/queries'
import { PageHero } from '../_components/PageHero'

export const metadata: Metadata = {
  title: 'La Box',
  description:
    "La Box Vin'Aroha : chaque mois, une sélection de cuvées naturelles dénichées par Delphine, à déguster chez vous ou à offrir.",
}

export default async function BoxPage() {
  const page = await client.fetch<PageHeroData | null>(boxPageQuery as string).catch(() => null)

  return (
    <main>
      <PageHero
        title={page?.titre ?? 'La Box'}
        description={
          page?.description ??
          "Chaque mois, une sélection de cuvées naturelles dénichées par Delphine, accompagnée des histoires de celles et ceux qui les font."
        }
        imageUrl={page?.image?.asset?.url}
      />
    </main>
  )
}
