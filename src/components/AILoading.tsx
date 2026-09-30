import { useEffect, useState } from 'react'
import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
}

const steps = [
  { label: 'Reading your interests and worries…', duration: 600 },
  { label: 'Mapping career paths in Computer Engineering…', duration: 700 },
  { label: 'Identifying convergence points…', duration: 800 },
  { label: 'Connecting with Reality Guide data…', duration: 600 },
  { label: 'Building your personal graph…', duration: 700 },
]

export default function AILoading({ setScreen }: Props) {
  const [activeStep, setActiveStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let idx = 0
    const advance = () => {
      if (idx < steps.length - 1) {
        idx++
        setActiveStep(idx)
        setTimeout(advance, steps[idx].duration)
      } else {
        setTimeout(() => setDone(true), 500)
        setTimeout(() => setScreen('graph'), 1100)
      }
    }
    const timer = setTimeout(advance, steps[0].duration)
    return () => clearTimeout(timer)
  }, [setScreen])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        {/* Animated logo */}
        <div className="mb-10 flex items-center justify-center">
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 56 56" className="w-full h-full">
              <circle cx="28" cy="28" r="24" fill="none" stroke="#E5E2D6" strokeWidth="2.5" />
              <circle
                cx="28" cy="28" r="24"
                fill="none"
                stroke="#6C5CE7"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="150.8"
                strokeDashoffset={done ? 0 : 150.8 * (1 - activeStep / (steps.length - 1))}
                style={{ transition: 'stroke-dashoffset 0.6s ease', transformOrigin: '28px 28px', transform: 'rotate(-90deg)' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-primary font-semibold text-lg">lo</span>
            </div>
          </div>
        </div>

        <h2 className="font-display text-2xl font-medium text-foreground mb-2 animate-fade-in">
          {done ? 'Your path is ready.' : 'Generating your path…'}
        </h2>
        <p className="text-sm text-muted-foreground mb-10 animate-fade-in">
          {done ? 'This is a starting point. You\'ll shape it as you explore.' : 'This takes just a moment.'}
        </p>

        {/* Steps */}
        <div className="space-y-3 text-left">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-300 ${
                i < activeStep ? 'opacity-50' :
                i === activeStep ? 'opacity-100' :
                'opacity-20'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                i < activeStep ? 'bg-primary/20' :
                i === activeStep ? 'bg-primary' :
                'bg-border'
              }`}>
                {i < activeStep ? (
                  <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : i === activeStep ? (
                  <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse-dot" />
                ) : null}
              </div>
              <span className="text-sm text-foreground">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
