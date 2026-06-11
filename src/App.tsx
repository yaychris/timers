import { useState } from 'react'
import type { Workout } from '@/types'
import WorkoutList from '@/components/WorkoutList'
import Timer from '@/components/Timer'
import Done from '@/components/Done'

type Screen =
  | { name: 'list' }
  | { name: 'timer'; workout: Workout }
  | { name: 'done' }

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'list' })

  if (screen.name === 'timer') {
    return (
      <Timer
        workout={screen.workout}
        onDone={() => setScreen({ name: 'done' })}
        onEnd={() => setScreen({ name: 'list' })}
      />
    )
  }

  if (screen.name === 'done') {
    return <Done onBack={() => setScreen({ name: 'list' })} />
  }

  return (
    <WorkoutList onStart={(workout) => setScreen({ name: 'timer', workout })} />
  )
}
