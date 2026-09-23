import Link from 'next/link'
import { Asset } from '@/app/components/Asset'

export function DecouvrirProducteurs() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className=" p-8 relative grid grid-cols-1 md:grid-cols-2 items-stretch overflow-hidden">

          {/* Fond rectangle SVG organique, mis à l'échelle sans déformation */}
          <Asset
            name="rectangle"
            color="#E56B00"
            stretchToFill
            className="absolute inset-0 w-full h-full pointer-events-none  [&_svg]:w-full [&_svg]:h-full "
          />

          {/* Col gauche — contenu */}
          <div className="flex flex-col gap-3 px-4 md:px-8 py-10 relative z-10 text-white">
            <p className="font-accent text-4xl md:text-5xl uppercase leading-none">
              Sur nos étagères
            </p>
            <p className="text-white/90 max-w-md">
              Envie de voir ce qu&apos;on a en rayon&nbsp;? Découvrez les vignerons et domaines qu&apos;on a sélectionnés pour vous.
            </p>
          </div>

          {/* Col droite — CTA */}
          <div className="flex items-center justify-center p-8 relative z-10">
            <Link
              href="/producteurs"
              className="font-fontjek text-2xl text-white flex items-center gap-2 border-b border-white/40 pb-1 w-fit hover:text-background hover:border-background transition-colors"
            >
              Voir la sélection &nbsp;⟶
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
