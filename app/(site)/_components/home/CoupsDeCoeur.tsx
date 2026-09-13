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
    <section className=" py-16 px-6 relative overflow-hidden">

      {/* Image de fond */}
      {backgroundImageUrl && (
        <img
          src={backgroundImageUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none select-none"
        />
      )}

      {/* Leaf déco haut-droite */}
      <div className="absolute top-0 -right-4 pointer-events-none select-none">
        <Asset name="leaf" color="#E56B00" color2="#EBB132" className="w-40 z-24 [&_svg]:w-full [&_svg]:h-auto" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <h2 className="font-accent text-4xl md:text-5xl uppercase text-zinc-900 leading-none mb-14">
          Nos coups de cœur
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.length > 0 ? items.map((item) => (
            <div key={item._id} className="max-w-72 mx-auto w-full rounded-3xl overflow-hidden flex flex-col">
              <div className="rounded-t-full overflow-hidden aspect-4/5 bg-zinc-100">
                {item.photo?.asset?.url ? (
                  <img src={item.photo.asset.url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-zinc-200" />
                )}
              </div>
              <div className="bg-white px-6 py-5 flex flex-col gap-1 flex-1">
                <p className="font-black uppercase   text-zinc-900">{item.name}</p>
                {(item.region || item.appellationPrincipale) && (
                  <p className="text-zinc-400">
                    {[item.region, item.appellationPrincipale].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            </div>
          )) : [0, 1, 2].map((i) => (
            <div key={i} className="max-w-72 mx-auto w-full rounded-3xl overflow-hidden flex flex-col">
              <div className="rounded-t-full overflow-hidden aspect-4/5 bg-zinc-200" />
              <div className="bg-white px-6 py-5 flex flex-col gap-1 flex-1">
                <p className="font-black uppercase   text-zinc-900">Vin Aroha</p>
                <p className="text-zinc-300  italic">À renseigner dans le studio</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
