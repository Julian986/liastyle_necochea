"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { AppBottomNav } from "@/components/app-bottom-nav";
import { VipPromosList } from "@/components/vip/vip-promos-list";
import { isLikelyWhatsappNumber } from "@/lib/booking/salon-availability";
import { event as gaEvent, GA_EVENT_CUSTOMER_SESSION_START } from "@/lib/gtag";
import { VIP_VISIT_THRESHOLD } from "@/lib/vip/eligibility";

type VipStatusResponse = {
  authenticated?: boolean;
  isVip?: boolean;
  pastVisitCount?: number;
  threshold?: number;
  visitsRemaining?: number;
  source?: string;
  error?: string;
};

export default function PromotionsPage() {
  const [status, setStatus] = useState<VipStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [phoneInput, setPhoneInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/me/vip-status", { credentials: "same-origin" });
      const data = (await res.json()) as VipStatusResponse;
      if (!res.ok) {
        setError(data.error ?? "No se pudo verificar el acceso VIP.");
        setStatus(null);
        return;
      }
      setStatus(data);
    } catch {
      setError("Sin conexión. Probá de nuevo.");
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!isLikelyWhatsappNumber(phoneInput)) {
      setError("Ingresá un WhatsApp válido (10 a 15 dígitos).");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/me/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ phone: phoneInput.trim(), source: "promociones" }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "No se pudo iniciar sesión.");
        return;
      }
      gaEvent(GA_EVENT_CUSTOMER_SESSION_START, { login_source: "promociones" });
      setPhoneInput("");
      await loadStatus();
    } catch {
      setError("Sin conexión. Probá de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  const threshold = status?.threshold ?? VIP_VISIT_THRESHOLD;
  const pastVisitCount = status?.pastVisitCount ?? 0;
  const visitsRemaining = status?.visitsRemaining ?? Math.max(0, threshold - pastVisitCount);
  const canSeePromos = Boolean(status?.isVip);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f6f2] pb-32 text-[#1c1b1b]">
      <main className="mx-auto w-full max-w-md px-4 pt-8 pb-24">
        <header className="mb-6 text-center">
          <h1 className="font-heading text-[34px] leading-none font-semibold">Beneficios cliente VIP</h1>
          <p className="mt-3 text-[13px] text-[#7f7c7a]">
            {canSeePromos ? "Combos destacados del mes" : "Acceso exclusivo para clientas VIP"}
          </p>
        </header>

        {loading ? (
          <p className="py-10 text-center text-[15px] text-[#7f7c7a]">Comprobando acceso…</p>
        ) : error && !status ? (
          <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-800">
            {error}
          </p>
        ) : canSeePromos ? (
          <VipPromosList />
        ) : !status?.authenticated ? (
          <section className="rounded-2xl border border-[var(--outline)]/10 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <p className="text-[12px] font-bold tracking-[0.14em] text-[var(--premium-gold-light)] uppercase">
              Acceso VIP
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4e463a]">
              Ingresá con tu WhatsApp para ver si ya sos clienta VIP. Después de {threshold} visitas
              realizadas desbloqueás estos beneficios.
            </p>
            <form onSubmit={(e) => void handleLogin(e)} className="mt-5 space-y-4">
              <div>
                <label htmlFor="vip-phone" className="text-[14px] font-semibold text-[#1c1b1b]">
                  WhatsApp
                </label>
                <input
                  id="vip-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="Ej: +54 9 11 2345-6789"
                  className="mt-2 w-full rounded-xl border border-[#d7d3cc] bg-[#fbf9f5] px-4 py-3.5 text-[16px] text-[#1c1b1b] outline-none placeholder:text-[#9a958c] focus:border-[var(--premium-gold-light)] focus:ring-2 focus:ring-[var(--premium-gold-light)]/25"
                />
              </div>
              {error ? (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={busy}
                className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--premium-gold-light)] text-[15px] font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-60"
              >
                {busy ? "Ingresando…" : "Verificar acceso VIP"}
              </button>
            </form>
          </section>
        ) : (
          <section className="rounded-2xl border border-[var(--outline)]/10 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <p className="text-[12px] font-bold tracking-[0.14em] text-[var(--premium-gold-light)] uppercase">
              Todavía no sos VIP
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-[#4e463a]">
              Llevás {pastVisitCount} de {threshold} visitas realizadas.
              {visitsRemaining > 0
                ? ` Te faltan ${visitsRemaining} para desbloquear los beneficios VIP.`
                : null}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#efeeea]">
              <div
                className="h-full rounded-full bg-[var(--premium-gold-light)] transition-all"
                style={{ width: `${Math.min(100, (pastVisitCount / threshold) * 100)}%` }}
              />
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/turnos"
                className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--premium-gold-light)] text-[15px] font-semibold text-white shadow-sm transition active:scale-[0.98]"
              >
                Reservar un turno
              </Link>
              <Link
                href="/perfil/historial-tratamientos"
                className="flex h-12 w-full items-center justify-center rounded-full border border-[#d7d3cc] bg-white text-[15px] font-semibold text-[#1c1b1b] transition active:scale-[0.98]"
              >
                Ver mi historial
              </Link>
            </div>
          </section>
        )}
      </main>

      <AppBottomNav active="promos" />
    </div>
  );
}
