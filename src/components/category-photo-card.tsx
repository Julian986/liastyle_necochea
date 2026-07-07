"use client";

import { ChevronDown, Plus } from "lucide-react";

import type { BookingCategoryCard } from "@/lib/booking/category-cards";

type CategoryPhotoCardProps = {
  card: BookingCategoryCard;
  onClick?: () => void;
  active?: boolean;
  selectionCount?: number;
  /** Turnos: + flotante. Servicios: flecha abajo o ninguno. */
  action?: "plus" | "chevron" | "none";
  className?: string;
};

export function CategoryPhotoCard({
  card,
  onClick,
  active = false,
  selectionCount = 0,
  action = "plus",
  className = "",
}: CategoryPhotoCardProps) {
  const hasSelection = selectionCount > 0;
  const highlighted = active || hasSelection;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full cursor-pointer overflow-hidden rounded-[18px] border bg-white text-left shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${
        highlighted
          ? "border-[var(--premium-gold-light)]/55 shadow-[0_0_0_1px_rgba(125,163,196,0.15)]"
          : "border-[var(--outline)]/10 hover:border-[var(--premium-gold-light)]/40"
      } ${className}`.trim()}
    >
      <div className="relative aspect-[3/4] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.imageUrl}
          alt=""
          className="h-full w-full object-cover"
          style={card.imageObjectPosition ? { objectPosition: card.imageObjectPosition } : undefined}
        />
        {hasSelection ? (
          <span className="absolute top-2 right-2 z-10 rounded-full bg-[var(--premium-gold-light)] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-md">
            {selectionCount}
          </span>
        ) : null}
        <div
          className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t px-3 pt-14 pb-3 ${
            hasSelection
              ? "from-[#1c2834]/95 via-[#1c2834]/75 to-transparent"
              : "from-black/92 via-black/65 to-transparent"
          }`}
        >
          {hasSelection ? (
            <span className="absolute inset-x-0 top-0 h-[2px] bg-[var(--premium-gold-light)]" aria-hidden />
          ) : (
            <span
              className="mb-2 block h-[2px] w-9 rounded-full bg-gradient-to-r from-[var(--premium-gold-light)] to-white/25"
              aria-hidden
            />
          )}
          <h2 className="font-heading pr-10 text-[23px] leading-[1.12] font-semibold tracking-[-0.01em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
            {card.title}
          </h2>
          <p className="mt-1.5 line-clamp-2 pr-10 text-[11px] leading-snug text-white/78">{card.subtitle}</p>
          {action === "plus" ? (
            <div
              className={`absolute right-2 bottom-3 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-transform group-hover:rotate-90 ${
                hasSelection
                  ? "border-white/50 bg-[var(--premium-gold-light)] shadow-[0_0_12px_rgba(125,163,196,0.5)]"
                  : "border-white/25 bg-white/15"
              }`}
            >
              <Plus className="h-4 w-4 text-white" strokeWidth={2.2} />
            </div>
          ) : action === "chevron" ? (
            <div className="absolute right-2 bottom-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md">
              <ChevronDown className="h-4 w-4 text-white" strokeWidth={2.2} />
            </div>
          ) : null}
        </div>
      </div>
    </button>
  );
}
