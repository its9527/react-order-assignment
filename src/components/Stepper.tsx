interface StepperProps {
  steps: string[]
  currStep: number
}

export default function Stepper({ currStep, steps }: StepperProps) {
  return (
    <ul className='steps'>
      {steps.map((name) => (
        <li key={name} className='step'>
          {name}
        </li>
      ))}
    </ul>
  )
}
