export const TURNOS_HOY = [
  { id:1, nombre:'Carlos Méndez',  servicio:'Combo Completo',    hora:'09:30', precio:2500, status:'pendiente',  tel:'5492236111111' },
  { id:2, nombre:'Diego Suárez',   servicio:'Corte de Cabello',  hora:'10:00', precio:1500, status:'confirmado', tel:'5492236222222' },
  { id:3, nombre:'Mateo López',    servicio:'Arreglo de Barba',  hora:'10:30', precio:1200, status:'pendiente',  tel:'5492236333333' },
  { id:4, nombre:'Gonzalo Ríos',   servicio:'Combo Completo',    hora:'11:00', precio:2500, status:'cancelado',  tel:'5492236444444' },
  { id:5, nombre:'Tomás Vera',     servicio:'Corte de Cabello',  hora:'12:00', precio:1500, status:'confirmado', tel:'5492236555555' },
  { id:6, nombre:'Nicolás Castro', servicio:'Arreglo de Barba',  hora:'14:30', precio:1200, status:'pendiente',  tel:'5492236666666' },
  { id:7, nombre:'Franco Morales', servicio:'Combo Completo',    hora:'16:00', precio:2500, status:'pendiente',  tel:'5492236777777' },
  { id:8, nombre:'Sebastián Gil',  servicio:'Corte de Cabello',  hora:'17:00', precio:1500, status:'pendiente',  tel:'5492236888888' },
]

export const WEEK_DATA = [
  { dia:'Lu', turnos:5 },
  { dia:'Ma', turnos:7 },
  { dia:'Mi', turnos:6 },
  { dia:'Ju', turnos:8 },
  { dia:'Vi', turnos:10, hoy:true },
  { dia:'Sá', turnos:9 },
]

export const ALL_SLOTS = [
  '09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30',
  '14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00',
]

export const OCCUPIED_SLOTS = [
  '09:30','10:00','10:30','11:00','12:00','14:30','16:00','17:00',
]
