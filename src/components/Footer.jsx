export default function Footer() {
  return (
    <footer className="border-t border-white/[.06] px-6 py-7 text-center">
      <div className="flex items-center justify-center gap-2.5 mb-2">
        <span className="text-2xl leading-none">💈</span>
        <span className="font-display font-bold text-base text-white/70">La Barbería</span>
      </div>
      <p className="text-white/20 text-[11px] mb-3">Reservas online · Sistema BarberSync</p>
      <div className="inline-flex items-center gap-1.5">
        <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-[8px] font-bold text-white">CB</div>
        <span className="text-white/18 text-[11px]">
          Powered by <span className="text-purple-400/60 font-semibold">ClickBite</span>
        </span>
      </div>
    </footer>
  )
}
