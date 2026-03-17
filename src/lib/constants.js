// ─── Sucursales ────────────────────────────────────────────────────────────

export const BRANCHES = [
  {
    id: 'bic940',
    name: 'Av. Bicentenario 940',
    tag: 'Sucursal Principal',
    emoji: '📍',
    gradient: 'from-purple-600 to-pink-500',
    glowRgba: '124,58,237',
    whatsapp: '5493872533708',
  },
  {
    id: 'bic614',
    name: 'Av. Bicentenario 614',
    tag: 'Sucursal Centro',
    emoji: '🏠',
    gradient: 'from-pink-500 to-orange-500',
    glowRgba: '236,72,153',
    whatsapp: '5493872533708',
  },
  {
    id: 'huaico',
    name: 'Barrio Huaico Mz522B C4',
    tag: 'Sucursal Barrio',
    emoji: '✨',
    gradient: 'from-orange-500 to-purple-600',
    glowRgba: '249,115,22',
    whatsapp: '5493872533708',
  },
]

// ─── Servicios ─────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    id: 'corte',
    name: 'Corte Normal',
    price: '$17.000',
    duration: 10,
      durationLabel: '10 min',
    emoji: '✂️',
    desc: 'Corte clasico a tu estilo',
  },
  {
    id: 'combo',
    name: 'Corte con Barba',
    price: '$25.000',
      duration: 10,
      durationLabel: '10 min',
    emoji: '🪒',
    desc: 'Corte + arreglo de barba completo',
    hot: true,
  },
]

// ─── Calendario ────────────────────────────────────────────────────────────
export const MONTHS_ES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
]
export const DAYS_ES    = ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
export const DAYS_LONG  = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
export const MONTHS_LONG = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre',
]

// Slots bloqueados (demo). En producción vienen de Supabase.
export const BLOCKED_SLOTS = ['10:00','11:30','14:00','15:30','18:00']
