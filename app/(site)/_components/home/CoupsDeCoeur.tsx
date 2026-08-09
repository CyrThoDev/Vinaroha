import { Asset } from '@/app/components/Asset'

type CoupsDeCoeurProps = {
  vins: Array<{
    _id: string
    name: string
    appellation?: string
    prix?: number
    type?: string
    image?: { asset?: { url: string } }
    vigneron?: { name: string }
  }>
}

export function CoupsDeCoeur({ vins }: CoupsDeCoeurProps) {
  return (
    <section className="bg-green py-16 px-6 overflow-hidden relative">

      {/* Leaf déco haut-droite */}
      <div className="absolute top-8 -right-4 pointer-events-none select-none">
        <Asset name="leaf" color="#E56B00" color2="#EBB132" className="w-32 opacity-70 [&_svg]:w-full [&_svg]:h-auto" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <h2 className="font-accent text-5xl md:text-6xl uppercase text-white leading-none mb-14">
          Nos coups de cœur
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vins.length > 0 ? vins.map((vin) => (
            <div key={vin._id} className="bg-background rounded-3xl overflow-hidden flex flex-col">
              <div className="flex items-end justify-center pt-10 pb-6 px-8 min-h-56">
                {vin.image?.asset?.url ? (
                  <img src={vin.image.asset.url} alt={vin.name} className="max-h-44 object-contain drop-shadow-lg" />
                ) : (
                  <div className="w-14 h-44 bg-zinc-200 rounded-lg" />
                )}
              </div>
              <div className="bg-white px-6 py-5 flex flex-col gap-1 flex-1">
                <p className="font-black uppercase text-xs tracking-widest text-zinc-900">{vin.name}</p>
                {vin.appellation && <p className=" text-xs">{vin.appellation}</p>}
                {vin.vigneron?.name && <p className="text-zinc-400 text-xs">{vin.vigneron.name}</p>}
                {vin.prix && <p className="font-black text-orange  mt-2">{vin.prix}&nbsp;€</p>}
              </div>
            </div>
          )) : [0, 1, 2].map((i) => (
            <div key={i} className="bg-background rounded-3xl overflow-hidden flex flex-col">
              <div className="flex items-end justify-center pt-10 pb-6 px-8 min-h-56">
                <div className="w-14 h-44 bg-zinc-200 rounded-lg" />
              </div>
              <div className="bg-white px-6 py-5 flex flex-col gap-1 flex-1">
                <p className="font-black uppercase text-xs tracking-widest text-zinc-900">Vin d&apos;Aroha</p>
                <p className="text-zinc-300 text-xs italic">À renseigner dans le studio</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
