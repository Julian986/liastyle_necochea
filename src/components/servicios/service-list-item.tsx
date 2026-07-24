import type { SalonTreatment } from "@/lib/treatments/catalog";
import { resolveServicePageDescription } from "@/lib/treatments/service-page-copy";

type ServiceListItemProps = {
  service: SalonTreatment;
  isLast?: boolean;
};

export function ServiceListItem({ service, isLast }: ServiceListItemProps) {
  const description = resolveServicePageDescription(service.id, service.description).trim();

  return (
    <article
      className={`rounded-lg px-2 py-4 transition-colors hover:bg-[#efeeea]/80 ${
        isLast ? "" : "border-b border-[#7f7c7a]/20"
      }`}
    >
      <h3 className="text-base font-bold text-[#1c1b1b]">{service.name}</h3>
      {description ? (
        <p className="mt-1.5 text-[15px] leading-relaxed text-[#4e463a]/90">{description}</p>
      ) : null}
      <div className="mt-2.5 flex flex-wrap items-center gap-3">
        <span className="rounded bg-[#efeeea] px-2 py-1 text-sm font-medium text-[#4e463a]">
          {service.durationLabel}
        </span>
      </div>
    </article>
  );
}
