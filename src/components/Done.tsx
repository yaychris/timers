import { useEffect } from 'react'
import { Check } from 'lucide-react'
import confetti from 'canvas-confetti'

interface Props {
  onBack: () => void
}

export default function Done({ onBack }: Props) {
  useEffect(() => {
    const colors = ['#99cc99', '#cc99cc', '#f99157', '#66cccc', '#6699cc', '#f2777a']
    const end = Date.now() + 1200

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }

    frame()
  }, [])

  return (
    <div className="flex flex-col items-center justify-start md:justify-center min-h-screen gap-6 pt-56 md:pt-0">
      <h1 className="text-7xl font-bold font-mono">Done!</h1>
<button
        className="w-24 h-24 rounded-full flex items-center justify-center transition-colors bg-tne-green text-tne-bg hover:bg-tne-green/80"
        onClick={onBack}
      >
        <Check size={40} strokeWidth={3} />
      </button>
    </div>
  )
}
