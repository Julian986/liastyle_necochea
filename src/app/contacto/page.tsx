"use client";

import {
  Instagram,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { AppBottomNav } from "@/components/app-bottom-nav";

const SALON_ADDRESS = "Av. 91 1534, B7630 Necochea, Provincia de Buenos Aires";
const WHATSAPP_DISPLAY = "+54 9 2262 30-8862";
const WHATSAPP_HREF = "https://wa.me/5492262308862";
const INSTAGRAM_HANDLE = "@_liastyle.necochea";
const INSTAGRAM_HREF = "https://www.instagram.com/_liastyle.necochea";
const MAPS_HREF =
  "https://www.google.com/maps/place/LiaStyle+-+Peluqueria/@-38.5746678,-58.7465452,17z/data=!3m1!4b1!4m6!3m5!1s0x958fbd7fbeb5959f:0x83240dc669789b76!8m2!3d-38.5746678!4d-58.7443703";
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3119.224930814865!2d-58.74654522277769!3d-38.57466777179468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x958fbd7fbeb5959f%3A0x83240dc669789b76!2sLiaStyle%20-%20Peluqueria!5e0!3m2!1ses!2sar!4v1781221338375!5m2!1ses!2sar";

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 3.1c-4.9 0-8.9 3.9-8.9 8.8 0 1.6.4 3.1 1.3 4.4L3 21l4.9-1.3c1.3.7 2.7 1.1 4.1 1.1 4.9 0 8.9-3.9 8.9-8.8C20.9 7 16.9 3.1 12 3.1zm0 15.7c-1.3 0-2.5-.3-3.6-.9l-.3-.2-2.9.8.8-2.8-.2-.3c-.8-1.1-1.2-2.4-1.2-3.8C4.6 8 7.9 4.8 12 4.8s7.4 3.2 7.4 7.2-3.3 7.2-7.4 7.2zm4-5.2c-.2-.1-1.1-.6-1.2-.6-.2-.1-.3-.1-.5.1-.1.2-.6.7-.7.8-.1.1-.3.2-.5.1-.2-.1-.8-.3-1.5-.9-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.4.1-.1.1-.2.2-.4.1-.1 0-.3 0-.4 0-.1-.5-1.2-.7-1.6-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.1.9 2.3.1.2 1.6 2.4 3.8 3.3.5.2.9.3 1.2.4.5.2 1 .2 1.3.1.4-.1 1.1-.4 1.3-.9.2-.5.2-1 .2-1.1-.1-.1-.2-.2-.4-.3z"
      />
    </svg>
  );
}

type ContactItem = {
  label: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: string;
};

const contactItems: ContactItem[] = [
  {
    label: "Dirección",
    description: SALON_ADDRESS,
    icon: MapPin,
    href: MAPS_HREF,
  },
  {
    label: "WhatsApp",
    description: WHATSAPP_DISPLAY,
    icon: WhatsappIcon,
    href: WHATSAPP_HREF,
  },
  {
    label: "Instagram",
    description: INSTAGRAM_HANDLE,
    icon: Instagram,
    href: INSTAGRAM_HREF,
  },
];

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <main className="mx-auto w-full max-w-md px-4 pt-6 pb-24">
        <header className="mb-5 text-center">
          <h1 className="text-[28px] leading-none font-heading">Contacto</h1>
        </header>

        <section className="mb-4 rounded-2xl border border-white/8 bg-[#181818] px-3 py-1.5 shadow-[0_14px_30px_rgba(0,0,0,0.65)]">
          <div className="divide-y divide-white/10">
            {contactItems.map((item) => {
              const Icon = item.icon;

              const content = (
                <div className="flex items-center justify-between px-1 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-black/35">
                      <Icon
                        className={`text-[var(--soft-gray)]/85 ${
                          item.label === "WhatsApp" ? "h-5 w-5" : "h-4.5 w-4.5"
                        }`}
                        strokeWidth={1.7}
                      />
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-[var(--soft-gray)]">
                        {item.label}
                      </p>
                      <p className="mt-0.5 max-w-[240px] text-[11px] leading-snug text-[var(--soft-gray)]/60">
                        {item.description || "—"}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--soft-gray)]/50">›</span>
                </div>
              );

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div key={item.label}>
                  {content}
                </div>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/8 bg-[#181818] shadow-[0_14px_30px_rgba(0,0,0,0.65)]">
          <iframe
            src={MAP_EMBED_SRC}
            title="Mapa Lia Style Necochea"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="aspect-[4/3] h-auto w-full border-0"
          />
        </section>

        {/*
        <section
          id="detalle-horarios"
          className="mt-4 rounded-2xl border border-white/8 bg-[#181818] p-3"
        >
          <p className="text-[12px] uppercase tracking-[0.18em] text-[var(--soft-gray)]/70">
            Detalle de horarios
          </p>
          <div className="mt-2 grid grid-cols-1 gap-1 text-[11px] text-[var(--soft-gray)]/80">
            <p className="font-semibold text-[var(--premium-gold)]">
              Horarios en los que NO se toman turnos
            </p>
            <p>Lunes a Miércoles · 12:00 a 18:00</p>
            <p>Viernes · 12:00 a 18:00</p>
            <p className="mt-2 font-semibold text-[var(--premium-gold)]">Horarios disponibles para turnos</p>
            <p>Lunes a Miércoles · 08:00–11:00 · 15:00–17:00</p>
            <p>Jueves · 08:00–11:00 · 15:00–19:00</p>
            <p>Viernes · 08:00–11:00 · 15:00–17:00</p>
            <p>Sábados · 08:00–12:00</p>
          </div>
        </section>
        */}
      </main>

      <AppBottomNav />
    </div>
  );
}

