import { PortableText, type PortableTextBlock } from '@portabletext/react'

type VosValeursProps = {
  titre?: string
  texte?: PortableTextBlock[]
}

const PARAGRAPHES_DEFAUT = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ornare ipsum ut bibendum.',
  'Cras ut fermentum enim, sit amet tempor purus. Curabitur risus purus, fringilla eu dignissim ut, posuere non est. Sed mollis ornare orci id suscipit.',
  'Ut commodo, nibh vitae sodales bibendum, libero tellus feugiat odio, a fringilla urna quam sed nulla.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ornare ipsum ut bibendum.',
  'Cras ut fermentum enim, sit amet tempor purus. Curabitur risus purus, fringilla eu dignissim ut, posuere non est. Sed mollis ornare orci id suscipit.',
]

export function VosValeurs({ titre, texte }: VosValeursProps) {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-3xl md:text-4xl uppercase text-zinc-900 mb-8">
          {titre ?? 'Vos valeurs'}
        </h2>
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
    </section>
  )
}
