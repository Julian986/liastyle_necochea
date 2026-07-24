import type { TreatmentCategory } from "@/lib/treatments/catalog";

/** Intro general de /servicios (palabras de Analia). */
export const SERVICE_PAGE_INTRO_LINES = [
  "Todos los productos utilizados en nuestros servicios están testeados y no contienen formol.",
  "Trabajamos para la salud capilar y cuidamos el medio ambiente.",
] as const;

/** Destacado VIP al final de /servicios. */
export const SERVICE_PAGE_VIP_HIGHLIGHT =
  "Después del servicio 10 pasás a ser clienta VIP, y vas a acceder a las promociones que tenemos para vos.";


/** Textos educativos por categoría / bloque en /servicios. */
export const SERVICE_PAGE_CATEGORY_COPY: Record<
  TreatmentCategory,
  {
    /** Intro bajo el título de categoría. */
    intro?: string;
    /** Nota por id de grupo (coincide con secciones de display/booking). */
    groupNotes?: Record<string, string>;
  }
> = {
  "Cortes y peinado": {
    groupNotes: {
      // puntas / diseno: texto va en el ítem (grupo de 1 servicio).
      peinados:
        "Novia, quinceañera, egresadas, alisado temporal (plancha) y ondas con buclera o quebradas con plancha.",
    },
  },
  Color: {
    groupNotes: {
      // correccion / global: texto va en el ítem (concepto único).
      crecimiento:
        "Se cubre con el tono deseado solo en el nuevo crecimiento. Incluye cierre técnico y modelado.",
      tecnico:
        "Color técnico: es cuando hay que decolorar para aclarar el cabello. Incluye reflejos con gorra, balayage, air touch, diseño de mechas o decapage (quitar el pigmento artificial para cambiar el tono o matiz).",
    },
  },
  Tratamientos: {
    intro:
      "Terapia Capilar & Mask Bar: cuidamos la fibra del cabello con tratamientos, máscaras y cirugía capilar.",
    groupNotes: {
      terapias:
        "Tratamiento: es cuando reparamos la fibra interna del cabello mediante botox, células madre o lifting.",
      mascaras:
        "Máscaras: es cuando trabajamos en la fibra externa del cabello mediante nutrición, hidratación o reparación.",
      // adicional / cirugía: texto va en el ítem.
    },
  },
  "Cambio de estructura": {
    // Permanente y alisado: un ítem cada uno con su descripción (sin corto/medio/largo).
  },
};

/**
 * Descripciones por servicio en /servicios.
 * `""` = no mostrar párrafo (el texto educativo ya está en la nota del grupo).
 * Si el id no está, se usa `service.description` del catálogo.
 */
export const SERVICE_EDUCATIONAL_DESCRIPTIONS: Record<string, string> = {
  // --- Cortes (grupo de 1: texto completo acá) ---
  puntas:
    "Es cuando mantenemos la línea de corte y solo cortamos las puntas del cabello para oxigenarlo y que crezca.",
  "diseno-tendencias":
    "Es cuando cambiamos la línea de corte y hacemos otro diseño. Entre estos diseños podés elegir: Mariposa o Butterfly, Bob, Pixie, entre otros.",
  // Peinados: overview en groupNotes
  "peinado-novia-quinceanera": "",
  "peinado-fiesta": "",
  "peinado-alisado-temporal": "",
  "peinado-ondas": "",

  // --- Color ---
  "correccion-color":
    "Es cuando hay varios colores y queremos lograr un color uniforme. El valor varía según diagnóstico.",
  "color-crecimiento": "",
  /** Conceptos únicos en /servicios (sin corto/medio/largo). */
  "color-global":
    "Es cuando hacés un tono sobre tu cabello natural, o tu tono artificial está desmerecido. Incluye cierre técnico y modelado.",
  "mechas-papel":
    "Mechas diseñadas con papel. Incluye cierre técnico, Plex y modelado. El valor puede variar según procesos químicos previos.",
  balayage:
    "Iluminación con técnica balayage. Incluye cierre técnico, Plex y modelado. El valor puede variar según procesos químicos previos.",
  "air-touch":
    "Iluminación con técnica Air Touch. Incluye cierre técnico, Plex y modelado. El valor puede variar según procesos químicos previos.",
  "reflejos-gorra":
    "Reflejos con gorra, diseño personalizado. Incluye cierre técnico, Plex y modelado.",

  // --- Tratamientos ---
  "botox-cauterizado": "",
  "celulas-madre": "Incluye lavado y modelado.",
  "lifting-capilar": "Alisado temporal de la fibra. Incluye modelado.",
  "mascara-nutricion": "",
  "mascara-hidratacion": "",
  "mascara-reparacion": "",
  "cirugia-capilar":
    "Cirugía Capilar: la herramienta adecuada para cabellos elastizados o sobreprocesados por decoloración o alisados.",

  // --- Cambio de estructura: concepto único (sin corto/medio/largo) ---
  permanente:
    "Es cuando pasamos de un cabello lacio a rulos permanentes mediante un proceso químico.",
  alisado:
    "Es cuando pasamos de un cabello ondulado a lacio mediante un proceso químico (alisado vegano sin formol). El valor depende de lo procesado que esté el cabello.",
};

/** Resuelve el texto a mostrar bajo el nombre del servicio en /servicios. */
export function resolveServicePageDescription(
  serviceId: string,
  catalogDescription: string,
): string {
  if (Object.prototype.hasOwnProperty.call(SERVICE_EDUCATIONAL_DESCRIPTIONS, serviceId)) {
    return SERVICE_EDUCATIONAL_DESCRIPTIONS[serviceId] ?? "";
  }
  return catalogDescription;
}
