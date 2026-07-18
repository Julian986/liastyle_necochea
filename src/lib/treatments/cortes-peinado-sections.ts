/** Bloques visuales en /servicios para la categoría Cortes y peinado. */

export type CortesPeinadoDisplaySection = {
  id: string;
  title: string;
  treatmentIds: string[];
};

export const CORTES_PEINADO_DISPLAY_SECTIONS: CortesPeinadoDisplaySection[] = [
  {
    id: "diseno",
    title: "Corte Diseño & Tendencias",
    treatmentIds: ["diseno-tendencias", "diseno-tendencias-nutricion", "diseno-tendencias-tratamiento"],
  },
  {
    id: "puntas",
    title: "Corte de puntas",
    treatmentIds: ["puntas", "puntas-nutricion", "puntas-tratamiento", "puntas-mascara"],
  },
  {
    id: "peinados",
    title: "Peinados",
    treatmentIds: [
      "peinado-novia-quinceanera",
      "peinado-fiesta",
      "peinado-alisado-temporal",
      "peinado-ondas",
    ],
  },
];
