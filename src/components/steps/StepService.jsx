import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { SERVICES } from '../../lib/constants'

export default function StepService({ selected, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
    >
      <p className="text-white/45 text-[13px] mb-5">
        Elegí el servicio. El precio final se abona en el local.
      </p>

      <div className="flex flex-col gap-3">
        {SERVICES.map((svc, i) => {
          const isSelected = selected?.id === svc.id
          return (
            <motion.button
              key={svc.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => onSelect(svc)}
              className={`relative w-full text-left overflow-hidden rounded-[14px] p-4 border transition-all duration-250 outline-none
                ${isSelected
                  ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_0_1px_rgba(168,85,247,.3),0_8px_32px_rgba(124,58,237,.2)]'
                  : 'border-white/[.07] bg-white/[.04] hover:border-purple-400/30 hover:bg-purple-500/[.06]'
                }`}
            >
              <div className="flex-1 min-w-0">
  <div className="flex items-center gap-2">
    <p className="font-display font-bold text-[15px] text-white">{svc.name}</p>
    {svc.hot && (
      <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
        HOT
      </span>
    )}
  </div>
  <p className="text-white/40 text-[12px] mt-0.5">{svc.desc}</p>
</div>
              <div className="flex items-center gap-3.5">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[22px] flex-shrink-0
                  ${isSelected ? 'bg-purple-500/20' : 'bg-white/[.05]'}`}
                >
                  {svc.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-[15px] text-white">{svc.name}</p>
                  <p className="text-white/40 text-[12px] mt-0.5">{svc.desc}</p>
                </div>

                {/* Price + check */}
                <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                  <p className="font-display font-bold text-base gradient-text">{svc.price}</p>
                  <p className="text-white/30 text-[11px]">{svc.durationLabel}</p>
                  {isSelected && <CheckCircle size={15} className="text-purple-400" />}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
