import { client } from '@/sanity/lib/client'
import { allEventsQuery } from '@/sanity/lib/queries'
import type { SanityEvent } from '@/sanity/lib/queries'
import AgendaView from './AgendaView'

export default async function AgendaPage() {
  const events = await client.fetch<SanityEvent[]>(allEventsQuery as string)

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-10">Agenda</h1>
      <AgendaView events={events} />
    </main>
  )
}
