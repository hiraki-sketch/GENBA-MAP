"use client";

import dynamic from "next/dynamic";
import type { 
  MapFilter,
  SearchCenter,
} from "@/components/map/map-view";
import type { NearbyRadius} from "@/lib/accidents";

const AccidentMap = dynamic(
  () => import("@/components/map/accident-map").then((mod) => mod.AccidentMap),
  {
    ssr: false,
    loading: () => <div className="h-full min-h-[420px] w-full bg-muted" />,
  }
);

type MapCanvasProps = {
  status: MapFilter;
  searchCenter: SearchCenter | null;
  radiusMeters: NearbyRadius;
  onSearchCenterChange: (center: SearchCenter) => void;
};

export function MapCanvas(props : MapCanvasProps) {
  return <AccidentMap {...props} />;
}
