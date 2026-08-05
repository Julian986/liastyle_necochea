"use client";

import { CalendarDays, Check, Clock3, TriangleAlert, User } from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { AppBottomNav } from "@/components/app-bottom-nav";
import { BrandLogo } from "@/components/brand-logo";
import { ConfirmadoIrPerfilButton } from "@/components/confirmado-ir-perfil-button";
import { DepositCancelPolicyNotice } from "@/components/deposit-cancel-policy-notice";

import styles from "./page.module.css";

type Snapshot = {
  treatment?: string;
  subtitle?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  id?: string;
};

function PagoRetornoContent() {
  const searchParams = useSearchParams();
  const estado = searchParams.get("estado") ?? "";
  const [snap, setSnap] = useState<Snapshot | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("mp_turno_snapshot");
      if (raw) setSnap(JSON.parse(raw) as Snapshot);
    } catch {
      setSnap(null);
    }
  }, []);

  const isSuccess = estado === "success";
  const isFailure = estado === "failure";
  const isPending = estado === "pending";
  const celebrate = isSuccess;

  const phone = snap?.phone?.trim() ?? "";
  const firstName = snap?.name?.trim().split(/\s+/)[0] ?? "";

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f8f6f2] text-[#1c1b1b]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className={`absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--premium-gold)]/28 blur-3xl ${
            celebrate ? styles.aura : ""
          }`}
        />
        <div className="absolute top-36 -left-20 h-60 w-60 rounded-full bg-[#c8d9e8]/40 blur-3xl" />
        <div className="absolute top-48 -right-24 h-72 w-72 rounded-full bg-[var(--premium-gold-light)]/18 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-md flex-1 px-6 pt-6 pb-52">
        {celebrate ? (
          <>
            <header className="mb-7 flex flex-col items-center text-center">
              <BrandLogo size="compact" className="mb-6 opacity-90" />

              <div className={`${styles.pop} ${styles.badgeWrap} mb-6`}>
                <div className={styles.badgePulse} />
                <div className={styles.badgeRing} />
                <div className={styles.badgeCore}>
                  <span className={styles.badgeSheen} aria-hidden />
                  <Check className={styles.badgeCheck} strokeWidth={2.8} />
                </div>
              </div>

              <p
                className={`${styles.rise} text-[11px] font-bold tracking-[0.28em] text-[var(--premium-gold-light)] uppercase`}
              >
                Confirmado
              </p>
              <h1
                className={`${styles.riseDelay} mt-2.5 font-heading text-[34px] leading-[1.08] font-semibold tracking-tight text-[#1c1b1b]`}
              >
                ¡Reserva de turno
                <br />
                confirmada!
              </h1>
              <p
                className={`${styles.riseDelay2} mt-3.5 max-w-[20rem] text-[15px] leading-relaxed text-[#5c5856]`}
              >
                {firstName ? (
                  <>
                    Perfecto, <span className="font-semibold text-[#1c1b1b]">{firstName}</span>.{" "}
                  </>
                ) : null}
                Tu lugar ya quedó reservado. Te esperamos en el salón.
              </p>
              <p className={`${styles.riseDelay2} mt-2 text-[13px] tracking-wide text-[#8a8684]`}>
                Te avisamos por WhatsApp antes de tu cita.
              </p>
              <DepositCancelPolicyNotice className={`${styles.riseDelay2} mt-3 max-w-sm text-left`} />
            </header>

            {snap?.treatment ? (
              <section className={`${styles.riseDelay3} ${styles.cardShell}`}>
                <div className={styles.cardInner}>
                  <div className="border-b border-[var(--premium-gold-light)]/10 px-5 py-3.5">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--premium-gold-light)] uppercase">
                      Tu turno
                    </p>
                  </div>
                  <div className="px-5 pt-4 pb-5">
                    <h2 className="font-heading text-[24px] leading-tight font-semibold text-[#1c1b1b]">
                      {snap.treatment}
                    </h2>
                    {snap.subtitle ? (
                      <p className="mt-1 text-[12px] text-[#7f7c7a]">{snap.subtitle}</p>
                    ) : null}

                    {(snap.date || snap.time) && (
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {snap.date ? (
                          <div className={`${styles.tile} px-3.5 py-3.5`}>
                            <div className="relative z-[1] flex items-center gap-2">
                              <CalendarDays
                                className="h-4 w-4 shrink-0 text-[var(--premium-gold-light)]"
                                strokeWidth={2}
                              />
                              <p className="text-[10px] font-bold tracking-[0.12em] text-[#7f7c7a] uppercase">
                                Fecha
                              </p>
                            </div>
                            <p className="relative z-[1] mt-2 text-[15px] font-semibold leading-snug text-[#1c1b1b]">
                              {snap.date}
                            </p>
                          </div>
                        ) : null}
                        {snap.time ? (
                          <div className={`${styles.tile} px-3.5 py-3.5`}>
                            <div className="relative z-[1] flex items-center gap-2">
                              <Clock3
                                className="h-4 w-4 shrink-0 text-[var(--premium-gold-light)]"
                                strokeWidth={2}
                              />
                              <p className="text-[10px] font-bold tracking-[0.12em] text-[#7f7c7a] uppercase">
                                Horario
                              </p>
                            </div>
                            <p className="relative z-[1] mt-2 text-[15px] font-semibold text-[#1c1b1b]">
                              {snap.time} hs
                            </p>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {(snap.name || snap.phone) && (
                      <div className={`${styles.tile} mt-3 flex items-start gap-3 px-3.5 py-3.5`}>
                        <User
                          className="relative z-[1] mt-0.5 h-4 w-4 shrink-0 text-[var(--premium-gold-light)]"
                          strokeWidth={2}
                        />
                        <div className="relative z-[1]">
                          <p className="text-[10px] font-bold tracking-[0.12em] text-[#7f7c7a] uppercase">
                            A nombre de
                          </p>
                          {snap.name ? (
                            <p className="mt-1 text-[15px] font-semibold text-[#1c1b1b]">{snap.name}</p>
                          ) : null}
                          {snap.phone ? (
                            <p className="mt-0.5 text-[12px] text-[#7f7c7a]">WhatsApp: {snap.phone}</p>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ) : null}
          </>
        ) : (
          <>
            <header className="mb-6 flex flex-col items-center text-center">
              <BrandLogo size="compact" className="mb-4" />
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ring-1 ${
                  isFailure
                    ? "bg-red-50 ring-red-200/80"
                    : isPending
                      ? "bg-amber-50 ring-amber-200/80"
                      : "bg-[var(--premium-gold)]/15 ring-[var(--premium-gold-light)]/40"
                }`}
              >
                {isFailure || isPending ? (
                  <TriangleAlert
                    className={`h-8 w-8 ${isFailure ? "text-red-600" : "text-amber-600"}`}
                    strokeWidth={1.8}
                  />
                ) : (
                  <Check className="h-8 w-8 text-[var(--premium-gold-light)]" strokeWidth={2.2} />
                )}
              </div>
              <h1 className="mt-4 font-heading text-[28px] leading-tight font-semibold text-[#1c1b1b]">
                {isFailure
                  ? "Pago no completado"
                  : isPending
                    ? "Pago pendiente"
                    : "Volviste de Mercado Pago"}
              </h1>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#7f7c7a]">
                {isFailure
                  ? "No se completó el cobro. Podés volver a Turnos e intentar de nuevo si el horario sigue libre."
                  : isPending
                    ? "El pago puede estar en revisión. Cuando Mercado Pago lo apruebe, tu turno se confirmará solo."
                    : "Esta pantalla es informativa. El estado real del pago lo confirma Mercado Pago al servidor."}
              </p>
            </header>

            {snap?.treatment ? (
              <section className="rounded-2xl border border-[var(--outline)]/10 bg-white px-5 py-4 shadow-sm">
                <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--premium-gold-light)] uppercase">
                  Detalle del turno
                </p>
                <h2 className="mt-2 font-heading text-[20px] leading-snug text-[#1c1b1b]">
                  {snap.treatment}
                </h2>
                {(snap.date || snap.time) && (
                  <p className="mt-2 text-[14px] text-[#5c5856]">
                    {[snap.date, snap.time ? `${snap.time} hs` : null].filter(Boolean).join(" · ")}
                  </p>
                )}
              </section>
            ) : null}
          </>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-20 z-40 border-t border-[var(--outline)]/10 bg-[#f8f6f2]/92 px-6 py-3 backdrop-blur-md">
        <div className="mx-auto w-full max-w-md space-y-2.5">
          {phone ? (
            <ConfirmadoIrPerfilButton
              phone={phone}
              label={celebrate ? "Ver mi turno en el perfil" : "Ir a mi perfil"}
              loadingLabel="Ingresando a perfil…"
            />
          ) : (
            <Link
              href="/perfil"
              className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[var(--premium-gold-light)] text-[15px] font-semibold text-[var(--on-accent)] shadow-[0_8px_24px_rgba(125,163,196,0.28)] transition-all active:scale-[0.99]"
            >
              Ir a mi perfil
            </Link>
          )}
          <Link
            href="/turnos"
            className="flex h-11 w-full items-center justify-center rounded-xl border border-[var(--outline)]/15 bg-white text-[14px] font-medium text-[#1c1b1b] transition-colors hover:bg-[#faf8f4]"
          >
            {isFailure ? "Volver a intentar en Turnos" : "Reservar otro turno"}
          </Link>
        </div>
      </div>

      <AppBottomNav active="turnos" />
    </div>
  );
}

export default function PagoRetornoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f8f6f2] text-[#7f7c7a]">
          Cargando…
        </div>
      }
    >
      <PagoRetornoContent />
    </Suspense>
  );
}
