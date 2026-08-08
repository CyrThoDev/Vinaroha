import Link from 'next/link'
import { Asset } from '@/app/components/Asset'

type BoxAbonnementProps = {
  ctaUrl?: string
  ctaLabel?: string
  imageUrl?: string
}

export function BoxAbonnement({ ctaUrl, ctaLabel, imageUrl }: BoxAbonnementProps) {
  return (
    <section className="py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-2 items-stretch overflow-hidden">

          {/* Fond rectangle SVG organique, mis à l'échelle sans déformation */}
          <Asset
            name="rectangle"
            color="#EBB132"
            cover
            className="absolute inset-0 w-full h-full pointer-events-none  [&_svg]:w-full [&_svg]:h-full"
          />

          {/* Col gauche — contenu */}
          <div className="flex flex-col gap-5 px-12 py-14 relative z-10">
            <div className="flex flex-col gap-2">
              <p className="font-accent uppercase tracking-[0.15em] text-zinc-900">Abonnement</p>
              <h2 className="font-lovelo text-5xl md:text-6xl uppercase leading-none text-zinc-900">La Box</h2>
            </div>
            <p className="  max-w-sm">
              Chaque mois, une sélection de cuvées naturelles dénichées par Delphine, accompagnée des histoires de celles et ceux qui les font. À déguster chez vous ou à offrir.<br />
              Sans engagement · retrait aux Halles ou livraison
            </p>
            <Link
              href={ctaUrl ?? '/box'}
              className="bg-black text-white font-black uppercase tracking-widest text-xs px-8 py-3.5 rounded-lg hover:opacity-80 transition-opacity w-fit mt-2"
            >
              {ctaLabel ?? 'Découvrez la box'}
            </Link>

            {/* Verres déco entrecroisés */}
            <div className="absolute -right-24 bottom-20 pointer-events-none select-none hidden md:flex items-end z-10">
              <div className="rotate-30 translate-x-10 origin-bottom">
                <Asset name="glass" color="#000000" className="w-28  [&_svg]:w-full [&_svg]:h-auto" />
              </div>
              <div className="-rotate-30 -translate-x-10 origin-bottom">
                <Asset name="glass" color="#000000" className="w-28  [&_svg]:w-full [&_svg]:h-auto" />
              </div>
            </div>
          </div>

          {/* Col droite — photo */}
          <div className="hidden md:flex items-center justify-center p-8 relative z-10 min-h-72">
            {imageUrl ? (
              <img src={imageUrl} alt="La Box Vin'Aroha" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="w-full h-full rounded-2xl  flex items-center justify-center /30  italic">
                Frame
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
