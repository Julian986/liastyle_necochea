import type { TreatmentCategory } from "@/lib/treatments/catalog";

export type ServiceCategoryImage = {
  imageUrl: string;
  imageObjectPosition?: string;
};

/** Imagen representativa por categoría en /servicios (Analia puede ir completando). */
export const SERVICE_CATEGORY_IMAGES: Partial<Record<TreatmentCategory, ServiceCategoryImage>> = {
  Color: {
    imageUrl: "/color_image.webp",
    imageObjectPosition: "50% 35%",
  },
};

export function serviceCategoryImage(category: TreatmentCategory): ServiceCategoryImage | null {
  return SERVICE_CATEGORY_IMAGES[category] ?? null;
}
