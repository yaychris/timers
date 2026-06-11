import type { Workout } from './types'

export const workouts: Workout[] = [
  {
    name: 'Wrist stretch',
    color: 'purple',
    preStartDuration: 15,
    setCount: 6,
    setDuration: 30,
    restDuration: 10,
  },
  {
    name: 'Iso wrist extension',
    color: 'blue',
    preStartDuration: 10,
    setCount: 5,
    setDuration: 45,
    restDuration: 60,
  },
  {
    name: 'Rice bucket',
    color: 'aqua',
    preStartDuration: 10,
    setCount: 6,
    setDuration: 30,
    restDuration: 15,
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
