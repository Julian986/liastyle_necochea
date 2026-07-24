"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import {
  panelBackBtn,
  panelContainer,
  panelPage,
} from "@/components/panel/panel-ui";
import { VipPromosList } from "@/components/vip/vip-promos-list";
import { VIP_VISIT_THRESHOLD } from "@/lib/vip/eligibility";

export function PanelVipPreviewClient() {
  return (
    <div className={`${panelPage} bg-[#F0F1F3]`}>
      <div className={`${panelContainer} pt-6 pb-10`}>
        <header className="mb-5 flex items-start gap-3">
          <Link href="/panel-turnos/clientes" className={panelBackBtn} aria-label="Volver a clientes">
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-gray-500">Panel</p>
            <h1 className="font-montserrat text-[22px] font-bold leading-tight text-gray-900">
              Página VIP
            </h1>
            <p className="mt-1 text-[14px] text-gray-500">
              Así ven los beneficios las clientas VIP (≥{VIP_VISIT_THRESHOLD} visitas o VIP manual)
            </p>
          </div>
        </header>

        <VipPromosList showReserveCta={false} />
      </div>
    </div>
  );
}
