/** Bloques visuales en /servicios para Cambio de estructura. */

export {
  CAMBIO_ESTRUCTURA_CARD_SUBTITLE,
  CAMBIO_ESTRUCTURA_INTRO,
  CAMBIO_ESTRUCTURA_PRICE_NOTICE,
} from "@/lib/booking/cambio-estructura-booking-sections";

export type CambioEstructuraDisplayGroup = {
  id: string;
  title: string;
  treatmentIds: string[];
};

export const CAMBIO_ESTRUCTURA_DISPLAY_GROUPS: CambioEstructuraDisplayGroup[] = [
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
