import Image from "next/image";

type SidebarUserProps = {
  name?: string;
  email?: string;
};

export function SidebarUser({
  name = "管理者 山田",
  email = "yamada@genba-map.jp",
}: SidebarUserProps) {
  return (
    <div className="border-t border-black/10 p-3">
      <div className="flex h-[32.5px] items-center gap-2.5">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb]">
          <span className="relative size-[14px] overflow-hidden">
            <Image
              src="/icons/sidebar/user.svg"
              alt=""
              width={14}
              height={14}
              className="size-[14px]"
              unoptimized
            />
          </span>
        </div>

        <div className="flex min-w-0 flex-col items-start">
          <p className="truncate text-xs font-medium leading-4 text-[#101828]">
            {name}
          </p>
          <p className="truncate text-[11px] leading-[16.5px] text-[#6a7282]">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
}
