import type { TreatmentCategory } from "@/lib/treatments/catalog";

export type BookingCategoryCard = {
  category: TreatmentCategory;
  title: string;
  subtitle: string;
  imageUrl: string;
  /** Ajuste fino de `object-position` (ej. mostrar rostro en recortes). */
  imageObjectPosition?: string;
};

export const BOOKING_CATEGORY_CARDS: BookingCategoryCard[] = [
  {
    category: "Cortes y peinado",
    title: "Corte y peinado",
    subtitle: "Diseño y estilo personalizado",
    imageUrl: "/fondo_cortes.webp",
    imageObjectPosition: "68% 18%",
  },
  {
    category: "Color",
    title: "Color",
    subtitle: "Balayage, reflejos y color global",
    imageUrl: "/color_image.webp",
    imageObjectPosition: "50% 35%",
  },
  {
    category: "Tratamiento",
    title: "Tratamiento",
    subtitle: "Nutrición, brillo y restauración",
    imageUrl:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80",
  },
];

export const BOOKING_STEP_HINTS: Record<1 | 2 | 3, string> = {
  1: "Tocá una categoría para ver los servicios",
  2: "Elegí una fecha disponible",
  3: "Seleccioná un horario para continuar",
};

export function bookingCategoryTitle(category: TreatmentCategory): string {
  return BOOKING_CATEGORY_CARDS.find((c) => c.category === category)?.title ?? category;
}
