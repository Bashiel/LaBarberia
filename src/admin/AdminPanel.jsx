import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, BarChart2, Lock, LogOut } from 'lucide-react'
import AdminStats from './AdminStats.jsx'
import TurnoRow from './TurnoRow.jsx'
import WeekView from './WeekView.jsx'
import BlockSlots from './BlockSlots.jsx'
import { TURNOS_HOY } from './mockData'

const TABS = [
  { id: 'hoy',      label: 'Hoy',              Icon: Calendar   },
  { id: 'semana',   label: 'Esta semana',       Icon: BarChart2  },
  { id: 'bloquear', label: 'Bloquear horarios', Icon: Lock       },
]

function useClock() {
  const [time, setTime] = useState(new Date())
  // In a real app, use useEffect with setInterval
  return time
}

export default function AdminPanel({ onExit }) {
  const [tab, setTab]       = useState('hoy')
  const [turnos, setTurnos] = useState(TURNOS_HOY.map(t => ({ ...t })))

  const handleAction = (id, newStatus) =>
    setTurnos(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))

  const now = new Date()
  const dias = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
  const dateStr = `${dias[now.getDay()]} ${now.getDate()} ${meses[now.getMonth()]}`

  return (
    <div className="min-h-screen bg-[#08080e] text-white max-w-[520px] mx-auto">
      {/* Navbar */}
      <nav className="sticky top-0 z-20 bg-[#08080e]/95 backdrop-blur border-b border-white/[.07] px-4 h-13 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
            BS
          </div>
          <div>
            <p className="font-display font-bold text-[13px] leading-none">BarberSync</p>
            <p className="text-[10px] text-white/35 leading-none mt-0.5">Panel Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <p className="text-[12px] font-semibold">{dateStr}</p>
            <p className="text-[10px] text-white/40">{String(now.getHours()).padStart(2,'0')}:{String(now.getMinutes()).padStart(2,'0')}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-[12px] font-bold text-white">
            MR
          </div>
          {onExit && (
            <button onClick={onExit} className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors">
              <LogOut size={15} />
            </button>
          )}
        </div>
      </nav>

      <div className="px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
                tab === id
                  ? 'bg-purple-500/15 text-purple-200 border border-purple-400/25'
                  : 'text-white/40 border border-transparent hover:text-white/70'
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'hoy' && (
            <motion.div key="hoy" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.25 }}>
              <AdminStats turnos={turnos} />
              <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mb-3">Turnos del día</p>
              {turnos.map((t, i) => (
                <TurnoRow key={t.id} turno={t} onAction={handleAction} index={i} />
              ))}
            </motion.div>
          )}
          {tab === 'semana' && (
            <motion.div key="semana" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.25 }}>
              <WeekView />
            </motion.div>
          )}
          {tab === 'bloquear' && (
            <motion.div key="bloquear" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.25 }}>
              <BlockSlots />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
