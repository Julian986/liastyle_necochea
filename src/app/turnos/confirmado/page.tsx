import { AppBottomNav } from "@/components/app-bottom-nav";
import { BrandLogo } from "@/components/brand-logo";
import { ConfirmadoIrPerfilButton } from "@/components/confirmado-ir-perfil-button";
import { CalendarDays, CheckCircle2, Clock3, User } from "lucide-react";
import Link from "next/link";

type ConfirmPageProps = {
  searchParams?: Promise<{
    treatment?: string;
    subtitle?: string;
    date?: string;
    time?: string;
    name?: string;
    phone?: string;
    id?: string;
  }>;
};

export default async function TurnoConfirmadoPage({ searchParams }: ConfirmPageProps) {
  const params = (await searchParams) ?? {};
  const treatment = params.treatment ?? "Corte Dama";
  const subtitle = params.subtitle ?? "Sesión premium";
  const date = params.date ?? "Jueves, 26 abr";
  const time = params.time ?? "15:00";
  const clientName = params.name ?? "";
  const clientPhone = params.phone ?? "";
  const reservationId = params.id ?? "";

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#f8f6f2] text-[#1c1b1b]">
      <main className="mx-auto w-full max-w-md flex-1 px-6 pt-6 pb-52">
        <header className="mb-5 flex flex-col items-center text-center">
          <BrandLogo size="compact" className="mb-4" />
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200/80">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" strokeWidth={1.8} />
          </div>
          <h1 className="mt-4 font-heading text-[26px] leading-8 font-semibold tracking-wide text-[#1c1b1b]">
            ¡Turno confirmado!
          </h1>
          <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-[#7f7c7a]">
            Tu reserva quedó agendada. Te enviaremos un recordatorio por WhatsApp antes de la cita.
          </p>
        </header>

        <section className="rounded-2xl border border-[var(--outline)]/10 bg-white px-5 py-4 shadow-sm">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--premium-gold-light)] uppercase">
            Detalle del turno
          </p>

          <h2 className="mt-2 font-heading text-[20px] leading-snug text-[#1c1b1b]">{treatment}</h2>
          {subtitle ? (
            <p className="mt-1 text-[11px] tracking-[0.06em] text-[#7f7c7a] uppercase">{subtitle}</p>
          ) : null}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[var(--outline)]/10 bg-[#faf8f4] px-3 py-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 shrink-0 text-[var(--premium-gold-light)]" strokeWidth={1.8} />
                <p className="text-[10px] tracking-[0.1em] text-[#7f7c7a] uppercase">Fecha</p>
              </div>
              <p className="mt-1.5 text-[14px] font-medium leading-snug text-[#1c1b1b]">{date}</p>
            </div>

            <div className="rounded-xl border border-[var(--outline)]/10 bg-[#faf8f4] px-3 py-3">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 shrink-0 text-[var(--premium-gold-light)]" strokeWidth={1.8} />
                <p className="text-[10px] tracking-[0.1em] text-[#7f7c7a] uppercase">Horario</p>
              </div>
              <p className="mt-1.5 text-[14px] font-medium text-[#1c1b1b]">{time} hs</p>
            </div>
          </div>

          {(clientName || clientPhone) && (
            <div className="mt-3 flex items-start gap-3 rounded-xl border border-[var(--outline)]/10 bg-[#faf8f4] px-3 py-3">
              <User className="mt-0.5 h-4 w-4 shrink-0 text-[var(--premium-gold-light)]" strokeWidth={1.8} />
              <div>
                <p className="text-[10px] tracking-[0.1em] text-[#7f7c7a] uppercase">Contacto</p>
                {clientName ? <p className="mt-1 text-[14px] font-medium text-[#1c1b1b]">{clientName}</p> : null}
                {clientPhone ? <p className="mt-0.5 text-[12px] text-[#7f7c7a]">WhatsApp: {clientPhone}</p> : null}
              </div>
            </div>
          )}

          {reservationId ? (
            <p className="mt-4 text-center text-[11px] tracking-[0.04em] text-[#7f7c7a]">
              Referencia: <span className="font-mono text-[12px] text-[#5c5856]">{reservationId}</span>
            </p>
          ) : null}
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-20 z-40 border-t border-[var(--outline)]/10 bg-[#f8f6f2]/95 px-6 py-3 backdrop-blur-md">
        <div className="mx-auto w-full max-w-md space-y-2.5">
          <ConfirmadoIrPerfilButton phone={clientPhone} />
          <Link
            href="/turnos"
            className="flex h-11 w-full items-center justify-center rounded-xl border border-[var(--outline)]/15 bg-white text-[14px] font-medium text-[#1c1b1b] transition-colors hover:bg-[#faf8f4]"
          >
            Reservar otro turno
          </Link>
        </div>
      </div>

      <AppBottomNav active="turnos" />
    </div>
  );
}
