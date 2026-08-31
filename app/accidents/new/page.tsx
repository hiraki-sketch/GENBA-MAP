import { AccidentRegisterForm } from "@/components/accidents/accident-register-form";
import { AppShell } from "@/components/layout/app-shell";
import { listDrivers } from "@/lib/drivers";

export default async function AccidentRegisterPage() {
  const drivers = await listDrivers();

  return (
    <AppShell>
      <div className="flex flex-1 flex-col bg-[#f9fafb] px-6 pb-6">
        <AccidentRegisterForm drivers={drivers} />
      </div>
    </AppShell>
  );
}
