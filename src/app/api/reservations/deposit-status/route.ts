import { NextResponse } from "next/server";

import { canonicalPhoneDigitsAR } from "@/lib/customer/phone-canonical-ar";
import { getDb } from "@/lib/mongodb";
import { resolveDepositExemptForPhone } from "@/lib/reservations/deposit-exempt";
import { ensureReservationIndexes } from "@/lib/reservations/service";

export const dynamic = "force-dynamic";

/** Consulta pública para el flujo de turnos: ¿esta clienta paga seña? */
export async function GET(request: Request) {
  const phone = new URL(request.url).searchParams.get("phone")?.trim() ?? "";
  const digits = canonicalPhoneDigitsAR(phone) || phone.replace(/\D/g, "");
  if (!digits || digits.length < 8) {
    return NextResponse.json({
      depositExempt: false,
      source: "none" as const,
      isVip: false,
    });
  }

  try {
    const db = await getDb();
    await ensureReservationIndexes(db);
    const status = await resolveDepositExemptForPhone(db, digits);
    return NextResponse.json({
      depositExempt: status.depositExempt,
      source: status.source,
      isVip: status.isVip,
    });
  } catch (e) {
    console.error("[api/reservations/deposit-status GET]", e);
    return NextResponse.json({ error: "No se pudo consultar la seña." }, { status: 500 });
  }
}
