export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s === 0 ? `${m}m` : `${m}m ${s}s`
}

export function totalWorkoutDuration(workout: {
  preStartDuration: number
  setCount: number
  setDuration: number
  restDuration: number
}): number {
  const { preStartDuration, setCount, setDuration, restDuration } = workout
  return (
    preStartDuration + setCount * setDuration + (setCount - 1) * restDuration
  )
}
