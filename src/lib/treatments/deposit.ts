/** Seña online vía Mercado Pago (20% del valor del servicio / combo). */

export const PUBLIC_DEPOSIT_RATE = 0.2;

export function depositAmountArs(priceFromArs: number): number {
  if (!Number.isFinite(priceFromArs) || priceFromArs <= 0) return 0;
  return Math.round(priceFromArs * PUBLIC_DEPOSIT_RATE);
}

/** Formato ARS estilo catálogo: $35.000 */
export function formatArs(amount: number): string {
  const n = Math.round(amount);
  const withDots = Math.abs(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return n < 0 ? `-$${withDots}` : `$${withDots}`;
}

export type DepositSummary = {
  priceFromArs: number;
  /** Monto de seña a cobrar en Mercado Pago. */
  depositAmountArs: number;
  /** Algún servicio del combo (o el único) tiene precio “desde”. */
  priceIsFrom: boolean;
  depositRate: typeof PUBLIC_DEPOSIT_RATE;
};

export function summarizeDepositForTreatments(
  treatments: Array<{ priceFromArs: number; priceIsFrom?: boolean }>,
): DepositSummary {
  const priceFromArs = treatments.reduce((acc, t) => acc + (t.priceFromArs || 0), 0);
  const priceIsFrom = treatments.some((t) => t.priceIsFrom === true);
  return {
    priceFromArs,
    depositAmountArs: depositAmountArs(priceFromArs),
    priceIsFrom,
    depositRate: PUBLIC_DEPOSIT_RATE,
  };
}
