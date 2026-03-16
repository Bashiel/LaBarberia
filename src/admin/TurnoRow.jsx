import { motion } from 'framer-motion'
import { Check, X, MessageCircle } from 'lucide-react'

const STATUS_CONFIG = {
  pendiente:  { label: 'Pendiente',  cls: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/20' },
  confirmado: { label: 'Confirmado', cls: 'bg-green-400/10 text-green-400 border-green-400/20' },
  cancelado:  { label: 'Cancelado',  cls: 'bg-red-400/10 text-red-400 border-red-400/20' },
}

export default function TurnoRow({ turno, onAction, index }) {
  const { label, cls } = STATUS_CONFIG[turno.status]
  const fmt = (n) => '$' + n.toLocaleString('es-AR')

  const sendWA = () => {
    const msg =
      `Hola ${turno.nombre}! 👋 Te confirmamos tu turno en BarberSync:\n` +
      `✂️ ${turno.servicio}\n⏰ ${turno.hora}hs\n¡Te esperamos!`
    window.open(`https://wa.me/${turno.tel}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white/[.03] border border-white/[.06] rounded-xl p-3 mb-2 hover:border-purple-400/15 transition-colors"
      style={{ opacity: turno.status === 'cancelado' ? 0.6 : 1 }}
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {/* Time badge */}
          <div className="bg-gradient-to-br from-purple-600/25 to-pink-500/15 border border-purple-400/20 rounded-lg px-2 py-1.5 text-center flex-shrink-0">
            <p className="font-display font-extrabold text-[13px] text-purple-200 leading-none">{turno.hora}</p>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[14px] truncate">{turno.nombre}</p>
            <p className="text-[12px] text-white/45 mt-0.5">
              {turno.servicio} · <span className="text-purple-400 font-semibold">{fmt(turno.precio)}</span>
            </p>
          </div>
        </div>
        <span className={`badge text-[11px] font-semibold border rounded-full px-2 py-0.5 flex-shrink-0 ${cls}`}>{label}</span>
      </div>

      {turno.status !== 'cancelado' && (
        <div className="flex gap-2 mt-2.5 flex-wrap">
          {turno.status === 'pendiente' && (
            <button
              onClick={() => onAction(turno.id, 'confirmado')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-green-400/10 text-green-400 border border-green-400/20 hover:bg-green-400/20 transition-colors"
            >
              <Check size={12} />Confirmar
            </button>
          )}
          <button
            onClick={() => onAction(turno.id, 'cancelado')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-red-400/10 text-red-400 border border-red-400/20 hover:bg-red-400/20 transition-colors"
          >
            <X size={12} />Cancelar
          </button>
          <button
            onClick={sendWA}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20 transition-colors"
          >
            <MessageCircle size={12} />WA
          </button>
        </div>
      )}
    </motion.div>
  )
}
