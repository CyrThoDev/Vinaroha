import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { Asset } from '@/app/components/Asset'

type ProducteurDuMoisSectionProps = {
  producteur?: {
    _id: string
    name: string
    domaine?: string
    description?: PortableTextBlock[]
    descriptionDomaine?: PortableTextBlock[]
    photo?: { asset?: { url: string } }
  }
}

export function ProducteurDuMoisSection({ producteur }: ProducteurDuMoisSectionProps) {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-3xl md:text-4xl uppercase text-zinc-900 mb-12">
          Le producteur du mois
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-14 items-center">

          {/* Col gauche — nom + bio */}
          <div className="flex flex-col gap-3">
            <p className="font-black uppercase text-zinc-900">{producteur?.name ?? 'Producteur du mois'}</p>
            {producteur?.description && producteur.description.length > 0 ? (
              <div className="text-zinc-600 leading-relaxed flex flex-col gap-3">
                <PortableText value={producteur.description} />
              </div>
            ) : (
              <p className="text-zinc-400 italic">Renseignez la description dans le studio Sanity</p>
            )}
          </div>

          {/* Col centre — photo ronde */}
          <div className="mx-auto w-48 md:w-56">
            {producteur?.photo?.asset?.url ? (
              <Asset
                name="rounded"
                imageUrl={producteur.photo.asset.url}
                alt={producteur.name}
                className="w-full [&_svg]:w-full [&_svg]:h-auto"
              />
            ) : (
              <div className="relative">
                <Asset name="rounded" color="#e4e4e7" className="w-full [&_svg]:w-full [&_svg]:h-auto" />
                <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                  <p className="text-zinc-400 text-sm">Photo à ajouter</p>
                </div>
              </div>
            )}
          </div>

          {/* Col droite — domaine */}
          <div className="flex flex-col gap-3">
            <p className="font-black uppercase text-zinc-900">Son domaine</p>
            {producteur?.descriptionDomaine && producteur.descriptionDomaine.length > 0 ? (
              <div className="text-zinc-600 leading-relaxed flex flex-col gap-3">
                <PortableText value={producteur.descriptionDomaine} />
              </div>
            ) : (
              <p className="text-zinc-400 italic">Renseignez la description du domaine dans le studio Sanity</p>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
