/** Bloques de Cortes y peinado en /turnos y /servicios. */

export type CortesPeinadoDisplaySection = {
  id: string;
  title: string;
  treatmentIds: string[];
};

/**
 * Solo cortes base + peinados.
 * Los combos (+ nutrición / + tratamiento / + máscara) quedaron fuera del menú (Analia, jul 2026).
 *
 * // Antes:
 * // treatmentIds diseño: ["diseno-tendencias", "diseno-tendencias-nutricion", "diseno-tendencias-tratamiento"]
 * // treatmentIds puntas: ["puntas", "puntas-nutricion", "puntas-tratamiento", "puntas-mascara"]
 * // Data completa: ARCHIVED_CORTE_COMBO_TREATMENTS en catalog.ts
 */
export const CORTES_PEINADO_DISPLAY_SECTIONS: CortesPeinadoDisplaySection[] = [
  {
    id: "puntas",
    title: "Corte de puntas",
    treatmentIds: ["puntas"],
  },
  {
    id: "diseno",
    title: "Corte Diseño & Tendencias",
    treatmentIds: ["diseno-tendencias"],
  },
  {
    id: "peinados",
    title: "Peinados",
    treatmentIds: [
      "peinado-novia-quinceanera",
      "peinado-fiesta",
      "peinado-alisado-temporal",
      "peinado-ondas",
    ],
  },
];

/** Alias para el modal de reserva (misma estructura que Color/Tratamientos). */
export const CORTES_PEINADO_BOOKING_SECTIONS = CORTES_PEINADO_DISPLAY_SECTIONS.map((section) => ({
  id: section.id,
  title: section.title,
  treatmentIds: section.treatmentIds,
}));
