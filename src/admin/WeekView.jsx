import { motion } from 'framer-motion'
import { WEEK_DATA } from './mockData'

const SERVICES = [
  { name: 'Combo Completo',   pct: 42, color: 'from-purple-600 to-pink-500' },
  { name: 'Corte de Cabello', pct: 35, color: 'from-pink-500 to-pink-500' },
  { name: 'Arreglo de Barba', pct: 23, color: 'from-orange-500 to-orange-500' },
]

export default function WeekView() {
  const max = Math.max(...WEEK_DATA.map(d => d.turnos))

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: 'Turnos semana', value: '38', color: 'text-white' },
          { label: 'Ingresos totales', value: '$57.000', color: 'text-purple-400' },
          { label: 'Cancelaciones', value: '3', color: 'text-red-400' },
          { label: 'Clientes nuevos', value: '11', color: 'text-green-400' },
        ].map(({ label, value, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white/[.04] border border-white/[.07] rounded-xl p-3.5"
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase text-white/40 mb-1">{label}</p>
            <p className={`font-display font-extrabold text-2xl leading-none ${color}`}>{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Bar chart */}
      <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mb-3">Turnos por día</p>
      <div className="glass rounded-xl p-4 mb-4">
        <div className="flex items-end justify-between h-20 gap-1.5">
          {WEEK_DATA.map(({ dia, turnos, hoy }, i) => {
            const h = Math.round((turnos / max) * 72)
            return (
              <div key={dia} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: h }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
                  className={`w-full rounded-t-sm flex items-end justify-center pb-1 ${
                    hoy
                      ? 'bg-gradient-to-t from-purple-600 to-pink-500'
                      : 'bg-purple-500/25'
                  }`}
                  style={{ minHeight: 8 }}
                >
                  <span className={`text-[10px] font-bold ${hoy ? 'text-white' : 'text-white/50'}`}>{turnos}</span>
                </motion.div>
                <span className={`text-[10px] ${hoy ? 'text-purple-300 font-bold' : 'text-white/35'}`}>
                  {dia}{hoy ? ' ★' : ''}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Services breakdown */}
      <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mb-3">Servicio más solicitado</p>
      <div className="glass rounded-xl p-4">
        {SERVICES.map(({ name, pct, color }, i) => (
          <div key={name} className={i < SERVICES.length - 1 ? 'mb-3' : ''}>
            <div className="flex justify-between text-[13px] mb-1.5">
              <span>{name}</span>
              <span className="font-semibold text-purple-300">{pct}%</span>
            </div>
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.7, delay: i * 0.1 + 0.2 }}
                className={`h-full bg-gradient-to-r ${color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
