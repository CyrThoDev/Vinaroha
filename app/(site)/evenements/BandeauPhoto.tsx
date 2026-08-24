type BandeauPhotoProps = {
  imageUrl?: string
}

export function BandeauPhoto({ imageUrl }: BandeauPhotoProps) {
  return (
    <section className="h-64 md:h-96 bg-linear-to-br from-green/15 via-yellow/10 to-orange/15 overflow-hidden">
      {imageUrl && <img src={imageUrl} alt="" className="w-full h-full object-cover" />}
    </section>
  )
}
