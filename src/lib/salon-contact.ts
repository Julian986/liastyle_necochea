export const SALON_WHATSAPP_DISPLAY = "+54 9 2262 30-8862";
export const SALON_WHATSAPP_HREF = "https://wa.me/5492262308862";

export function salonWhatsAppUrl(message: string): string {
  return `${SALON_WHATSAPP_HREF}?text=${encodeURIComponent(message)}`;
}

/** Mensaje prearmado para cita previa de color técnico (primera visita). */
export function colorTechnicalPriorAppointmentWhatsAppUrl(treatmentName?: string): string {
  const text = treatmentName?.trim()
    ? `Hola Lia Style! Es mi primera vez en el salón y me gustaría coordinar cita previa para ${treatmentName.trim()}.`
    : "Hola Lia Style! Es mi primera vez en el salón y me gustaría coordinar cita previa para color técnico (diseño mechas con papel, Balayage, Air Touch o reflejos).";
  return salonWhatsAppUrl(text);
}
