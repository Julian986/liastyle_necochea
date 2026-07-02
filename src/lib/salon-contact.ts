export const SALON_WHATSAPP_DISPLAY = "+54 9 2262 30-8862";
export const SALON_WHATSAPP_HREF = "https://wa.me/5492262308862";

export function salonWhatsAppUrl(message: string): string {
  return `${SALON_WHATSAPP_HREF}?text=${encodeURIComponent(message)}`;
}

/** Mensaje prearmado para coordinar color técnico por WhatsApp. */
export function colorTechnicalPriorAppointmentWhatsAppUrl(treatmentName?: string): string {
  const text = treatmentName?.trim()
    ? `Hola Analia! Me gustaría coordinar turno para ${treatmentName.trim()}.`
    : "Hola Analia! Me gustaría coordinar turno para color técnico (diseño mechas con papel, Balayage, Air Touch o reflejos).";
  return salonWhatsAppUrl(text);
}
