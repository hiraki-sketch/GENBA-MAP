"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarHeader } from "@/components/layout/sidebar-header";
import { SidebarUser } from "@/components/layout/sidebar-user";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "ダッシュボード",
    href: "/",
    icon: "/icons/sidebar/dashboard.svg",
  },
  {
    title: "事故一覧",
    href: "/accidents",
    icon: "/icons/sidebar/accidents.svg",
  },
  {
    title: "マップ",
    href: "/map",
    icon: "/icons/sidebar/map.svg",
  },
  {
    title: "事故登録",
    href: "/accidents/new",
    icon: "/icons/sidebar/register.svg",
  },
  {
    title: "設定",
    href: "/settings",
    icon: "/icons/sidebar/settings.svg",
  },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <ShadcnSidebar collapsible="none" className="border-r border-sidebar-border">
      <SidebarHeader />
      <SidebarUser />
      <SidebarContent className="px-2 py-3">
        <SidebarMenu className="gap-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "h-auto gap-2.5 rounded px-3 py-2 text-sm font-medium leading-5",
                    isActive
                      ? "bg-[#f3f4f6] text-[#101828] hover:bg-[#f3f4f6] hover:text-[#101828]"
                      : "text-[#4a5565] hover:bg-transparent hover:text-[#4a5565]"
                  )}
                >
                  <Link href={item.href}>
                    <span className="relative size-[15px] shrink-0 overflow-hidden">
                      <Image
                        src={item.icon}
                        alt=""
                        width={15}
                        height={15}
                        className="size-[15px]"
                        unoptimized
                      />
                    </span>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
