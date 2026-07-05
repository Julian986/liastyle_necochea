/** Grupos del modal de reserva — Cambio de estructura. */

/** Texto al ingresar (palabras de Analia). */
export const CAMBIO_ESTRUCTURA_INTRO = "Química capilar : Alisado o Permanente";

/**
 * Analia agrupa esta categoría como "Servicios químicos · Cambio de estructura".
 * En la UI eso va en la card del paso 1 (título + subtítulo), no repetido adentro.
 */
export const CAMBIO_ESTRUCTURA_CARD_SUBTITLE = "Servicios químicos";

export type CambioEstructuraBookingGroup = {
  id: string;
  title: string;
  treatmentIds: string[];
};

export const CAMBIO_ESTRUCTURA_BOOKING_GROUPS: CambioEstructuraBookingGroup[] = [
  {
    id: "permanente",
    title: "Rulos permanente",
    treatmentIds: ["permanente-corto", "permanente-medio", "permanente-largo"],
  },
  {
    id: "alisado",
    title: "Alisado vegano sin formol",
    treatmentIds: ["alisado-vegano-corto", "alisado-vegano-medio", "alisado-vegano-largo"],
  },
];

/** Etiqueta corta en la reserva (el grupo ya indica el tipo de servicio). */
export const CAMBIO_ESTRUCTURA_BOOKING_LABELS: Record<string, string> = {
  "permanente-corto": "Corto (hombro)",
  "permanente-medio": "Medios",
  "permanente-largo": "Largos",
  "alisado-vegano-corto": "Corto (hombro)",
  "alisado-vegano-medio": "Medios",
  "alisado-vegano-largo": "Largos",
};

export const CAMBIO_ESTRUCTURA_PRICE_NOTICE =
  "El precio depende de lo procesado que esté el cabello.";
