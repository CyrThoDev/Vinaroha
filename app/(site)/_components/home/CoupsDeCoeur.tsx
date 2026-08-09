import { Asset } from '@/app/components/Asset'

type CoupsDeCoeurProps = {
  vins: Array<{
    _id: string
    name: string
    appellation?: string
    prix?: number
    type?: string
    image?: { asset?: { url: string } }
    producteur?: { name: string }
  }>
  backgroundImageUrl?: string
}

export function CoupsDeCoeur({ vins, backgroundImageUrl }: CoupsDeCoeurProps) {
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
        <Asset name="leaf" color="#E56B00" color2="#EBB132" className="w-32 z-20 [&_svg]:w-full [&_svg]:h-auto" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <h2 className="font-accent text-5xl md:text-6xl uppercase text-black leading-none mb-14">
          Nos coups de cœur
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vins.length > 0 ? vins.map((vin) => (
            <div key={vin._id} className=" rounded-3xl overflow-hidden flex flex-col">
              <div className="rounded-t-full overflow-hidden aspect-4/5 bg-zinc-100">
                {vin.image?.asset?.url ? (
                  <img src={vin.image.asset.url} alt={vin.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-zinc-200" />
                )}
              </div>
              <div className="bg-white px-6 py-5 flex flex-col gap-1 flex-1">
                <p className="font-black uppercase  tracking-widest text-zinc-900">{vin.name}</p>
                {vin.appellation && <p className=" ">{vin.appellation}</p>}
                {vin.producteur?.name && <p className="text-zinc-400 ">{vin.producteur.name}</p>}
                {vin.prix && <p className="font-black text-orange  mt-2">{vin.prix}&nbsp;€</p>}
              </div>
            </div>
          )) : [0, 1, 2].map((i) => (
            <div key={i} className=" rounded-3xl overflow-hidden flex flex-col">
              <div className="rounded-t-full overflow-hidden aspect-4/5 bg-zinc-200" />
              <div className="bg-white px-6 py-5 flex flex-col gap-1 flex-1">
                <p className="font-black uppercase  tracking-widest text-zinc-900">Vin Aroha</p>
                <p className="text-zinc-300  italic">À renseigner dans le studio</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
