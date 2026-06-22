/**
 * Seña en reserva pública: cortes básicos y peinados simples sin seña.
 * En combos, si algún servicio exige seña, el turno completo va por Mercado Pago.
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
