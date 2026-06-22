/** Categorías para filtrar en la app de turnos y en la lista de servicios. */
export const TREATMENT_CATEGORIES = ["Cortes y peinado", "Color", "Tratamiento"] as const;

export type TreatmentCategory = (typeof TREATMENT_CATEGORIES)[number];

const IMG = {
  corte: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
  peinado: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
  color: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
  mechas: "https://images.unsplash.com/photo-1633681926022-84c122e8b9d3?auto=format&fit=crop&w=900&q=80",
  trat: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80",
} as const;

export type SalonTreatment = {
  id: string;
  name: string;
  subtitle: string;
  /** Aclaración corta visible al reservar en /turnos (inclusiones, consultar, etc.). */
  bookingNote?: string;
  description: string;
  category: TreatmentCategory;
  durationLabel: string;
  durationMinutes: number;
  imageUrl: string;
};

/** Servicios oficiales Lia Style Necochea (precios y duraciones según Analia, jun 2026). */
export const SALON_TREATMENTS: SalonTreatment[] = [
  // ── Corte y peinado ───────────────────────────────────────────────────────
  {
    id: "diseno-tendencias",
    name: "Diseño & Tendencias",
    subtitle: "45 min · $35.000",
    // bookingNote: "Incluye modelado",
    description: "Corte con diseño y tendencias. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "45 min",
    durationMinutes: 45,
    imageUrl: IMG.corte,
  },
  {
    id: "diseno-tendencias-nutricion",
    name: "Diseño & Tendencias + Nutrición",
    subtitle: "1 h 30 min · $50.000",
    // bookingNote: "Incluye modelado",
    description: "Corte con diseño y tendencias más nutrición capilar. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    imageUrl: IMG.corte,
  },
  {
    id: "diseno-tendencias-tratamiento",
    name: "Diseño & Tendencias + Tratamiento",
    subtitle: "1 h 30 min · $65.000",
    // bookingNote: "Incluye modelado",
    description: "Corte con diseño y tendencias más tratamiento. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    imageUrl: IMG.corte,
  },
  {
    id: "puntas",
    name: "Puntas",
    subtitle: "45 min · $30.000",
    // bookingNote: "Incluye modelado",
    description: "Mantenimiento de puntas. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "45 min",
    durationMinutes: 45,
    imageUrl: IMG.corte,
  },
  {
    id: "puntas-nutricion",
    name: "Puntas + Nutrición",
    subtitle: "1 h 30 min · $45.000",
    // bookingNote: "Incluye modelado",
    description: "Puntas con nutrición capilar. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    imageUrl: IMG.corte,
  },
  {
    id: "puntas-tratamiento",
    name: "Puntas + Tratamiento",
    subtitle: "1 h 30 min · $65.000",
    // bookingNote: "Incluye modelado",
    description: "Puntas con tratamiento capilar. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    imageUrl: IMG.corte,
  },
  {
    id: "peinado-novia-quinceanera",
    name: "Peinado Novia / Quinceañera",
    subtitle: "1 h 30 min · desde $90.000",
    // bookingNote: "Precio desde · consultar diseño",
    description: "Peinado para novia o quinceañera. Duración aproximada 1 h 30 min.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    imageUrl: IMG.peinado,
  },
  {
    id: "peinado-fiesta",
    name: "Peinado Fiesta",
    subtitle: "1 h 30 min · desde $60.000",
    // bookingNote: "Precio desde · consultar diseño",
    description: "Peinado para fiesta. Duración aproximada 1 h 30 min.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    imageUrl: IMG.peinado,
  },
  {
    id: "peinado-alisado-temporal",
    name: "Alisado temporal (plancha)",
    subtitle: "1 h · $45.000",
    description: "Alisado con plancha. Servicio de peinado.",
    category: "Cortes y peinado",
    durationLabel: "1 h",
    durationMinutes: 60,
    imageUrl: IMG.peinado,
  },
  {
    id: "peinado-ondas",
    name: "Ondas",
    subtitle: "1 h · $45.000",
    description: "Peinado con ondas.",
    category: "Cortes y peinado",
    durationLabel: "1 h",
    durationMinutes: 60,
    imageUrl: IMG.peinado,
  },

  // ── Color ─────────────────────────────────────────────────────────────────
  {
    id: "correccion-color",
    name: "Corrección de color",
    subtitle: "1 h 30 min · desde $150.000",
    // bookingNote: "Precio varía según diagnóstico capilar",
    description:
      "Corrección de color (1 h 30 min). Precio desde $150.000; varía según diagnóstico capilar.",
    category: "Color",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    imageUrl: IMG.color,
  },
  {
    id: "color-global-corto",
    name: "Color global · corto (hombro)",
    subtitle: "2 h · $95.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description:
      "Color global en cabello corto hasta hombro (2 h). Incluye cierre técnico y modelado. $95.000.",
    category: "Color",
    durationLabel: "2 h",
    durationMinutes: 120,
    imageUrl: IMG.color,
  },
  {
    id: "color-global-medio",
    name: "Color global · medios",
    subtitle: "2 h · $115.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description:
      "Color global en cabello de largo medio (2 h). Incluye cierre técnico y modelado. $115.000.",
    category: "Color",
    durationLabel: "2 h",
    durationMinutes: 120,
    imageUrl: IMG.color,
  },
  {
    id: "color-global-largo",
    name: "Color global · largos",
    subtitle: "2 h · desde $135.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description:
      "Color global en cabello largo (2 h). Incluye cierre técnico y modelado. Desde $135.000.",
    category: "Color",
    durationLabel: "2 h",
    durationMinutes: 120,
    imageUrl: IMG.color,
  },
  {
    id: "reflejos-gorra-corto",
    name: "Reflejos con gorra · corto (hombro)",
    subtitle: "3 h · $120.000",
    // bookingNote: "Incluye cierre técnico, Plex y modelado",
    description:
      "Color técnico: reflejos con gorra, diseño personalizado (3 h). Incluye cierre técnico, Plex y modelado. $120.000.",
    category: "Color",
    durationLabel: "3 h",
    durationMinutes: 180,
    imageUrl: IMG.mechas,
  },
  {
    id: "reflejos-gorra-medio",
    name: "Reflejos con gorra · medios",
    subtitle: "3 h · $160.000",
    // bookingNote: "Incluye cierre técnico, Plex y modelado",
    description:
      "Color técnico: reflejos con gorra, diseño personalizado (3 h). Incluye cierre técnico, Plex y modelado. $160.000.",
    category: "Color",
    durationLabel: "3 h",
    durationMinutes: 180,
    imageUrl: IMG.mechas,
  },
  {
    id: "reflejos-gorra-largo",
    name: "Reflejos con gorra · largos",
    subtitle: "3 h · desde $200.000",
    // bookingNote: "Incluye cierre técnico, Plex y modelado",
    description:
      "Color técnico: reflejos con gorra, diseño personalizado (3 h). Incluye cierre técnico, Plex y modelado. Desde $200.000.",
    category: "Color",
    durationLabel: "3 h",
    durationMinutes: 180,
    imageUrl: IMG.mechas,
  },
  {
    id: "color-crecimiento",
    name: "Color en crecimiento",
    subtitle: "1 h 30 min · desde $65.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description:
      "Color en crecimiento (1 h 30 min). Incluye cierre técnico y modelado. Desde $65.000.",
    category: "Color",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    imageUrl: IMG.color,
  },
  {
    id: "color-crecimiento-mascara",
    name: "Color en crecimiento + máscara",
    subtitle: "2 h · $85.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description:
      "Color en crecimiento con máscara (2 h). Incluye cierre técnico y modelado. $85.000.",
    category: "Color",
    durationLabel: "2 h",
    durationMinutes: 120,
    imageUrl: IMG.color,
  },
  {
    id: "color-crecimiento-tratamiento",
    name: "Color en crecimiento + tratamiento",
    subtitle: "2 h 30 min · $120.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description:
      "Color en crecimiento con tratamiento (2 h 30 min). Incluye cierre técnico y modelado. $120.000.",
    category: "Color",
    durationLabel: "2 h 30 min",
    durationMinutes: 150,
    imageUrl: IMG.color,
  },
  {
    id: "mechas-papel-corto",
    name: "Balayage / Air Touch · corto (hombro)",
    subtitle: "5 h+ · $150.000",
    // bookingNote: "Incluye cierre técnico, Plex y modelado · el valor puede variar según procesos previos",
    description:
      "Diseño de mechas con papel: balayage o air touch (más de 5 h). Incluye cierre técnico, Plex y modelado. $150.000. El valor puede variar según procesos químicos previos.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    imageUrl: IMG.mechas,
  },
  {
    id: "mechas-papel-medio",
    name: "Balayage / Air Touch · medios",
    subtitle: "5 h+ · $200.000",
    // bookingNote: "Incluye cierre técnico, Plex y modelado · el valor puede variar según procesos previos",
    description:
      "Diseño de mechas con papel: balayage o air touch (más de 5 h). Incluye cierre técnico, Plex y modelado. $200.000. El valor puede variar según procesos químicos previos.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    imageUrl: IMG.mechas,
  },
  {
    id: "mechas-papel-largo",
    name: "Balayage / Air Touch · largos",
    subtitle: "5 h+ · desde $250.000",
    // bookingNote: "Incluye cierre técnico, Plex y modelado · el valor puede variar según procesos previos",
    description:
      "Diseño de mechas con papel: balayage o air touch (más de 5 h). Incluye cierre técnico, Plex y modelado. Desde $250.000. El valor puede variar según procesos químicos previos.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    imageUrl: IMG.mechas,
  },

  // ── Tratamiento ───────────────────────────────────────────────────────────
  {
    id: "botox-cauterizado",
    name: "Botox / Cauterizado",
    subtitle: "1 h · $85.000",
    // bookingNote: "Incluye modelado",
    description: "Tratamiento botox o cauterizado (1 h). Incluye modelado. $85.000.",
    category: "Tratamiento",
    durationLabel: "1 h",
    durationMinutes: 60,
    imageUrl: IMG.trat,
  },
  {
    id: "celulas-madre",
    name: "Células madre",
    subtitle: "1 h · $85.000",
    // bookingNote: "Incluye lavado y modelado",
    description: "Tratamiento con células madre (1 h). Incluye lavado y modelado. $85.000.",
    category: "Tratamiento",
    durationLabel: "1 h",
    durationMinutes: 60,
    imageUrl: IMG.trat,
  },
  {
    id: "lifting-capilar",
    name: "Lifting capilar",
    subtitle: "1 h · $85.000",
    // bookingNote: "Incluye modelado · cabellos muy largos: consultar",
    description:
      "Lifting capilar (1 h). Incluye modelado. $85.000. Cabellos muy largos: consultar.",
    category: "Tratamiento",
    durationLabel: "1 h",
    durationMinutes: 60,
    imageUrl: IMG.trat,
  },
  {
    id: "alisado-vegano-corto",
    name: "Alisado vegano sin formol · corto (hombro)",
    subtitle: "4 h 30 min · desde $100.000",
    // bookingNote: "El valor depende de lo procesado que esté el cabello",
    description:
      "Alisado vegano sin formol en cabello corto hasta hombro (4 h 30 min). Desde $100.000. El valor depende de lo procesado que esté el cabello.",
    category: "Tratamiento",
    durationLabel: "4 h 30 min",
    durationMinutes: 270,
    imageUrl: IMG.trat,
  },
  {
    id: "alisado-vegano-medio",
    name: "Alisado vegano sin formol · medios",
    subtitle: "4 h 30 min · desde $140.000",
    // bookingNote: "El valor depende de lo procesado que esté el cabello",
    description:
      "Alisado vegano sin formol en cabello de largo medio (4 h 30 min). Desde $140.000. El valor depende de lo procesado que esté el cabello.",
    category: "Tratamiento",
    durationLabel: "4 h 30 min",
    durationMinutes: 270,
    imageUrl: IMG.trat,
  },
  {
    id: "alisado-vegano-largo",
    name: "Alisado vegano sin formol · largos",
    subtitle: "4 h 30 min · desde $180.000",
    // bookingNote: "El valor depende de lo procesado que esté el cabello",
    description:
      "Alisado vegano sin formol en cabello largo (4 h 30 min). Desde $180.000. El valor depende de lo procesado que esté el cabello.",
    category: "Tratamiento",
    durationLabel: "4 h 30 min",
    durationMinutes: 270,
    imageUrl: IMG.trat,
  },
];

export function findSalonTreatmentByName(name: string): SalonTreatment | undefined {
  const t = name.trim();
  return SALON_TREATMENTS.find((x) => x.name === t);
}

export function findSalonTreatmentById(id: string): SalonTreatment | undefined {
  return SALON_TREATMENTS.find((x) => x.id === id);
}

/** Duración mostrada en el panel; si es reserva antigua, devuelve un texto genérico. */
export function panelDurationLabel(treatmentName: string, category: string): string {
  const byName = findSalonTreatmentByName(treatmentName);
  if (byName) return byName.durationLabel;
  if (category === "Láser") return "45–60 min";
  if (category === "Facial") return "60 min";
  if (category === "Corporal") return "50 min";
  return "Consultar";
}
