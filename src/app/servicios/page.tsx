"use client";

import { Palette, Scissors, Sparkles, Waves } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AppBottomNav } from "@/components/app-bottom-nav";

import {
  SALON_TREATMENTS,
  TREATMENT_CATEGORIES,
  type SalonTreatment,
  type TreatmentCategory,
} from "@/lib/treatments/catalog";
import { CORTES_PEINADO_DISPLAY_SECTIONS } from "@/lib/treatments/cortes-peinado-sections";
import {
  CAMBIO_ESTRUCTURA_DISPLAY_GROUPS,
  CAMBIO_ESTRUCTURA_INTRO,
  CAMBIO_ESTRUCTURA_PRICE_NOTICE,
} from "@/lib/treatments/cambio-estructura-display-sections";
import { serviceCategoryImage } from "@/lib/treatments/service-category-images";

function CategoryIcon({ category }: { category: TreatmentCategory }) {
  const cls = "h-7 w-7 text-[var(--premium-gold-light)]";
  if (category === "Cortes y peinado") return <Scissors className={cls} strokeWidth={1.9} />;
  if (category === "Color") return <Palette className={cls} strokeWidth={1.9} />;
  if (category === "Cambio de estructura") return <Waves className={cls} strokeWidth={1.9} />;
  return <Sparkles className={cls} strokeWidth={1.9} />;
}

function ServiceCard({
  service,
  showImage,
  compact,
}: {
  service: SalonTreatment;
  showImage: boolean;
  compact?: boolean;
}) {
  return (
    <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[var(--outline)]/10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      {!compact ? (
        <div className="relative h-28 shrink-0 overflow-hidden bg-white">
          {showImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={service.imageUrl} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" aria-hidden />
            </>
          ) : (
            <div className="flex h-full items-center justify-center border-b border-dashed border-[var(--outline)]/25 bg-white">
              <span className="text-[13px] font-medium tracking-wide text-[#7f7c7a]">Imagen</span>
            </div>
          )}
          <div className="absolute right-2 bottom-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm">
            <CategoryIcon category={service.category} />
          </div>
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col px-3 py-3">
        <h2 className="text-[16px] leading-tight font-heading font-semibold text-[#1c1b1b]">
          {service.name}
        </h2>
        <p className="mt-1 text-[12px] font-semibold text-[var(--premium-gold-light)]">{service.subtitle}</p>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#7f7c7a]">{service.description}</p>
        <p className="mt-1 text-[10px] tracking-[0.06em] text-[#7f7c7a]/80 uppercase">
          {service.durationLabel}
        </p>

        <div className="mt-auto pt-3">
          <Link
            href={`/turnos?treatment=${encodeURIComponent(service.id)}`}
            className="flex h-9 w-full items-center justify-center rounded-full bg-[var(--premium-gold-light)] text-[13px] font-semibold text-white shadow-sm transition active:scale-[0.98]"
          >
            Reservar
          </Link>
        </div>
      </div>
    </article>
  );
}

function CategoryHero({ category }: { category: TreatmentCategory }) {
  const image = serviceCategoryImage(category);
  if (!image) return null;

  return (
    <div className="mb-4 overflow-hidden rounded-2xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.imageUrl}
        alt=""
        className="aspect-[4/5] w-full object-cover"
        style={image.imageObjectPosition ? { objectPosition: image.imageObjectPosition } : undefined}
      />
    </div>
  );
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("Cortes y peinado");

  const servicesById = useMemo(
    () => new Map(SALON_TREATMENTS.map((service) => [service.id, service])),
    [],
  );

  const filteredServices = useMemo(
    () => SALON_TREATMENTS.filter((service) => service.category === activeCategory),
    [activeCategory],
  );

  const cortesSections = useMemo(() => {
    if (activeCategory !== "Cortes y peinado") return null;
    return CORTES_PEINADO_DISPLAY_SECTIONS.map((section) => ({
      ...section,
      services: section.treatmentIds.flatMap((id) => {
        const service = servicesById.get(id);
        return service ? [service] : [];
      }),
    })).filter((section) => section.services.length > 0);
  }, [activeCategory, servicesById]);

  const cambioEstructuraSections = useMemo(() => {
    if (activeCategory !== "Cambio de estructura") return null;
    return CAMBIO_ESTRUCTURA_DISPLAY_GROUPS.map((group) => ({
      ...group,
      services: group.treatmentIds.flatMap((id) => {
        const service = servicesById.get(id);
        return service ? [service] : [];
      }),
    })).filter((group) => group.services.length > 0);
  }, [activeCategory, servicesById]);

  const groupedSections = cortesSections ?? cambioEstructuraSections;

  const categoryImage = serviceCategoryImage(activeCategory);
  const compactCards = Boolean(categoryImage);

  const featuredServiceId =
    groupedSections
      ? (groupedSections[0]?.services[0]?.id ?? null)
      : (filteredServices[0]?.id ?? null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f6f2] pb-32 text-[#1c1b1b]">
      <main className="mx-auto w-full max-w-md px-4 pt-8 pb-24">
        <header className="mb-4 text-center">
          <h1 className="font-heading text-[34px] leading-none font-semibold">Servicios</h1>
        </header>

        <p className="mb-4 text-center text-[13px] leading-relaxed text-[#7f7c7a]">
          Precios orientativos; algunos servicios varían según largo del cabello o diagnóstico en salón.
        </p>

        <section className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
          {TREATMENT_CATEGORIES.map((category) => {
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

        <CategoryHero category={activeCategory} />

        {groupedSections ? (
          <div className="space-y-6">
            {activeCategory === "Cambio de estructura" ? (
              <div className="space-y-3 px-0.5 text-center">
                <p className="font-heading text-[20px] font-semibold text-[#1c1b1b]">{CAMBIO_ESTRUCTURA_INTRO}</p>
                <p className="text-[13px] leading-snug text-[#7f7c7a]">{CAMBIO_ESTRUCTURA_PRICE_NOTICE}</p>
              </div>
            ) : null}
            {groupedSections.map((section) => (
              <section key={section.id}>
                <h2
                  className={`mb-3 px-0.5 font-semibold ${
                    activeCategory === "Cambio de estructura"
                      ? "text-[11px] tracking-[0.14em] text-[var(--premium-gold-light)] uppercase"
                      : "text-[16px] text-[#1c1b1b]"
                  }`}
                >
                  {section.title}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {section.services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      showImage={!compactCards && service.id === featuredServiceId}
                      compact={compactCards}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section className="grid grid-cols-2 gap-3">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                showImage={!compactCards && service.id === featuredServiceId}
                compact={compactCards}
              />
            ))}
          </section>
        )}
      </main>

      <AppBottomNav active="servicios" />
    </div>
  );
}
