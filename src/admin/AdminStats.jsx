import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

function StatCard({ label, value, sub, color, delay = 0, bar }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/[.04] border border-white/[.07] rounded-xl p-3.5"
    >
      <p className="text-[10px] font-semibold tracking-widest uppercase text-white/40 mb-1.5">{label}</p>
      <p className={cn('font-display font-extrabold text-2xl leading-none', color ?? 'text-white')}>{value}</p>
      {sub && <p className="text-[11px] text-white/35 mt-1">{sub}</p>}
      {bar !== undefined && (
        <div className="h-1 bg-white/8 rounded-full mt-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(bar, 100)}%` }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
            className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
          />
        </div>
      )}
    </motion.div>
  )
}

export default function AdminStats({ turnos }) {
  const total = turnos.length
  const conf  = turnos.filter(t => t.status === 'confirmado').length
  const ing   = turnos.filter(t => t.status === 'confirmado').reduce((a, t) => a + t.precio, 0)
  const ocup  = Math.round((total / 11) * 100)

  const fmt = (n) => '$' + n.toLocaleString('es-AR')

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      <StatCard label="Turnos hoy"    value={total}             sub="+2 vs ayer"                 delay={0}   />
      <StatCard label="Confirmados"   value={conf}              sub={`${Math.round(conf/total*100)}% del total`} color="text-green-400" delay={0.06} />
      <StatCard label="Ingresos est." value={fmt(ing)}          sub="Solo confirmados"            color="text-purple-400" delay={0.12} />
      <StatCard label="Ocupación"     value={`${ocup}%`}        bar={ocup}                       delay={0.18} />
    </div>
  )
}
