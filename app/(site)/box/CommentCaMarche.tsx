import { Asset } from '@/app/components/Asset'

type CommentCaMarcheProps = {
  titre?: string
  etape1Texte?: string
  etape2Texte?: string
  etape2Note?: string
}

export function CommentCaMarche({ titre, etape1Texte, etape2Texte, etape2Note }: CommentCaMarcheProps) {
  return (
    <section className="bg-[#EDE1C0] py-14 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-zinc-900/15">

        <div className="flex items-center md:pr-10">
          <p className="font-accent text-3xl uppercase leading-tight text-zinc-900">
            {titre ?? 'Comment ça marche ?'}
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-4 md:px-10">
          <Asset name="bouteille" color="#1a1a1a" className="w-8 [&_svg]:w-full [&_svg]:h-auto" />
          <p className="italic text-zinc-800">{etape1Texte ?? "Je m'abonne à la box de mon choix"}</p>
        </div>

        <div className="flex flex-col items-center text-center gap-4 md:pl-10">
          <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="#1a1a1a" strokeWidth="1.5" className="text-zinc-900">
            <rect x="8" y="22" width="40" height="24" rx="3" transform="rotate(-8 28 34)" />
            <rect x="16" y="16" width="40" height="24" rx="3" transform="rotate(4 36 28)" />
            <circle cx="36" cy="28" r="6" transform="rotate(4 36 28)" />
          </svg>
          <p className="italic text-zinc-800">
            {etape2Texte ?? 'Je réceptionne ma commande à la cave le 10 du mois'}
          </p>
          <p className="text-zinc-500">{etape2Note ?? "(Pas d'expédition possible)"}</p>
        </div>

      </div>
    </section>
  )
}
