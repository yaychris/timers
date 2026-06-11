import type { Workout } from './types'

export const workouts: Workout[] = [
  {
    name: 'Stretches',
    color: 'orange',
    preStartDuration: 15,
    setCount: 6,
    setDuration: 30,
    restDuration: 15,
  },
  {
    name: 'Tabata',
    color: 'blue',
    preStartDuration: 10,
    setCount: 8,
    setDuration: 20,
    restDuration: 10,
  },
  {
    name: 'Test',
    color: 'green',
    preStartDuration: 5,
    setCount: 2,
    setDuration: 5,
    restDuration: 5,
  },
]
