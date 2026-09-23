export function DashboardHeader() {
  return (
      <header className="flex flex-col gap-2 rounded-md bg-green-200 px-4 py-3 motion-safe:animate-in motion-safe:slide-in-from-left-8 motion-safe:fade-in motion-safe:duration-500">
        <p className="text-[11px] tracking-[0.18em] text-muted-foreground">
          運用状況
        </p>
        <h1 className="text-[28px] font-semibold leading-8 tracking-tight text-foreground">
          現場マップ事故情報管理システム
        </h1>
      </header>
  );
}
