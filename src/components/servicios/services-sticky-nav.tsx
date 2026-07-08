"use client";

import { BOOKING_CATEGORY_CARDS } from "@/lib/booking/category-cards";
import type { TreatmentCategory } from "@/lib/treatments/catalog";

type ServicesStickyNavProps = {
  visible: boolean;
  activeCategory: TreatmentCategory;
  onSelectCategory: (category: TreatmentCategory) => void;
};

/** Etiquetas cortas para la barra fija (evita textos largos en las pills). */
const SHORT_LABEL: Record<TreatmentCategory, string> = {
  "Cortes y peinado": "Cortes",
  Color: "Color",
  Tratamientos: "Tratamientos",
  "Cambio de estructura": "Estructura",
};

export function ServicesStickyNav({ visible, activeCategory, onSelectCategory }: ServicesStickyNavProps) {
  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 border-b border-[#7f7c7a]/12 bg-[#fbf9f5]/95 backdrop-blur-md transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex w-full max-w-md items-center gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {BOOKING_CATEGORY_CARDS.map(({ category }) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-semibold tracking-wide transition-colors active:scale-95 ${
                isActive
                  ? "bg-[var(--premium-gold-light)] text-white"
                  : "bg-white text-[#605e5e] ring-1 ring-[#d1c5b5]/60 hover:text-[var(--premium-gold-light)]"
              }`}
            >
              {SHORT_LABEL[category]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
