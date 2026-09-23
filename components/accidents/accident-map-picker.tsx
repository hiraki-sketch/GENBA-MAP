"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { LocateFixed } from "lucide-react";

import { Button } from "@/components/ui/button";

import "leaflet/dist/leaflet.css";

type AccidentMapPickerProps = {
  position: [number, number] | null;
  onPositionChange: (position: [number, number]) => void;
};

const STREET_ZOOM = 16;

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

function MapViewSync({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, map, zoom]);

  return null;
}

function readCurrentPosition(): Promise<[number, number]> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("このブラウザでは位置情報を使えません。"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (result) => {
        resolve([result.coords.latitude, result.coords.longitude]);
      },
      (error) => {
        reject(
          new Error(
            error.code === error.PERMISSION_DENIED
              ? "位置情報の許可が必要です。現場付近の地図を開くために許可してください。"
              : "現在地を取得できませんでした。もう一度試してください。"
          )
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 15_000,
      }
    );
  });
}

export function AccidentMapPicker({
  position,
  onPositionChange,
}: AccidentMapPickerProps) {
  const [ready, setReady] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(true);
  const [locateError, setLocateError] = useState<string | null>(null);

  const locate = useCallback(async () => {
    setLocating(true);
    setLocateError(null);

    try {
      const next = await readCurrentPosition();
      setMapCenter(next);
    } catch (error) {
      setLocateError(
        error instanceof Error
          ? error.message
          : "現在地を取得できませんでした。"
      );
    } finally {
      setLocating(false);
    }
  }, []);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    void locate();
  }, [locate, ready]);

  return (
    <div className="relative min-h-[490px] flex-1 bg-muted">
      {ready && mapCenter ? (
        <MapContainer
          center={mapCenter}
          zoom={STREET_ZOOM}
          className="h-full min-h-[490px] w-full"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapViewSync center={mapCenter} zoom={STREET_ZOOM} />
          <MapClickHandler onPositionChange={onPositionChange} />
          {position ? (
            <Marker
              position={position}
              icon={markerIcon}
              draggable
              eventHandlers={{
                dragend(event) {
                  const next = event.target.getLatLng();
                  onPositionChange([next.lat, next.lng]);
                },
              }}
            />
          ) : null}
        </MapContainer>
      ) : (
        <div className="flex min-h-[490px] flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="text-sm text-muted-foreground">
            {locating
              ? "現場付近の地図を開くため、現在地を取得しています…"
              : (locateError ?? "現在地を取得してください。")}
          </p>
          {!locating ? (
            <Button type="button" variant="outline" onClick={() => void locate()}>
              現在地を取得
            </Button>
          ) : null}
        </div>
      )}

      {mapCenter ? (
        <div className="absolute top-3 right-3 z-[1000]">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={locating}
            onClick={() => void locate()}
            className="gap-1.5 shadow-sm"
          >
            <LocateFixed className="size-3.5" />
            {locating ? "取得中" : "現在地"}
          </Button>
        </div>
      ) : null}

      {mapCenter && !position ? (
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
            事故地点をタップしてピンを立てる
          </span>
        </div>
      ) : null}

      {mapCenter && locateError ? (
        <p className="absolute bottom-14 left-1/2 z-[1000] w-[min(320px,calc(100%-2rem))] -translate-x-1/2 rounded-md bg-background/90 px-3 py-2 text-center text-xs text-[#c10007]">
          {locateError}
        </p>
      ) : null}
    </div>
  );
}
