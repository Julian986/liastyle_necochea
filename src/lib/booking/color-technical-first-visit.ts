/** Servicios de color técnico reservados por WhatsApp en el flujo público. */
const COLOR_TECHNICAL_PREFIXES = ["mechas-papel-", "balayage-", "air-touch-", "reflejos-gorra-"] as const;

export function isColorTechnicalTreatmentId(id: string): boolean {
  const trimmed = id.trim();
  return COLOR_TECHNICAL_PREFIXES.some((prefix) => trimmed.startsWith(prefix));
}
