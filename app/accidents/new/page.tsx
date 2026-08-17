import { AccidentRegisterForm } from "@/components/accidents/accident-register-form";
import { AppShell } from "@/components/layout/app-shell";

export default function AccidentRegisterPage() {
  return (
    <AppShell>
      <div className="flex flex-1 flex-col bg-[#f9fafb] px-6 pb-6">
        <AccidentRegisterForm />
      </div>
    </AppShell>
  );
}
