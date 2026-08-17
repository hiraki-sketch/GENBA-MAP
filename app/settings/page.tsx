import { AppShell } from "@/components/layout/app-shell";
import { SettingsForm } from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="flex flex-1 flex-col overflow-auto bg-[#f3f4f6]">
        <SettingsForm />
      </div>
    </AppShell>
  );
}
