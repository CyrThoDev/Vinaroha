import { Asset } from '@/app/components/Asset'

type ProHeroProps = {
  titre?: string
  description?: string
  imageUrl?: string
}

const DESCRIPTION_DEFAUT =
  "Vous êtes restaurateur, caviste ou professionnel de la restauration ? Vin'Aroha vous accompagne avec une sélection de vins naturels, des tarifs adaptés et un suivi personnalisé pour votre carte."

export function ProHero({ titre, description, imageUrl }: ProHeroProps) {
  return (
    <section className="bg-background pt-10 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-5">
          <span className="inline-block bg-orange text-white rounded-full px-4 py-1 text-xs font-black uppercase  w-fit">
            Espace pro
          </span>
          <h1 className="font-accent text-5xl md:text-6xl uppercase leading-none text-zinc-900">
            {titre ?? 'Professionnels & restaurateurs'}
          </h1>
          <p className="max-w-md text-zinc-600 whitespace-pre-line">
            {description ?? DESCRIPTION_DEFAUT}
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="w-64 h-64">
            {imageUrl ? (
              <Asset
                name="rounded"
                imageUrl={imageUrl}
                alt={titre ?? 'Professionnels & restaurateurs'}
                className="w-full h-full [&_svg]:w-full [&_svg]:h-full"
              />
            ) : (
              <Asset name="rounded" color="#e4e4e7" className="w-full h-full [&_svg]:w-full [&_svg]:h-full" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
