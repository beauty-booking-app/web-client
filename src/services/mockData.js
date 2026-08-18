// Mock data — shape idéntico a GET /public/services del backend.
// Cada Service agrupa sus ServiceTypes. El frontend deriva las "categorías"
// de los campos `category` y `pillar` que el backend no expone (metadata local).

export const MOCK_SERVICES = [
  {
    id: "svc-corte",
    name: "Corte Unisex",
    description: "Un buen corte para sentirte vos mismo. Para toda la familia: damas, caballeros y los más chiquitos.",
    referenceImage: { id: "img-corte", url: "https://media.base44.com/images/public/6a5e764df627dad0925e79f3/aea45716f_generated_image.png" },
    cancelable: true,
    cancellationPeriodHours: 24,
    category: "Corte",
    pillar: "Corte",
    types: [
      { id: "tp-corte-dama", name: "Corte Dama", durationMinutes: 40, price: 15000, description: "El corte que te saca una sonrisa cada vez que te mirás al espejo.", referenceImage: null },
      { id: "tp-corte-caballero", name: "Corte Caballero", durationMinutes: 35, price: 12000, description: "Prolijo, fresco y a tu medida. Salís como nuevo.", referenceImage: null },
      { id: "tp-corte-nino", name: "Corte Niño", durationMinutes: 30, price: 10000, description: "Con paciencia y cariño para los más peques de la casa.", referenceImage: null },
    ],
  },
  {
    id: "svc-tratamientos",
    name: "Tratamientos Capilares",
    description: "Un rato para vos. Tratamientos que dejan el pelo sano, suave y con brillo, mientras te relajás en el sillón.",
    referenceImage: { id: "img-trat", url: "https://media.base44.com/images/public/6a5e764df627dad0925e79f3/ca0931cbe_generated_image.png" },
    cancelable: true,
    cancellationPeriodHours: 24,
    category: "Tratamientos",
    pillar: "Tratamientos",
    types: [
      { id: "tp-trat-nutricion", name: "Nutrición", durationMinutes: 60, price: 20000, description: "Hidratación profunda para un pelo que se ve y se siente sano.", referenceImage: null },
      { id: "tp-trat-botox", name: "Botox Capilar", durationMinutes: 75, price: 25000, description: "Repara y le devuelve vida y cuerpo a tu cabello.", referenceImage: null },
      { id: "tp-trat-antifrizz", name: "Anti Frizz", durationMinutes: 60, price: 22000, description: "Chau frizz, hola pelo manejable y prolijo todo el día.", referenceImage: null },
      { id: "tp-trat-alisado", name: "Alisado", durationMinutes: 120, price: 35000, description: "Liso, suave y duradero para que salgas tranquila todos los días.", referenceImage: null },
      { id: "tp-trat-permanente", name: "Permanente", durationMinutes: 90, price: 30000, description: "Ondas definidas y naturales que te duran meses.", referenceImage: null },
    ],
  },
  {
    id: "svc-color",
    name: "Color",
    description: "El color que te combina con vos. Desde un global parejo hasta mechas que iluminan tu rostro.",
    referenceImage: { id: "img-color", url: "https://media.base44.com/images/public/6a5e764df627dad0925e79f3/abffc7cdb_generated_image.png" },
    cancelable: true,
    cancellationPeriodHours: 24,
    category: "Color",
    pillar: "Color",
    types: [
      { id: "tp-color-global", name: "Color Global", durationMinutes: 90, price: 28000, description: "Un color parejo de raíz a puntas, cubre canas y renueva.", referenceImage: null },
      { id: "tp-color-mechas", name: "Mechas en Gorro", durationMinutes: 120, price: 32000, description: "Iluminá tu rostro con mechas bien distribuidas.", referenceImage: null },
      { id: "tp-color-banda", name: "Banda", durationMinutes: 75, price: 25000, description: "Un toque de dimensión con técnica de bandas.", referenceImage: null },
    ],
  },
  {
    id: "svc-unas",
    name: "Uñas",
    description: "Un ratito de mimo para tus manos. Manicura con acabados que duran y se ven prolijos y lindos.",
    referenceImage: { id: "img-unas", url: "https://media.base44.com/images/public/6a5e764df627dad0925e79f3/3bea70154_generated_image.png" },
    cancelable: true,
    cancellationPeriodHours: 12,
    category: "Uñas",
    pillar: "Uñas",
    types: [
      { id: "tp-una-semi", name: "Semipermanente", durationMinutes: 45, price: 8000, description: "Brillo y color que te dura semanas sin descamarse.", referenceImage: null },
      { id: "tp-una-kapping", name: "Kapping", durationMinutes: 40, price: 7000, description: "Una capa finita de gel que protege y fortalece tu uña.", referenceImage: null },
      { id: "tp-una-softgel", name: "Soft Gel", durationMinutes: 60, price: 12000, description: "Extensión flexible que se ve y se siente natural.", referenceImage: null },
    ],
  },
];

// Slots mock para el flujo sin backend
export const MOCK_SLOTS = [
  { startTime: "09:00", endTime: "09:40", available: true },
  { startTime: "09:30", endTime: "10:10", available: true },
  { startTime: "10:00", endTime: "10:40", available: true },
  { startTime: "10:30", endTime: "11:10", available: false },
  { startTime: "11:00", endTime: "11:40", available: true },
  { startTime: "11:30", endTime: "12:10", available: true },
  { startTime: "12:00", endTime: "12:40", available: false },
  { startTime: "14:00", endTime: "14:40", available: true },
  { startTime: "14:30", endTime: "15:10", available: true },
  { startTime: "15:00", endTime: "15:40", available: true },
  { startTime: "15:30", endTime: "16:10", available: false },
  { startTime: "16:00", endTime: "16:40", available: true },
  { startTime: "16:30", endTime: "17:10", available: true },
  { startTime: "17:00", endTime: "17:40", available: true },
  { startTime: "18:00", endTime: "18:40", available: true },
  { startTime: "18:30", endTime: "19:10", available: true },
];

// Días disponibles mock (próximos 14 días hábiles)
export function generateMockAvailableDates() {
  const dates = []
  const today = new Date()
  let count = 0
  let i = 1

  while (count < 14) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const dow = d.getDay()
    if (dow !== 0) {
      dates.push(d.toISOString().split('T')[0])
      count++
    }
    i++
  }

  return dates
}
