export type BookingFlowBackState = {
  serviceSelectionConfirmed: boolean;
  dateStepConfirmed: boolean;
  selectedTime: string;
  serviceModalOpen: boolean;
};

export type BookingFlowBackAction =
  | { type: "exit" }
  | { type: "close_service_modal" }
  | { type: "to_service_selection" }
  | { type: "to_date_selection" }
  | { type: "to_time_selection" };

/** Resuelve el paso anterior en el flujo de reserva (servicios → fecha → horario). */
export function resolveBookingFlowBackAction(state: BookingFlowBackState): BookingFlowBackAction {
  if (!state.serviceSelectionConfirmed) {
    if (state.serviceModalOpen) return { type: "close_service_modal" };
    return { type: "exit" };
  }
  if (state.selectedTime.trim()) return { type: "to_time_selection" };
  if (state.dateStepConfirmed) return { type: "to_date_selection" };
  return { type: "to_service_selection" };
}

export function bookingFlowBackAriaLabel(
  action: BookingFlowBackAction,
  options?: { exitLabel?: string },
): string {
  if (action.type === "exit") return options?.exitLabel ?? "Volver al inicio";
  return "Paso anterior";
}
