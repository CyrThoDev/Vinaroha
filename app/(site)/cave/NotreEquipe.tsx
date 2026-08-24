import { Asset } from '@/app/components/Asset'

type Membre = { nom?: string; photo?: { asset?: { url: string } } }

type NotreEquipeProps = {
  titre?: string
  equipe?: Membre[]
}

const MEMBRES_DEFAUT: Membre[] = [{}, {}, {}]

export function NotreEquipe({ titre, equipe }: NotreEquipeProps) {
  const membres = equipe && equipe.length > 0 ? equipe : MEMBRES_DEFAUT

  return (
    <section className="bg-background pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-3xl md:text-4xl uppercase text-zinc-900 mb-8">
          {titre ?? 'Notre équipe'}
        </h2>

        <div className="flex flex-wrap gap-6">
          {membres.map((m, i) => (
            <div key={m.nom ?? i} className="flex flex-col items-center gap-2 w-28">
              <div className="w-28 h-28">
                {m.photo?.asset?.url ? (
                  <Asset
                    name="rounded"
                    imageUrl={m.photo.asset.url}
                    alt={m.nom}
                    className="w-full h-full [&_svg]:w-full [&_svg]:h-full"
                  />
                ) : (
                  <Asset name="rounded" color="#e4e4e7" className="w-full h-full [&_svg]:w-full [&_svg]:h-full" />
                )}
              </div>
              {m.nom && <p className=" font-black text-zinc-900">{m.nom}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
