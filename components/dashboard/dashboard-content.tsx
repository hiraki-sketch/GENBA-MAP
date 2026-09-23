import { connection } from "next/server";
import { listAccidents, listAccidentMapPoints } from "@/lib/accidents";
import { DashboardView } from "./dashboard-view";
import { DashboardMap } from "./dashboard-map";

export async function DashboardContent() {
  await connection();
  const [accidents, points] = await Promise.all([listAccidents(), listAccidentMapPoints()]);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit",
  }).formatToParts(new Date());
  const year = parts.find(part => part.type === "year")!.value;
  const month = parts.find(part => part.type === "month")!.value;
  return (
    <DashboardView
      total={accidents.length}
      thisMonth={accidents.filter(accident => accident.occurred_on.startsWith(year + "-" + month)).length}
      pending={accidents.filter(accident => accident.status === "未対応").length}
      monthLabel={year + "年" + Number(month) + "月"}
      recentAccidents={accidents.slice(0, 5)}
      mapPreview={<DashboardMap points={points} />}
    />
  );
}
