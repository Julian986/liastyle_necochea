/** Bloques visuales en /servicios para la categoría Cortes y peinado. */

export type CortesPeinadoDisplaySection = {
  id: string;
  title: string;
  treatmentIds: string[];
};

export const CORTES_PEINADO_DISPLAY_SECTIONS: CortesPeinadoDisplaySection[] = [
  {
    id: "diseno",
    title: "Diseño & Tendencias",
    treatmentIds: ["diseno-tendencias", "diseno-tendencias-nutricion", "diseno-tendencias-tratamiento"],
  },
  {
    id: "puntas",
    title: "Puntas",
    treatmentIds: ["puntas", "puntas-nutricion", "puntas-tratamiento"],
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
