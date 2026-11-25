import { AccidentsHeader } from "@/components/accidents/accidents-header";
import { AccidentsTable } from "@/components/accidents/accidents-table";
import { AppShell } from "@/components/layout/app-shell";
import { connection } from "next/server";
import { listAccidents } from "@/lib/accidents";

export default async function AccidentsPage() {
  await connection();
  const accidents = await listAccidents();


  return (
    <AppShell>
      <div className="flex flex-1 flex-col gap-6 bg-background p-6">
        <AccidentsHeader />
        <AccidentsTable accidents={accidents}/>
      </div>
    </AppShell>
  );
}
