import { AppShell } from "@/components/layout/app-shell";
import { SettingsForm } from "@/components/settings/settings-form";
import { listDrivers } from "@/lib/drivers";

export default async function SettingsPage() {
  const drivers = await listDrivers();

  return (
    <AppShell>
      <div className="flex flex-1 flex-col overflow-auto bg-[#f3f4f6]">
        <SettingsForm drivers={drivers} />
      </div>
    </AppShell>
  );
}
