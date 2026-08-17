"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

type AccidentMapPickerProps = {
  position: [number, number] | null;
  onPositionChange: (position: [number, number]) => void;
};

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapClickHandler({
  onPositionChange,
}: {
  onPositionChange: (position: [number, number]) => void;
}) {
  useMapEvents({
    click(event) {
      onPositionChange([event.latlng.lat, event.latlng.lng]);
    },
  });

  return null;
}

export function AccidentMapPicker({
  position,
  onPositionChange,
}: AccidentMapPickerProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div className="relative min-h-[490px] flex-1 bg-[#ddd]">
      {ready ? (
        <MapContainer
          center={position ?? [36.5, 138.0]}
          zoom={position ? 12 : 5}
          className="h-full min-h-[490px] w-full"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onPositionChange={onPositionChange} />
          {position ? <Marker position={position} icon={markerIcon} /> : null}
        </MapContainer>
      ) : null}

      {!position ? (
        <div className="pointer-events-none absolute bottom-5 left-1/2 z-[1000] flex h-7 -translate-x-1/2 items-center gap-1.5 rounded-full bg-[rgba(30,41,57,0.75)] px-3 py-1.5">
          <Image
            src="/icons/accidents/map-pin-hint.svg"
            alt=""
            width={12}
            height={12}
            className="size-3"
            unoptimized
          />
          <span className="text-xs leading-4 whitespace-nowrap text-white">
            クリックしてピンを立てる
          </span>
        </div>
      ) : null}
    </div>
  );
}
