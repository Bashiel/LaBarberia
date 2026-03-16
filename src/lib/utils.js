import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { BLOCKED_SLOTS } from './constants'

export const cn = (...i) => twMerge(clsx(i))

/** Genera todos los slots del día según duración del servicio */
export function generateSlots(durationMin = 30) {
  const slots = []
  for (let h = 10; h < 22; h++) {
    for (let m = 0; m < 60; m += durationMin) {
      if (h === 21 && m > 0) break
      const label = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`
      slots.push({ label, blocked: BLOCKED_SLOTS.includes(label) })
    }
  }
  return slots
}

/**
 * Construye el mensaje de WhatsApp según la sucursal elegida.
 * El encabezado varía por branch.name (requisito del cliente).
 */
export function buildWAMessage({ branch, service, dateStr, timeStr, clientName }) {
  const header = `Hola La Barberia! Quiero reservar un turno en la sucursal de *${branch.name}*.`
  return [
    header,
    '',
    `Servicio: ${service.name}`,
    `Dia: ${dateStr}`,
    `Hora: ${timeStr}`,
    `Cliente: ${clientName}`,
    '',
    `_Enviado via BarberSync by ClickBite_`,
  ].join('\n')
}
