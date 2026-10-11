import Image from 'next/image'
import { Asset } from '@/app/components/Asset'

type Service = { titre?: string; texte?: string }

type OffreProps = {
  titre?: string
  offre?: Service[]
  backgroundImageUrl?: string
}

const OFFRE_DEFAUT: Service[] = [
  {
    titre: 'Tarifs professionnels',
    texte: 'Une grille tarifaire dédiée aux professionnels, dégressive selon les volumes.',
  },
  {
    titre: 'Sélection sur-mesure pour votre carte',
    texte: "On compose avec vous une sélection adaptée à votre cuisine, votre ambiance et votre clientèle.",
  },
  {
    titre: 'Dégustations & formation d\'équipe',
    texte: "Des sessions de dégustation pour vous et votre équipe, afin de mieux présenter les vins à vos clients.",
  },
  {
    titre: 'Livraison',
    texte: 'Une livraison adaptée à votre rythme, avec un suivi de commande simple et réactif.',
  },
]

const ICONES = ['bouteillevin', 'leaf', 'glass', 'gift'] as const

export function Offre({ titre, offre, backgroundImageUrl }: OffreProps) {
  const items = offre && offre.length > 0 ? offre : OFFRE_DEFAUT

  return (
    <section className="bg-background py-16 px-6 relative overflow-hidden">

      {/* Image de fond */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={backgroundImageUrl}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover opacity-50 pointer-events-none select-none"
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative">
        <h2 className="font-accent text-4xl md:text-5xl uppercase leading-none text-zinc-900 mb-12">
          {titre ?? 'Ce que nous proposons'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {items.map((s, i) => {
            const icone = ICONES[i % ICONES.length]
            return (
              <div key={s.titre ?? i} className="bg-background rounded-2xl p-6">
                <div className="w-10 h-10 mb-4 rounded-lg bg-green flex items-center justify-center p-2">
                  <Asset
                    name={icone}
                    color="#ffffff"
                    color2={icone === 'leaf' ? '#EBB132' : undefined}
                    className="w-full h-full [&_svg]:w-full [&_svg]:h-full"
                  />
                </div>
                <p className="font-black uppercase text-zinc-900 mb-2">{s.titre}</p>
                <p className="text-zinc-600">{s.texte}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
