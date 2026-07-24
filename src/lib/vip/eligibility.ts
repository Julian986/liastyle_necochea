import { isPastSessionForHistory } from "@/lib/reservations/customer-ui-copy";
import {
  serializeReservationForCustomer,
  type CustomerReservationPublic,
} from "@/lib/reservations/customer-public-serialize";
import type { ReservationDoc } from "@/lib/reservations/types";

/** Umbral de visitas realizadas para VIP automático. */
export const VIP_VISIT_THRESHOLD = 10;

export type VipSource = "auto" | "manual" | "none";

export type VipStatus = {
  isVip: boolean;
  pastVisitCount: number;
  threshold: number;
  source: VipSource;
  visitsRemaining: number;
};

/** Override de VIP en ficha de clienta (`null` = solo regla automática). */
export type VipManual = boolean | null;

export function countPastVisits(
  reservations: Array<CustomerReservationPublic | ReservationDoc>,
  nowMs = Date.now(),
): number {
  let n = 0;
  for (const r of reservations) {
    const publicRow: CustomerReservationPublic =
      "_id" in r ? serializeReservationForCustomer(r) : r;
    if (isPastSessionForHistory(publicRow, nowMs)) n += 1;
  }
  return n;
}

export function resolveVipStatus(input: {
  pastVisitCount: number;
  vipManual?: VipManual;
  threshold?: number;
}): VipStatus {
  const threshold = input.threshold ?? VIP_VISIT_THRESHOLD;
  const pastVisitCount = Math.max(0, Math.floor(input.pastVisitCount));
  const vipManual = input.vipManual ?? null;

  if (vipManual === true) {
    return {
      isVip: true,
      pastVisitCount,
      threshold,
      source: "manual",
      visitsRemaining: 0,
    };
  }

  if (vipManual === false) {
    return {
      isVip: false,
      pastVisitCount,
      threshold,
      source: "none",
      visitsRemaining: Math.max(0, threshold - pastVisitCount),
    };
  }

  const isVip = pastVisitCount >= threshold;
  return {
    isVip,
    pastVisitCount,
    threshold,
    source: isVip ? "auto" : "none",
    visitsRemaining: Math.max(0, threshold - pastVisitCount),
  };
}
