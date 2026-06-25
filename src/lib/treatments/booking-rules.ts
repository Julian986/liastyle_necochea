/** Servicios que no se combinan con otros en un mismo turno. */
export const SOLO_COMBO_TREATMENT_IDS = new Set([
  "servicio-completo",
  "alisado-vegano-corto",
  "alisado-vegano-medio",
  "alisado-vegano-largo",
  "balayage-corto",
  "balayage-medio",
  "balayage-largo",
  "air-touch-corto",
  "air-touch-medio",
  "air-touch-largo",
  "mechas-papel-corto",
  "mechas-papel-medio",
  "mechas-papel-largo",
]);

export function isSoloComboTreatmentId(id: string): boolean {
  return SOLO_COMBO_TREATMENT_IDS.has(id.trim());
}

export function comboIncludesSoloTreatment(ids: string[]): boolean {
  return ids.some((id) => isSoloComboTreatmentId(id));
}

/** `null` si el combo es válido; mensaje de error si no. */
export function validateServiceCombo(serviceIds: string[]): string | null {
  const unique = [...new Set(serviceIds.map((s) => s.trim()).filter(Boolean))];
  if (unique.length > 4) return "Podés combinar hasta 4 servicios por turno.";

  const soloIds = unique.filter((id) => isSoloComboTreatmentId(id));
  if (soloIds.length > 0 && unique.length > 1) {
    const id = soloIds[0];
    if (id.startsWith("alisado-vegano")) {
      return "El alisado vegano no se puede combinar con otros servicios en el mismo turno.";
    }
    if (id.startsWith("balayage") || id.startsWith("air-touch") || id.startsWith("mechas-papel")) {
      return "Diseño mechas con papel, Balayage y Air Touch no se pueden combinar con otros servicios en el mismo turno.";
    }
    return "Este servicio no se puede combinar con otros en el mismo turno.";
  }

  const keratinaIdx = unique.indexOf("keratina");
  if (keratinaIdx >= 0 && keratinaIdx !== unique.length - 1) {
    return "Keratina solo se puede combinar si queda al final del turno.";
  }

  return null;
}
