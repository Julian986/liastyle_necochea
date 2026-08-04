import { Palette, Percent, Scissors, Sparkles } from "lucide-react";
import Link from "next/link";

import {
  SALON_TREATMENTS,
  TREATMENT_CATEGORIES,
  type TreatmentCategory,
} from "@/lib/treatments/catalog";
import { VIP_PROMOS } from "@/lib/vip/promos";

const BOOKABLE_TREATMENT_IDS = new Set(SALON_TREATMENTS.map((t) => t.id));

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

function isBookablePromo(treatmentId: string): boolean {
  const id = treatmentId.trim();
  return id.length > 0 && BOOKABLE_TREATMENT_IDS.has(id);
}

type VipPromosListProps = {
  /** Si false, oculta el CTA Reservar (útil en preview del panel). */
  showReserveCta?: boolean;
};

export function VipPromosList({ showReserveCta = true }: VipPromosListProps) {
  const promoGroups = TREATMENT_CATEGORIES.map((category) => ({
    category,
    items: VIP_PROMOS.filter((promo) => promo.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="space-y-8">
      {promoGroups.map((group) => (
        <section key={group.category} className="space-y-3">
          <h2 className="px-1 text-[12px] font-bold tracking-[0.16em] text-[var(--premium-gold-light)] uppercase">
            {categoryHeading(group.category)}
          </h2>

          {group.items.map((promo) => {
            const bookable = isBookablePromo(promo.treatmentId);
            return (
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
                    {showReserveCta ? (
                      bookable ? (
                        <Link
                          href={`/turnos?treatment=${encodeURIComponent(promo.treatmentId)}`}
                          className="mt-4 flex h-10 w-full items-center justify-center rounded-full bg-[var(--premium-gold-light)] text-[14px] font-semibold text-white shadow-sm transition active:scale-[0.98]"
                        >
                          Reservar
                        </Link>
                      ) : (
                        <p className="mt-4 text-center text-[12px] leading-snug text-[#7f7c7a]">
                          Pedí el turno por WhatsApp o en el salón.
                        </p>
                      )
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ))}
    </div>
  );
}
