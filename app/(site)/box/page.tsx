import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { boxPageQuery } from '@/sanity/lib/queries'
import type { BoxPageData } from '@/sanity/lib/queries'
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
  const page = await client.fetch<BoxPageData | null>(boxPageQuery as string).catch(() => null)

  return (
    <main>
      <PageHero
        eyebrow={page?.eyebrow ?? 'Abonnement'}
        title={page?.titre ?? 'La Box'}
        description={page?.description ?? DESCRIPTION_DEFAUT}
        imageUrl={page?.image?.asset?.url}
      />
      <OffresBox
        titre={page?.offresTitre}
        offres={page?.offres}
        abonnementTitre={page?.abonnementTitre}
        abonnementTexte={page?.abonnementTexte}
      />
      <CommentCaMarche
        titre={page?.commentCaMarcheTitre}
        etape1Texte={page?.etape1Texte}
        etape2Texte={page?.etape2Texte}
        etape2Note={page?.etape2Note}
      />
      <Temoignage citation={page?.temoignage} auteur={page?.temoignageAuteur} />
      <FAQ titre={page?.faqTitre} questions={page?.faq} />
    </main>
  )
}
