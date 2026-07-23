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
  "Todos los productos utilizados en nuestros servicios están testeados y no contienen formol. Trabajamos para la salud capilar y cuidamos el medio ambiente.";

/** Precio visible en la lista (parte después de la duración en `subtitle`). */
export function treatmentPriceLabel(subtitle: string): string {
  const separator = " · ";
  const idx = subtitle.indexOf(separator);
  if (idx === -1) return subtitle;
  return subtitle.slice(idx + separator.length);
}
