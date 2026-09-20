import { Asset } from '@/app/components/Asset'

type CoupsDeCoeurProps = {
  items: Array<{
    _id: string
    name: string
    region?: string
    appellationPrincipale?: string
    photo?: { asset?: { url: string } }
  }>
  backgroundImageUrl?: string
}

export function CoupsDeCoeur({ items, backgroundImageUrl }: CoupsDeCoeurProps) {
  return (
    <section className="py-12 lg:py-24 px-6 relative">

      {/* Image de fond */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={backgroundImageUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-50 pointer-events-none select-none"
          />
        </div>
      )}

      {/* Leaf déco haut-droite, déborde volontairement sur la section précédente */}
      <div className="absolute -top-8 right-6 pointer-events-none select-none z-10">
        <Asset name="leaf" color="#E56B00" color2="#EBB132" className="w-40 [&_svg]:w-full [&_svg]:h-auto" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <h2 className="font-accent text-4xl md:text-5xl uppercase text-zinc-900 leading-none mb-8">
          Nos coups de cœur
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => {
            const item = items[i]
            return (
              <div key={item?._id ?? i} className="max-w-64 mx-auto w-full rounded-3xl overflow-hidden flex flex-col">
                <div className="rounded-t-full overflow-hidden aspect-square bg-zinc-100">
                  {item?.photo?.asset?.url ? (
                    <img src={item.photo.asset.url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-zinc-200" />
                  )}
                </div>
                <div className="bg-white px-5 py-4 flex flex-col gap-1 flex-1">
                  {item ? (
                    <>
                      <p className="font-black uppercase   text-zinc-900">{item.name}</p>
                      {(item.region || item.appellationPrincipale) && (
                        <p className="text-zinc-400">
                          {[item.region, item.appellationPrincipale].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="font-black uppercase   text-zinc-900">Vin Aroha</p>
                      <p className="text-zinc-300  italic">À renseigner dans le studio</p>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
