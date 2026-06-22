"use client";

import { Palette, Percent, Scissors, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AppBottomNav } from "@/components/app-bottom-nav";

import {
  TREATMENT_CATEGORIES,
  type TreatmentCategory,
} from "@/lib/treatments/catalog";

type Promo = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  category: TreatmentCategory;
  /** Id del servicio en catálogo para preseleccionar en /turnos. */
  treatmentId: string;
};

const promos: Promo[] = [
  {
    id: "color-crecimiento-mascara-promo",
    title: "Color en crecimiento + máscara",
    subtitle: "$85.000",
    details: "2 h · Incluye cierre técnico y modelado.",
    category: "Color",
    treatmentId: "color-crecimiento-mascara",
  },
  {
    id: "color-crecimiento-tratamiento-promo",
    title: "Color en crecimiento + tratamiento",
    subtitle: "$120.000",
    details: "2 h 30 min · Incluye cierre técnico y modelado.",
    category: "Color",
    treatmentId: "color-crecimiento-tratamiento",
  },
  {
    id: "corte-nutricion-promo",
    title: "Corte + nutrición",
    subtitle: "$50.000",
    details: "1 h 30 min · Diseño & tendencias con nutrición. Incluye modelado.",
    category: "Cortes y peinado",
    treatmentId: "diseno-tendencias-nutricion",
  },
  {
    id: "corte-tratamiento-promo",
    title: "Corte + tratamiento",
    subtitle: "$65.000",
    details: "1 h 30 min · Incluye modelado.",
    category: "Cortes y peinado",
    treatmentId: "diseno-tendencias-tratamiento",
  },
];

function CategoryIcon({ category }: { category: TreatmentCategory }) {
  const cls = "h-7 w-7 text-[var(--premium-gold-light)]";
  if (category === "Cortes y peinado") return <Scissors className={cls} strokeWidth={1.9} />;
  if (category === "Color") return <Palette className={cls} strokeWidth={1.9} />;
  return <Sparkles className={cls} strokeWidth={1.9} />;
}

export default function PromotionsPage() {
  const promoCategories = useMemo(
    () => TREATMENT_CATEGORIES.filter((category) => promos.some((promo) => promo.category === category)),
    [],
  );
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>(promoCategories[0] ?? "Color");

  const filteredPromos = useMemo(
    () => promos.filter((promo) => promo.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f6f2] pb-32 text-[#1c1b1b]">
      <main className="mx-auto w-full max-w-md px-4 pt-8 pb-24">
        <header className="mb-4 text-center">
          <h1 className="font-heading text-[34px] leading-none font-semibold">Promociones</h1>
          <p className="mt-3 text-[13px] text-[#7f7c7a]">Combos destacados del mes</p>
        </header>

        <section className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
          {promoCategories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-white text-[var(--premium-gold-light)] shadow-sm ring-1 ring-[var(--premium-gold)]/25"
                    : "bg-transparent text-[#7f7c7a] hover:text-[#1c1b1b]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </section>

        <section className="space-y-3">
          {filteredPromos.map((promo) => (
            <article
              key={promo.id}
              className="overflow-hidden rounded-2xl border border-[var(--outline)]/10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <div className="flex gap-4 p-4">
                <div className="flex shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl bg-[#eef4f8] px-4 py-5">
                  <CategoryIcon category={promo.category} />
                  <span className="flex items-center gap-1 text-[10px] font-bold tracking-[0.14em] text-[var(--premium-gold-light)] uppercase">
                    <Percent className="h-3 w-3" strokeWidth={2.2} />
                    Promo
                  </span>
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="text-[20px] leading-tight font-heading font-semibold text-[#1c1b1b]">
                    {promo.title}
                  </h2>
                  <p className="mt-1 text-[14px] font-semibold text-[var(--premium-gold-light)]">
                    {promo.subtitle}
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-[#7f7c7a]">{promo.details}</p>
                  <Link
                    href={`/turnos?treatment=${encodeURIComponent(promo.treatmentId)}`}
                    className="mt-4 flex h-10 w-full items-center justify-center rounded-full bg-[var(--premium-gold-light)] text-[14px] font-semibold text-white shadow-sm transition active:scale-[0.98]"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <AppBottomNav active="promos" />
    </div>
  );
}
