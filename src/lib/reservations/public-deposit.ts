/**
 * Pago online en reserva pública: cortes básicos y peinados simples sin cobro online.
 * En combos, si algún servicio exige pago, el turno completo va por Mercado Pago (total).
 */
const NO_DEPOSIT_IDS = new Set([
  "diseno-tendencias",
  "puntas",
  "peinado-alisado-temporal",
  "peinado-ondas",
  // Catálogo anterior (reservas legacy)
  "corte-dama",
  "despuntado",
  "peinado-brushing",
  "peinado-ondas",
  "peinado-medio-recogido",
  "peinado-recogido",
]);

export function treatmentRequiresPublicDeposit(treatmentId: string): boolean {
  return !NO_DEPOSIT_IDS.has(treatmentId.trim());
}
