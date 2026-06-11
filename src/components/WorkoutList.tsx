import type { TneColor, Workout } from '@/types'
import { workouts } from '@/workouts'
import { Card, CardContent } from '@/components/ui/card'
import { formatDuration, formatTime, totalWorkoutDuration } from '@/lib/time'

function tneColorVar(color: TneColor): string {
  return `var(--color-tne-${color})`
}

interface Props {
  onStart: (workout: Workout) => void
}

export default function WorkoutList({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h1 className="text-3xl font-semibold font-mono pt-8">Workouts</h1>
      <ul className="flex flex-col w-full">
        {workouts.map((workout) => (
          <li key={workout.name}>
            <Card
              className="cursor-pointer transition-opacity hover:opacity-90 overflow-hidden rounded-none border-transparent"
              style={{ backgroundColor: tneColorVar(workout.color) }}
              onClick={() => onStart(workout)}
            >
              <CardContent className="py-3 px-8 flex flex-col gap-3 w-full max-w-2xl mx-auto">
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-semibold font-mono text-tne-bg">
                    {workout.name}
                  </span>
                  <span className="text-base font-mono text-tne-bg">
                    {formatTime(totalWorkoutDuration(workout))}
                  </span>
                </div>
                <div
                  className="flex gap-4 text-base"
                  style={{ color: 'rgba(45,45,45,0.7)' }}
                >
                  <span>
                    {workout.setCount} {workout.setCount === 1 ? 'set' : 'sets'}
                  </span>
                  <span>{formatDuration(workout.setDuration)} work</span>
                  <span>{formatDuration(workout.restDuration)} rest</span>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
