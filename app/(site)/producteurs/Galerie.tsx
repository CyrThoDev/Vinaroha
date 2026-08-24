type GalerieProps = {
  images?: string[]
}

const PLACEHOLDER_COUNT = 5

export function Galerie({ images }: GalerieProps) {
  const photos: (string | null)[] =
    images && images.length > 0 ? images : Array.from({ length: PLACEHOLDER_COUNT }, () => null)

  return (
    <section className="bg-background">
      <div className="grid grid-cols-3 sm:grid-cols-5">
        {photos.map((url, i) => (
          <div key={i} className={`aspect-square overflow-hidden ${i % 2 === 0 ? 'bg-zinc-200' : 'bg-zinc-100'}`}>
            {url && <img src={url} alt="" className="w-full h-full object-cover" />}
          </div>
        ))}
      </div>
    </section>
  )
}
