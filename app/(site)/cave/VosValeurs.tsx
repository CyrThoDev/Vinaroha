import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { Asset } from '@/app/components/Asset'

type VosValeursProps = {
  titre?: string
  texte?: PortableTextBlock[]
  imageUrl?: string
}

const BADGES = ['Bio', 'Biodynamie', 'Vin nature', 'Circuit court']

const PARAGRAPHES_DEFAUT = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ornare ipsum ut bibendum.',
  'Cras ut fermentum enim, sit amet tempor purus. Curabitur risus purus, fringilla eu dignissim ut, posuere non est. Sed mollis ornare orci id suscipit.',
  'Ut commodo, nibh vitae sodales bibendum, libero tellus feugiat odio, a fringilla urna quam sed nulla.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ornare ipsum ut bibendum.',
  'Cras ut fermentum enim, sit amet tempor purus. Curabitur risus purus, fringilla eu dignissim ut, posuere non est. Sed mollis ornare orci id suscipit.',
]

export function VosValeurs({ titre, texte, imageUrl }: VosValeursProps) {
  return (
    <section className="bg-background pb-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:items-center">
        <div className="md:order-2">
          <h2 className="font-accent text-4xl md:text-5xl uppercase leading-none text-zinc-900 mb-6">
            {titre ?? 'Vos valeurs'}
          </h2>

          <div className="flex flex-wrap gap-3 mb-8">
            {BADGES.map((label) => (
              <span
                key={label}
                className="inline-block bg-yellow rounded-lg px-5 py-2 text-zinc-900 w-fit"
              >
                {label}
              </span>
            ))}
          </div>

          {texte && texte.length > 0 ? (
            <div className="text-zinc-600 leading-relaxed flex flex-col gap-4">
              <PortableText value={texte} />
            </div>
          ) : (
            <div className="text-zinc-600 leading-relaxed flex flex-col gap-4">
              {PARAGRAPHES_DEFAUT.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
        </div>

        <div className="w-full h-80 md:h-112 md:order-1">
          {imageUrl ? (
            <Asset name="square" imageUrl={imageUrl} className="w-full h-full [&_svg]:w-full [&_svg]:h-full" alt={titre ?? 'Vos valeurs'} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400 italic rounded-lg">
              Image à renseigner dans le studio
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
