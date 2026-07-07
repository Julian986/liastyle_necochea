import Link from "next/link";

import type { SalonTreatment } from "@/lib/treatments/catalog";
import { treatmentPriceLabel } from "@/lib/treatments/service-page-config";

type ServiceListItemProps = {
  service: SalonTreatment;
  isLast?: boolean;
};

export function ServiceListItem({ service, isLast }: ServiceListItemProps) {
  return (
    <article
      className={`group flex flex-col justify-between rounded-lg px-2 py-4 transition-colors hover:bg-[#efeeea]/80 sm:flex-row sm:items-center ${
        isLast ? "" : "border-b border-[#7f7c7a]/20"
      }`}
    >
      <div className="min-w-0 flex-grow">
        <h3 className="text-base font-bold text-[#1c1b1b]">{service.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-[#4e463a]/90">{service.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="rounded bg-[#efeeea] px-2 py-1 text-xs font-medium text-[#4e463a]">
            {service.durationLabel}
          </span>
          <span className="text-base font-semibold text-[var(--premium-gold-light)]">
            {treatmentPriceLabel(service.subtitle)}
          </span>
        </div>
      </div>

      <Link
        href={`/turnos?treatment=${encodeURIComponent(service.id)}`}
        className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--premium-gold-light)] px-5 py-2 text-xs font-medium tracking-wider text-[var(--premium-gold-light)] uppercase transition-all hover:bg-[var(--premium-gold-light)] hover:text-white active:scale-95 sm:mt-0"
      >
        Reservar
      </Link>
    </article>
  );
}
