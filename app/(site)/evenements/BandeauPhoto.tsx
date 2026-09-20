type BandeauPhotoProps = {
  imageUrl?: string
}

export function BandeauPhoto({ imageUrl }: BandeauPhotoProps) {
  return (
    <section className="h-96 md:h-140 overflow-hidden py-16 ">
      {imageUrl && <img src={imageUrl} alt="" className="w-full h-full object-cover" />}
    </section>
  )
}
