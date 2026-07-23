import type { SalonTreatment } from "@/lib/treatments/catalog";
import { isColorTechnicalTreatmentId } from "@/lib/booking/color-technical-first-visit";
import { SERVICE_EDUCATIONAL_DESCRIPTIONS } from "@/lib/treatments/service-page-copy";
import { serviceInquiryWhatsAppUrl } from "@/lib/salon-contact";

type ServiceListItemProps = {
  service: SalonTreatment;
  isLast?: boolean;
};

/** En /servicios, WhatsApp solo para color técnico o alisado químico (como en /turnos). */
function showWhatsAppReserve(serviceId: string): boolean {
  return isColorTechnicalTreatmentId(serviceId) || serviceId.startsWith("alisado-vegano-");
}

export function ServiceListItem({ service, isLast }: ServiceListItemProps) {
  const description =
    SERVICE_EDUCATIONAL_DESCRIPTIONS[service.id] ?? service.description;
  const withWhatsApp = showWhatsAppReserve(service.id);

  return (
    <article
      className={`group flex flex-col justify-between rounded-lg px-2 py-4 transition-colors hover:bg-[#efeeea]/80 sm:flex-row sm:items-center ${
        isLast ? "" : "border-b border-[#7f7c7a]/20"
      }`}
    >
      <div className="min-w-0 flex-grow">
        <h3 className="text-base font-bold text-[#1c1b1b]">{service.name}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-[#4e463a]/90">{description}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-3">
          <span className="rounded bg-[#efeeea] px-2 py-1 text-sm font-medium text-[#4e463a]">
            {service.durationLabel}
          </span>
        </div>
      </div>

      {withWhatsApp ? (
        <a
          href={serviceInquiryWhatsAppUrl(service.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full border border-[#25D366] px-5 py-2 text-xs font-medium tracking-wider text-[#128C7E] uppercase transition-all hover:bg-[#25D366] hover:text-white active:scale-95 sm:mt-0"
        >
          Reservar por WhatsApp
        </a>
      ) : null}
    </article>
  );
}
