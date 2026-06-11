"use client";

import { CalendarDays, Home as HomeIcon, Percent, Scissors, User } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export type AppBottomNavTab = "inicio" | "tratamientos" | "turnos" | "promos" | "perfil";

type AppBottomNavProps = {
  active?: AppBottomNavTab;
};

type NavItem = {
  id: AppBottomNavTab;
  href: string;
  label: string;
  Icon: LucideIcon;
  filledWhenActive?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { id: "inicio", href: "/", label: "Inicio", Icon: HomeIcon, filledWhenActive: true },
  { id: "tratamientos", href: "/tratamientos", label: "Tratamientos", Icon: Scissors },
  { id: "turnos", href: "/turnos", label: "Turnos", Icon: CalendarDays, filledWhenActive: true },
  { id: "promos", href: "/promociones", label: "Promos", Icon: Percent },
  { id: "perfil", href: "/perfil", label: "Perfil", Icon: User },
];

const tabClass = (isActive: boolean) =>
  `flex w-full flex-col items-center justify-center gap-1 transition-colors active:scale-95 ${
    isActive
      ? "text-[var(--premium-gold-light)]"
      : "text-[var(--soft-gray)] hover:text-[var(--premium-gold-light)]"
  }`;

function NavIcon({ Icon, isActive, filledWhenActive }: { Icon: LucideIcon; isActive: boolean; filledWhenActive?: boolean }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden>
      <Icon
        className="h-6 w-6"
        strokeWidth={2}
        fill={filledWhenActive && isActive ? "currentColor" : "none"}
      />
    </span>
  );
}

export function AppBottomNav({ active }: AppBottomNavProps) {
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-[var(--outline)]/10 bg-[var(--nav-bg)] shadow-lg">
      <div className="mx-auto grid h-20 max-w-md grid-cols-5 items-center px-2 pb-[env(safe-area-inset-bottom,0px)]">
        {NAV_ITEMS.map(({ id, href, label, Icon, filledWhenActive }) => {
          const isActive = active === id;

          if (id === "inicio" && isActive) {
            return (
              <button
                key={id}
                type="button"
                className={tabClass(true)}
                aria-label={label}
                aria-current="page"
              >
                <NavIcon Icon={Icon} isActive filledWhenActive={filledWhenActive} />
                <span className="text-[10px] font-bold tracking-wider uppercase">{label}</span>
              </button>
            );
          }

          return (
            <Link key={id} href={href} className={tabClass(isActive)} aria-label={label} aria-current={isActive ? "page" : undefined}>
              <NavIcon Icon={Icon} isActive={isActive} filledWhenActive={filledWhenActive} />
              <span className={`text-[10px] tracking-wider uppercase ${isActive ? "font-bold" : "font-bold"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
