import { Sidebar } from "@/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requireSession } from "@/lib/auth-session";

type AppShellProps = {
  children: React.ReactNode;
};

export async function AppShell({ children }: AppShellProps) {
  const session = await requireSession();

  return (
    <SidebarProvider>
      <Sidebar
        userName={session.user.name}
        userEmail={session.user.email}
      />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
