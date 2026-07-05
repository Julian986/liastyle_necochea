import { CAMBIO_ESTRUCTURA_CARD_SUBTITLE } from "@/lib/booking/cambio-estructura-booking-sections";
import type { TreatmentCategory } from "@/lib/treatments/catalog";

export type BookingCategoryCard = {
  category: TreatmentCategory;
  title: string;
  subtitle: string;
  imageUrl: string;
  /** Ajuste fino de `object-position` para fotos verticales. */
  imageObjectPosition?: string;
};

/** Cards del paso 1 en /turnos — pensadas para fotos verticales de celular. */
export const BOOKING_CATEGORY_CARDS: BookingCategoryCard[] = [
  {
    category: "Cortes y peinado",
    title: "Corte y peinado",
    subtitle: "Diseño y estilo personalizado",
    imageUrl: "/fondo_cortes.webp",
    imageObjectPosition: "50% 20%",
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
    imageObjectPosition: "50% 30%",
  },
  {
    category: "Cambio de estructura",
    title: "Cambio de estructura",
    subtitle: CAMBIO_ESTRUCTURA_CARD_SUBTITLE,
    imageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    imageObjectPosition: "50% 30%",
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
