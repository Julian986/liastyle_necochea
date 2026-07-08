"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AppBottomNav } from "@/components/app-bottom-nav";
import { ServiceCategorySection, type ServiceDisplayGroup } from "@/components/servicios/service-category-section";
import { ServicesCategoryGrid } from "@/components/servicios/services-category-grid";
import { ServicesStickyNav } from "@/components/servicios/services-sticky-nav";
import { BOOKING_CATEGORY_CARDS } from "@/lib/booking/category-cards";
import { COLOR_BOOKING_SECTIONS } from "@/lib/booking/color-booking-sections";
import {
  CAMBIO_ESTRUCTURA_DISPLAY_GROUPS,
  CAMBIO_ESTRUCTURA_INTRO,
  CAMBIO_ESTRUCTURA_PRICE_NOTICE,
} from "@/lib/treatments/cambio-estructura-display-sections";
import { CORTES_PEINADO_DISPLAY_SECTIONS } from "@/lib/treatments/cortes-peinado-sections";
import { SALON_TREATMENTS, type SalonTreatment, type TreatmentCategory } from "@/lib/treatments/catalog";
import { categoryAnchorId, SERVICE_PAGE_INTRO } from "@/lib/treatments/service-page-config";

function buildGroupsForCategory(
  category: TreatmentCategory,
  servicesById: Map<string, SalonTreatment>,
): ServiceDisplayGroup[] {
  if (category === "Cortes y peinado") {
    return CORTES_PEINADO_DISPLAY_SECTIONS.map((section) => ({
      id: section.id,
      title: section.title,
      services: section.treatmentIds.flatMap((id) => {
        const service = servicesById.get(id);
        return service ? [service] : [];
      }),
    })).filter((group) => group.services.length > 0);
  }

  if (category === "Color") {
    return COLOR_BOOKING_SECTIONS.flatMap((section) => {
      if (section.subsections) {
        return section.subsections.map((subsection) => ({
          id: `${section.id}-${subsection.title}`,
          title: subsection.title,
          titleClassName: `${
            subsection.subtitle ? "mb-1" : "mb-3"
          } text-[11px] font-semibold tracking-[0.14em] text-[var(--premium-gold-light)] uppercase`,
          note: subsection.subtitle,
          services: subsection.treatmentIds.flatMap((id) => {
            const service = servicesById.get(id);
            return service ? [service] : [];
          }),
        }));
      }

      const services = (section.treatmentIds ?? []).flatMap((id) => {
        const service = servicesById.get(id);
        return service ? [service] : [];
      });

      if (services.length === 0) return [];

      return [
        {
          id: section.id,
          title: section.title || undefined,
          titleClassName: section.title
            ? "mb-3 text-[11px] font-semibold tracking-[0.14em] text-[var(--premium-gold-light)] uppercase"
            : undefined,
          services,
        },
      ];
    }).filter((group) => group.services.length > 0);
  }

  if (category === "Cambio de estructura") {
    return CAMBIO_ESTRUCTURA_DISPLAY_GROUPS.map((group) => ({
      id: group.id,
      title: group.title,
      titleClassName:
        "mb-3 text-[11px] font-semibold tracking-[0.14em] text-[var(--premium-gold-light)] uppercase",
      imageUrl: group.imageUrl,
      imageObjectPosition: group.imageObjectPosition,
      services: group.treatmentIds.flatMap((id) => {
        const service = servicesById.get(id);
        return service ? [service] : [];
      }),
    })).filter((group) => group.services.length > 0);
  }

  const services = SALON_TREATMENTS.filter((service) => service.category === category);
  return services.length > 0 ? [{ id: category, services }] : [];
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("Cortes y peinado");

  const servicesById = useMemo(
    () => new Map(SALON_TREATMENTS.map((service) => [service.id, service])),
    [],
  );

  const categoryGroups = useMemo(
    () =>
      Object.fromEntries(
        BOOKING_CATEGORY_CARDS.map(({ category }) => [
          category,
          buildGroupsForCategory(category, servicesById),
        ]),
      ) as Record<TreatmentCategory, ServiceDisplayGroup[]>,
    [servicesById],
  );

  const cardsSentinelRef = useRef<HTMLDivElement | null>(null);
  const [stickyNavVisible, setStickyNavVisible] = useState(false);
  /** Evita que el scrollspy pise la categoría mientras hacemos scroll programático. */
  const programmaticScrollUntil = useRef(0);

  const handleSelectCategory = useCallback((category: TreatmentCategory) => {
    setActiveCategory(category);
    programmaticScrollUntil.current = Date.now() + 800;
    document.getElementById(categoryAnchorId(category))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const sentinel = cardsSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStickyNavVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = BOOKING_CATEGORY_CARDS.map(({ category }) =>
      document.getElementById(categoryAnchorId(category)),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < programmaticScrollUntil.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top) return;
        const match = BOOKING_CATEGORY_CARDS.find(
          ({ category }) => categoryAnchorId(category) === top.target.id,
        );
        if (match) setActiveCategory(match.category);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbf9f5] pb-32 text-[#1b1c1a]">
      <ServicesStickyNav
        visible={stickyNavVisible}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      <main className="mx-auto w-full max-w-md px-4 pb-24">
        <header className="pb-6 pt-8 text-center">
          <h1 className="font-heading text-[34px] leading-tight font-semibold text-[#1c1b1b]">Servicios</h1>
          <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-[#7f7c7a]">{SERVICE_PAGE_INTRO}</p>
        </header>

        <div className="mb-10">
          <p className="mb-3 text-center text-[11px] font-semibold tracking-[0.12em] text-[var(--premium-gold-light)] uppercase">
            Elegí un área
          </p>
          <ServicesCategoryGrid activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />
          <div ref={cardsSentinelRef} aria-hidden />
        </div>

        <div className="space-y-2">
          {BOOKING_CATEGORY_CARDS.map((card) => (
            <ServiceCategorySection
              key={card.category}
              anchorId={categoryAnchorId(card.category)}
              sectionTitle={card.title}
              sectionSubtitle={card.subtitle}
              groups={categoryGroups[card.category]}
              intro={
                card.category === "Cambio de estructura" ? (
                  <div className="space-y-2 rounded-xl border border-[var(--outline)]/10 bg-white px-4 py-3 text-center">
                    <p className="font-heading text-lg font-semibold text-[#1c1b1b]">{CAMBIO_ESTRUCTURA_INTRO}</p>
                    <p className="text-[13px] leading-snug text-[#7f7c7a]">{CAMBIO_ESTRUCTURA_PRICE_NOTICE}</p>
                  </div>
                ) : undefined
              }
            />
          ))}
        </div>
      </main>

      <AppBottomNav active="servicios" />
    </div>
  );
}
