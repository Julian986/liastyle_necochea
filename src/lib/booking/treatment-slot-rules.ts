/**
 * Reglas de agenda indicadas por el salón.
 *
 * Trabajos técnicos (martes a viernes):
 *   → No pueden empezar después de las 14:00 (cierre 16:30).
 *
 * Trabajos técnicos (sábados):
 *   → Deben TERMINAR a las 13:00 o antes (después trabaja solo peinados).
 *   → El último inicio permitido = 13:00 − duración del servicio (alineado a grilla de 30 min).
 */

// ─── Horarios de corte ────────────────────────────────────────────────────────

/** Último inicio permitido para trabajos técnicos martes-viernes. */
export const TECH_LATEST_START_TUE_FRI = "14:00";

/** Minutos del día en que terminan los trabajos técnicos los sábados (13:00). */
const SAT_TECH_END_MINUTES = 13 * 60; // 780

// ─── Trabajos técnicos (id → durationMinutes) ────────────────────────────────

/**
 * Trabajos técnicos del salón con sus duraciones (en minutos).
 * Estos servicios tienen restricción horaria en Tue-Vie y Sábados.
 */
const TECHNICAL_TREATMENTS = new Map<string, number>([
  ["correccion-color", 90],
  ["color-global-corto", 120],
  ["color-global-medio", 120],
  ["color-global-largo", 120],
  ["reflejos-gorra-corto", 180],
  ["reflejos-gorra-medio", 180],
  ["reflejos-gorra-largo", 180],
  ["color-crecimiento", 90],
  ["color-crecimiento-mascara", 120],
  ["color-crecimiento-tratamiento", 150],
  ["balayage-corto", 300],
  ["balayage-medio", 300],
  ["balayage-largo", 300],
  ["air-touch-corto", 300],
  ["air-touch-medio", 300],
  ["air-touch-largo", 300],
  ["mechas-papel-corto", 300],
  ["mechas-papel-medio", 300],
  ["mechas-papel-largo", 300],
  ["alisado-vegano-corto", 270],
  ["alisado-vegano-medio", 270],
  ["alisado-vegano-largo", 270],
  ["permanente-corto", 270],
  ["permanente-medio", 270],
  ["permanente-largo", 270],
  // Reservas antiguas (catálogo previo)
  ["servicio-completo", 90],
  ["color", 60],
  ["color-retoque-reflejos", 60],
  ["color-mechas-total", 90],
  ["mechas-contramechas", 120],
  ["balayage", 120],
  ["reflejos-gorra", 120],
  ["reflejos-papel-retoque", 90],
  ["reflejos-papel-completo", 120],
  ["barrido", 45],
  ["keratina", 60],
]);

// ─── Helpers internos ─────────────────────────────────────────────────────────

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function isSaturday(dateKey: string): boolean {
  const [y, m, d] = dateKey.split("-").map(Number);
  if (!y || !m || !d) return false;
  return new Date(y, m - 1, d).getDay() === 6;
}

/**
 * Último inicio permitido para un trabajo técnico el sábado,
 * de modo que el servicio termine exactamente a las 13:00 o antes.
 * Devuelve un string "HH:MM" alineado a la grilla de 30 min.
 */
function saturdayTechLastStart(durationMinutes: number): string {
  const lastStartMins = Math.floor((SAT_TECH_END_MINUTES - durationMinutes) / 30) * 30;
  if (lastStartMins <= 0) return "00:00"; // no hay slot disponible
  return `${pad2(Math.floor(lastStartMins / 60))}:${pad2(lastStartMins % 60)}`;
}

// ─── API pública ──────────────────────────────────────────────────────────────

export function isTechnicalTreatment(treatmentId: string): boolean {
  return TECHNICAL_TREATMENTS.has(treatmentId);
}

/** Solo para reservas antiguas con keratina en el catálogo previo. */
export function treatmentIsKeratinaOnly1530(treatmentId: string): boolean {
  return treatmentId === "keratina";
}

export const KERATINA_ONLY_TIME_LOCAL = "15:00";

/**
 * Filtra los slots según las reglas de negocio del tratamiento.
 * Pasar `dateKey` para aplicar las restricciones del sábado.
 */
export function filterPublicSlotsByTreatmentRules(
  treatmentId: string | undefined,
  slots: string[],
  dateKey?: string,
): string[] {
  if (!treatmentId) return slots;

  if (treatmentIsKeratinaOnly1530(treatmentId)) {
    return slots.filter((t) => t === KERATINA_ONLY_TIME_LOCAL);
  }

  const duration = TECHNICAL_TREATMENTS.get(treatmentId);
  if (duration === undefined) return slots;

  if (dateKey && isSaturday(dateKey)) {
    const lastStart = saturdayTechLastStart(duration);
    return slots.filter((t) => t <= lastStart);
  }

  return slots.filter((t) => t <= TECH_LATEST_START_TUE_FRI);
}

export const REFLEJOS_BALAYAGE_LATEST_START = TECH_LATEST_START_TUE_FRI;

export function treatmentRequiresStartNoLaterThan14(treatmentId: string): boolean {
  return TECHNICAL_TREATMENTS.has(treatmentId);
}
