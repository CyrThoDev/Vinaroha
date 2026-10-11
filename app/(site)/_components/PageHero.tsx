import { Asset } from '@/app/components/Asset'

type PageHeroProps = {
  eyebrow?: string
  title: string
  description: string
  imageUrl?: string
  color?: string
  lightText?: boolean
  titleFont?: 'lovelo' | 'accent'
  imageShape?: 'square' | 'topandbottom'
  decoVigne?: boolean
  decoVigneSide?: 'left' | 'right'
  decoVignePosition?: 'title' | 'corner'
  decoVigneColor?: string
  largeMobile?: boolean
  imageSize?: string
  imageFit?: 'cover' | 'contain'
  imageVerticalPadding?: string
}

export function PageHero({
  eyebrow, title, description, imageUrl, color = '#EBB132', lightText = false,
  titleFont = 'lovelo', imageShape = 'square', decoVigne = false, decoVigneSide = 'left',
  largeMobile = false, imageSize = 'w-64', imageFit = 'cover', imageVerticalPadding = 'py-8',
  decoVignePosition = 'title', decoVigneColor,
}: PageHeroProps) {
  return (
    <section className=" relative">

      {/* Fond rectangle SVG pleine largeur — étiré pour garder les vagues du haut et du bas sans recadrage */}
      <div className={`w-full ${largeMobile ? 'h-80' : 'h-64'} md:h-120 overflow-hidden`}>
        <Asset
          name="rectangle"
          color={color}
          stretchToFill
          className="w-full h-full scale-100 pointer-events-none [&_svg]:w-full [&_svg]:h-full"
        />
      </div>

      {decoVigne && decoVignePosition === 'corner' && (
        <Asset
          name="grapes"
          color={decoVigneColor ?? (lightText ? '#ffffff' : '#232526')}
          className={`hidden md:block absolute top-6 md:top-10 right-6 md:right-10 w-24 md:w-32 opacity-40 pointer-events-none select-none [&_svg]:w-full [&_svg]:h-auto`}
        />
      )}

      {/* Contenu superposé, centré dans le conteneur max-w-6xl */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center">

          {/* Col gauche — titre + description */}
          <div className="flex flex-col gap-5 px-2 md:px-6">
            {eyebrow && (
              <p className={`font-accent uppercase text-2xl md:text-3xl relative z-10 ${lightText ? 'text-white/90' : 'text-zinc-900'}`}>
                {eyebrow}
              </p>
            )}
            <div className="relative">
              {decoVigne && decoVignePosition === 'title' && (
                <Asset
                  name="grapes"
                  color={lightText ? '#ffffff' : '#232526'}
                  className={`absolute -top-6 md:-top-10 w-24 md:w-32 opacity-40 pointer-events-none select-none [&_svg]:w-full [&_svg]:h-auto ${
                    decoVigneSide === 'right' ? '-right-4 md:-right-8' : '-left-4 md:-left-8'
                  }`}
                />
              )}
              <h1 className={`relative z-10 ${titleFont === 'accent' ? 'font-accent' : 'font-lovelo'} text-5xl md:text-6xl uppercase leading-none ${lightText ? 'text-white' : 'text-zinc-900'}`}>
                {title}
              </h1>
            </div>
            <p className={`max-w-md whitespace-pre-line ${lightText ? 'text-white/90' : 'text-zinc-800'}`}>
              {description}
            </p>
          </div>

          {/* Col droite — image */}
          <div className={`hidden md:flex items-center justify-center px-8 ${imageVerticalPadding}`}>
            {imageUrl ? (
              <Asset
                name={imageShape}
                imageUrl={imageUrl}
                imageFit={imageFit}
                alt={title}
                className={`${imageSize} [&_svg]:w-full [&_svg]:h-auto`}
              />
            ) : (
              <div className={`relative ${imageSize}`}>
                <Asset name={imageShape} color="#f4f4f5" className="w-full [&_svg]:w-full [&_svg]:h-auto" />
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
