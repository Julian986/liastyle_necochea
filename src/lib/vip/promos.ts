import type { TreatmentCategory } from "@/lib/treatments/catalog";

export type VipPromo = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  category: TreatmentCategory;
  treatmentId: string;
};

/** Combos VIP del mes (misma fuente para /promociones y vista panel). */
export const VIP_PROMOS: VipPromo[] = [
  {
    id: "color-crecimiento-corte-nutricion-promo",
    title: "Color crecimiento + corte + nutrición",
    subtitle: "$104.000",
    details: "3 h · Incluye cierre técnico y modelado.",
    category: "Color",
    treatmentId: "color-crecimiento-corte-nutricion",
  },
];
