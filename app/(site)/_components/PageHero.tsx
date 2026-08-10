import { Asset } from '@/app/components/Asset'

type PageHeroProps = {
  eyebrow?: string
  title: string
  description: string
  imageUrl?: string
  color?: string
  lightText?: boolean
  titleFont?: 'lovelo' | 'accent'
}

export function PageHero({ eyebrow, title, description, imageUrl, color = '#EBB132', lightText = false, titleFont = 'lovelo' }: PageHeroProps) {
  return (
    <section className=" relative">

      {/* Fond rectangle SVG pleine largeur — étiré pour garder les vagues du haut et du bas sans recadrage */}
      <div className="w-full h-64 md:h-120 overflow-hidden">
        <Asset
          name="rectangle"
          color={color}
          stretchToFill
          className="w-full h-full scale-100 pointer-events-none [&_svg]:w-full [&_svg]:h-full"
        />
      </div>

      {/* Contenu superposé, centré dans le conteneur max-w-6xl */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center">

          {/* Col gauche — titre + description */}
          <div className="flex flex-col gap-5 px-2 md:px-6">
            {eyebrow && (
              <p className={`font-accent uppercase tracking-[0.15em] ${lightText ? 'text-white/90' : 'text-zinc-900'}`}>
                {eyebrow}
              </p>
            )}
            <h1 className={`${titleFont === 'accent' ? 'font-accent' : 'font-lovelo'} text-5xl md:text-6xl uppercase leading-none ${lightText ? 'text-white' : 'text-zinc-900'}`}>
              {title}
            </h1>
            <p className={`max-w-md whitespace-pre-line ${lightText ? 'text-white/90' : 'text-zinc-800'}`}>
              {description}
            </p>
          </div>

          {/* Col droite — image */}
          <div className="hidden md:flex items-center justify-center p-8">
            {imageUrl ? (
              <Asset
                name="square"
                imageUrl={imageUrl}
                alt={title}
                className="w-64 [&_svg]:w-full [&_svg]:h-auto"
              />
            ) : (
              <div className="relative w-64">
                <Asset name="square" color="#f4f4f5" className="w-full [&_svg]:w-full [&_svg]:h-auto" />
                <div className="absolute inset-0 flex items-center justify-center italic text-zinc-400 ">
                  Image à ajouter dans le studio
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
