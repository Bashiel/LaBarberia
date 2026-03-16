import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BranchSelector from './components/BranchSelector.jsx'
import BookingFlow    from './components/BookingFlow.jsx'

/**
 * Estado global de la app:
 *   branch === null  →  mostrar selector de sucursales
 *   branch !== null  →  mostrar flujo de reserva para esa sucursal
 */
export default function App() {
  const [branch, setBranch] = useState(null)

  return (
    <div className="min-h-screen bg-[#08080e] max-w-[520px] mx-auto relative">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,.07) 0%, transparent 70%)' }} />
      </div>

      <AnimatePresence mode="wait">
        {!branch ? (
          <motion.div key="selector"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}
          >
            <BranchSelector onSelect={setBranch} />
          </motion.div>
        ) : (
          <motion.div key="booking"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}
          >
            <BookingFlow branch={branch} onChangeBranch={() => setBranch(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
