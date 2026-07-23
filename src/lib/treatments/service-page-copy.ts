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
      puntas:
        "Es cuando mantenemos la línea de corte y solo cortamos las puntas del cabello para oxigenarlo y que crezca.",
      diseno:
        "Es cuando cambiamos la línea de corte y hacemos otro diseño. Entre estos diseños podés elegir: Mariposa o Butterfly, Bob, Pixie, entre otros.",
      peinados:
        "Novia, quinceañera, egresadas, alisado temporal (plancha) y ondas con buclera o quebradas con plancha.",
    },
  },
  Color: {
    groupNotes: {
      correccion:
        "Es cuando hay varios colores y queremos lograr un color uniforme.",
      crecimiento:
        "Se cubre con el tono deseado solo en el nuevo crecimiento.",
      global:
        "Es cuando hacés un tono sobre tu cabello natural, o tu tono artificial está desmerecido.",
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
      adicional:
        "Cirugía Capilar: la herramienta adecuada para cabellos elastizados o sobreprocesados por decoloración o alisados.",
    },
  },
  "Cambio de estructura": {
    intro:
      "Es cuando pasamos de un cabello lacio a rulos permanentes mediante un proceso químico (permanente), o de un cabello ondulado a lacio mediante un proceso químico (alisado).",
  },
};

/** Descripciones educativas para el listado de /servicios (catálogo). */
export const SERVICE_EDUCATIONAL_DESCRIPTIONS: Record<string, string> = {
  puntas:
    "Mantenemos la línea de corte y solo cortamos las puntas del cabello para oxigenarlo y que crezca.",
  "diseno-tendencias":
    "Cambiamos la línea de corte y hacemos otro diseño. Diseños posibles: Mariposa o Butterfly, Bob, Pixie, entre otros.",
  "peinado-novia-quinceanera": "Peinado para novia o quinceañera.",
  "peinado-fiesta": "Peinado para fiesta o egresadas.",
  "peinado-alisado-temporal": "Alisado temporal con plancha.",
  "peinado-ondas": "Ondas con buclera o quebradas con plancha.",
  "correccion-color":
    "Es cuando hay varios colores y queremos lograr un color uniforme. El valor varía según diagnóstico.",
  "color-crecimiento":
    "Se cubre con el tono deseado solo en el nuevo crecimiento. Incluye cierre técnico y modelado.",
  "color-crecimiento-corte-nutricion":
    "Color en el nuevo crecimiento con corte y nutrición. Incluye cierre técnico y modelado.",
  "color-global-corto":
    "Un tono sobre tu cabello natural, o cuando tu tono artificial está desmerecido. Incluye cierre técnico y modelado.",
  "color-global-medio":
    "Un tono sobre tu cabello natural, o cuando tu tono artificial está desmerecido. Incluye cierre técnico y modelado.",
  "color-global-largo":
    "Un tono sobre tu cabello natural, o cuando tu tono artificial está desmerecido. Incluye cierre técnico y modelado.",
  "botox-cauterizado":
    "Tratamiento que repara la fibra interna del cabello. Incluye modelado.",
  "celulas-madre":
    "Tratamiento regenerador que repara la fibra interna del cabello. Incluye lavado y modelado.",
  "lifting-capilar":
    "Tratamiento que repara y alisa la fibra interna del cabello de forma temporal. Incluye modelado.",
  "mascara-nutricion": "Máscara que trabaja la fibra externa del cabello con nutrición.",
  "mascara-hidratacion": "Máscara que trabaja la fibra externa del cabello con hidratación.",
  "mascara-reparacion": "Máscara que trabaja la fibra externa del cabello con reparación.",
  "cirugia-capilar":
    "Ideal para cabellos elastizados o sobreprocesados por decoloración o alisados.",
  "permanente-corto":
    "Pasamos de cabello lacio a rulos permanentes mediante un proceso químico.",
  "permanente-medio":
    "Pasamos de cabello lacio a rulos permanentes mediante un proceso químico.",
  "permanente-largo":
    "Pasamos de cabello lacio a rulos permanentes mediante un proceso químico.",
  "alisado-vegano-corto":
    "Pasamos de cabello ondulado a lacio mediante un proceso químico (alisado sin formol).",
  "alisado-vegano-medio":
    "Pasamos de cabello ondulado a lacio mediante un proceso químico (alisado sin formol).",
  "alisado-vegano-largo":
    "Pasamos de cabello ondulado a lacio mediante un proceso químico (alisado sin formol).",
};
