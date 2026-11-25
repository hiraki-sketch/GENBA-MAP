import { useCallback, useEffect, useState } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import {
  searchMapPointsAction,
  searchNearbyMapPointsAction,
} from "@/app/map/actions";
import type {
  MapFilter,
  SearchCenter,
} from "@/components/map/map-view";
import type {
  AccidentMapPoint,
  NearbyRadius,
} from "@/lib/accidents";

import "leaflet/dist/leaflet.css";

type AccidentMapProps = {
  status: MapFilter;
  searchCenter: SearchCenter | null;
  radiusMeters: NearbyRadius;
  onSearchCenterChange: (center: SearchCenter) => void;
};

function BoundsSync({
  status,
  searchCenter,
  radiusMeters,
  onSearchCenterChange,
  setPoints,
}: AccidentMapProps & {
  setPoints: (points: AccidentMapPoint[]) => void;
}) {
  const map = useMap();

  const load = useCallback(async () => {
    const next = map.getBounds();

    const points = searchCenter
      ? await searchNearbyMapPointsAction({
          lat: searchCenter[0],
          lng: searchCenter[1],
          radiusMeters,
          status,
        })
      : await searchMapPointsAction(
          {
            west: next.getWest(),
            south: next.getSouth(),
            east: next.getEast(),
            north: next.getNorth(),
          },
          status
        );

    setPoints(points);
  }, [map, radiusMeters, searchCenter, setPoints, status]);

  useEffect(() => {
    void load();
  }, [load]);

  useMapEvents({
    click(event) {
      onSearchCenterChange([
        event.latlng.lat,
        event.latlng.lng,
      ]);
    },
    moveend() {
      void load();
    },
  });

  return null;
}

export function AccidentMap({
  status,
  searchCenter,
  radiusMeters,
  onSearchCenterChange,
}: AccidentMapProps) {
  const [points, setPoints] = useState<AccidentMapPoint[]>([]);

  return (
    <MapContainer
      center={[36.2, 137.5]}
      zoom={5}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <BoundsSync
        status={status}
        searchCenter={searchCenter}
        radiusMeters={radiusMeters}
        onSearchCenterChange={onSearchCenterChange}
        setPoints={setPoints}
      />
      {searchCenter ? (
        <Circle
          center={searchCenter}
          radius={radiusMeters}
          pathOptions={{
            color: "#1e4e8c",
            weight: 1.5,
            fillColor: "#1e4e8c",
            fillOpacity: 0.08,
          }}
        />
      ) : null}
      {points.map((point) => (
        <CircleMarker
          key={point.public_id}
          center={[point.lat, point.lng]}
          radius={7}
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
