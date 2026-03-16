import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MapPin } from 'lucide-react'
import StepService  from './steps/StepService.jsx'
import StepDateTime from './steps/StepDateTime.jsx'
import StepClient   from './steps/StepClient.jsx'

const STEPS = [
  { id: 0, label: 'Servicio' },
  { id: 1, label: 'Fecha y Hora' },
  { id: 2, label: 'Tus Datos' },
]

export default function BookingFlow({ branch, onChangeBranch }) {
  const [step,    setStep]    = useState(0)
  const [service, setService] = useState(null)
  const [date,    setDate]    = useState(null)
  const [time,    setTime]    = useState(null)

  const reset = () => {
    setStep(0); setService(null); setDate(null); setTime(null)
  }

  // ¿Puede avanzar al siguiente paso?
  const canAdvance = () => {
    if (step === 0) return !!service
    if (step === 1) return !!date && !!time
    return false
  }

  const advance = () => { if (canAdvance() && step < 2) setStep(s => s+1) }
  const back    = () => { if (step > 0) setStep(s => s-1) }

  return (
    <section className="px-4 pt-8 pb-14">

      {/* ── Branch badge ── */}
      <motion.div
        initial={{ opacity:0, y:-8 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-6 px-1"
      >
        <div className="flex items-center gap-2">
          <MapPin size={13} className="text-purple-400" />
          <span className="text-[12px] text-white/40">Reservando en:</span>
          <span className="text-[12px] font-semibold text-white/75">{branch.name}</span>
        </div>
        <button
          onClick={onChangeBranch}
          className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors font-medium flex items-center gap-1"
        >
          <ArrowLeft size={11} />
          Cambiar
        </button>
      </motion.div>

      {/* ── Main card ── */}
      <motion.div
        initial={{ opacity:0, y:18 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="glass-strong rounded-[22px] overflow-hidden"
      >
        {/* Gradient top accent */}
        <div className={`h-[2px] w-full bg-gradient-to-r ${branch.gradient}`} />

        <div className="p-6">
          {/* ── Progress indicator ── */}
          {step < 3 && (
            <div className="mb-6">
              {/* Step labels */}
              <div className="flex justify-between mb-2 px-0.5">
                {STEPS.map(s => (
                  <span
                    key={s.id}
                    className={`text-[10px] font-medium transition-colors duration-300 ${
                      s.id === step
                        ? 'text-purple-300'
                        : s.id < step
                        ? 'text-white/40'
                        : 'text-white/20'
                    }`}
                  >
                    {s.id + 1}. {s.label}
                  </span>
                ))}
              </div>

              {/* Bar */}
              <div className="h-1 bg-white/[.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"
                  animate={{ width: `${((step + 1) / 3) * 100}%` }}
                  transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}
                />
              </div>
            </div>
          )}

          {/* ── Step content ── */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepService
                key="service"
                selected={service}
                onSelect={setService}
              />
            )}
            {step === 1 && (
              <StepDateTime
                key="datetime"
                service={service}
                date={date}
                time={time}
                onDateChange={setDate}
                onTimeChange={setTime}
                branch={branch}
              />
            )}
            {step === 2 && (
              <StepClient
                key="client"
                branch={branch}
                service={service}
                date={date}
                time={time}
                onReset={() => { reset(); onChangeBranch() }}
              />
            )}
          </AnimatePresence>

          {/* ── Navigation buttons (steps 0 y 1) ── */}
          {step < 2 && (
            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <button
                  onClick={back}
                  className="btn-ghost px-5 py-3.5 text-sm flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  Volver
                </button>
              )}

              <motion.button
                whileHover={canAdvance() ? { scale: 1.02 } : {}}
                whileTap={canAdvance()   ? { scale: 0.97 } : {}}
                onClick={advance}
                disabled={!canAdvance()}
                className="btn-primary flex-1 py-3.5 text-[15px]"
              >
                {step === 0
                  ? (service ? `Continuar con ${service.name} →` : 'Elegí un servicio')
                  : (date && time ? 'Continuar →' : 'Elegí día y hora')
                }
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Powered by */}
      <p className="text-center text-[11px] text-white/15 mt-6">
        Powered by{' '}
        <span className="gradient-text font-semibold">ClickBite</span>
        {' '}· WaaS Infrastructure
      </p>
    </section>
  )
}
