import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MONTHS_ES, DAYS_ES, DAYS_LONG, MONTHS_LONG } from '../../lib/constants'
import { generateSlots, cn } from '../../lib/utils'
import { supabase } from '../../lib/supabase'

export default function StepDateTime({ service, date, time, onDateChange, onTimeChange, branch }) {
  const today = useMemo(() => new Date(), [])
  const [view, setView] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )
  const [bookedSlots, setBookedSlots] = useState([])
  const [loading, setLoading] = useState(false)

  // Cada vez que cambia la fecha, busca los turnos ya reservados en Supabase
  useEffect(() => {
    if (!date || !branch) return

    const fechaStr = date.toISOString().split('T')[0] // "2025-07-21"

    const fetchBookedSlots = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('turnos')
        .select('hora')
        .eq('sucursal', branch.name)
        .eq('fecha', fechaStr)

      if (!error && data) {
        setBookedSlots(data.map(t => t.hora))
      }
      setLoading(false)
    }

    fetchBookedSlots()

    // Suscripción en tiempo real — si alguien reserva mientras estás viendo, se actualiza solo
    const channel = supabase
      .channel('turnos-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'turnos',
        filter: `sucursal=eq.${branch.name}`,
      }, (payload) => {
        if (payload.new.fecha === fechaStr) {
          setBookedSlots(prev => [...prev, payload.new.hora])
        }
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [date, branch])

  const dayCells = useMemo(() => {
    const year  = view.getFullYear()
    const month = view.getMonth()
    const total = new Date(year, month + 1, 0).getDate()
    const first = new Date(year, month, 1).getDay()
    const cells = Array(first).fill(null)
    for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d))
    return cells
  }, [view])

  const isDisabled = (d) => {
    if (!d) return true
    const floor = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d < floor || d.getDay() === 0
  }
  const isSel   = (d) => d && date && d.toDateString() === date.toDateString()
  const isToday = (d) => d && d.toDateString() === today.toDateString()
  const canPrev = view.getFullYear() > today.getFullYear() ||
                  (view.getFullYear() === today.getFullYear() && view.getMonth() > today.getMonth())

  const slots   = useMemo(() => generateSlots(service?.duration ?? 30), [service])
  const amSlots = slots.filter(s => parseInt(s.label) < 13)
  const pmSlots = slots.filter(s => parseInt(s.label) >= 13)

  const handleDateClick = (d) => {
    if (!d || isDisabled(d)) return
    onDateChange(d)
    onTimeChange(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
      className="space-y-5"
    >
      {/* Calendario */}
      <div>
        <p className="text-white/45 text-[13px] mb-3">Elegí el día. Sin domingos.</p>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth()-1, 1))}
              disabled={!canPrev}
              className="p-1.5 rounded-lg text-purple-300 hover:bg-purple-500/10 transition-colors disabled:opacity-25 disabled:cursor-default"
            >
              <ChevronLeft size={18} />
            </button>
            <p className="font-display font-bold text-[14px] text-purple-100">
              {MONTHS_ES[view.getMonth()]} {view.getFullYear()}
            </p>
            <button
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth()+1, 1))}
              className="p-1.5 rounded-lg text-purple-300 hover:bg-purple-500/10 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAYS_ES.map(d => (
              <div key={d} className="text-center text-[11px] text-white/25 font-medium py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-0.5">
            {dayCells.map((d, i) => (
              <button
                key={i}
                disabled={!d || isDisabled(d)}
                onClick={() => handleDateClick(d)}
                className={cn(
                  'mx-auto w-9 h-9 rounded-full flex items-center justify-center text-[13px] transition-all duration-150',
                  (!d || isDisabled(d)) && 'opacity-20 cursor-default',
                  d && !isDisabled(d) && !isSel(d) && 'hover:bg-purple-500/15 hover:text-purple-200 cursor-pointer',
                  isSel(d) && 'bg-gradient-to-br from-purple-600 to-pink-500 text-white font-bold shadow-[0_4px_16px_rgba(124,58,237,.45)]',
                  isToday(d) && !isSel(d) && 'border border-purple-400/50 text-purple-300',
                )}
              >
                {d ? d.getDate() : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slots de hora */}
      <AnimatePresence>
        {date && (
          <motion.div
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: [0.22,1,0.36,1] }}
          >
            <p className="text-white/45 text-[13px] mb-3">
              {loading ? 'Cargando horarios...' : `Horarios disponibles · ${DAYS_LONG[date.getDay()]} ${date.getDate()} de ${MONTHS_LONG[date.getMonth()]}`}
            </p>

            {[{ label:'MANANA', data: amSlots }, { label:'TARDE', data: pmSlots }].map(({ label, data }) => (
              <div key={label} className="mb-4">
                <p className="text-[10px] font-bold text-white/25 tracking-widest mb-2">{label}</p>
                <div className="grid grid-cols-4 gap-2">
                  {data.map(s => {
                    const isBooked = bookedSlots.includes(s.label)
                    return (
                      <button
                        key={s.label}
                        disabled={isBooked || loading}
                        onClick={() => !isBooked && onTimeChange(s.label)}
                        className={cn(
                          'py-2.5 rounded-[10px] border text-[13px] font-medium transition-all duration-150',
                          isBooked && 'border-white/[.05] text-white/20 line-through cursor-not-allowed bg-transparent',
                          !isBooked && time !== s.label && 'border-white/[.08] bg-white/[.04] text-white/70 hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white cursor-pointer',
                          time === s.label && 'border-purple-500 bg-gradient-to-br from-purple-600/40 to-pink-500/30 text-white font-bold',
                        )}
                      >
                        {s.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}