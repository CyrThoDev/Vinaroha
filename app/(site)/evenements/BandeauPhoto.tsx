import Image from 'next/image'

type BandeauPhotoProps = {
  imageUrl?: string
}

export function BandeauPhoto({ imageUrl }: BandeauPhotoProps) {
  return (
    <section className="relative h-96 md:h-140 overflow-hidden ">
      {imageUrl && <Image src={imageUrl} alt="" fill sizes="100vw" className="object-cover" />}
    </section>
  )
}
