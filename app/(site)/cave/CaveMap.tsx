'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Marqueur custom : le logo Vin'Aroha découpé dans une des formes décoratives du site, plutôt que le pin par défaut.
const icon = L.divIcon({
  className: '',
  html: `<div style="width:48px;height:48px;position:relative;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.25));">
    <div style="position:absolute;inset:0;background:#fff;-webkit-mask-image:url('/assets/rounded.svg');mask-image:url('/assets/rounded.svg');-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;"></div>
    <img src="/logo-vinaroha.svg" alt="" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:36px;height:36px;object-fit:contain;" />
  </div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -26],
})

export type CaveMapMarker = {
  lat: number
  lng: number
  label?: string
  address?: string
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
          {(m.label || m.address) && (
            <Popup>
              {m.label && <strong>{m.label}</strong>}
              {m.address && <div>{m.address}</div>}
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  )
}
