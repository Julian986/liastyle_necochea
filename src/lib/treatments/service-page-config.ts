import type { TreatmentCategory } from "@/lib/treatments/catalog";

const CATEGORY_ANCHOR_IDS: Record<TreatmentCategory, string> = {
  "Cortes y peinado": "cortes",
  Color: "color",
  Tratamientos: "tratamientos",
  "Cambio de estructura": "cambio-estructura",
};

export function categoryAnchorId(category: TreatmentCategory): string {
  return CATEGORY_ANCHOR_IDS[category];
}

export const SERVICE_PAGE_INTRO =
  "Precios orientativos: varían según el largo del cabello o diagnóstico en salón.";

/** Precio visible en la lista (parte después de la duración en `subtitle`). */
export function treatmentPriceLabel(subtitle: string): string {
  const separator = " · ";
  const idx = subtitle.indexOf(separator);
  if (idx === -1) return subtitle;
  return subtitle.slice(idx + separator.length);
}
