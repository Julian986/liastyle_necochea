import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { canonicalPhoneDigitsAR } from "@/lib/customer/phone-canonical-ar";
import { CUSTOMER_PROFILE_COOKIE, readCustomerProfilePhoneDigits } from "@/lib/customer/customer-session";
import { getDb } from "@/lib/mongodb";
import { verifyPanelCookie } from "@/lib/panel-turnos-auth";
import { listReservationsByCustomerPhoneDigits } from "@/lib/reservations/customer-queries";
import { ensureReservationIndexes } from "@/lib/reservations/service";
import { getVipManualForPhone } from "@/lib/vip/customer-profiles";
import { countPastVisits, resolveVipStatus, VIP_VISIT_THRESHOLD } from "@/lib/vip/eligibility";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const panelPreview = verifyPanelCookie(cookieStore.get("panel_turnos_auth")?.value);

  if (panelPreview) {
    return NextResponse.json({
      authenticated: true,
      panelPreview: true,
      isVip: true,
      pastVisitCount: VIP_VISIT_THRESHOLD,
      threshold: VIP_VISIT_THRESHOLD,
      source: "panel" as const,
      visitsRemaining: 0,
    });
  }

  const fromCookie = readCustomerProfilePhoneDigits(cookieStore.get(CUSTOMER_PROFILE_COOKIE)?.value);
  if (!fromCookie) {
    return NextResponse.json({
      authenticated: false,
      panelPreview: false,
      isVip: false,
      pastVisitCount: 0,
      threshold: VIP_VISIT_THRESHOLD,
      source: "none" as const,
      visitsRemaining: VIP_VISIT_THRESHOLD,
    });
  }

  const digits = canonicalPhoneDigitsAR(fromCookie);
  if (!digits) {
    return NextResponse.json({
      authenticated: false,
      panelPreview: false,
      isVip: false,
      pastVisitCount: 0,
      threshold: VIP_VISIT_THRESHOLD,
      source: "none" as const,
      visitsRemaining: VIP_VISIT_THRESHOLD,
    });
  }

  try {
    const db = await getDb();
    await ensureReservationIndexes(db);
    const list = await listReservationsByCustomerPhoneDigits(db, digits);
    const pastVisitCount = countPastVisits(list);
    const vipManual = await getVipManualForPhone(db, digits);
    const status = resolveVipStatus({ pastVisitCount, vipManual });

    return NextResponse.json({
      authenticated: true,
      panelPreview: false,
      ...status,
    });
  } catch (e) {
    console.error("[api/me/vip-status]", e);
    return NextResponse.json({ error: "No se pudo verificar el acceso VIP." }, { status: 500 });
  }
}
