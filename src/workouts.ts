import type { Workout } from './types'

export const workouts: Workout[] = [
  {
    name: 'Wrist stretch',
    color: 'orange',
    preStartDuration: 10,
    setCount: 6,
    setDuration: 30,
    restDuration: 10,
  },
  {
    name: 'Rice bucket',
    color: 'yellow',
    preStartDuration: 10,
    setCount: 6,
    setDuration: 30,
    restDuration: 15,
  },
  {
    name: 'Iso wrist extension',
    color: 'green',
    preStartDuration: 10,
    setCount: 5,
    setDuration: 45,
    restDuration: 60,
  },
  {
    name: 'Test',
    color: 'aqua',
    preStartDuration: 5,
    setCount: 2,
    setDuration: 5,
    restDuration: 5,
  },
]
