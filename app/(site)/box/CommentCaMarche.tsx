import { Asset } from '@/app/components/Asset'

type CommentCaMarcheProps = {
  titre?: string
  etape1Texte?: string
  etape2Texte?: string
  etape2Note?: string
}

export function CommentCaMarche({ titre, etape1Texte, etape2Texte, etape2Note }: CommentCaMarcheProps) {
  return (
    <section className="bg-yellow/30 py-14 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-zinc-900/15">

        <div className="flex items-center md:pr-10">
          <p className="font-accent text-4xl md:text-5xl uppercase leading-none text-zinc-900">
            {titre ?? 'Comment ça marche ?'}
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-4 md:px-10">
          <div className="h-24 flex items-center justify-center">
            <Asset name="bouteillevin" color="#1a1a1a" className="h-full w-auto [&_svg]:h-full [&_svg]:w-auto" />
          </div>
          <p className="italic text-zinc-800">{etape1Texte ?? "Je m'abonne à la box de mon choix"}</p>
        </div>

        <div className="flex flex-col items-center text-center gap-4 md:pl-10">
          <div className="h-24 flex items-center justify-center">
            <Asset name="box" color="#1a1a1a" className="h-full w-auto [&_svg]:h-full [&_svg]:w-auto" />
          </div>
          <p className="italic text-zinc-800">
            {etape2Texte ?? 'Je réceptionne ma commande à la cave le 10 du mois'}
          </p>
          <p className="text-zinc-500">{etape2Note ?? "(Pas d'expédition possible)"}</p>
        </div>

      </div>
    </section>
  )
}
