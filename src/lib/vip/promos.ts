import type { TreatmentCategory } from "@/lib/treatments/catalog";

export type VipPromo = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  category: TreatmentCategory;
  /** Vacío = solo listado VIP (no se reserva desde la app). */
  treatmentId: string;
};

/** Combos VIP (misma fuente para /promociones y vista panel). */
export const VIP_PROMOS: VipPromo[] = [
  {
    id: "color-crecimiento-corte-nutricion-promo",
    title: "Color crecimiento + corte + nutrición",
    subtitle: "$96.000",
    details: "3 h · Incluye cierre técnico y modelado.",
    category: "Color",
    treatmentId: "color-crecimiento-corte-nutricion",
  },
  {
    id: "puntas-tratamiento-promo",
    title: "Corte puntas + tratamiento",
    subtitle: "$92.000",
    details: "Botox, Cauterizado o Lifting · Pedí el turno en el salón.",
    category: "Cortes y peinado",
    treatmentId: "puntas-tratamiento",
  },
  {
    id: "diseno-tendencias-tratamiento-promo",
    title: "Corte diseño & tendencia + tratamiento",
    subtitle: "$96.000",
    details: "Botox, Cauterizado o Lifting · Pedí el turno en el salón.",
    category: "Cortes y peinado",
    treatmentId: "diseno-tendencias-tratamiento",
  },
  {
    id: "puntas-mascara-promo",
    title: "Corte puntas + máscara",
    subtitle: "$52.000",
    details: "Pedí el turno en el salón.",
    category: "Cortes y peinado",
    treatmentId: "puntas-mascara",
  },
  {
    id: "diseno-tendencias-mascara-promo",
    title: "Corte diseño & tendencia + máscara",
    subtitle: "$56.000",
    details: "Pedí el turno en el salón.",
    category: "Cortes y peinado",
    treatmentId: "",
  },
];
