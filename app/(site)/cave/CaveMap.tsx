'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Marqueur custom : le logo Vin'Aroha dans une pastille blanche, plutôt que le pin par défaut.
const icon = L.divIcon({
  className: '',
  html: `<div style="width:48px;height:48px;border-radius:9999px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.25);border:2px solid #D25200;display:flex;align-items:center;justify-content:center;">
    <img src="/logo-vinaroha.svg" alt="" style="width:32px;height:32px;object-fit:contain;" />
  </div>`,
  iconSize: [64, 64],
  iconAnchor: [24, 24],
  popupAnchor: [0, -24],
})

export type CaveMapMarker = {
  lat: number
  lng: number
  label?: string
}

type CaveMapProps = {
  markers: CaveMapMarker[]
}

export function CaveMap({ markers }: CaveMapProps) {
  const hasMultiple = markers.length > 1
  const bounds = hasMultiple
    ? L.latLngBounds(markers.map(m => [m.lat, m.lng] as [number, number]))
    : undefined

  return (
    <MapContainer
      {...(bounds
        ? { bounds, boundsOptions: { padding: [40, 40] } }
        : { center: [markers[0].lat, markers[0].lng] as [number, number], zoom: 15 })}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m, i) => (
        <Marker key={i} position={[m.lat, m.lng]} icon={icon}>
          {m.label && <Popup>{m.label}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  )
}
