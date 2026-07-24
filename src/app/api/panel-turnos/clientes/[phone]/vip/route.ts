import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { canonicalPhoneDigitsAR } from "@/lib/customer/phone-canonical-ar";
import { getDb } from "@/lib/mongodb";
import { verifyPanelCookie } from "@/lib/panel-turnos-auth";
import { listReservationsByPhoneDigits } from "@/lib/reservations/admin-queries";
import { ensureReservationIndexes } from "@/lib/reservations/service";
import { getVipManualForPhone, setVipManualForPhone } from "@/lib/vip/customer-profiles";
import { countPastVisits, resolveVipStatus } from "@/lib/vip/eligibility";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, context: { params: Promise<{ phone: string }> }) {
  const cookieStore = await cookies();
  if (!verifyPanelCookie(cookieStore.get("panel_turnos_auth")?.value)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { phone: phoneParam } = await context.params;
  const phoneDigits = decodeURIComponent(phoneParam).trim();
  const canonical = canonicalPhoneDigitsAR(phoneDigits) || phoneDigits;
  if (!canonical || canonical.length < 8) {
    return NextResponse.json({ error: "Teléfono inválido." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const raw =
    typeof body === "object" && body && "vipManual" in body
      ? (body as { vipManual?: unknown }).vipManual
      : undefined;

  if (raw !== true && raw !== null) {
    return NextResponse.json(
      { error: "vipManual debe ser true (marcar VIP) o null (regla automática)." },
      { status: 400 },
    );
  }

  try {
    const db = await getDb();
    await ensureReservationIndexes(db);
    const visits = await listReservationsByPhoneDigits(db, canonical);
    if (visits.length === 0) {
      return NextResponse.json({ error: "Clienta no encontrada." }, { status: 404 });
    }

    const customerName = visits[0]?.customerName?.trim() || null;
    await setVipManualForPhone(db, canonical, raw, { customerName });

    const pastVisitCount = countPastVisits(visits);
    const vipManual = await getVipManualForPhone(db, canonical);
    const status = resolveVipStatus({ pastVisitCount, vipManual });

    return NextResponse.json({
      ok: true as const,
      pastVisitCount,
      isVip: status.isVip,
      vipSource: status.source,
      vipManual,
      threshold: status.threshold,
    });
  } catch (e) {
    console.error("[api/panel-turnos/clientes/[phone]/vip PUT]", e);
    return NextResponse.json({ error: "No se pudo actualizar el VIP." }, { status: 500 });
  }
}
