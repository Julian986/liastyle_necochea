"use client";

import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { TreatmentCategory } from "@/lib/treatments/catalog";
import { BookingDateStep } from "@/components/booking/booking-date-step";
import {
  SALON_TREATMENT_CATEGORIES,
  SALON_TREATMENT_OPTIONS,
  buildSalonCalendarItems,
  formatSalonDisplayDate,
  getAvailableTimesForDate,
  salonMonthNames,
  salonWeekdayLabels,
} from "@/lib/booking/salon-availability";
import { isArgentinaPublicHoliday } from "@/lib/booking/argentina-holidays";
import { minPublicBookableDateKey } from "@/lib/booking/public-slot-lead";

export type BookingPickerProps = {
  selectedTreatmentId: string;
  onTreatmentIdChange: (id: string) => void;
  selectedDate: string;
  onDateChange: (dateKey: string) => void;
  selectedTime: string;
  onTimeChange: (time: string) => void;
  /** Si se pasa, define qué horarios mostrar (ej. reserva pública con margen de 60 min en “hoy”). */
  resolveTimeSlots?: (dateKey: string) => string[];
  /**
   * Horarios ya resueltos en servidor (solapes, reglas). Solo aplica al `selectedDate` actual.
   * `undefined`: usar `resolveTimeSlots` / plantilla. `null`: cargando.
   */
  remoteTimeSlots?: string[] | null;
  /** `public`: reglas y textos de reserva web. `panel`: alta manual sin tope de “desde mañana”. */
  bookingContext?: "public" | "panel";
  bookingFocusRef?: React.RefObject<HTMLDivElement | null>;
  treatmentFirstHintVisible: boolean;
  onTreatmentFirstHintVisible: (visible: boolean) => void;
  selectedCountLabel?: string;
  selectedDurationLabel?: string;
  summaryTitle?: string;
  monthAvailabilityServiceIds?: string[];
  multiSelect?: boolean;
  selectedTreatmentIds?: string[];
  onToggleTreatmentId?: (id: string) => void;
  onClearTreatmentIds?: () => void;
  comboHintText?: string;
  comboDurationLabel?: string;
  comboAlertText?: string | null;
  variant?: "dark" | "light";
  /** Oculta el paso 1 interno cuando la categoría se elige en la pantalla principal. */
  hideServiceSelector?: boolean;
  /** Abre el modal de servicios en la categoría indicada (flujo paso 1 externo). */
  openModalCategory?: TreatmentCategory | null;
  onOpenModalCategoryHandled?: () => void;
  /** Llamado al confirmar servicios con el botón Continuar del modal. */
  onConfirmServiceSelection?: () => void;
  /** Paso 2 (fecha): false hasta que el usuario confirma con Continuar. */
  dateStepConfirmed?: boolean;
  onConfirmDateStep?: () => void;
  /** Solo abre el modal de servicios sin mostrar calendario ni pasos. */
  displayMode?: "full" | "modal-only";
};

export function BookingPicker({
  selectedTreatmentId,
  onTreatmentIdChange,
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
  resolveTimeSlots,
  remoteTimeSlots,
  bookingContext = "public",
  bookingFocusRef,
  treatmentFirstHintVisible,
  onTreatmentFirstHintVisible,
  selectedCountLabel,
  selectedDurationLabel,
  summaryTitle,
  monthAvailabilityServiceIds = [],
  multiSelect = false,
  selectedTreatmentIds = [],
  onToggleTreatmentId,
  onClearTreatmentIds,
  comboHintText,
  comboDurationLabel,
  comboAlertText,
  variant = "dark",
  hideServiceSelector = false,
  openModalCategory = null,
  onOpenModalCategoryHandled,
  onConfirmServiceSelection,
  dateStepConfirmed = true,
  onConfirmDateStep,
  displayMode = "full",
}: BookingPickerProps) {
  const isLight = variant === "light";
  const textPrimary = isLight ? "text-[#1c1b1b]" : "text-[var(--soft-gray)]";
  const textMuted = isLight ? "text-[#7f7c7a]" : "text-[var(--soft-gray)]/55";
  const cardBase = isLight
    ? "rounded-2xl border border-[var(--outline)]/10 bg-white shadow-sm"
    : "rounded-2xl border border-white/8 bg-[#171717]";
  const cardActive = isLight
    ? "border-[var(--premium-gold-light)] shadow-[0_0_0_1px_rgba(184,142,47,0.18)]"
    : "border-[var(--premium-gold)] shadow-[0_0_0_1px_rgba(228,202,105,0.22),0_0_22px_rgba(206,120,50,0.18)]";
  const [visibleMonthDate, setVisibleMonthDate] = useState(() => {
    const today = new Date();
    if (bookingContext === "panel") {
      return new Date(today.getFullYear(), today.getMonth(), 1);
    }
    const [y, m] = minPublicBookableDateKey(today).split("-").map(Number);
    return new Date(y, m - 1, 1);
  });
  /** `undefined`: sin servicio o sin datos; `null`: cargando; objeto: hay al menos un hueco ese día para el servicio. */
  const [monthAvailability, setMonthAvailability] = useState<Record<string, boolean> | null | undefined>(undefined);
  const [isTreatmentModalOpen, setIsTreatmentModalOpen] = useState(false);
  const [activeTreatmentCategory, setActiveTreatmentCategory] = useState<TreatmentCategory | null>(null);

  const selectedTreatment = useMemo(
    () => SALON_TREATMENT_OPTIONS.find((option) => option.id === selectedTreatmentId),
    [selectedTreatmentId],
  );
  const visibleTreatments = useMemo(
    () =>
      activeTreatmentCategory
        ? SALON_TREATMENT_OPTIONS.filter((option) => option.category === activeTreatmentCategory)
        : [],
    [activeTreatmentCategory],
  );
  const calendarItems = useMemo(
    () => buildSalonCalendarItems(visibleMonthDate.getFullYear(), visibleMonthDate.getMonth()),
    [visibleMonthDate],
  );
  const visibleMonthLabel = `${salonMonthNames[visibleMonthDate.getMonth()]} ${visibleMonthDate.getFullYear()}`;

  useEffect(() => {
    if (displayMode === "modal-only") {
      return;
    }
    if (!selectedTreatmentId.trim() && monthAvailabilityServiceIds.length === 0) {
      setMonthAvailability(undefined);
      return;
    }
    let cancelled = false;
    const ac = new AbortController();
    setMonthAvailability(null);
    const y = visibleMonthDate.getFullYear();
    const m = visibleMonthDate.getMonth();
    const q = new URLSearchParams({
      year: String(y),
      monthIndex: String(m),
      treatmentId: selectedTreatmentId,
      scope: bookingContext === "panel" ? "panel" : "public",
    });
    if (monthAvailabilityServiceIds.length > 0) {
      q.set("serviceIds", monthAvailabilityServiceIds.join(","));
    }
    fetch(`/api/booking/month-availability?${q.toString()}`, {
      credentials: "same-origin",
      signal: ac.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<{ availability?: Record<string, boolean> }>;
      })
      .then((data) => {
        if (cancelled) return;
        const raw = data.availability;
        setMonthAvailability(typeof raw === "object" && raw !== null ? raw : undefined);
      })
      .catch(() => {
        if (!cancelled) setMonthAvailability(undefined);
      });
    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [selectedTreatmentId, visibleMonthDate, bookingContext, monthAvailabilityServiceIds, displayMode]);

  useEffect(() => {
    if (!selectedDate || !selectedTreatmentId.trim()) return;
    if (monthAvailability === undefined || monthAvailability === null) return;
    if (monthAvailability[selectedDate] === false) {
      onDateChange("");
      onTimeChange("");
    }
  }, [monthAvailability, onDateChange, onTimeChange, selectedDate, selectedTreatmentId]);

  const useRemoteSlots = remoteTimeSlots !== undefined;
  const slotsLoading = useRemoteSlots && selectedDate && remoteTimeSlots === null;
  const availableTimes = selectedDate
    ? useRemoteSlots
      ? remoteTimeSlots === null
        ? []
        : remoteTimeSlots
      : resolveTimeSlots
        ? resolveTimeSlots(selectedDate)
        : getAvailableTimesForDate(selectedDate)
    : [];
  const isSelectedDateHoliday = Boolean(selectedDate && isArgentinaPublicHoliday(selectedDate));

  const activeStep = !selectedTreatment
    ? 1
    : !selectedDate
      ? 2
      : !selectedTime
        ? 3
        : 4;

  const openTreatmentModal = () => {
    setActiveTreatmentCategory(selectedTreatment?.category ?? null);
    setIsTreatmentModalOpen(true);
  };

  useEffect(() => {
    if (!openModalCategory) return;
    setActiveTreatmentCategory(openModalCategory);
    setIsTreatmentModalOpen(true);
  }, [openModalCategory]);

  const closeTreatmentModal = (confirmed = false) => {
    setIsTreatmentModalOpen(false);
    setActiveTreatmentCategory(null);
    if (confirmed && selectedTreatmentIds.length > 0) {
      onConfirmServiceSelection?.();
    }
    onOpenModalCategoryHandled?.();
  };

  const selectTreatment = (treatmentId: string) => {
    onTreatmentIdChange(treatmentId);
    if (multiSelect && onToggleTreatmentId) {
      onToggleTreatmentId(treatmentId);
      return;
    }
    closeTreatmentModal();
  };

  return (
    <>
      {displayMode === "full" ? (
        isLight && hideServiceSelector ? (
          !dateStepConfirmed ? (
            <BookingDateStep
              selectedDate={selectedDate}
              onDateChange={onDateChange}
              onTimeChange={onTimeChange}
              visibleMonthLabel={visibleMonthLabel}
              onPrevMonth={() =>
                setVisibleMonthDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
              }
              onNextMonth={() =>
                setVisibleMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
              }
              calendarItems={calendarItems}
              monthAvailability={monthAvailability}
              hasSelectedTreatment={Boolean(selectedTreatment)}
              monthAvailabilityLoading={Boolean(selectedTreatmentId && monthAvailability === null)}
              selectedCountLabel={selectedCountLabel}
              treatmentFirstHintVisible={treatmentFirstHintVisible}
              onTreatmentFirstHintVisible={onTreatmentFirstHintVisible}
              onConfirm={() => onConfirmDateStep?.()}
            />
          ) : (
            <div ref={bookingFocusRef} className="mt-2">
              <section>
                <div className="mb-4 text-center">
                  <h2 className="font-heading text-[28px] leading-9 font-semibold text-[#1c1b1b]">Elegí tu horario</h2>
                  <p className="mt-1 text-sm text-[#7f7c7a]">
                    {selectedDate ? formatSalonDisplayDate(selectedDate) : "Seleccioná un horario"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {slotsLoading ? (
                    <div className="col-span-2 rounded-2xl border border-[var(--outline)]/10 bg-white px-4 py-5 text-center text-[13px] text-[#7f7c7a]">
                      Cargando horarios…
                    </div>
                  ) : availableTimes.length > 0 ? (
                    availableTimes.map((time) => {
                      const isActive = time === selectedTime;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => onTimeChange(time)}
                          className={`h-12 cursor-pointer rounded-xl border text-[16px] font-medium transition-colors ${
                            isActive
                              ? "border-[var(--premium-gold-light)] bg-[var(--premium-gold-light)] text-white shadow-[0_4px_14px_rgba(184,142,47,0.35)]"
                              : "border-[var(--outline)]/15 bg-white text-[#1c1b1b] hover:border-[var(--premium-gold-light)]/40"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })
                  ) : (
                    <div
                      className={`col-span-2 rounded-2xl border px-4 py-5 text-center ${
                        selectedDate
                          ? "border-amber-500/35 bg-amber-50 text-amber-900"
                          : "border-[var(--premium-gold-light)]/35 bg-[var(--premium-gold)]/10 text-[#1c1b1b]"
                      }`}
                    >
                      {selectedDate ? (
                        <>
                          <p className="text-[13px] font-medium text-amber-900">
                            {isSelectedDateHoliday
                              ? "Feriado (cerrado): no hay horarios disponibles para este dia."
                              : "No hay horarios disponibles para este dia."}
                          </p>
                          <p className="mt-1 text-[12px] text-amber-800/80">
                            {isSelectedDateHoliday
                              ? "Elegi otra fecha habilitada para ver turnos disponibles."
                              : "Proba con otra fecha para ver turnos disponibles."}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-[13px] font-medium text-[var(--premium-gold-light)]">
                            Los turnos web se reservan a partir de mañana (no el mismo día).
                          </p>
                          <p className="mt-1 text-[12px] text-[#7f7c7a]">
                            Elegí una fecha desde mañana para ver horarios.
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </section>
            </div>
          )
        ) : (
        <>
      <section className="space-y-2">
        {!hideServiceSelector ? (
          <button
            type="button"
            onClick={openTreatmentModal}
            className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left transition-all ${cardBase} ${
              activeStep === 1 ? cardActive : ""
            }`}
          >
            <div>
              <p className={`text-[11px] tracking-[0.14em] ${textMuted}`}>Paso 1</p>
              <p className={`mt-1 text-[14px] ${textPrimary}`}>
                {summaryTitle ?? (selectedTreatment ? selectedTreatment.name : "Elegí servicio")}
              </p>
              {selectedCountLabel ? (
                <p className={`mt-1 text-[11px] ${textMuted}`}>{selectedCountLabel}</p>
              ) : selectedTreatment ? (
                <p className={`mt-1 text-[11px] ${textMuted}`}>
                  {selectedTreatment.category} · {selectedTreatment.subtitle}
                </p>
              ) : null}
              {selectedDurationLabel ? (
                <div className="mt-2 inline-flex items-center rounded-full border border-[var(--premium-gold)]/55 bg-[var(--premium-gold)]/12 px-2.5 py-1">
                  <span className="text-[11px] font-semibold tracking-[0.02em] text-[var(--premium-gold-light)]">
                    {selectedDurationLabel}
                  </span>
                </div>
              ) : null}
              {activeStep === 1 && (
                <div className="mt-2 flex items-center gap-2 text-[11px] text-[var(--premium-gold-light)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--premium-gold-light)]" />
                  <span>Comenzá seleccionando el servicio</span>
                </div>
              )}
            </div>
            <ChevronRight className={`h-4 w-4 ${textMuted}`} strokeWidth={1.8} />
          </button>
        ) : selectedTreatment ? (
          <button
            type="button"
            onClick={openTreatmentModal}
            className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left transition-all ${cardBase}`}
          >
            <div>
              <p className={`text-[11px] tracking-[0.14em] ${textMuted}`}>Servicios</p>
              <p className={`mt-1 text-[14px] font-medium ${textPrimary}`}>
                {summaryTitle ?? selectedTreatment.name}
              </p>
              {selectedCountLabel ? (
                <p className={`mt-1 text-[11px] ${textMuted}`}>{selectedCountLabel}</p>
              ) : null}
              {selectedDurationLabel ? (
                <p className={`mt-1 text-[11px] font-semibold text-[var(--premium-gold-light)]`}>
                  {selectedDurationLabel}
                </p>
              ) : null}
            </div>
            <ChevronRight className={`h-4 w-4 ${textMuted}`} strokeWidth={1.8} />
          </button>
        ) : null}

        <div
          className={`flex items-center justify-between px-4 py-3 transition-all ${cardBase} ${
            activeStep === 2 ? cardActive : ""
          }`}
        >
          <div>
            <p className={`text-[11px] tracking-[0.14em] ${textMuted}`}>Paso 2</p>
            <p className={`mt-1 text-[14px] ${textPrimary}`}>
              {selectedDate ? formatSalonDisplayDate(selectedDate) : "Elegí día"}
            </p>
            {activeStep === 2 && (
              <div className="mt-2 flex items-center gap-2 text-[11px] text-[var(--premium-gold-light)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--premium-gold-light)]" />
                <span>Ahora elegí una fecha disponible</span>
              </div>
            )}
          </div>
          <ChevronRight className={`h-4 w-4 rotate-90 ${textMuted}`} strokeWidth={1.8} />
        </div>
      </section>

      <section
        className={`mt-4 overflow-hidden rounded-[24px] border p-3 shadow-sm ${
          isLight
            ? "border-[var(--outline)]/10 bg-white text-[#1c1b1b]"
            : "border-white/8 bg-[#e4c48f] text-[#2c241b] shadow-[0_12px_26px_rgba(0,0,0,0.36)]"
        }`}
      >
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              setVisibleMonthDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
            }
            className={`cursor-pointer rounded-lg p-1 hover:bg-black/10 ${isLight ? "text-[#7f6a45]" : "text-[#7f6a45]"}`}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <h2 className="flex items-center gap-2 text-[18px] leading-none font-heading">
            {visibleMonthLabel}
            {selectedTreatmentId && monthAvailability === null ? (
              <span
                className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#7f6a45]/90"
                aria-hidden
              />
            ) : null}
          </h2>
          <button
            type="button"
            onClick={() =>
              setVisibleMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
            }
            className={`cursor-pointer rounded-lg p-1 hover:bg-black/10 ${isLight ? "text-[#7f6a45]" : "text-[#7f6a45]"}`}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        {treatmentFirstHintVisible ? (
          <p
            role="status"
            aria-live="polite"
            className="mb-2 rounded-xl border border-[#8a7548]/55 bg-[#fff9ec]/97 px-3 py-2.5 text-center text-[12px] leading-snug text-[#2c241b] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
          >
            <span className="font-semibold">Primero elegí un servicio</span>
            <span className="text-[#3b3224]"> (paso 1) para poder elegir el día.</span>
          </p>
        ) : null}

        <div
          className="grid grid-cols-7 gap-y-2 text-center"
          aria-busy={Boolean(selectedTreatmentId && monthAvailability === null)}
        >
          {salonWeekdayLabels.map((label) => (
            <div key={label} className="text-[10px] tracking-[0.08em] text-[#7f7364]">
              {label}
            </div>
          ))}
          {calendarItems.map((day) => {
            const isSelected = day.value === selectedDate;
            const monthAvailReady = monthAvailability !== undefined && monthAvailability !== null;
            const fullyBooked =
              Boolean(selectedTreatmentId) &&
              monthAvailReady &&
              day.isCurrentMonth &&
              day.isAvailable &&
              monthAvailability[day.value] === false;
            const isDisabled = !day.isCurrentMonth || !day.isAvailable || fullyBooked;

            return (
              <button
                key={day.value}
                type="button"
                disabled={isDisabled}
                title={
                  fullyBooked
                    ? "Sin cupos para este servicio (ocupado o bloqueado)."
                    : !day.isAvailable && day.isCurrentMonth
                      ? "Día no disponible (cerrado o feriado)."
                      : undefined
                }
                aria-label={
                  fullyBooked
                    ? `${day.dayNumber}, sin cupos`
                    : !day.isAvailable && day.isCurrentMonth
                      ? `${day.dayNumber}, no disponible`
                      : undefined
                }
                onClick={() => {
                  if (!selectedTreatment) {
                    onTreatmentFirstHintVisible(true);
                    return;
                  }
                  onDateChange(day.value);
                  onTimeChange("");
                  requestAnimationFrame(() => {
                    bookingFocusRef?.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  });
                }}
                className={`mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[12px] transition-colors disabled:cursor-not-allowed ${
                  isSelected
                    ? isLight
                      ? "bg-[#1c1b1b] text-[var(--premium-gold-light)] shadow-[0_6px_14px_rgba(0,0,0,0.15)]"
                      : "bg-[#1a1a1a] text-[#c89b56] shadow-[0_6px_14px_rgba(0,0,0,0.25)]"
                    : fullyBooked
                      ? isLight
                        ? "bg-[#ece7df] text-[#5c4f3d] line-through decoration-[#6b5a45]"
                        : "bg-[#c9b89a]/55 text-[#5c4f3d] line-through decoration-[#6b5a45]"
                      : !day.isCurrentMonth
                        ? isLight
                          ? "text-[#cfbea8]/45"
                          : "text-[#cfbea8]/45"
                        : day.isAvailable
                          ? isLight
                            ? "bg-[#f3ead8] text-[#3b2f22]"
                            : "bg-[#eed7ae] text-[#3b2f22]"
                          : isLight
                            ? "text-[#897a67]"
                            : "text-[#897a67]"
                }`}
              >
                {day.dayNumber}
              </button>
            );
          })}
        </div>
      </section>

      <div ref={bookingFocusRef} className="mt-4">
        <section>
          <div
            className={`flex items-center justify-between px-4 py-3 transition-all ${cardBase} ${
              activeStep === 3 ? cardActive : ""
            }`}
          >
            <div>
              <p className={`text-[11px] tracking-[0.14em] ${textMuted}`}>Paso 3</p>
              <p className={`mt-1 text-[14px] ${textPrimary}`}>
                {selectedTime ? `Horario elegido: ${selectedTime}` : "Elegí horario"}
              </p>
              {activeStep === 3 && (
                <div className="mt-2 flex items-center gap-2 text-[11px] text-[var(--premium-gold-light)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--premium-gold-light)]" />
                  <span>Seleccioná un horario para continuar</span>
                </div>
              )}
            </div>
            <ChevronRight className={`h-4 w-4 ${textMuted}`} strokeWidth={1.8} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {slotsLoading ? (
              <div
                className={`col-span-2 rounded-2xl border px-4 py-5 text-center text-[13px] ${
                  isLight
                    ? "border-[var(--outline)]/10 bg-white text-[#7f7c7a]"
                    : "border-white/8 bg-[#171717] text-[var(--soft-gray)]/68"
                }`}
              >
                Cargando horarios…
              </div>
            ) : availableTimes.length > 0 ? (
              availableTimes.map((time) => {
                const isActive = time === selectedTime;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => onTimeChange(time)}
                    className={`h-11 cursor-pointer rounded-xl border text-[16px] transition-colors ${
                      isActive
                        ? "border-[var(--premium-gold-light)] bg-[var(--premium-gold)]/15 text-[var(--premium-gold-light)]"
                        : isLight
                          ? "border-[var(--outline)]/15 bg-white text-[#1c1b1b]"
                          : "border-white/8 bg-[#151515] text-[var(--soft-gray)]"
                    }`}
                  >
                    {time}
                  </button>
                );
              })
            ) : (
              <div
                className={`col-span-2 rounded-2xl border px-4 py-5 text-center ${
                  selectedDate
                    ? "border-amber-500/35 bg-amber-50 text-amber-900"
                    : isLight
                      ? "border-[var(--premium-gold-light)]/35 bg-[var(--premium-gold)]/10 text-[#1c1b1b]"
                      : bookingContext === "panel"
                        ? "border-white/8 bg-[#171717]"
                        : "border-[var(--premium-gold)]/35 bg-[rgba(206,120,50,0.14)]"
                }`}
              >
                {selectedDate ? (
                  <>
                    <p className={`text-[13px] font-medium ${isLight ? "text-amber-900" : "text-amber-100/95"}`}>
                      {isSelectedDateHoliday
                        ? "Feriado (cerrado): no hay horarios disponibles para este dia."
                        : "No hay horarios disponibles para este dia."}
                    </p>
                    <p className={`mt-1 text-[12px] ${isLight ? "text-amber-800/80" : "text-amber-100/75"}`}>
                      {isSelectedDateHoliday
                        ? "Elegi otra fecha habilitada para ver turnos disponibles."
                        : "Proba con otra fecha para ver turnos disponibles."}
                    </p>
                  </>
                ) : bookingContext === "panel" ? (
                  <p className={`text-[13px] ${isLight ? "text-[#7f7c7a]" : "text-[var(--soft-gray)]/72"}`}>
                    Elegí una fecha para ver los horarios disponibles.
                  </p>
                ) : (
                  <>
                    <p className={`text-[13px] font-medium ${isLight ? "text-[var(--premium-gold-light)]" : "text-[var(--premium-gold)]"}`}>
                      Los turnos web se reservan a partir de mañana (no el mismo día).
                    </p>
                    <p className={`mt-1 text-[12px] ${isLight ? "text-[#7f7c7a]" : "text-[var(--soft-gray)]/88"}`}>
                      Elegí una fecha desde mañana para ver horarios.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
        </>
        )
      ) : null}

      {isTreatmentModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-end bg-black/60 backdrop-blur-[3px]">
          <button
            type="button"
            aria-label="Cerrar selector de servicio"
            onClick={() => closeTreatmentModal(false)}
            className="absolute inset-0 cursor-pointer bg-transparent"
          />

          <div
            className={`relative flex max-h-[min(88dvh,100dvh)] w-full flex-col rounded-t-[32px] border-t shadow-[0_-18px_40px_rgba(0,0,0,0.12)] ${
              isLight ? "border-[var(--outline)]/10 bg-[#f8f6f2]" : "border-white/8 bg-[#161616] shadow-[0_-18px_40px_rgba(0,0,0,0.45)]"
            }`}
          >
            <div className="shrink-0 px-4 pt-3">
              <div className={`mx-auto mb-4 h-1.5 w-14 rounded-full ${isLight ? "bg-[#1c1b1b]/10" : "bg-white/12"}`} />

              <div className="mb-4 flex items-center justify-between">
                {activeTreatmentCategory ? (
                  <button
                    type="button"
                    onClick={() => setActiveTreatmentCategory(null)}
                    className={`cursor-pointer rounded-lg p-1 hover:bg-black/5 ${isLight ? "text-[#1c1b1b]/75" : "text-[var(--soft-gray)]/75"}`}
                    aria-label="Volver a categorías"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
                  </button>
                ) : (
                  <span className="h-5 w-5" />
                )}

                <h2 className={`text-[26px] leading-none font-heading ${isLight ? "text-[#1c1b1b]" : "text-[var(--soft-gray)]"}`}>
                  {activeTreatmentCategory ?? "Elegí servicio"}
                </h2>

                <button
                  type="button"
                  onClick={() => closeTreatmentModal(false)}
                  className={`cursor-pointer rounded-lg px-2 py-1 text-[13px] hover:bg-black/5 ${isLight ? "text-[#1c1b1b]/75" : "text-[var(--soft-gray)]/75"}`}
                >
                  Cerrar
                </button>
              </div>

              {multiSelect ? (
                <div
                  className={`mb-3 rounded-xl border px-3 py-2 ${
                    isLight ? "border-[var(--outline)]/10 bg-white" : "border-white/10 bg-[#1b1b1b]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className={`min-w-0 flex-1 text-[12px] leading-snug ${isLight ? "text-[#7f7c7a]" : "text-[var(--soft-gray)]/82"}`}>
                      <span className="font-medium text-[var(--premium-gold-light)]">
                        {selectedTreatmentIds.length}
                      </span>{" "}
                      seleccionados
                      {comboDurationLabel ? (
                        <span className={isLight ? "text-[#7f7c7a]" : "text-[var(--soft-gray)]/58"}>
                          {" "}
                          ·{" "}
                          <span className="text-[13px] font-semibold text-[var(--premium-gold-light)]">
                            {comboDurationLabel}
                          </span>
                        </span>
                      ) : null}
                      {summaryTitle ? (
                        <span className={isLight ? "text-[#7f7c7a]" : "text-[var(--soft-gray)]/58"}>
                          {" "}
                          · {summaryTitle}
                        </span>
                      ) : null}
                    </p>
                    {selectedTreatmentIds.length > 0 && onClearTreatmentIds ? (
                      <button
                        type="button"
                        onClick={onClearTreatmentIds}
                        aria-label="Quitar todos los servicios seleccionados"
                        className="shrink-0 cursor-pointer rounded-lg border border-red-400/35 bg-red-50 p-1.5 text-red-500 transition hover:bg-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {multiSelect && comboAlertText ? (
                <div className="mb-2 rounded-xl border border-amber-500/45 bg-amber-50 px-3 py-3 text-center text-[14px] text-amber-900">
                  {comboAlertText}
                </div>
              ) : null}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-2">
              {activeTreatmentCategory ? (
                <div className="space-y-2">
                  {visibleTreatments.map((treatment) => {
                    const isSelected = multiSelect
                      ? selectedTreatmentIds.includes(treatment.id)
                      : treatment.id === selectedTreatmentId;

                    return (
                      <button
                        key={treatment.id}
                        type="button"
                        onClick={() => selectTreatment(treatment.id)}
                        className={`w-full cursor-pointer rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                          isSelected
                            ? "border-[var(--premium-gold-light)] bg-[var(--premium-gold)]/10"
                            : isLight
                              ? "border-[var(--outline)]/10 bg-white"
                              : "border-white/8 bg-[#1c1c1c]"
                        }`}
                      >
                        <p
                          className={`text-[18px] leading-snug font-semibold tracking-tight ${
                            isLight ? "text-[#1c1b1b]" : "text-[var(--soft-gray)]"
                          }`}
                        >
                          {treatment.name}
                        </p>
                        <p className={`mt-1.5 text-[15px] font-medium ${isLight ? "text-[#5f5c5a]" : "text-[var(--soft-gray)]/65"}`}>
                          {treatment.subtitle}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {SALON_TREATMENT_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveTreatmentCategory(category)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border px-4 py-4 text-left ${
                        isLight
                          ? "border-[var(--outline)]/10 bg-white hover:bg-[#faf8f4]"
                          : "border-white/8 bg-[#1c1c1c] hover:bg-[#222]"
                      }`}
                    >
                      <div>
                        <p className={`text-[20px] leading-none font-heading ${isLight ? "text-[#1c1b1b]" : "text-[var(--soft-gray)]"}`}>
                          {category}
                        </p>
                        <p className={`mt-1 text-[12px] ${isLight ? "text-[#7f7c7a]" : "text-[var(--soft-gray)]/58"}`}>
                          {SALON_TREATMENT_OPTIONS.filter((option) => option.category === category).length} servicios
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[var(--soft-gray)]/55" strokeWidth={1.8} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {multiSelect ? (
              <div
                className={`shrink-0 border-t px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] ${
                  isLight ? "border-[var(--outline)]/10 bg-[#f8f6f2]" : "border-white/8 bg-[#161616]"
                }`}
              >
                <button
                  type="button"
                  disabled={selectedTreatmentIds.length === 0}
                  onClick={() => closeTreatmentModal(true)}
                  className="w-full rounded-full bg-[var(--premium-gold-light)] py-[15px] text-[15px] font-semibold tracking-widest text-white uppercase shadow-lg shadow-[var(--premium-gold-light)]/25 transition-all active:scale-95 disabled:cursor-not-allowed disabled:bg-[#d8d4cc] disabled:text-[#9797a0] disabled:shadow-none"
                >
                  Continuar ({selectedTreatmentIds.length})
                </button>
                {selectedTreatmentIds.length > 0 ? (
                  <p className="mt-1.5 text-center text-[11px] text-[#7f7c7a]">
                    Cuando termines de elegir, tocá Continuar.
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="shrink-0 pb-[env(safe-area-inset-bottom,0px)]" aria-hidden />
            )}
          </div>
        </div>
      )}
    </>
  );
}
