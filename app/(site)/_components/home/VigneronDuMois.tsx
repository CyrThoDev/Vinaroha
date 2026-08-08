import Link from 'next/link'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { Asset } from '@/app/components/Asset'

type VigneronDuMoisProps = {
  vigneron?: {
    _id: string
    name: string
    domaine?: string
    region?: string
    description?: PortableTextBlock[]
    photo?: { asset?: { url: string } }
  }
}

export function VigneronDuMois({ vigneron }: VigneronDuMoisProps) {
  return (
    <section className="bg-background py-16 px-6 overflow-hidden relative">

      {/* Bouteille déco bas-gauche */}
      <div className="absolute bottom-0 left-0 pointer-events-none select-none">
        <Asset name="bouteille" color="#E56B00" className="w-20 opacity-50 [&_svg]:w-full [&_svg]:h-auto" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Col gauche — texte */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-accent text-5xl md:text-6xl uppercase leading-none text-zinc-900">
                Le vigneron du mois
              </h2>
              <p className="font-accent text-2xl uppercase text-orange mt-3">
                {vigneron?.name ?? 'Vigneron du mois'}
              </p>
              {(vigneron?.domaine || vigneron?.region) && (
                <p className="  mt-1">
                  {[vigneron.domaine, vigneron.region].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>

            {vigneron?.description && vigneron.description.length > 0 ? (
              <div className="text-zinc-600 leading-relaxed flex flex-col gap-3">
                <PortableText value={vigneron.description} />
              </div>
            ) : (
              <p className="text-zinc-400 italic ">Renseignez la description dans le studio Sanity</p>
            )}

            <Link
              href="/vignerons"
              className="font-fontjek text-2xl  flex items-center gap-3 border-b border-zinc-300 pb-1 w-fit hover:border-zinc-900 transition-colors group"
            >
              Voir l&apos;ensemble de nos vignerons
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          {/* Col droite — photo topandbottom + leaf déco */}
          <div className="relative">
            {/* Leaf déco haut-droite */}
            <div className="absolute -top-6 -right-6 pointer-events-none select-none z-10">
              <Asset name="leaf" color="#E56B00" color2="#EBB132" className="w-28 [&_svg]:w-full [&_svg]:h-auto" />
            </div>

            {vigneron?.photo?.asset?.url ? (
              <Asset
                name="topandbottom"
                imageUrl={vigneron.photo.asset.url}
                alt={vigneron.name}
                className="w-full flex justify-center [&_svg]:w-auto [&_svg]:h-auto [&_svg]:max-h-128 [&_svg]:max-w-full [&_svg]:block"
              />
            ) : (
              <div className="relative">
                <Asset
                  name="topandbottom"
                  color="#f4f4f5"
                  className="w-full flex justify-center [&_svg]:w-auto [&_svg]:h-auto [&_svg]:max-h-128 [&_svg]:max-w-full [&_svg]:block"
                />
                <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                  <p className="text-zinc-300 text-xs">Photo à ajouter dans le studio</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
