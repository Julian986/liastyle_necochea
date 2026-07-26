/** Categorías para filtrar en la app de turnos y en la lista de servicios. */
export const TREATMENT_CATEGORIES = [
  "Cortes y peinado",
  "Color",
  "Tratamientos",
  "Cambio de estructura",
] as const;

export type TreatmentCategory = (typeof TREATMENT_CATEGORIES)[number];

const IMG = {
  corte: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
  peinado: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
  color: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
  mechas: "https://images.unsplash.com/photo-1633681926022-84c122e8b9d3?auto=format&fit=crop&w=900&q=80",
  trat: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80",
  permanente: "/alisadoypermanente1.webp",
  alisadoVegano: "/alisadoypermanente2.webp",
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
  /** Precio base en ARS (si es “desde”, el monto mínimo publicado). */
  priceFromArs: number;
  /** True cuando el subtitle dice “desde $…”. */
  priceIsFrom?: boolean;
  imageUrl: string;
};

/** Servicios oficiales Lia Style Necochea (precios y duraciones según Analia, jun 2026). */
export const SALON_TREATMENTS: SalonTreatment[] = [
  // ── Corte y peinado ───────────────────────────────────────────────────────
  {
    id: "diseno-tendencias",
    name: "Corte Diseño & Tendencias",
    subtitle: "45 min · $35.000",
    // bookingNote: "Incluye modelado",
    description: "Corte con diseño y tendencias. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "45 min",
    durationMinutes: 45,
    priceFromArs: 35000,
    imageUrl: IMG.corte,
  },
  {
    id: "puntas",
    name: "Corte de puntas",
    // subtitle: "45 min · $30.000", // precio real (restaurar después de prueba MP)
    subtitle: "45 min · $30", // TEMP prueba MP
    // bookingNote: "Incluye modelado",
    description: "Mantenimiento de puntas. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "45 min",
    durationMinutes: 45,
    // priceFromArs: 30000, // precio real (restaurar después de prueba MP)
    priceFromArs: 30, // TEMP prueba MP → total a cobrar = $30
    imageUrl: IMG.corte,
  },
  // Combos de corte fuera del menú (Analia, jul 2026): ver ARCHIVED_CORTE_COMBO_TREATMENTS abajo.
  {
    id: "peinado-novia-quinceanera",
    name: "Peinado Novia / Quinceañera",
    subtitle: "1 h 30 min · desde $90.000",
    // bookingNote: "Precio desde · consultar diseño",
    description: "Peinado para novia o quinceañera.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    priceFromArs: 90000,
    priceIsFrom: true,
    imageUrl: IMG.peinado,
  },
  {
    id: "peinado-fiesta",
    name: "Peinado Fiesta",
    subtitle: "1 h 30 min · desde $60.000",
    // bookingNote: "Precio desde · consultar diseño",
    description: "Peinado para fiesta.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    priceFromArs: 60000,
    priceIsFrom: true,
    imageUrl: IMG.peinado,
  },
  {
    id: "peinado-alisado-temporal",
    name: "Alisado temporal (plancha)",
    subtitle: "1 h · $45.000",
    description: "Alisado temporal con plancha.",
    category: "Cortes y peinado",
    durationLabel: "1 h",
    durationMinutes: 60,
    priceFromArs: 45000,
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
    priceFromArs: 45000,
    imageUrl: IMG.peinado,
  },

  // ── Color ─────────────────────────────────────────────────────────────────
  {
    id: "correccion-color",
    name: "Corrección de color",
    subtitle: "1 h 30 min · desde $150.000",
    bookingNote: "Varía según diagnóstico",
    description:
      "Este servicio está disponible para quien quiera sacar un tono indeseado. El valor varía según diagnóstico.",
    category: "Color",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    priceFromArs: 150000,
    priceIsFrom: true,
    imageUrl: IMG.color,
  },
  {
    id: "color-global-corto",
    name: "Color global · corto (hombro)",
    subtitle: "2 h · $95.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description: "Color global. Incluye cierre técnico y modelado.",
    category: "Color",
    durationLabel: "2 h",
    durationMinutes: 120,
    priceFromArs: 95000,
    imageUrl: IMG.color,
  },
  {
    id: "color-global-medio",
    name: "Color global · medios",
    subtitle: "2 h · $115.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description: "Color global. Incluye cierre técnico y modelado.",
    category: "Color",
    durationLabel: "2 h",
    durationMinutes: 120,
    priceFromArs: 115000,
    imageUrl: IMG.color,
  },
  {
    id: "color-global-largo",
    name: "Color global · largos",
    subtitle: "2 h · desde $135.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description: "Color global. Incluye cierre técnico y modelado.",
    category: "Color",
    durationLabel: "2 h",
    durationMinutes: 120,
    priceFromArs: 135000,
    priceIsFrom: true,
    imageUrl: IMG.color,
  },
  {
    id: "color-crecimiento",
    name: "Color en crecimiento",
    subtitle: "1 h 30 min · desde $65.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description: "Retoque de color en la raíz. Incluye cierre técnico y modelado.",
    category: "Color",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    priceFromArs: 65000,
    priceIsFrom: true,
    imageUrl: IMG.color,
  },
  {
    id: "color-crecimiento-mascara",
    name: "Color en crecimiento + máscara",
    subtitle: "2 h · $75.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description: "Retoque de raíz con máscara de color. Incluye cierre técnico y modelado.",
    category: "Color",
    durationLabel: "2 h",
    durationMinutes: 120,
    priceFromArs: 75000,
    imageUrl: IMG.color,
  },
  {
    id: "color-crecimiento-tratamiento",
    name: "Color en crecimiento + lifting",
    subtitle: "2 h 30 min · $95.000",
    // bookingNote: "Incluye cierre técnico y modelado",
    description: "Retoque de raíz con lifting capilar. Incluye cierre técnico y modelado.",
    category: "Color",
    durationLabel: "2 h 30 min",
    durationMinutes: 150,
    priceFromArs: 95000,
    imageUrl: IMG.color,
  },
  {
    id: "color-crecimiento-corte-nutricion",
    name: "Color en crecimiento + corte + nutrición",
    subtitle: "3 h · $104.000",
    description:
      "Color en crecimiento con Corte Diseño & Tendencias y nutrición. Incluye cierre técnico y modelado.",
    category: "Color",
    durationLabel: "3 h",
    durationMinutes: 180,
    priceFromArs: 104000,
    imageUrl: IMG.color,
  },
  {
    id: "mechas-papel-corto",
    name: "Diseño mechas con papel · corto (hombro)",
    subtitle: "5 h+ · $150.000",
    description: "Mechas diseñadas con papel. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    priceFromArs: 150000,
    imageUrl: IMG.mechas,
  },
  {
    id: "mechas-papel-medio",
    name: "Diseño mechas con papel · medios",
    subtitle: "5 h+ · $200.000",
    description: "Mechas diseñadas con papel. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    priceFromArs: 200000,
    imageUrl: IMG.mechas,
  },
  {
    id: "mechas-papel-largo",
    name: "Diseño mechas con papel · largos",
    subtitle: "5 h+ · desde $250.000",
    description: "Mechas diseñadas con papel. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    priceFromArs: 250000,
    priceIsFrom: true,
    imageUrl: IMG.mechas,
  },
  {
    id: "balayage-corto",
    name: "Balayage · corto (hombro)",
    subtitle: "5 h+ · $150.000",
    description:
      "Aclarado a mano alzada para un degradé natural. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    priceFromArs: 150000,
    imageUrl: IMG.mechas,
  },
  {
    id: "balayage-medio",
    name: "Balayage · medios",
    subtitle: "5 h+ · $200.000",
    description:
      "Aclarado a mano alzada para un degradé natural. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    priceFromArs: 200000,
    imageUrl: IMG.mechas,
  },
  {
    id: "balayage-largo",
    name: "Balayage · largos",
    subtitle: "5 h+ · desde $250.000",
    description:
      "Aclarado a mano alzada para un degradé natural. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    priceFromArs: 250000,
    priceIsFrom: true,
    imageUrl: IMG.mechas,
  },
  {
    id: "air-touch-corto",
    name: "Air Touch · corto (hombro)",
    subtitle: "5 h+ · $150.000",
    description: "Iluminación con técnica Air Touch. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    priceFromArs: 150000,
    imageUrl: IMG.mechas,
  },
  {
    id: "air-touch-medio",
    name: "Air Touch · medios",
    subtitle: "5 h+ · $200.000",
    description: "Iluminación con técnica Air Touch. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    priceFromArs: 200000,
    imageUrl: IMG.mechas,
  },
  {
    id: "air-touch-largo",
    name: "Air Touch · largos",
    subtitle: "5 h+ · desde $250.000",
    description: "Iluminación con técnica Air Touch. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "5 h+",
    durationMinutes: 300,
    priceFromArs: 250000,
    priceIsFrom: true,
    imageUrl: IMG.mechas,
  },
  {
    id: "reflejos-gorra-corto",
    name: "Reflejos con gorra · corto (hombro)",
    subtitle: "3 h · $120.000",
    // bookingNote: "Incluye cierre técnico, Plex y modelado",
    description: "Reflejos con gorra, diseño personalizado. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "3 h",
    durationMinutes: 180,
    priceFromArs: 120000,
    imageUrl: IMG.mechas,
  },
  {
    id: "reflejos-gorra-medio",
    name: "Reflejos con gorra · medios",
    subtitle: "3 h · $160.000",
    // bookingNote: "Incluye cierre técnico, Plex y modelado",
    description: "Reflejos con gorra, diseño personalizado. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "3 h",
    durationMinutes: 180,
    priceFromArs: 160000,
    imageUrl: IMG.mechas,
  },
  {
    id: "reflejos-gorra-largo",
    name: "Reflejos con gorra · largos",
    subtitle: "3 h · desde $200.000",
    // bookingNote: "Incluye cierre técnico, Plex y modelado",
    description: "Reflejos con gorra, diseño personalizado. Incluye cierre técnico, Plex y modelado.",
    category: "Color",
    durationLabel: "3 h",
    durationMinutes: 180,
    priceFromArs: 200000,
    priceIsFrom: true,
    imageUrl: IMG.mechas,
  },

  // ── Tratamientos ──────────────────────────────────────────────────────────
  {
    id: "botox-cauterizado",
    name: "Botox / Cauterizado",
    subtitle: "1 h · $85.000",
    // bookingNote: "Incluye modelado",
    description: "Nutre y sella la fibra capilar. Incluye modelado.",
    category: "Tratamientos",
    durationLabel: "1 h",
    durationMinutes: 60,
    priceFromArs: 85000,
    imageUrl: IMG.trat,
  },
  {
    id: "celulas-madre",
    name: "Células madre",
    subtitle: "1 h · $85.000",
    // bookingNote: "Incluye lavado y modelado",
    description: "Tratamiento regenerador con células madre. Incluye lavado y modelado.",
    category: "Tratamientos",
    durationLabel: "1 h",
    durationMinutes: 60,
    priceFromArs: 85000,
    imageUrl: IMG.trat,
  },
  {
    id: "lifting-capilar",
    name: "Lifting capilar",
    subtitle: "1 h · $85.000",
    // bookingNote: "Incluye modelado · cabellos muy largos: consultar",
    description: "Alisa y da brillo de forma temporal. Incluye modelado. Cabellos muy largos: consultar.",
    category: "Tratamientos",
    durationLabel: "1 h",
    durationMinutes: 60,
    priceFromArs: 85000,
    imageUrl: IMG.trat,
  },
  {
    id: "mascara-nutricion",
    name: "Máscara · Nutrición",
    subtitle: "45 min · $35.000",
    description: "Máscara de nutrición capilar.",
    category: "Tratamientos",
    durationLabel: "45 min",
    durationMinutes: 45,
    priceFromArs: 35000,
    imageUrl: IMG.trat,
  },
  {
    id: "mascara-hidratacion",
    name: "Máscara · Hidratación",
    subtitle: "45 min · $35.000",
    description: "Máscara de hidratación capilar.",
    category: "Tratamientos",
    durationLabel: "45 min",
    durationMinutes: 45,
    priceFromArs: 35000,
    imageUrl: IMG.trat,
  },
  {
    id: "mascara-reparacion",
    name: "Máscara · Reparación",
    subtitle: "45 min · $35.000",
    description: "Máscara de reparación capilar.",
    category: "Tratamientos",
    durationLabel: "45 min",
    durationMinutes: 45,
    priceFromArs: 35000,
    imageUrl: IMG.trat,
  },
  {
    id: "cirugia-capilar",
    name: "Cirugía Capilar",
    subtitle: "1 h · $85.000",
    description: "Servicio adicional de cirugía capilar.",
    category: "Tratamientos",
    durationLabel: "1 h",
    durationMinutes: 60,
    priceFromArs: 85000,
    imageUrl: IMG.trat,
  },
  // ── Cambio de estructura ────────────────────────────────────────────────────
  {
    id: "permanente-corto",
    name: "Rulos permanente · corto (hombro)",
    subtitle: "4 h 30 min · desde $85.000",
    description: "Ondas permanentes con químico.",
    category: "Cambio de estructura",
    durationLabel: "4 h 30 min",
    durationMinutes: 270,
    priceFromArs: 85000,
    priceIsFrom: true,
    imageUrl: IMG.permanente,
  },
  {
    id: "permanente-medio",
    name: "Rulos permanente · medios",
    subtitle: "4 h 30 min · desde $140.000",
    description: "Ondas permanentes con químico.",
    category: "Cambio de estructura",
    durationLabel: "4 h 30 min",
    durationMinutes: 270,
    priceFromArs: 140000,
    priceIsFrom: true,
    imageUrl: IMG.permanente,
  },
  {
    id: "permanente-largo",
    name: "Rulos permanente · largos",
    subtitle: "4 h 30 min · desde $180.000",
    description: "Ondas permanentes con químico.",
    category: "Cambio de estructura",
    durationLabel: "4 h 30 min",
    durationMinutes: 270,
    priceFromArs: 180000,
    priceIsFrom: true,
    imageUrl: IMG.permanente,
  },
  {
    id: "alisado-vegano-corto",
    name: "Alisado vegano sin formol · corto (hombro)",
    subtitle: "4 h 30 min · desde $100.000",
    // bookingNote: "El valor depende de lo procesado que esté el cabello",
    description: "Alisado sin formol, apto para veganos.",
    category: "Cambio de estructura",
    durationLabel: "4 h 30 min",
    durationMinutes: 270,
    priceFromArs: 100000,
    priceIsFrom: true,
    imageUrl: IMG.alisadoVegano,
  },
  {
    id: "alisado-vegano-medio",
    name: "Alisado vegano sin formol · medios",
    subtitle: "4 h 30 min · desde $140.000",
    // bookingNote: "El valor depende de lo procesado que esté el cabello",
    description: "Alisado sin formol, apto para veganos.",
    category: "Cambio de estructura",
    durationLabel: "4 h 30 min",
    durationMinutes: 270,
    priceFromArs: 140000,
    priceIsFrom: true,
    imageUrl: IMG.alisadoVegano,
  },
  {
    id: "alisado-vegano-largo",
    name: "Alisado vegano sin formol · largos",
    subtitle: "4 h 30 min · desde $180.000",
    // bookingNote: "El valor depende de lo procesado que esté el cabello",
    description: "Alisado sin formol, apto para veganos.",
    category: "Cambio de estructura",
    durationLabel: "4 h 30 min",
    durationMinutes: 270,
    priceFromArs: 180000,
    priceIsFrom: true,
    imageUrl: IMG.alisadoVegano,
  },
];

/**
 * Combos de corte fuera del menú (Analia, jul 2026).
 * No se ofrecen en /turnos, /servicios ni VIP.
 * Conservados para reactivar si hace falta y para resolver reservas antiguas por id.
 *
 * // Antes en el menú:
 * // - Nutrición + Corte Diseño & Tendencias · 1 h 30 · $50.000
 * // - Tratamiento + Corte Diseño & Tendencias · 1 h 30 · $80.000
 * // - Corte de puntas + Nutrición · 1 h 30 · $45.000
 * // - Corte de puntas + Tratamiento · 1 h 30 · $65.000
 * // - Corte de puntas + Máscara · 1 h 30 · $55.000
 */
export const ARCHIVED_CORTE_COMBO_TREATMENTS: SalonTreatment[] = [
  {
    id: "diseno-tendencias-nutricion",
    name: "Nutrición + Corte Diseño & Tendencias",
    subtitle: "1 h 30 min · $50.000",
    // bookingNote: "Incluye modelado",
    description: "Corte Diseño & Tendencias con nutrición capilar. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    priceFromArs: 50000,
    imageUrl: IMG.corte,
  },
  {
    id: "diseno-tendencias-tratamiento",
    name: "Tratamiento + Corte Diseño & Tendencias",
    subtitle: "1 h 30 min · $80.000",
    // bookingNote: "Incluye modelado",
    description: "Corte Diseño & Tendencias con tratamiento capilar. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    priceFromArs: 80000,
    imageUrl: IMG.corte,
  },
  {
    id: "puntas-nutricion",
    name: "Corte de puntas + Nutrición",
    subtitle: "1 h 30 min · $45.000",
    // bookingNote: "Incluye modelado",
    description: "Corte de puntas con nutrición capilar. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    priceFromArs: 45000,
    imageUrl: IMG.corte,
  },
  {
    id: "puntas-tratamiento",
    name: "Corte de puntas + Tratamiento",
    subtitle: "1 h 30 min · $65.000",
    // bookingNote: "Incluye modelado",
    description: "Corte de puntas con tratamiento capilar. Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    priceFromArs: 65000,
    imageUrl: IMG.corte,
  },
  {
    id: "puntas-mascara",
    name: "Corte de puntas + Máscara",
    subtitle: "1 h 30 min · $55.000",
    description:
      "Corte de puntas con máscara (nutrición, hidratación o reparación a elección). Incluye modelado.",
    category: "Cortes y peinado",
    durationLabel: "1 h 30 min",
    durationMinutes: 90,
    priceFromArs: 55000,
    imageUrl: IMG.corte,
  },
];

export function findSalonTreatmentByName(name: string): SalonTreatment | undefined {
  const t = name.trim();
  return (
    SALON_TREATMENTS.find((x) => x.name === t) ??
    ARCHIVED_CORTE_COMBO_TREATMENTS.find((x) => x.name === t)
  );
}

export function findSalonTreatmentById(id: string): SalonTreatment | undefined {
  return (
    SALON_TREATMENTS.find((x) => x.id === id) ??
    ARCHIVED_CORTE_COMBO_TREATMENTS.find((x) => x.id === id)
  );
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
