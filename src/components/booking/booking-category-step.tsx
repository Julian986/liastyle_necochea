"use client";

import { Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

import { BOOKING_CATEGORY_CARDS } from "@/lib/booking/category-cards";
import { SALON_TREATMENT_OPTIONS } from "@/lib/booking/salon-availability";
import type { TreatmentCategory } from "@/lib/treatments/catalog";

type BookingCategoryStepProps = {
  onSelectCategory: (category: TreatmentCategory) => void;
  selectedServiceIds?: string[];
  selectedDurationLabel?: string;
  onClearSelection?: () => void;
  onContinue?: () => void;
};

export function BookingCategoryStep({
  onSelectCategory,
  selectedServiceIds = [],
  selectedDurationLabel,
  onClearSelection,
  onContinue,
}: BookingCategoryStepProps) {
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedServices = useMemo(
    () =>
      selectedServiceIds.flatMap((id) => {
        const found = SALON_TREATMENT_OPTIONS.find((option) => option.id === id);
        return found ? [found] : [];
      }),
    [selectedServiceIds],
  );

  const selectedCountByCategory = useMemo(() => {
    const counts = new Map<TreatmentCategory, number>();
    for (const service of selectedServices) {
      counts.set(service.category, (counts.get(service.category) ?? 0) + 1);
    }
    return counts;
  }, [selectedServices]);

  const selectedSummary = useMemo(
    () => selectedServices.map((service) => service.name).join(" · "),
    [selectedServices],
  );

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
    <div className="space-y-5">
      {selectedServices.length > 0 ? (
        <div className="rounded-2xl border border-[var(--premium-gold-light)]/35 bg-white px-4 py-3.5 shadow-[0_4px_20px_rgba(125,163,196,0.12)]">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-[var(--premium-gold-light)] uppercase">
            {selectedServices.length}{" "}
            {selectedServices.length === 1 ? "servicio seleccionado" : "servicios seleccionados"}
          </p>
          <p className="mt-1.5 text-[14px] leading-snug font-medium text-[#1c1b1b]">{selectedSummary}</p>
          {selectedDurationLabel ? (
            <p className="mt-1 text-[12px] text-[#7f7c7a]">{selectedDurationLabel}</p>
          ) : null}
          <p className="mt-1.5 text-[11px] leading-snug text-[#7f7c7a]">
            Tocá una categoría para agregar o cambiar servicios.
          </p>
          <div className="mt-3 flex items-center gap-2">
            {onClearSelection ? (
              <button
                type="button"
                onClick={onClearSelection}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--outline)]/15 px-3 py-2 text-[12px] font-medium text-[#7f7c7a] transition-colors hover:border-red-300/50 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                Quitar todo
              </button>
            ) : null}
            {onContinue ? (
              <button
                type="button"
                onClick={onContinue}
                className="ml-auto flex-1 cursor-pointer rounded-full bg-[var(--premium-gold-light)] py-2.5 text-[13px] font-semibold tracking-wide text-white uppercase transition-all hover:opacity-95 active:scale-[0.98]"
              >
                Continuar
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="space-y-8">
        {BOOKING_CATEGORY_CARDS.map((card, index) => {
          const categoryCount = selectedCountByCategory.get(card.category) ?? 0;
          const hasSelection = categoryCount > 0;

          return (
            <button
              key={card.category}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              type="button"
              onClick={() => onSelectCategory(card.category)}
              className={`group relative w-full cursor-pointer overflow-hidden rounded-[28px] border bg-white text-left shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${
                hasSelection
                  ? "border-[var(--premium-gold-light)]/55 shadow-[0_0_0_1px_rgba(125,163,196,0.15)]"
                  : "border-[var(--outline)]/10 hover:border-[var(--premium-gold-light)]/40"
              }`}
            >
              <div className="relative h-56 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                  style={card.imageObjectPosition ? { objectPosition: card.imageObjectPosition } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />
                {hasSelection ? (
                  <span className="absolute top-4 right-4 rounded-full bg-[var(--premium-gold-light)] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white shadow-md">
                    {categoryCount} seleccionado{categoryCount === 1 ? "" : "s"}
                  </span>
                ) : null}
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="font-heading text-[32px] leading-10 font-semibold">{card.title}</h2>
                  <p className="text-sm leading-5 opacity-90">{card.subtitle}</p>
                </div>
                <div
                  className={`absolute right-6 bottom-6 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-transform group-hover:rotate-90 ${
                    hasSelection
                      ? "border-white/50 bg-[var(--premium-gold-light)]/90"
                      : "border-white/30 bg-white/20"
                  }`}
                >
                  <Plus className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
