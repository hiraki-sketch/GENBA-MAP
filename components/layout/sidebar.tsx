"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarHeader } from "@/components/layout/sidebar-header";
import { SidebarUser } from "@/components/layout/sidebar-user";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
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

const NAV_ITEM_HEIGHT = 36;
const NAV_ITEM_GAP = 2;

function getActiveHref(pathname: string) {
  const matches = navItems.filter((item) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  return matches.sort((a, b) => b.href.length - a.href.length)[0]?.href;
}

export function Sidebar() {
  const pathname = usePathname();
  const activeHref = getActiveHref(pathname);
  const activeIndex = navItems.findIndex((item) => item.href === activeHref);

  return (
    <ShadcnSidebar collapsible="none" className="border-r border-sidebar-border">
      <SidebarHeader />
      <SidebarContent className="px-3 pt-2">
        <SidebarMenu className="relative gap-0.5">
          {activeIndex >= 0 ? (
            <li
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 list-none"
            >
              <span
                className="absolute inset-x-0 rounded-md bg-primary/8 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
                style={{
                  height: NAV_ITEM_HEIGHT,
                  transform: `translateY(${activeIndex * (NAV_ITEM_HEIGHT + NAV_ITEM_GAP)}px)`,
                }}
              />
              <span
                className="absolute top-1.5 left-0 w-0.5 rounded-full bg-primary motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
                style={{
                  height: NAV_ITEM_HEIGHT - 12,
                  transform: `translateY(${activeIndex * (NAV_ITEM_HEIGHT + NAV_ITEM_GAP)}px)`,
                }}
              />
            </li>
          ) : null}
          {navItems.map((item) => {
            const isActive = item.href === activeHref;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "relative z-10 h-9 rounded-md border-l-0 px-3 text-[13px] font-medium motion-safe:transition-colors motion-safe:duration-200",
                    isActive
                      ? "bg-transparent text-primary hover:bg-transparent hover:text-primary data-active:bg-transparent"
                      : "text-muted-foreground hover:bg-transparent hover:text-foreground"
                  )}
                >
                  <Link href={item.href}>
                    <span className="relative size-[15px] shrink-0 overflow-hidden">
                      <Image
                        src={item.icon}
                        alt=""
                        width={15}
                        height={15}
                        className={cn(
                          "size-[15px] motion-safe:transition-transform motion-safe:duration-200",
                          isActive && "scale-110"
                        )}
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
      <SidebarFooter className="mt-auto border-t border-sidebar-border p-0">
        <SidebarUser />
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
