import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save } from 'lucide-react'
import { ALL_SLOTS, OCCUPIED_SLOTS } from './mockData'
import { cn } from '../lib/utils'

export default function BlockSlots() {
  const [blocked, setBlocked] = useState(new Set(['11:30', '15:00', '18:00']))
  const [saved, setSaved] = useState(false)

  const toggle = (slot) => {
    if (OCCUPIED_SLOTS.includes(slot)) return
    setBlocked(prev => {
      const next = new Set(prev)
      next.has(slot) ? next.delete(slot) : next.add(slot)
      return next
    })
    setSaved(false)
  }

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-purple-500/6 border border-purple-400/15 rounded-xl p-3 mb-4 text-[13px] text-white/55 leading-relaxed">
        Tocá los horarios que querés bloquear para que no aparezcan disponibles en la app del cliente.
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30">Sábado 14 de marzo</p>
        <div className="flex gap-3">
          {[
            { label: 'Libre',     cls: 'bg-white/10 border border-white/10 w-3 h-3 rounded-sm' },
            { label: 'Bloqueado', cls: 'bg-purple-500/30 border border-purple-500 w-3 h-3 rounded-sm' },
            { label: 'Ocupado',   cls: 'bg-white/[.06] border border-dashed border-white/15 w-3 h-3 rounded-sm' },
          ].map(({ label, cls }) => (
            <span key={label} className="flex items-center gap-1.5 text-[11px] text-white/40">
              <span className={cls} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-5">
        {ALL_SLOTS.map((slot) => {
          const isOccupied = OCCUPIED_SLOTS.includes(slot)
          const isBlocked  = blocked.has(slot)
          return (
            <button
              key={slot}
              onClick={() => toggle(slot)}
              disabled={isOccupied}
              className={cn(
                'py-2 px-1 rounded-lg text-[12px] font-medium border transition-all duration-200 text-center',
                isOccupied
                  ? 'bg-white/[.03] border-dashed border-white/12 text-white/25 cursor-not-allowed line-through'
                  : isBlocked
                  ? 'bg-purple-500/15 border-purple-500 text-purple-200 font-semibold'
                  : 'bg-white/[.04] border-white/8 text-white/70 hover:bg-purple-500/15 hover:border-purple-400/40 hover:text-white'
              )}
            >
              {slot}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          className="btn-primary px-5 py-2.5 text-[13px] flex items-center gap-2"
        >
          <Save size={14} />
          Guardar cambios
        </button>
        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[12px] text-green-400 font-medium"
            >
              ✓ {blocked.size} horarios bloqueados
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
