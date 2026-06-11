import { Button } from '@/components/ui/button'

interface Props {
  workoutName: string
  onBack: () => void
}

export default function Done({ workoutName, onBack }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-4xl font-semibold">Done!</h1>
      <p className="text-muted-foreground">{workoutName} complete.</p>
      <Button onClick={onBack}>Back to Workouts</Button>
    </div>
  )
}
