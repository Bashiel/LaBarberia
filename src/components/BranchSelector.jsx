import { motion } from 'framer-motion'
import { ChevronRight, MapPin, Scissors } from 'lucide-react'
import { BRANCHES } from '../lib/constants'

const cardVariants = {
  hidden:   { opacity: 0, y: 32, scale: 0.96 },
  visible:  (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22,1,0.36,1] },
  }),
}

export default function BranchSelector({ onSelect }) {
  return (
    <section className="px-4 pt-12 pb-16">

      {/* ── Hero ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        {/* Live pill */}
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/[.08] bg-white/[.04]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[11px] text-white/50 font-medium tracking-wide">
            BarberSync · Reservas 24/7
          </span>
        </div>

        {/* Icon */}
        <motion.div
  animate={{ y: [0,-8,0] }}
  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
  className="mb-4"
>
  <img
    src="/favicon.png"
    alt="La Barbería"
    className="w-24 h-24 object-contain mx-auto"
  />
</motion.div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-[clamp(34px,10vw,52px)] leading-[1.05] mb-3">
          La Barbería
        </h1>
        <p className="text-white/50 text-[clamp(15px,4vw,18px)] leading-snug max-w-xs mx-auto">
          Elegí tu sucursal para reservar
        </p>
      </motion.div>

      {/* ── Branch cards ────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        {BRANCHES.map((branch, i) => (
          <motion.button
            key={branch.id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.975 }}
            onClick={() => onSelect(branch)}
            className="relative w-full text-left overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            {/* Glass base */}
            <div className="absolute inset-0 bg-white/[.04] backdrop-blur-xl border border-white/[.07] rounded-2xl" />

            {/* Gradient accent – top border */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${branch.gradient} opacity-80`} />

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-400 rounded-2xl"
              style={{ background: `radial-gradient(ellipse at 15% 50%, rgba(${branch.glowRgba},.18) 0%, transparent 65%)` }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-4 px-5 py-5">
              {/* Icon chip */}
              <div
                className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-[24px] flex-shrink-0 border border-white/[.09]"
                style={{ background: `linear-gradient(135deg, rgba(${branch.glowRgba},.22), rgba(${branch.glowRgba},.07))` }}
              >
                {branch.emoji}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 bg-gradient-to-r ${branch.gradient} bg-clip-text`}
                  style={{ WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}
                >
                  {branch.tag}
                </p>
                <p className="font-display font-bold text-[15px] text-white leading-snug">
                  {branch.name}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={10} className="text-white/25" />
                  <span className="text-[11px] text-white/30">Tap para reservar</span>
                </div>
              </div>

              {/* Arrow */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${branch.gradient}`}
                style={{ opacity: 0.9 }}
              >
                <ChevronRight size={17} className="text-white" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* ── Footer ──────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-[11px] text-white/20 mt-10"
      >
        Powered by{' '}
        <span className="gradient-text font-semibold">ClickBite</span>
        {' '}· WaaS Infrastructure
      </motion.p>
    </section>
  )
}
