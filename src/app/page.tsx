"use client";

import { AppBottomNav } from "@/components/app-bottom-nav";
import { BrandLogo } from "@/components/brand-logo";
import { HOME_HERO_IMAGE_URL } from "@/lib/home-hero-image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

let hasShownHomeSplash = false;

const SPLASH_MAX_MS = 900;
const SPLASH_MIN_VISIBLE_MS = 360;
const SPLASH_AFTER_LOAD_MS = 90;

const ctaClass =
  "flex w-full items-center justify-center rounded-full py-[15px] px-8 text-[15px] font-semibold uppercase tracking-widest transition-all duration-300 active:scale-95";

function SplashScreen({ onLogoReady }: { onLogoReady: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#141313] text-[#e5e2e1]">
      <div className="flex w-full max-w-md flex-col items-center px-6">
        <div className="mb-8 text-center">
          <div className="inline-flex flex-col items-center gap-2">
            <BrandLogo
              size="splash"
              fetchPriority="high"
              decoding="sync"
              onLoad={onLogoReady}
              onError={onLogoReady}
            />
            <div className="text-center font-heading text-2xl font-semibold leading-tight tracking-[0.12em] uppercase">
              <span className="block">Lia Style</span>
              <span className="mt-1 block text-lg tracking-[0.2em]">Necochea</span>
            </div>
            <div className="text-xs font-bold tracking-[0.3em] text-[var(--soft-gray)] uppercase">
              Color · Corte · Peinado
            </div>
          </div>
        </div>

        <p className="max-w-xs text-center text-sm leading-relaxed text-[var(--soft-gray)]">
          Asesoramiento y técnica profesional para que tu pelo luzca como vos querés.
        </p>
      </div>
    </div>
  );
}

function HomeContent() {
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const heroImage = heroImageRef.current;
      if (!heroImage) return;
      heroImage.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#141313] text-[#e5e2e1]">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          ref={heroImageRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url('${HOME_HERO_IMAGE_URL}')` }}
          aria-hidden
        />
        <div className="home-hero-gradient absolute inset-0" aria-hidden />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col items-center pb-32">
        <header className="flex w-full flex-col items-center justify-center px-6 pt-8">
          <BrandLogo size="compact" className="mb-6 transition-transform duration-500 hover:scale-105" />
          <div className="text-center">
            <h1 className="sr-only">Lia Style Necochea</h1>
            <p className="font-heading text-[28px] leading-9 font-semibold tracking-widest uppercase">
              Lia Style
            </p>
            <p className="font-heading text-[28px] leading-9 font-semibold tracking-widest uppercase">
              Necochea
            </p>
            <p className="mt-4 text-xs font-bold tracking-[0.3em] text-[var(--soft-gray)] uppercase">
              Color · Corte · Peinado
            </p>
          </div>
        </header>

        <section className="mt-16 w-full space-y-4 px-6">
          <Link
            href="/turnos"
            className={`${ctaClass} bg-[var(--premium-gold)] text-[var(--on-accent)] shadow-lg shadow-[var(--premium-gold)]/10`}
          >
            Reservar turno
          </Link>
          <Link href="/tratamientos" className={`${ctaClass} home-glass-button text-[#e5e2e1]`}>
            Tratamientos
          </Link>
          <Link href="/promociones" className={`${ctaClass} home-glass-button text-[#e5e2e1]`}>
            Promociones
          </Link>
          <Link
            href="/contacto"
            className={`${ctaClass} border border-[var(--outline)]/30 text-[#e5e2e1]`}
          >
            Contacto
          </Link>
        </section>

        <section className="mt-20 w-full px-6">
          <h2 className="mb-6 px-1 text-xs font-bold tracking-widest text-[var(--soft-gray)] uppercase">
            Promoción destacada del mes
          </h2>
          <div className="home-glass-card relative overflow-hidden rounded-2xl p-6">
            <div
              className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--premium-gold)]/5 blur-2xl"
              aria-hidden
            />
            <div className="relative z-10">
              <span className="mb-3 block text-[10px] font-bold tracking-[0.2em] text-[var(--premium-gold)] uppercase">
                Destacado
              </span>
              <h3 className="font-heading text-[32px] leading-10 font-semibold text-[#e5e2e1]">
                Servicio completo
              </h3>
              <p className="mt-3 max-w-[240px] text-sm leading-5 text-[var(--on-surface-variant)]">
                Color, lavado, corte y peinado en una sola visita (1 h 30 min).
              </p>
              <div className="mt-8 flex items-center justify-between">
                <Link
                  href="/turnos?treatment=Servicio%20completo"
                  className="rounded-full bg-[var(--premium-gold)] px-6 py-3 text-[13px] font-semibold tracking-wider text-[var(--on-accent)] uppercase transition-all hover:opacity-90 active:scale-95"
                >
                  Reservar ahora
                </Link>
                <p className="text-right text-[10px] leading-tight font-bold tracking-wider text-[var(--soft-gray)] uppercase">
                  Cupos
                  <br />
                  limitados
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppBottomNav active="inicio" />
    </div>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(!hasShownHomeSplash);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissedRef = useRef(false);
  const openedAtRef = useRef(0);

  const dismissSplash = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    if (maxTimerRef.current !== null) {
      clearTimeout(maxTimerRef.current);
      maxTimerRef.current = null;
    }
    hasShownHomeSplash = true;
    setShowSplash(false);
  }, []);

  useLayoutEffect(() => {
    if (hasShownHomeSplash || !showSplash) return;
    openedAtRef.current = Date.now();
  }, [showSplash]);

  useEffect(() => {
    if (hasShownHomeSplash) {
      setShowSplash(false);
      return;
    }
    if (!showSplash) return;
    maxTimerRef.current = setTimeout(dismissSplash, SPLASH_MAX_MS);
    return () => {
      if (maxTimerRef.current !== null) {
        clearTimeout(maxTimerRef.current);
        maxTimerRef.current = null;
      }
    };
  }, [showSplash, dismissSplash]);

  const handleSplashLogoReady = useCallback(() => {
    const elapsed = Date.now() - openedAtRef.current;
    const wait = Math.max(SPLASH_AFTER_LOAD_MS, SPLASH_MIN_VISIBLE_MS - elapsed);
    window.setTimeout(dismissSplash, wait);
  }, [dismissSplash]);

  if (showSplash) {
    return <SplashScreen onLogoReady={handleSplashLogoReady} />;
  }

  return <HomeContent />;
}
