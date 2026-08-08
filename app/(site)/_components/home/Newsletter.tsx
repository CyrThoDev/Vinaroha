import { NewsletterForm } from '@/app/components/NewsletterForm'

export function Newsletter() {
  return (
    <section className="bg-yellow py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-accent text-5xl md:text-6xl uppercase leading-none mb-4 text-zinc-900">Restez informés&nbsp;!</h2>
          <p className="text-zinc-700 max-w-sm">
            Nouveaux arrivages, événements à la cave, coups de cœur du mois - une fois par mois, dans votre boîte mail.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  )
}
