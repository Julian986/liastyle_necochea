/** Bloques visuales del modal de reserva para la categoría Color. */

export type ColorBookingSubsection = {
  title: string;
  subtitle?: string;
  treatmentIds: string[];
};

export type ColorBookingSection = {
  id: string;
  /** Vacío = solo servicios, sin encabezado de bloque. */
  title: string;
  subtitle?: string;
  /** Aviso informativo visible bajo el encabezado del bloque. */
  notice?: string;
  treatmentIds?: string[];
  subsections?: ColorBookingSubsection[];
};

export const COLOR_BOOKING_SECTIONS: ColorBookingSection[] = [
  {
    id: "correccion",
    title: "Corrección de color",
    notice: "Disponible para quien quiera sacar un tono indeseado.",
    treatmentIds: ["correccion-color"],
  },
  {
    id: "global",
    title: "Color global",
    treatmentIds: ["color-global-corto", "color-global-medio", "color-global-largo"],
  },
  {
    id: "crecimiento",
    title: "Color en crecimiento",
    subtitle: "Incluye cierre técnico y modelado",
    treatmentIds: ["color-crecimiento", "color-crecimiento-corte-nutricion"],
  },
  {
    id: "tecnico",
    title: "Color técnico",
    subtitle: "Incluye cierre técnico, Plex y modelado",
    subsections: [
      {
        title: "Diseño mechas con papel",
        subtitle: "El valor puede variar según procesos químicos previos",
        treatmentIds: ["mechas-papel-corto", "mechas-papel-medio", "mechas-papel-largo"],
      },
      {
        title: "Balayage",
        subtitle: "El valor puede variar según procesos químicos previos",
        treatmentIds: ["balayage-corto", "balayage-medio", "balayage-largo"],
      },
      {
        title: "Air Touch",
        subtitle: "El valor puede variar según procesos químicos previos",
        treatmentIds: ["air-touch-corto", "air-touch-medio", "air-touch-largo"],
      },
      {
        title: "Reflejos con gorra · diseño personalizado",
        treatmentIds: ["reflejos-gorra-corto", "reflejos-gorra-medio", "reflejos-gorra-largo"],
      },
    ],
  },
];

/** IDs de Color en el orden del modal (validación / tests). */
export const COLOR_BOOKING_TREATMENT_IDS = COLOR_BOOKING_SECTIONS.flatMap((section) =>
  section.subsections
    ? section.subsections.flatMap((sub) => sub.treatmentIds)
    : (section.treatmentIds ?? []),
);
