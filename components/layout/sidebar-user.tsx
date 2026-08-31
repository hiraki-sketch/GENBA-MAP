type SidebarUserProps = {
  name?: string;
  email?: string;
};

export function SidebarUser({
  name = "管理者 山田",
  email = "yamada@genba-map.jp",
}: SidebarUserProps) {
  return (
    <div className="px-5 py-4">
      <p className="truncate text-[13px] font-medium leading-5 text-foreground">
        {name}
      </p>
      <p className="truncate text-[11px] leading-4 text-muted-foreground">
        {email}
      </p>
    </div>
  );
}
