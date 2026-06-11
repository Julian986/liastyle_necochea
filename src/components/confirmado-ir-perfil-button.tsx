"use client";

import { useState } from "react";

import { event as gaEvent, GA_EVENT_CUSTOMER_SESSION_START } from "@/lib/gtag";

type Props = {
  phone: string;
};

export function ConfirmadoIrPerfilButton({ phone }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const p = phone.trim();
      if (p) {
        const res = await fetch("/api/me/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ phone: p, source: "confirmado" }),
        });
        if (res.ok) {
          gaEvent(GA_EVENT_CUSTOMER_SESSION_START, { login_source: "confirmado" });
        }
      }
    } catch {
      // Si falla el guardado de sesión, igual llevamos al perfil.
    } finally {
      window.location.href = "/perfil";
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--premium-gold-light)] text-[15px] font-semibold text-[var(--on-accent)] shadow-[0_8px_24px_rgba(184,142,47,0.28)] transition-all active:scale-[0.99] disabled:cursor-default disabled:opacity-70"
    >
      {loading ? "Ingresando a perfil…" : "Ver mi turno en el perfil"}
    </button>
  );
}
