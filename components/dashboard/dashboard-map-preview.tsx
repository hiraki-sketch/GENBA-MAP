"use client";

import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const markers: { position: [number, number]; color: string }[] = [
  { position: [36.05, 139.52], color: "#ef4444" },
  { position: [35.0, 136.0], color: "#ef4444" },
  { position: [38.25, 140.9], color: "#10b981" },
  { position: [34.75, 137.7], color: "#10b981" },
  { position: [34.7, 135.3], color: "#ef4444" },
  { position: [35.45, 139.55], color: "#10b981" },
  { position: [35.2, 138.9], color: "#f59e0b" },
  { position: [34.85, 135.5], color: "#f59e0b" },
];

export function DashboardMapPreview() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="h-full min-h-[300px] bg-[#ddd]" />;
  }

  return (
    <MapContainer
      center={[36.2, 137.5]}
      zoom={5}
      className="h-full min-h-[300px] w-full"
      scrollWheelZoom={false}
      dragging={false}
      zoomControl={false}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <CircleMarker
          key={`${marker.position[0]}-${marker.position[1]}-${marker.color}`}
          center={marker.position}
          radius={6}
          pathOptions={{
            color: "#ffffff",
            weight: 2,
            fillColor: marker.color,
            fillOpacity: 1,
          }}
        />
      ))}
    </MapContainer>
  );
}
