import type { ReactNode } from "react";

import type { SalonTreatment } from "@/lib/treatments/catalog";
import { ServiceListItem } from "@/components/servicios/service-list-item";

export type ServiceDisplayGroup = {
  id: string;
  title?: string;
  titleClassName?: string;
  /** Aclaración breve bajo el título del subgrupo (ej: "varía según procesos previos"). */
  note?: string;
  imageUrl?: string;
  imageObjectPosition?: string;
  services: SalonTreatment[];
};

type ServiceCategorySectionProps = {
  anchorId: string;
  sectionTitle: string;
  sectionSubtitle?: string;
  groups: ServiceDisplayGroup[];
  intro?: ReactNode;
};

/** Resalta la etiqueta inicial (ej. "Tratamiento:", "Máscaras:"). */
function ServiceGroupNote({ note }: { note: string }) {
  const match = /^([^:]{1,40}:)\s*([\s\S]*)$/.exec(note.trim());
  if (!match) {
    return <p className="mb-3 text-[17px] leading-relaxed text-[#7f7c7a]">{note}</p>;
  }

  return (
    <p className="mb-3 text-[17px] leading-relaxed text-[#7f7c7a]">
      <span className="text-[19px] font-bold text-[#1c1b1b]">{match[1]}</span>
      {match[2] ? <> {match[2]}</> : null}
    </p>
  );
}

export function ServiceCategorySection({
  anchorId,
  sectionTitle,
  sectionSubtitle,
  groups,
  intro,
}: ServiceCategorySectionProps) {
  const services = groups.flatMap((group) => group.services);

  return (
    <section className="mb-16 scroll-mt-20 border-t border-[#7f7c7a]/15 pt-10 first:border-t-0 first:pt-0" id={anchorId}>
      <header className="mb-6">
        <h2 className="font-heading text-[28px] leading-tight font-semibold text-[#1c1b1b]">{sectionTitle}</h2>
        {sectionSubtitle ? (
          <p className="mt-1.5 text-sm leading-snug text-[#7f7c7a]">{sectionSubtitle}</p>
        ) : null}
      </header>

      {intro ? <div className="mb-6">{intro}</div> : null}

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.id}>
            {group.imageUrl ? (
              <div className="mx-auto mb-4 aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={group.imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                  style={
                    group.imageObjectPosition
                      ? { objectPosition: group.imageObjectPosition }
                      : undefined
                  }
                />
              </div>
            ) : null}
            {group.title ? (
              <h3
                className={
                  group.titleClassName ??
                  "mb-3 text-base font-semibold text-[#1c1b1b]"
                }
              >
                {group.title}
              </h3>
            ) : null}
            {group.note ? <ServiceGroupNote note={group.note} /> : null}
            <div className="space-y-0">
              {group.services.map((service, index) => (
                <ServiceListItem
                  key={service.id}
                  service={service}
                  isLast={index === group.services.length - 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 ? (
        <p className="text-sm text-[#7f7c7a]">Próximamente más servicios en esta categoría.</p>
      ) : null}
    </section>
  );
}
