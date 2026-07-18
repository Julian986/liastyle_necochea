import { CAMBIO_ESTRUCTURA_CARD_SUBTITLE } from "@/lib/booking/cambio-estructura-booking-sections";
import { CAMBIO_ESTRUCTURA_IMAGES } from "@/lib/treatments/cambio-estructura-images";
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
    category: "Tratamientos",
    title: "Terapia Capilar & Mask Bar",
    subtitle: "Nutrición, brillo y restauración",
    imageUrl: "/liastyle_tratamientos.webp",
    imageObjectPosition: "50% 30%",
  },
  {
    category: "Cambio de estructura",
    title: "Cambio de estructura",
    subtitle: CAMBIO_ESTRUCTURA_CARD_SUBTITLE,
    imageUrl: CAMBIO_ESTRUCTURA_IMAGES.card,
    imageObjectPosition: CAMBIO_ESTRUCTURA_IMAGES.cardObjectPosition,
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
