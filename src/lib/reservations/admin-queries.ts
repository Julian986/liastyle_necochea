import type { Db } from "mongodb";

import { canonicalPhoneDigitsAR, customerPhoneDigitsQueryValues } from "@/lib/customer/phone-canonical-ar";
import { normalizePhoneDigits } from "@/lib/booking/salon-availability";
import {
  getDepositExemptManualMapForPhones,
  getVipManualMapForPhones,
} from "@/lib/vip/customer-profiles";
import { resolveVipStatus, type VipSource } from "@/lib/vip/eligibility";
import {
  resolveDepositExempt,
  type DepositExemptSource,
} from "@/lib/reservations/deposit-exempt";

import type { ReservationDoc } from "./types";

const COLLECTION = "reservations";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function escapeRegex(raw: string): string {
  return raw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export type ClientSummaryRow = {
  phoneDigits: string;
  customerName: string;
  customerPhone: string;
  /** Visitas realizadas (misma regla que VIP / historial). */
  visitCount: number;
  lastVisitDateKey: string;
  isVip: boolean;
  vipSource: VipSource;
  depositExempt: boolean;
  depositExemptSource: DepositExemptSource;
};

type ClientAggregateRow = {
  _id: string;
  customerName: string;
  customerPhone: string;
  visitCount: number;
  lastVisitDateKey: string;
};

/** Condición Mongo alineada con `isPastSessionForHistory`. */
function pastVisitSumExpression(now: Date) {
  const nowMs = now.getTime();
  return {
    $sum: {
      $cond: [
        {
          $or: [
            { $eq: ["$reservationStatus", "completed"] },
            {
              $and: [
                { $not: { $in: ["$reservationStatus", ["pending_payment", "cancelled", "no_show"]] } },
                {
                  $lt: [
                    {
                      $add: [
                        { $toLong: "$startsAt" },
                        {
                          $multiply: [
                            {
                              $ifNull: ["$durationMinutes", { $ifNull: ["$totalDurationMinutes", 60] }],
                            },
                            60_000,
                          ],
                        },
                      ],
                    },
                    nowMs,
                  ],
                },
              ],
            },
          ],
        },
        1,
        0,
      ],
    },
  };
}

function buildClientSearchFilter(q: string): Record<string, unknown> | null {
  const trimmed = q.trim();
  if (!trimmed) return null;

  const or: Record<string, unknown>[] = [
    { customerName: { $regex: escapeRegex(trimmed), $options: "i" } },
  ];

  const rawDigits = normalizePhoneDigits(trimmed);
  if (rawDigits.length >= 4) {
    or.push({ customerPhone: { $regex: escapeRegex(rawDigits) } });
  }

  const canonical = canonicalPhoneDigitsAR(trimmed);
  if (canonical) {
    or.push({ customerPhoneDigits: { $in: customerPhoneDigitsQueryValues(canonical) } });
  }

  return { $or: or };
}

/** month: 1–12 (enero = 1) */
export async function listReservationsForCalendarMonth(
  db: Db,
  year: number,
  month: number,
): Promise<ReservationDoc[]> {
  const last = new Date(year, month, 0).getDate();
  const from = `${year}-${pad2(month)}-01`;
  const to = `${year}-${pad2(month)}-${pad2(last)}`;

  return db
    .collection<ReservationDoc>(COLLECTION)
    .find({
      dateKey: { $gte: from, $lte: to },
      reservationStatus: { $ne: "pending_payment" },
    })
    .sort({ dateKey: 1, timeLocal: 1 })
    .toArray();
}

/** Resumen de clientas agrupadas por WhatsApp (para buscador del panel). */
export async function listClientsSummary(db: Db, opts?: { q?: string; limit?: number }): Promise<ClientSummaryRow[]> {
  const limit = Math.min(Math.max(opts?.limit ?? 80, 1), 200);
  const search = opts?.q?.trim() ? buildClientSearchFilter(opts.q) : null;

  const match: Record<string, unknown> = {
    customerPhoneDigits: { $exists: true, $nin: [null, ""] },
  };
  if (search) {
    match.$and = [search];
  }

  const now = new Date();
  const rows = await db
    .collection<ReservationDoc>(COLLECTION)
    .aggregate<ClientAggregateRow>([
      { $match: match },
      { $sort: { startsAt: -1 } },
      {
        $group: {
          _id: "$customerPhoneDigits",
          customerName: { $first: "$customerName" },
          customerPhone: { $first: "$customerPhone" },
          visitCount: pastVisitSumExpression(now),
          lastVisitDateKey: { $first: "$dateKey" },
        },
      },
      { $sort: { lastVisitDateKey: -1 } },
      { $limit: limit },
    ])
    .toArray();

  const phones = rows.map((r) => r._id);
  const [vipMap, depositMap] = await Promise.all([
    getVipManualMapForPhones(db, phones),
    getDepositExemptManualMapForPhones(db, phones),
  ]);

  return rows.map((r) => {
    const phoneDigits = r._id;
    const canonical = canonicalPhoneDigitsAR(phoneDigits) || phoneDigits;
    const vipManual = vipMap.get(canonical) ?? vipMap.get(phoneDigits) ?? null;
    const vip = resolveVipStatus({ pastVisitCount: r.visitCount, vipManual });
    const depositExemptManual =
      depositMap.get(canonical) ?? depositMap.get(phoneDigits) ?? null;
    const deposit = resolveDepositExempt({
      isVip: vip.isVip,
      depositExemptManual,
    });
    return {
      phoneDigits,
      customerName: r.customerName?.trim() || "Cliente",
      customerPhone: r.customerPhone?.trim() || r._id,
      visitCount: r.visitCount,
      lastVisitDateKey: r.lastVisitDateKey,
      isVip: vip.isVip,
      vipSource: vip.source,
      depositExempt: deposit.depositExempt,
      depositExemptSource: deposit.source,
    };
  });
}

/** Historial de turnos de una clienta (por teléfono canónico). */
export async function listReservationsByPhoneDigits(db: Db, phoneDigits: string): Promise<ReservationDoc[]> {
  const canonical = canonicalPhoneDigitsAR(phoneDigits) || phoneDigits.trim();
  const keys = customerPhoneDigitsQueryValues(canonical);
  if (keys.length === 0) return [];

  return db
    .collection<ReservationDoc>(COLLECTION)
    .find({ customerPhoneDigits: { $in: keys } })
    .sort({ startsAt: -1 })
    .toArray();
}
