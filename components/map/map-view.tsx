"use client";

import { useState } from "react";
import { MapCanvas } from "@/components/map/map-canvas";
import { MapPanelHeader } from "@/components/map/map-panel-header";
import type { AccidentStatus,
    NearbyRadius,
 } from "@/lib/accidents";

export type MapFilter = "すべて" | AccidentStatus;
export type SearchCenter = [lat: number, lng: number];
//クライアントサイドの親コンポーネント　パネルヘッダー、地図にpropsでstatusを渡す。　
export function MapView() {
  const [status, setStatus] = useState<MapFilter>("すべて");
  const [searchCenter, setSearchCenter] =useState<SearchCenter | null>(null);
  const [radiusMeters] = useState<NearbyRadius>(1000);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <MapPanelHeader
        status={status}
        onStatusChange={setStatus}
        isNearbySearch={searchCenter !== null}
        onClearNearbySearch={() => setSearchCenter(null)}
      />

      <div className="min-h-[420px] flex-1">
        <MapCanvas 
        status={status} 
        searchCenter={searchCenter}
        radiusMeters={radiusMeters}
        onSearchCenterChange={setSearchCenter}
        />
      </div>
    </div>
  );
}