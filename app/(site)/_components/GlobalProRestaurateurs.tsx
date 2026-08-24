'use client'

import { usePathname } from 'next/navigation'
import { ProRestaurateurs } from './ProRestaurateurs'

// Pages qui affichent déjà ProRestaurateurs elles-mêmes, à un autre endroit de leur mise en page.
const HIDDEN_ON = ['/producteurs']

export function GlobalProRestaurateurs() {
  const pathname = usePathname()
  if (HIDDEN_ON.includes(pathname)) return null
  return <ProRestaurateurs />
}
