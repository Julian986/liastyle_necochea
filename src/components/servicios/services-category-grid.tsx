"use client";

import { CategoryPhotoCard } from "@/components/category-photo-card";
import { BOOKING_CATEGORY_CARDS } from "@/lib/booking/category-cards";
import type { TreatmentCategory } from "@/lib/treatments/catalog";

type ServicesCategoryGridProps = {
  activeCategory: TreatmentCategory;
  onSelectCategory: (category: TreatmentCategory) => void;
};

export function ServicesCategoryGrid({ activeCategory, onSelectCategory }: ServicesCategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {BOOKING_CATEGORY_CARDS.map((card) => (
        <CategoryPhotoCard
          key={card.category}
          card={card}
          active={activeCategory === card.category}
          action="chevron"
          onClick={() => onSelectCategory(card.category)}
        />
      ))}
    </div>
  );
}
