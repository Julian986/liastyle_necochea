/** Ventana mínima para que la clienta cancele desde la app. */
export const CUSTOMER_CANCEL_MIN_HOURS = 24;

const MS_PER_HOUR = 60 * 60 * 1000;

export function hoursUntilStart(startsAt: Date | string, now: Date = new Date()): number {
  const startMs = typeof startsAt === "string" ? new Date(startsAt).getTime() : startsAt.getTime();
  if (!Number.isFinite(startMs)) return 0;
  return (startMs - now.getTime()) / MS_PER_HOUR;
}

export function canCustomerCancelByStartsAt(
  startsAt: Date | string,
  now: Date = new Date(),
): boolean {
  return hoursUntilStart(startsAt, now) >= CUSTOMER_CANCEL_MIN_HOURS;
}

export const CUSTOMER_CANCEL_POLICY_NOTE =
  `Podés cancelar hasta ${CUSTOMER_CANCEL_MIN_HOURS} h antes del turno. Si cancelás después, se pierde la seña.`;

export const CUSTOMER_CANCEL_TOO_LATE_MESSAGE =
  `Ya no podés cancelar desde la app: faltan menos de ${CUSTOMER_CANCEL_MIN_HOURS} h. En este caso se pierde la seña. Si necesitás ayuda, contactá al salón.`;

export const CUSTOMER_CANCEL_CONFIRM_HINT =
  `Recordá: con menos de ${CUSTOMER_CANCEL_MIN_HOURS} h de anticipación no se puede cancelar desde la app y se pierde la seña.`;
