import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, X } from 'lucide-react'
import type { Workout } from '@/types'
import { formatTime } from '@/lib/time'

type Phase = 'prestart' | 'set' | 'rest'

interface TimerState {
  phase: Phase
  currentSet: number
  timeRemaining: number
  done?: boolean
}

interface Props {
  workout: Workout
  onDone: () => void
  onEnd: () => void
}

function metaLabel(state: TimerState, setCount: number): string {
  const set = state.phase === 'prestart' ? 1 : state.currentSet
  return `${set} of ${setCount}`
}

function nextPhaseLabel(state: TimerState, workout: Workout): string {
  if (state.phase === 'prestart' || state.phase === 'rest') return 'Work'
  if (state.currentSet >= workout.setCount) return 'Done'
  return 'Rest'
}

function nextPhaseDuration(state: TimerState, workout: Workout): number | null {
  if (state.phase === 'prestart' || state.phase === 'rest')
    return workout.setDuration
  if (state.currentSet >= workout.setCount) return null
  return workout.restDuration
}

function totalTimeRemaining(state: TimerState, workout: Workout): number {
  const { setDuration, restDuration, setCount } = workout
  if (state.phase === 'prestart') {
    return (
      state.timeRemaining +
      setCount * setDuration +
      (setCount - 1) * restDuration
    )
  }
  if (state.phase === 'set') {
    const setsLeft = setCount - state.currentSet
    return (
      state.timeRemaining + setsLeft * setDuration + setsLeft * restDuration
    )
  }
  // rest: currentSet is the set just finished
  const setsLeft = setCount - state.currentSet
  return (
    state.timeRemaining + setsLeft * setDuration + (setsLeft - 1) * restDuration
  )
}

function advance(state: TimerState, workout: Workout): TimerState | 'done' {
  if (state.phase === 'prestart') {
    return { phase: 'set', currentSet: 1, timeRemaining: workout.setDuration }
  }
  if (state.phase === 'set') {
    if (state.currentSet >= workout.setCount) return 'done'
    return {
      phase: 'rest',
      currentSet: state.currentSet,
      timeRemaining: workout.restDuration,
    }
  }
  // rest
  return {
    phase: 'set',
    currentSet: state.currentSet + 1,
    timeRemaining: workout.setDuration,
  }
}

export default function Timer({ workout, onDone, onEnd }: Props) {
  const initialState: TimerState = {
    phase: 'prestart',
    currentSet: 0,
    timeRemaining: workout.preStartDuration,
  }

  const [state, setState] = useState<TimerState>(initialState)
  const [paused, setPaused] = useState(true)

  function restart() {
    setState({ ...initialState, done: false })
    setPaused(false)
  }

  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    if (state.done) {
      onDoneRef.current()
    }
  }, [state.done])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setState((prev) => {
        if (prev.done) return prev
        if (prev.timeRemaining > 1) {
          return { ...prev, timeRemaining: prev.timeRemaining - 1 }
        }
        const next = advance(prev, workout)
        if (next === 'done') return { ...prev, timeRemaining: 0, done: true }
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [workout, paused])

  const phaseColors: Record<Phase, string> = {
    prestart: 'var(--color-tne-purple)',
    set: 'var(--color-tne-green)',
    rest: 'var(--color-tne-orange)',
  }

  const phaseColor = phaseColors[state.phase]

  const nextColor =
    state.phase === 'prestart' || state.phase === 'rest'
      ? phaseColors.set
      : state.currentSet >= workout.setCount
        ? null
        : phaseColors.rest

  return (
    <div className="flex flex-col items-center justify-start md:justify-center min-h-screen gap-6">
      <p className="text-lg font-medium text-muted-foreground tabular-nums flex items-center gap-3">
        <span>{formatTime(totalTimeRemaining(state, workout))}</span>
        <span className="text-muted-foreground/40">|</span>
        <span>{metaLabel(state, workout.setCount)}</span>
      </p>
      <div className="flex flex-col w-full">
        <div
          className="flex flex-col items-center gap-4 w-full py-8 px-12"
          style={{ backgroundColor: phaseColor, color: '#2d2d2d' }}
        >
          <p className="text-7xl font-bold font-mono text-center">
            {state.phase === 'prestart'
              ? 'Ready'
              : state.phase === 'set'
                ? 'Work'
                : 'Rest'}
          </p>
          <p className="text-8xl font-mono font-semibold tabular-nums">
            {formatTime(state.timeRemaining)}
          </p>
        </div>
        <div
          className="flex flex-col items-center gap-1 w-full py-4"
          style={
            nextColor
              ? { backgroundColor: nextColor, color: '#2d2d2d' }
              : { color: 'var(--color-muted-foreground)' }
          }
        >
          <p className="text-2xl font-bold font-mono">
            {nextPhaseLabel(state, workout)}
          </p>
          <p
            className="text-4xl font-mono font-semibold tabular-nums"
            style={{
              visibility:
                nextPhaseDuration(state, workout) !== null
                  ? 'visible'
                  : 'hidden',
            }}
          >
            {formatTime(nextPhaseDuration(state, workout) ?? 0)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <button
          className="w-24 h-24 rounded-full flex items-center justify-center transition-colors bg-foreground text-background hover:bg-foreground/80"
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? (
            <Play size={40} fill="currentColor" />
          ) : (
            <Pause size={40} fill="currentColor" />
          )}
        </button>
        <div className="flex gap-3">
          <button
            className="w-16 h-16 rounded-full flex items-center justify-center border border-border transition-colors hover:bg-accent"
            onClick={restart}
          >
            <RotateCcw size={24} />
          </button>
          <button
            className="w-16 h-16 rounded-full flex items-center justify-center border border-border transition-colors hover:bg-accent"
            onClick={onEnd}
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}
