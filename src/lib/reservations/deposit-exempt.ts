import type { Db } from "mongodb";

import { listReservationsByCustomerPhoneDigits } from "@/lib/reservations/customer-queries";
import {
  getDepositExemptManualForPhone,
  getVipManualForPhone,
  type DepositExemptManual,
} from "@/lib/vip/customer-profiles";
import { countPastVisits, resolveVipStatus } from "@/lib/vip/eligibility";

export type DepositExemptSource = "vip" | "manual_exempt" | "manual_charge" | "none";

export type DepositExemptStatus = {
  depositExempt: boolean;
  source: DepositExemptSource;
  isVip: boolean;
  depositExemptManual: DepositExemptManual;
};

/**
 * Regla: VIP no paga seña, salvo override manual.
 * `depositExemptManual: true` → no cobra seña (aunque no sea VIP).
 * `depositExemptManual: false` → cobra seña (aunque sea VIP).
 * `null` → automático según VIP.
 */
export function resolveDepositExempt(input: {
  isVip: boolean;
  depositExemptManual?: DepositExemptManual;
}): DepositExemptStatus {
  const depositExemptManual = input.depositExemptManual ?? null;
  if (depositExemptManual === true) {
    return {
      depositExempt: true,
      source: "manual_exempt",
      isVip: input.isVip,
      depositExemptManual,
    };
  }
  if (depositExemptManual === false) {
    return {
      depositExempt: false,
      source: "manual_charge",
      isVip: input.isVip,
      depositExemptManual,
    };
  }
  if (input.isVip) {
    return {
      depositExempt: true,
      source: "vip",
      isVip: true,
      depositExemptManual: null,
    };
  }
  return {
    depositExempt: false,
    source: "none",
    isVip: false,
    depositExemptManual: null,
  };
}

export async function resolveDepositExemptForPhone(
  db: Db,
  phoneDigits: string,
): Promise<DepositExemptStatus> {
  const [vipManual, depositExemptManual, list] = await Promise.all([
    getVipManualForPhone(db, phoneDigits),
    getDepositExemptManualForPhone(db, phoneDigits),
    listReservationsByCustomerPhoneDigits(db, phoneDigits),
  ]);
  const pastVisitCount = countPastVisits(list);
  const vip = resolveVipStatus({ pastVisitCount, vipManual });
  return resolveDepositExempt({
    isVip: vip.isVip,
    depositExemptManual,
  });
}
