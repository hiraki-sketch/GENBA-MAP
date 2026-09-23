import { AccidentRegisterForm } from "@/components/accidents/accident-register-form";
import { AppShell } from "@/components/layout/app-shell";
import { listDrivers } from "@/lib/drivers";

export default async function AccidentRegisterPage() {
  let drivers: Awaited<ReturnType<typeof listDrivers>> = [];
  let connectionError: string | null = null;

  try {
    drivers = await listDrivers();
  } catch (error) {
    connectionError =
      error instanceof Error
        ? error.message
        : "データベースに接続できません。";
  }

  return (
    <AppShell>
      <div className="flex flex-1 flex-col bg-background px-6 pb-6">
        {connectionError ? (
          <p className="pt-6 text-sm text-[#c10007]">{connectionError}</p>
        ) : null}
        <AccidentRegisterForm drivers={drivers} />
      </div>
    </AppShell>
  );
}
