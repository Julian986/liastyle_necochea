"use client";

import { Palette, Percent, Scissors, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

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
    id: "color-crecimiento-corte-nutricion-promo",
    title: "Color crecimiento + corte + nutrición",
    subtitle: "$104.000",
    details: "3 h · Incluye cierre técnico y modelado.",
    category: "Color",
    treatmentId: "color-crecimiento-corte-nutricion",
  },
  {
    id: "corte-nutricion-promo",
    title: "Corte + nutrición",
    subtitle: "$50.000",
    details: "1 h 30 min · Corte Diseño & Tendencias con nutrición. Incluye modelado.",
    category: "Cortes y peinado",
    treatmentId: "diseno-tendencias-nutricion",
  },
  {
    id: "corte-tratamiento-promo",
    title: "Corte Diseño & Tendencias + tratamiento",
    subtitle: "$80.000",
    details: "1 h 30 min · Incluye modelado.",
    category: "Cortes y peinado",
    treatmentId: "diseno-tendencias-tratamiento",
  },
  {
    id: "puntas-mascara-promo",
    title: "Corte de puntas + máscara",
    subtitle: "$55.000",
    details: "1 h 30 min · Máscara a elección (nutrición, hidratación o reparación). Incluye modelado.",
    category: "Cortes y peinado",
    treatmentId: "puntas-mascara",
  },
];

function CategoryIcon({ category }: { category: TreatmentCategory }) {
  const cls = "h-7 w-7 text-[var(--premium-gold-light)]";
  if (category === "Cortes y peinado") return <Scissors className={cls} strokeWidth={1.9} />;
  if (category === "Color") return <Palette className={cls} strokeWidth={1.9} />;
  return <Sparkles className={cls} strokeWidth={1.9} />;
}

function categoryHeading(category: TreatmentCategory): string {
  if (category === "Cortes y peinado") return "Cortes y peinado";
  return category;
}

export default function PromotionsPage() {
  const promoGroups = useMemo(
    () =>
      TREATMENT_CATEGORIES.map((category) => ({
        category,
        items: promos.filter((promo) => promo.category === category),
      })).filter((group) => group.items.length > 0),
    [],
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f6f2] pb-32 text-[#1c1b1b]">
      <main className="mx-auto w-full max-w-md px-4 pt-8 pb-24">
        <header className="mb-6 text-center">
          <h1 className="font-heading text-[34px] leading-none font-semibold">Beneficios cliente VIP</h1>
          <p className="mt-3 text-[13px] text-[#7f7c7a]">Combos destacados del mes</p>
        </header>

        <div className="space-y-8">
          {promoGroups.map((group) => (
            <section key={group.category} className="space-y-3">
              <h2 className="px-1 text-[12px] font-bold tracking-[0.16em] text-[var(--premium-gold-light)] uppercase">
                {categoryHeading(group.category)}
              </h2>

              {group.items.map((promo) => (
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
                      <h3 className="font-heading text-[20px] leading-tight font-semibold text-[#1c1b1b]">
                        {promo.title}
                      </h3>
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
          ))}
        </div>
      </main>

      <AppBottomNav active="promos" />
    </div>
  );
}
