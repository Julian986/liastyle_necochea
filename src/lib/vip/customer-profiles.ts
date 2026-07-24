import type { Db } from "mongodb";

import { canonicalPhoneDigitsAR, customerPhoneDigitsQueryValues } from "@/lib/customer/phone-canonical-ar";

import type { VipManual } from "./eligibility";

const COLLECTION = "customer_profiles";

export type CustomerProfileDoc = {
  phoneDigits: string;
  customerName?: string | null;
  /** `true` fuerza VIP; `false` fuerza no-VIP; ausente/`null` = regla automática. */
  vipManual?: boolean | null;
  updatedAt: Date;
  updatedBy?: "panel";
};

let indexesReady = false;

export async function ensureCustomerProfileIndexes(db: Db): Promise<void> {
  if (indexesReady) return;
  await db.collection(COLLECTION).createIndex({ phoneDigits: 1 }, { unique: true });
  indexesReady = true;
}

function normalizePhoneKey(phoneDigits: string): string | null {
  const canonical = canonicalPhoneDigitsAR(phoneDigits) || phoneDigits.trim();
  return canonical.length >= 8 ? canonical : null;
}

export async function getVipManualForPhone(db: Db, phoneDigits: string): Promise<VipManual> {
  await ensureCustomerProfileIndexes(db);
  const key = normalizePhoneKey(phoneDigits);
  if (!key) return null;

  const keys = customerPhoneDigitsQueryValues(key);
  const doc = await db.collection<CustomerProfileDoc>(COLLECTION).findOne({
    phoneDigits: { $in: keys },
  });
  if (!doc || doc.vipManual == null) return null;
  return doc.vipManual;
}

/** Mapa phoneDigits canónico → vipManual (solo overrides existentes). */
export async function getVipManualMapForPhones(
  db: Db,
  phoneDigitsList: string[],
): Promise<Map<string, VipManual>> {
  await ensureCustomerProfileIndexes(db);
  const out = new Map<string, VipManual>();
  if (phoneDigitsList.length === 0) return out;

  const allKeys = new Set<string>();
  const canonicalByKey = new Map<string, string>();
  for (const raw of phoneDigitsList) {
    const key = normalizePhoneKey(raw);
    if (!key) continue;
    for (const v of customerPhoneDigitsQueryValues(key)) {
      allKeys.add(v);
      canonicalByKey.set(v, key);
    }
  }
  if (allKeys.size === 0) return out;

  const docs = await db
    .collection<CustomerProfileDoc>(COLLECTION)
    .find({ phoneDigits: { $in: [...allKeys] } })
    .toArray();

  for (const doc of docs) {
    const canonical = canonicalByKey.get(doc.phoneDigits) ?? normalizePhoneKey(doc.phoneDigits);
    if (!canonical) continue;
    if (doc.vipManual == null) continue;
    out.set(canonical, doc.vipManual);
  }
  return out;
}

/**
 * Persiste override VIP.
 * `vipManual: true` → marcar VIP; `null` → borrar override (regla automática).
 */
export async function setVipManualForPhone(
  db: Db,
  phoneDigits: string,
  vipManual: true | null,
  opts?: { customerName?: string | null },
): Promise<VipManual> {
  await ensureCustomerProfileIndexes(db);
  const key = normalizePhoneKey(phoneDigits);
  if (!key) throw new Error("Teléfono inválido.");

  const col = db.collection<CustomerProfileDoc>(COLLECTION);
  const now = new Date();

  if (vipManual === null) {
    await col.updateOne(
      { phoneDigits: key },
      {
        $unset: { vipManual: "" },
        $set: {
          phoneDigits: key,
          updatedAt: now,
          updatedBy: "panel" as const,
          ...(opts?.customerName != null ? { customerName: opts.customerName } : {}),
        },
      },
      { upsert: true },
    );
    return null;
  }

  await col.updateOne(
    { phoneDigits: key },
    {
      $set: {
        phoneDigits: key,
        vipManual: true,
        updatedAt: now,
        updatedBy: "panel" as const,
        ...(opts?.customerName != null ? { customerName: opts.customerName } : {}),
      },
    },
    { upsert: true },
  );
  return true;
}
