'use client'

import dynamic from 'next/dynamic'
import type { CaveMapMarker } from './CaveMap'

const CaveMap = dynamic(() => import('./CaveMap').then(m => m.CaveMap), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-zinc-200 animate-pulse" />,
})

type CaveMapLoaderProps = {
  markers: CaveMapMarker[]
}

export function CaveMapLoader(props: CaveMapLoaderProps) {
  return <CaveMap {...props} />
}
