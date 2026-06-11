I'd like to make a static CSA to manage exercise timers.

Specific requirements are:

- A single pre-start duration: the amount of time to countdown before the first set starts.
- A number of sets.
- A duration for each set.
- A duration for the rest time between sets.

I want to specify these times per workout. Each workout should have a JavaScript object specifying those times, plus a name. Something like this:

```javascript
{
    name: 'Stretches',
    preStartDuration: 15, // seconds
    setCount: 6,
    setDuration: 30,
    restDuration: 15,
}
```

The app should:

- show me a list of workouts loaded from those JS objects
- let me pick one and show a start button
- show a large countdown timer in the middle of the screen
- automatically cycle through the sets and rest periods until all sets have been worked

The tech stack should be:

- TypeScript
- React
- Vite
- shadcn

The build should produce a static web app I can deploy to something like Netlify.

I'd like to discuss the plan in detail before starting to write code. Once we start writing code, I want to work iteratively, doing one small piece at a time.
