"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AppBottomNav } from "@/components/app-bottom-nav";
import { ServiceCategorySection, type ServiceDisplayGroup } from "@/components/servicios/service-category-section";
import { ServicesCategoryGrid } from "@/components/servicios/services-category-grid";
import { ServicesStickyNav } from "@/components/servicios/services-sticky-nav";
import { BOOKING_CATEGORY_CARDS } from "@/lib/booking/category-cards";
import { COLOR_BOOKING_SECTIONS } from "@/lib/booking/color-booking-sections";
import {
  MASCARA_BOOKING_LABELS,
  TRATAMIENTOS_BOOKING_SECTIONS,
} from "@/lib/booking/tratamientos-booking-sections";
import {
  CAMBIO_ESTRUCTURA_DISPLAY_GROUPS,
} from "@/lib/treatments/cambio-estructura-display-sections";
import { CORTES_PEINADO_DISPLAY_SECTIONS } from "@/lib/treatments/cortes-peinado-sections";
import { SALON_TREATMENTS, type SalonTreatment, type TreatmentCategory } from "@/lib/treatments/catalog";
import { categoryAnchorId } from "@/lib/treatments/service-page-config";
import {
  SERVICE_PAGE_CATEGORY_COPY,
  SERVICE_PAGE_INTRO_LINES,
  SERVICE_PAGE_VIP_HIGHLIGHT,
} from "@/lib/treatments/service-page-copy";

const GROUP_TITLE_CLASS =
  "mb-1 text-[11px] font-semibold tracking-[0.14em] text-[var(--premium-gold-light)] uppercase";

function buildGroupsForCategory(
  category: TreatmentCategory,
  servicesById: Map<string, SalonTreatment>,
): ServiceDisplayGroup[] {
  const copy = SERVICE_PAGE_CATEGORY_COPY[category];

  if (category === "Cortes y peinado") {
    return CORTES_PEINADO_DISPLAY_SECTIONS.map((section) => ({
      id: section.id,
      title: section.title,
      titleClassName: GROUP_TITLE_CLASS,
      note: copy.groupNotes?.[section.id],
      services: section.treatmentIds.flatMap((id) => {
        const service = servicesById.get(id);
        return service ? [service] : [];
      }),
    })).filter((group) => group.services.length > 0);
  }

  if (category === "Color") {
    return COLOR_BOOKING_SECTIONS.flatMap((section) => {
      if (section.subsections) {
        return section.subsections.map((subsection, index) => ({
          id: `${section.id}-${subsection.title}`,
          title: subsection.title,
          titleClassName: GROUP_TITLE_CLASS,
          // El texto educativo de color técnico va una sola vez, al primer subgrupo.
          note: index === 0 ? copy.groupNotes?.[section.id] : undefined,
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
          titleClassName: section.title ? GROUP_TITLE_CLASS : undefined,
          note: copy.groupNotes?.[section.id],
          services,
        },
      ];
    }).filter((group) => group.services.length > 0);
  }

  if (category === "Tratamientos") {
    return TRATAMIENTOS_BOOKING_SECTIONS.flatMap((section) => {
      const services = (section.treatmentIds ?? []).flatMap((id) => {
        const service = servicesById.get(id);
        if (!service) return [];
        const shortName = MASCARA_BOOKING_LABELS[id];
        return shortName ? [{ ...service, name: shortName }] : [service];
      });

      if (services.length === 0) return [];

      const title =
        section.id === "terapias" ? "Tratamiento" : section.title || undefined;

      return [
        {
          id: section.id,
          title,
          titleClassName: title ? GROUP_TITLE_CLASS : undefined,
          note: copy.groupNotes?.[section.id],
          services,
        },
      ];
    }).filter((group) => group.services.length > 0);
  }

  if (category === "Cambio de estructura") {
    return CAMBIO_ESTRUCTURA_DISPLAY_GROUPS.map((group) => ({
      id: group.id,
      title: group.title,
      titleClassName: GROUP_TITLE_CLASS,
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

  const categoryPickerRef = useRef<HTMLDivElement | null>(null);
  const [stickyNavVisible, setStickyNavVisible] = useState(false);
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
    const picker = categoryPickerRef.current;
    if (!picker) return;

    // Solo mostrar la barra fija cuando la grilla de categorías ya salió de pantalla.
    const observer = new IntersectionObserver(
      ([entry]) => setStickyNavVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px 0px 0px" },
    );
    observer.observe(picker);
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
          <div className="mx-auto mt-3 max-w-sm space-y-2 text-[15px] leading-relaxed text-[#7f7c7a]">
            {SERVICE_PAGE_INTRO_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </header>

        <section className="mb-10 rounded-2xl border border-[var(--premium-gold-light)]/30 bg-[var(--premium-gold-light)]/8 px-4 py-4 text-center">
          <p className="text-[12px] font-bold tracking-[0.16em] text-[var(--premium-gold-light)] uppercase">
            Destacados
          </p>
          <p className="mt-2.5 text-[17px] leading-relaxed font-medium text-[#1c1b1b]">
            {SERVICE_PAGE_VIP_HIGHLIGHT}
          </p>
        </section>

        <div ref={categoryPickerRef} className="mb-10">
          <p className="mb-3 text-center text-[11px] font-semibold tracking-[0.12em] text-[var(--premium-gold-light)] uppercase">
            Elegí un área
          </p>
          <ServicesCategoryGrid activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />
        </div>

        <div className="space-y-2">
          {BOOKING_CATEGORY_CARDS.map((card) => {
            const copy = SERVICE_PAGE_CATEGORY_COPY[card.category];
            return (
              <ServiceCategorySection
                key={card.category}
                anchorId={categoryAnchorId(card.category)}
                sectionTitle={card.title}
                groups={categoryGroups[card.category]}
                intro={
                  copy.intro ? (
                    <div className="rounded-xl border border-[var(--outline)]/10 bg-white px-4 py-3">
                      <p className="text-[15px] leading-relaxed text-[#5f5c5a]">{copy.intro}</p>
                    </div>
                  ) : undefined
                }
              />
            );
          })}
        </div>
      </main>

      <AppBottomNav active="servicios" />
    </div>
  );
}
