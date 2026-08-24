import { Asset } from '@/app/components/Asset'

type CaveHeroCardProps = {
  titre?: string
  description?: string
}

export function CaveHeroCard({ titre, description }: CaveHeroCardProps) {
  return (
    <div className="absolute top-6 left-4 md:top-10 md:left-10 w-72 md:w-96">
      <Asset
        name="square"
        color="#357d4f"
        stretchToFill
        className="absolute inset-0 w-full h-full pointer-events-none [&_svg]:w-full [&_svg]:h-full"
      />
      <div className="relative p-6 md:p-8 text-white">
        <h1 className="font-accent text-3xl md:text-4xl uppercase leading-none mb-3">
          {titre ?? 'La Cave'}
        </h1>
        <p className="text-white/90  md:text-base whitespace-pre-line">
          {description ??
            "Une cave, ce n'est pas qu'un comptoir. C'est un lieu où l'on se réunit, où l'on célèbre, et où l'on trouve la bouteille juste à offrir. Dites-nous votre projet, on s'occupe du reste."}
        </p>
      </div>
    </div>
  )
}
