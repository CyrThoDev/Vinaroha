import { Asset } from '@/app/components/Asset'

type EvenementsHeroProps = {
  titre?: string
  description?: string
  imageUrl?: string
}

const DESCRIPTION_DEFAUT =
  "Une cave, ce n'est pas qu'un comptoir. C'est un lieu où l'on se réunit, où l'on célèbre, et où l'on trouve la bouteille juste à offrir. Dites-nous votre projet, on s'occupe du reste."

export function EvenementsHero({ titre, description, imageUrl }: EvenementsHeroProps) {
  return (
    <section className="bg-background pt-10 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-5">
          <h1 className="font-accent text-5xl md:text-6xl uppercase leading-none text-zinc-900">
            {titre ?? 'Vos événements & cadeaux'}
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
                alt={titre ?? 'Vos événements & cadeaux'}
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
