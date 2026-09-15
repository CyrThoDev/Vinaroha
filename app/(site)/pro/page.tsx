import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { proPageQuery, siteSettingsQuery, mergeSections } from '@/sanity/lib/queries'
import type { ProPageData } from '@/sanity/lib/queries'
import { ProHero } from './ProHero'
import { Avantages } from './Avantages'
import { Offre } from './Offre'
import { CommentCaMarchePro } from './CommentCaMarchePro'
import { Temoignages } from './Temoignages'
import { FAQPro } from './FAQPro'
import { ContactProForm } from './ContactProForm'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Professionnels & Restaurateurs',
  description:
    "Vous êtes restaurateur ou professionnel ? Vin'Aroha vous accompagne avec une sélection de vins naturels, des tarifs pro et un suivi personnalisé.",
}

export default async function ProPage() {
  const [raw, settings] = await Promise.all([
    client.fetch<Record<string, unknown> | null>(proPageQuery as string).catch(() => null),
    client.fetch(siteSettingsQuery as string).catch(() => null) as Promise<{ telephone?: string; whatsapp?: string } | null>,
  ])
  const page = raw ? mergeSections<ProPageData>(raw) : null

  return (
    <main>
      <ProHero
        titre={page?.titre}
        description={page?.description}
        imageUrl={page?.image?.asset?.url}
        telephone={settings?.telephone}
        whatsapp={settings?.whatsapp}
      />
      <Avantages titre={page?.avantagesTitre} avantages={page?.avantages} />
      <Offre titre={page?.offreTitre} offre={page?.offre} />
      <CommentCaMarchePro titre={page?.commentCaMarcheTitre} etapes={page?.etapes} />
      <Temoignages titre={page?.temoignagesTitre} temoignages={page?.temoignages} />

      <section className="bg-background py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <FAQPro titre={page?.faqTitre} questions={page?.faq} />

          <div>
            <h2 className="font-accent text-4xl md:text-5xl uppercase leading-none text-zinc-900 mb-4">
              Devenir partenaire
            </h2>
            <p className="text-zinc-600 mb-10">
              Parlez-nous de votre établissement, on revient vers vous rapidement pour construire ensemble votre sélection.
            </p>
            <ContactProForm />
          </div>
        </div>
      </section>
    </main>
  )
}
