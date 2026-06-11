export type TneColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'aqua'
  | 'blue'
  | 'purple'

export interface Workout {
  name: string
  color: TneColor
  preStartDuration: number // seconds
  setCount: number
  setDuration: number // seconds
  restDuration: number // seconds
}
