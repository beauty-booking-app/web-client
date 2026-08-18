// Central catalogue of services offered by the salon.
export const SERVICE_CATEGORIES = [
  {
    id: "corte",
    label: "Corte Unisex",
    pillar: "Corte",
    description: "Un buen corte para sentirte vos mismo. Para toda la familia: damas, caballeros y los más chiquitos.",
    image: "https://media.base44.com/images/public/6a5e764df627dad0925e79f3/aea45716f_generated_image.png",
    texture: "Estilo",
    services: [
      { id: "corte-dama", name: "Corte Dama", desc: "El corte que te saca una sonrisa cada vez que te mirás al espejo." },
      { id: "corte-caballero", name: "Corte Caballero", desc: "Prolijo, fresco y a tu medida. Salís como nuevo." },
      { id: "corte-nino", name: "Corte Niño", desc: "Con paciencia y cariño para los más peques de la casa." },
    ],
  },
  {
    id: "tratamientos",
    label: "Tratamientos Capilares",
    pillar: "Tratamientos",
    description: "Un rato para vos. Tratamientos que dejan el pelo sano, suave y con brillo, mientras te relajás en el sillón.",
    image: "https://media.base44.com/images/public/6a5e764df627dad0925e79f3/ca0931cbe_generated_image.png",
    texture: "Cuidado",
    services: [
      { id: "trat-nutricion", name: "Nutrición", desc: "Hidratación profunda para un pelo que se ve y se siente sano." },
      { id: "trat-botox", name: "Botox Capilar", desc: "Repara y le devuelve vida y cuerpo a tu cabello." },
      { id: "trat-antifrizz", name: "Anti Frizz", desc: "Chau frizz, hola pelo manejable y prolijo todo el día." },
      { id: "trat-alisado", name: "Alisado", desc: "Liso, suave y duradero para que salgas tranquila todos los días." },
      { id: "trat-permanente", name: "Permanente", desc: "Ondas definidas y naturales que te duran meses." },
    ],
  },
  {
    id: "color",
    label: "Color",
    pillar: "Color",
    description: "El color que te combina con vos. Desde un global parejo hasta mechas que iluminan tu rostro.",
    image: "https://media.base44.com/images/public/6a5e764df627dad0925e79f3/abffc7cdb_generated_image.png",
    texture: "Color",
    services: [
      { id: "color-global", name: "Color Global", desc: "Un color parejo de raíz a puntas, cubre canas y renueva." },
      { id: "color-mechas", name: "Mechas en Gorro", desc: "Iluminá tu rostro con mechas bien distribuidas." },
      { id: "color-banda", name: "Banda", desc: "Un toque de dimensión con técnica de bandas." },
    ],
  },
  {
    id: "unas",
    label: "Uñas",
    pillar: "Uñas",
    description: "Un ratito de mimo para tus manos. Manicura con acabados que duran y se ven prolijos y lindos.",
    image: "https://media.base44.com/images/public/6a5e764df627dad0925e79f3/3bea70154_generated_image.png",
    texture: "Detalle",
    services: [
      { id: "una-semipermanente", name: "Semipermanente", desc: "Brillo y color que te dura semanas sin descamarse." },
      { id: "una-kapping", name: "Kapping", desc: "Una capa finita de gel que protege y fortalece tu uña." },
      { id: "una-softgel", name: "Soft Gel", desc: "Extensión flexible que se ve y se siente natural." },
    ],
  },
];

export const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
];

export const ALL_SERVICES = SERVICE_CATEGORIES.flatMap((c) =>
  c.services.map((s) => ({ ...s, category: c.label, categoryId: c.id }))
);