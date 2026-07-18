/** Bloques del modal de reserva / listado para Terapia Capilar & Mask Bar. */

import type { ColorBookingSection } from "@/lib/booking/color-booking-sections";

/** Nombres cortos bajo el bloque Máscaras. */
export const MASCARA_BOOKING_LABELS: Record<string, string> = {
  "mascara-nutricion": "Nutrición",
  "mascara-hidratacion": "Hidratación",
  "mascara-reparacion": "Reparación",
};

export const TRATAMIENTOS_BOOKING_SECTIONS: ColorBookingSection[] = [
  {
    id: "terapias",
    title: "",
    treatmentIds: ["botox-cauterizado", "celulas-madre", "lifting-capilar"],
  },
  {
    id: "mascaras",
    title: "Máscaras",
    treatmentIds: ["mascara-nutricion", "mascara-hidratacion", "mascara-reparacion"],
  },
  {
    id: "adicional",
    title: "Servicio adicional",
    treatmentIds: ["cirugia-capilar"],
  },
];
