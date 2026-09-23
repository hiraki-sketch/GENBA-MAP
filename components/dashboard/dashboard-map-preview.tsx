"use client";

import type { AccidentMapPoint } from "@/lib/accidents";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

export function DashboardMapPreview({ points }: { points: AccidentMapPoint[] }) {
  return (
    <MapContainer
      center={[36.2, 137.5]}
      zoom={5}
      className="h-full min-h-[360px] w-full"
      scrollWheelZoom={false}
      dragging={false}
      zoomControl={false}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => (
        <CircleMarker
          key={point.public_id}
          center={[point.lat, point.lng]}
          radius={6}
          pathOptions={{
            color: "#ffffff",
            weight: 1.5,
            fillColor: "#1e4e8c",
            fillOpacity: 1,
          }}
        />
      ))}
    </MapContainer>
  );
}
