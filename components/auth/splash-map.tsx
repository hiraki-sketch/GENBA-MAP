"use client";

import { CircleMarker, MapContainer, Polyline, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const ehime: [number, number][] = [
  [34.0661, 132.9977],
  [33.8392, 132.7654],
  [33.5064, 132.5445],
  [33.2231, 132.5606],
];

export function SplashMap() {
  return (
    <MapContainer
      center={[33.65, 132.8]}
      zoom={9}
      className="h-full w-full"
      scrollWheelZoom={false}
      dragging={false}
      zoomControl={false}
      attributionControl={false}
      doubleClickZoom={false}
      keyboard={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline
        positions={ehime}
        pathOptions={{ color: "#60a5fa", weight: 2, opacity: 0.85 }}
      />
      {ehime.map((point) => (
        <CircleMarker
          key={`${point[0]}-${point[1]}`}
          center={point}
          radius={5}
          pathOptions={{
            color: "#ffffff",
            weight: 1,
            fillColor: "#e85100",
            fillOpacity: 1,
          }}
        />
      ))}
    </MapContainer>
  );
}
