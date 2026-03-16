import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, MessageCircle } from 'lucide-react'
import { DAYS_LONG, MONTHS_LONG } from '../../lib/constants'
import { buildWAMessage } from '../../lib/utils'
import { supabase } from '../../lib/supabase'

function WhatsAppSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}

export default function StepClient({ branch, service, date, time, onReset }) {
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [done,    setDone]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const dateStr = date
    ? `${DAYS_LONG[date.getDay()]} ${date.getDate()} de ${MONTHS_LONG[date.getMonth()]}`
    : ''

  const fechaISO = date ? date.toISOString().split('T')[0] : ''
  const canConfirm = name.trim().length >= 2 && phone.trim().length >= 7 && !loading

  const handleConfirm = async () => {
    if (!canConfirm) return
    setLoading(true)
    setError(null)

    // Guardar el turno en Supabase
    const { error: dbError } = await supabase
      .from('turnos')
      .insert({
        sucursal: branch.name,
        fecha: fechaISO,
        hora: time,
        servicio: service.name,
        cliente: name.trim(),
      })

    if (dbError) {
      setError('Hubo un problema al guardar el turno. Intentá de nuevo.')
      setLoading(false)
      return
    }

    // Abrir WhatsApp con el mensaje
    const msg = buildWAMessage({ branch, service, dateStr, timeStr: time, clientName: name.trim() })
    const url = `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(msg)}`
    setDone(true)
    setLoading(false)
    setTimeout(() => window.open(url, '_blank'), 350)
  }

  // Pantalla de éxito
  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="text-center py-2"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, delay: 0.1 }}
          className="w-20 h-20 rounded-full border-2 border-green-400/40 bg-green-400/10 flex items-center justify-center mx-auto mb-4 text-[40px]"
        >
          ✅
        </motion.div>

        <h3 className="font-display font-bold text-xl mb-1">Turno confirmado!</h3>
        <p className="text-white/40 text-sm mb-6">
          Se abrio WhatsApp listo para enviar a{' '}
          <span className="text-white/70 font-medium">{branch.name}</span>.
        </p>

        <div className="glass rounded-2xl p-4 mb-6 text-left space-y-2.5">
          {[
            { l:'Sucursal', v: branch.name },
            { l:'Servicio', v: service.name },
            { l:'Dia',      v: dateStr },
            { l:'Hora',     v: `${time} hs` },
            { l:'Cliente',  v: name },
          ].map(row => (
            <div key={row.l} className="flex items-center justify-between">
              <span className="text-white/35 text-[12px]">{row.l}</span>
              <span className="text-white/80 text-[13px] font-semibold text-right max-w-[60%] leading-tight">{row.v}</span>
            </div>
          ))}
        </div>

        <button onClick={onReset} className="btn-ghost w-full py-3 text-sm">
          Hacer otra reserva
        </button>
      </motion.div>
    )
  }

  // Formulario
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
    >
      <p className="text-white/45 text-[13px] mb-5">Ultimo paso: tus datos para la reserva.</p>

      {/* Resumen */}
      <div className="glass rounded-xl px-4 py-3 mb-5 grid grid-cols-2 gap-x-4 gap-y-2">
        {[
          { l:'Servicio', v: service.name },
          { l:'Precio',   v: service.price },
          { l:'Fecha',    v: dateStr },
          { l:'Hora',     v: `${time} hs` },
        ].map(r => (
          <div key={r.l}>
            <p className="text-white/30 text-[10px] uppercase tracking-wider">{r.l}</p>
            <p className="text-white/80 text-[13px] font-semibold leading-snug">{r.v}</p>
          </div>
        ))}
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="relative">
          <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={40}
            placeholder="Tu nombre completo"
            className="w-full bg-white/[.05] border border-white/[.08] rounded-xl pl-10 pr-4 py-3.5 text-[14px] text-white placeholder-white/25 outline-none focus:border-purple-500/60 focus:bg-white/[.07] transition-all font-body"
          />
        </div>
        <div className="relative">
          <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/[^0-9+\s\-()\b]/g, ''))}
            maxLength={20}
            placeholder="Numero de telefono"
            className="w-full bg-white/[.05] border border-white/[.08] rounded-xl pl-10 pr-4 py-3.5 text-[14px] text-white placeholder-white/25 outline-none focus:border-purple-500/60 focus:bg-white/[.07] transition-all font-body"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-[12px] mb-4 text-center">{error}</p>
      )}

      {/* WhatsApp notice */}
      <div className="flex items-start gap-2.5 bg-green-500/[.06] border border-green-400/15 rounded-[13px] p-3 mb-5">
        <MessageCircle size={15} className="text-green-400 flex-shrink-0 mt-0.5" />
        <p className="text-[12px] text-white/40 leading-relaxed">
          Se abrira <span className="text-green-400 font-semibold">WhatsApp</span> con el mensaje
          listo para enviar a <span className="text-white/60">{branch.name}</span>.
        </p>
      </div>

      {/* Boton confirmar */}
      <motion.button
        whileHover={canConfirm ? { scale: 1.02 } : {}}
        whileTap={canConfirm ? { scale: 0.97 } : {}}
        onClick={handleConfirm}
        disabled={!canConfirm}
        className="w-full py-4 rounded-[14px] font-bold text-[15px] flex items-center justify-center gap-2.5 transition-all"
        style={canConfirm
          ? { background: 'linear-gradient(135deg,#128C7E,#25D366)', boxShadow: '0 10px 28px rgba(37,211,102,.25)', color: '#fff' }
          : { background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.25)', cursor: 'not-allowed' }
        }
      >
        <WhatsAppSVG />
        {loading ? 'Guardando...' : canConfirm ? 'Confirmar Turno por WhatsApp' : 'Completa los datos'}
      </motion.button>
    </motion.div>
  )
}