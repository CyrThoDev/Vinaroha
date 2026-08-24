import { Asset } from '@/app/components/Asset'

type Etape = { label?: string; texte?: string }

type CommentCaSePasseProps = {
  titre?: string
  etapes?: Etape[]
}

const ETAPES_DEFAUT: Etape[] = [
  {
    label: 'On échange',
    texte: 'On vous propose une sélection ou un coffret sur mesure, avec un devis clair. On ajuste ensemble jusqu\'à ce que ce soit parfait.',
  },
  {
    label: 'On compose',
    texte: 'On vous propose une sélection ou un coffret sur mesure, avec un devis clair. On ajuste ensemble jusqu\'à ce que ce soit parfait.',
  },
  {
    label: 'Vous savourez',
    texte: 'On vous propose une sélection ou un coffret sur mesure, avec un devis clair. On ajuste ensemble jusqu\'à ce que ce soit parfait.',
  },
]

const ICONES = ['leaf', 'glass', 'bouteille'] as const

export function CommentCaSePasse({ titre, etapes }: CommentCaSePasseProps) {
  const items = etapes && etapes.length > 0 ? etapes : ETAPES_DEFAUT

  return (
    <section className="px-6 py-4">
      <div className="max-w-6xl mx-auto bg-green rounded-3xl px-8 py-14 md:px-14">
        <h2 className="font-accent text-3xl md:text-4xl uppercase text-white text-center mb-12">
          {titre ?? 'Comment ça se passe ?'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((etape, i) => (
            <div key={etape.label ?? i} className="flex flex-col items-center text-center gap-4">
              <Asset name={ICONES[i % ICONES.length]} color="#ffffff" className="w-8 [&_svg]:w-full [&_svg]:h-auto" />
              <p className="font-black uppercase  text-white">{etape.label}</p>
              <p className="text-white/80  max-w-xs">{etape.texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
