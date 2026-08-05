import { AlertCircle } from "lucide-react";

import { DEPOSIT_CANCEL_POLICY_NOTICE } from "@/lib/reservations/cancel-policy";

type Props = {
  className?: string;
  /** `alert` = bien visible (pago/confirmación). `subtle` = informativo (Mis turnos). */
  variant?: "alert" | "subtle";
};

/** Aviso: cancelación 24 h / pérdida de seña. */
export function DepositCancelPolicyNotice({ className = "", variant = "alert" }: Props) {
  if (variant === "subtle") {
    return (
      <p
        role="note"
        className={`rounded-xl border border-gray-200 bg-[#F5F5F5] px-4 py-3 text-[13px] leading-snug text-gray-600 ${className}`}
      >
        {DEPOSIT_CANCEL_POLICY_NOTICE}
      </p>
    );
  }

  return (
    <div
      role="note"
      className={`flex gap-2.5 rounded-xl border border-amber-300/70 bg-amber-50 px-3.5 py-3 ${className}`}
    >
      <AlertCircle
        className="mt-0.5 h-4 w-4 shrink-0 text-amber-700"
        strokeWidth={2.2}
        aria-hidden
      />
      <div className="min-w-0">
        <p className="text-[11px] font-bold tracking-[0.12em] text-amber-800 uppercase">Importante</p>
        <p className="mt-1 text-[13px] leading-snug font-medium text-amber-950">
          {DEPOSIT_CANCEL_POLICY_NOTICE}
        </p>
      </div>
    </div>
  );
}
