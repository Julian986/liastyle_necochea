/**
 * Pago online en reserva pública: cortes básicos y peinados simples sin cobro online.
 * En combos, si algún servicio exige pago, el turno completo va por Mercado Pago (seña 20%),
 * salvo clientas exentas (VIP / override en panel).
 */
const NO_DEPOSIT_IDS = new Set([
  "diseno-tendencias",
  // TEMP: sin seña online para test (después sacar de la lista si vuelve a cobrar)
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
