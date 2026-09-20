import { Asset } from '@/app/components/Asset'

type Membre = { nom?: string; description?: string; photo?: { asset?: { url: string } } }

type NotreEquipeProps = {
  titre?: string
  equipe?: Membre[]
}

const MEMBRES_DEFAUT: Membre[] = [{}, {}, {}]
const PHOTO_SIZE = 'w-44 h-44 md:w-56 md:h-56'

export function NotreEquipe({ titre, equipe }: NotreEquipeProps) {
  const membres = equipe && equipe.length > 0 ? equipe : MEMBRES_DEFAUT

  return (
    <section className="bg-background  px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-4xl md:text-5xl uppercase leading-none text-zinc-900 mb-14">
          {titre ?? 'Notre équipe'}
        </h2>

        <div className="flex flex-wrap justify-center gap-10 md:gap-32">
          {membres.map((m, i) => (
            <div key={m.nom ?? i} className="flex flex-col items-center gap-2 text-center max-w-56">
              <div className={PHOTO_SIZE}>
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
              {m.nom && <p className="font-black text-zinc-900">{m.nom}</p>}
              {m.description && <p className="text-zinc-600 text-sm">{m.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
