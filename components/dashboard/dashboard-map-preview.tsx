"use client";

import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const markers: [number, number][] = [
  [36.05, 139.52],
  [35.0, 136.0],
  [38.25, 140.9],
  [34.75, 137.7],
  [34.7, 135.3],
  [35.45, 139.55],
  [35.2, 138.9],
  [34.85, 135.5],
];

export function DashboardMapPreview() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="h-full min-h-[360px] bg-muted" />;
  }

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
      {markers.map((position) => (
        <CircleMarker
          key={`${position[0]}-${position[1]}`}
          center={position}
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
