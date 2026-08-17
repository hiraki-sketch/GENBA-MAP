import { AccidentsHeader } from "@/components/accidents/accidents-header";
import { AccidentsTable } from "@/components/accidents/accidents-table";
import { AppShell } from "@/components/layout/app-shell";

export default function AccidentsPage() {
  return (
    <AppShell>
      <div className="flex flex-1 flex-col gap-6 bg-[#f9fafb] p-6">
        <AccidentsHeader />
        <AccidentsTable />
      </div>
    </AppShell>
  );
}
