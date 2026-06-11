"use client";

import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";

import { BOOKING_CATEGORY_CARDS } from "@/lib/booking/category-cards";
import type { TreatmentCategory } from "@/lib/treatments/catalog";

type BookingCategoryStepProps = {
  onSelectCategory: (category: TreatmentCategory) => void;
};

export function BookingCategoryStep({ onSelectCategory }: BookingCategoryStepProps) {
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      window.setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 100 * (index + 1));
    });
  }, []);

  return (
    <div className="space-y-8">
      {BOOKING_CATEGORY_CARDS.map((card, index) => (
        <button
          key={card.category}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          type="button"
          onClick={() => onSelectCategory(card.category)}
          className="group relative w-full cursor-pointer overflow-hidden rounded-[28px] border border-[var(--outline)]/10 bg-white text-left shadow-sm transition-all hover:border-[var(--premium-gold-light)]/40 hover:shadow-md active:scale-[0.98]"
        >
          <div className="relative h-56 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.imageUrl} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="font-heading text-[32px] leading-10 font-semibold">{card.title}</h2>
              <p className="text-sm leading-5 opacity-90">{card.subtitle}</p>
            </div>
            <div className="absolute right-6 bottom-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md transition-transform group-hover:rotate-90">
              <Plus className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
