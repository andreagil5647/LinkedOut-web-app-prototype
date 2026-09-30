import { useState } from 'react'
import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
}

const interests = [
  'Artificial Intelligence', 'Machine Learning', 'Software Engineering',
  'Data Science', 'Product Management', 'Backend Development',
  'Research', 'Entrepreneurship', 'UX / Design', 'Security',
  'Cloud / DevOps', 'Computer Vision', 'NLP / LLMs',
]

const worries = [
  'Choosing the wrong path', 'Not being good enough',
  'Missing out on better opportunities', 'Disappointing my family',
  'Debt from further education', 'Wasting years on something I\'ll hate',
  'Not knowing what I enjoy', 'Peers seem more certain than me',
]

const directions = [
  { id: 'work', label: 'Work first', desc: 'Jump into industry, gain experience, figure it out' },
  { id: 'msc', label: 'Master\'s degree', desc: 'Deepen expertise, delay the decision a bit' },
  { id: 'phd', label: 'PhD / Research', desc: 'Pursue academic research long-term' },
  { id: 'undecided', label: 'Genuinely undecided', desc: 'I have no idea — that\'s why I\'m here' },
]

export default function Onboarding({ setScreen }: Props) {
  const [step, setStep] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Artificial Intelligence', 'Software Engineering'])
  const [selectedWorries, setSelectedWorries] = useState<string[]>(['Choosing the wrong path', 'Not knowing what I enjoy'])
  const [selectedDirection, setSelectedDirection] = useState('undecided')
  const [freeText, setFreeText] = useState("I like AI and software development, but I don't know if I should work first, do a Master's, or whether research is really for me.")

  const totalSteps = 5

  const toggleInterest = (i: string) =>
    setSelectedInterests(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )

  const toggleWorry = (w: string) =>
    setSelectedWorries(prev =>
      prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w]
    )

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(s => s + 1)
    else setScreen('loading')
  }

  const stepTitles = [
    'Tell us about yourself',
    'What are you into?',
    'What worries you?',
    'Which direction feels closest?',
    'Tell LinkedOut what\'s on your mind',
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-display text-2xl font-semibold text-foreground">
            Linked<span className="text-primary">Out</span>
          </span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1.5 mb-8 justify-center">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i < step ? 'bg-primary w-8' :
                i === step ? 'bg-primary w-12' :
                'bg-border w-4'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <div className="mb-6">
            <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
              Step {step + 1} of {totalSteps}
            </div>
            <h2 className="font-display text-2xl font-medium text-foreground"
              style={{ fontStyle: step === 4 ? 'italic' : 'normal' }}>
              {stepTitles[step]}
            </h2>
          </div>

          {/* Step 0 — basic info */}
          {step === 0 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Your name</label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  defaultValue="Laura Martín"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Degree</label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  defaultValue="Computer Engineering"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Year</label>
                <div className="flex gap-2">
                  {['2nd', '3rd', 'Final'].map(y => (
                    <button
                      key={y}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                        y === 'Final'
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-muted-foreground hover:border-primary/40'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — interests */}
          {step === 1 && (
            <div className="animate-fade-in">
              <p className="text-sm text-muted-foreground mb-4">Select all that feel relevant — you can change these later.</p>
              <div className="flex flex-wrap gap-2">
                {interests.map(i => (
                  <button
                    key={i}
                    onClick={() => toggleInterest(i)}
                    className={`px-3.5 py-1.5 rounded-full border text-sm transition-all ${
                      selectedInterests.includes(i)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — worries */}
          {step === 2 && (
            <div className="animate-fade-in">
              <p className="text-sm text-muted-foreground mb-4">These are more common than you think.</p>
              <div className="flex flex-wrap gap-2">
                {worries.map(w => (
                  <button
                    key={w}
                    onClick={() => toggleWorry(w)}
                    className={`px-3.5 py-1.5 rounded-full border text-sm transition-all ${
                      selectedWorries.includes(w)
                        ? 'bg-accent/10 text-accent border-accent/30'
                        : 'border-border text-muted-foreground hover:border-accent/30 hover:text-foreground'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 — direction */}
          {step === 3 && (
            <div className="space-y-3 animate-fade-in">
              {directions.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDirection(d.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    selectedDirection === d.id
                      ? 'border-primary/50 bg-secondary'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                      selectedDirection === d.id
                        ? 'border-primary bg-primary'
                        : 'border-border'
                    }`} />
                    <div>
                      <div className="text-sm font-semibold text-foreground">{d.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{d.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 4 — free text */}
          {step === 4 && (
            <div className="animate-fade-in">
              <p className="text-sm text-muted-foreground mb-4">
                No right answers. This helps us personalise your exploration.
              </p>
              <textarea
                value={freeText}
                onChange={e => setFreeText(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm leading-relaxed resize-none"
                placeholder="I like AI and software development, but I don't know if I should work first, do a Master's, or whether research is really for me."
              />
              <div className="mt-2 text-xs text-muted-foreground text-right">{freeText.length} characters</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          {step > 0 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={handleNext}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            {step === totalSteps - 1 ? 'Generate my path →' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  )
}
