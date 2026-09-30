import { useState } from 'react'
import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
}

type Answer = 'true' | 'partial' | 'false' | null

interface Assumption {
  id: string
  claim: string
  reality: string
  yourAnswer: Answer
  actualAnswer: 'true' | 'partial' | 'false'
}

const assumptions: Assumption[] = [
  {
    id: 'a1',
    claim: 'I need a Master\'s degree to become an Applied AI Engineer.',
    reality: 'Many Applied AI Engineers started directly as Software Engineers. A Master\'s deepens knowledge but is rarely a hard requirement at most product companies.',
    yourAnswer: null,
    actualAnswer: 'partial',
  },
  {
    id: 'a2',
    claim: 'Most of the job is training and tuning machine learning models.',
    reality: 'In production, most time is spent on data pipelines, system integration, monitoring, and debugging. Model work is typically 15–25% of the role.',
    yourAnswer: null,
    actualAnswer: 'false',
  },
  {
    id: 'a3',
    claim: 'The role requires very strong mathematical skills (linear algebra, statistics).',
    reality: 'Mathematical intuition helps — you should understand what\'s happening inside models — but you don\'t need to derive algorithms from scratch. Most hiring focuses on coding and systems thinking.',
    yourAnswer: null,
    actualAnswer: 'partial',
  },
  {
    id: 'a4',
    claim: 'Applied AI Engineers work mostly alone on research-style problems.',
    reality: 'You\'re embedded in a product team. Daily collaboration with engineers, PMs, and designers is the norm. It\'s much more like SWE than academic research.',
    yourAnswer: null,
    actualAnswer: 'false',
  },
]

const answerLabels = {
  true: { label: 'True', color: 'bg-emerald-50 border-emerald-300 text-emerald-800' },
  partial: { label: 'Partially true', color: 'bg-amber-50 border-amber-300 text-amber-800' },
  false: { label: 'False', color: 'bg-red-50 border-red-300 text-red-700' },
}

const alignmentMsg = {
  match: { icon: '✓', label: 'Aligned', color: 'text-emerald-600' },
  close: { icon: '~', label: 'Close', color: 'text-amber-600' },
  off: { icon: '↯', label: 'Worth revisiting', color: 'text-accent' },
}

function getAlignment(yours: Answer, actual: 'true' | 'partial' | 'false') {
  if (!yours) return null
  if (yours === actual) return 'match'
  const scale = { true: 2, partial: 1, false: 0 }
  const diff = Math.abs(scale[yours] - scale[actual])
  return diff === 1 ? 'close' : 'off'
}

export default function ExpectationCheck({ setScreen }: Props) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [revealed, setRevealed] = useState(false)

  const allAnswered = assumptions.every(a => answers[a.id] != null)

  const setAnswer = (id: string, val: Answer) => {
    setAnswers(prev => ({ ...prev, [id]: val }))
  }

  const unresolvedCount = assumptions.filter(a => {
    const align = getAlignment(answers[a.id], a.actualAnswer)
    return align === 'off' || align === 'close'
  }).length

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => setScreen('path_detail')}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          ← Applied AI Engineer
        </button>

        <div className="mb-8">
          <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Expectation Check</div>
          <h1 className="font-display text-3xl font-medium text-foreground mb-2">
            What do you believe about this role?
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Answer honestly — there's no score. This helps you see where your mental model is accurate
            and where it might lead you to the wrong choice.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {assumptions.map((assumption, i) => {
            const yourAnswer = answers[assumption.id] ?? null
            const alignment = revealed ? getAlignment(yourAnswer, assumption.actualAnswer) : null

            return (
              <div
                key={assumption.id}
                className={`bg-card rounded-2xl border p-5 transition-all ${
                  revealed && alignment === 'off' ? 'border-accent/30' :
                  revealed && alignment === 'match' ? 'border-emerald-200' :
                  'border-border'
                }`}
              >
                <p className="text-sm font-medium text-foreground mb-3 leading-snug">
                  <span className="text-muted-foreground font-mono mr-2">{i + 1}.</span>
                  "{assumption.claim}"
                </p>

                {/* Answer buttons */}
                <div className="flex gap-2 flex-wrap mb-3">
                  {(['true', 'partial', 'false'] as const).map(opt => (
                    <button
                      key={opt}
                      onClick={() => !revealed && setAnswer(assumption.id, opt)}
                      className={`px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        yourAnswer === opt
                          ? answerLabels[opt].color
                          : 'border-border text-muted-foreground hover:border-primary/30'
                      } ${revealed ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {answerLabels[opt].label}
                    </button>
                  ))}
                </div>

                {/* Revealed: actual answer + alignment */}
                {revealed && yourAnswer && (
                  <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`flex items-center gap-1.5 text-xs font-medium ${alignmentMsg[alignment!].color}`}>
                        <span>{alignmentMsg[alignment!].icon}</span>
                        <span>{alignmentMsg[alignment!].label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">
                        Reality: <span className={`font-medium ${answerLabels[assumption.actualAnswer].color.split(' ').filter(c => c.startsWith('text-')).join(' ')}`}>
                          {answerLabels[assumption.actualAnswer].label}
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{assumption.reality}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Actions */}
        {!revealed ? (
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {Object.keys(answers).length} of {assumptions.length} answered
            </p>
            <button
              onClick={() => allAnswered && setRevealed(true)}
              disabled={!allAnswered}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                allAnswered
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              See how accurate I am →
            </button>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in">
            <h3 className="font-display text-xl font-medium text-foreground mb-4">
              Assumptions worth validating
            </h3>
            <div className="space-y-2 mb-5">
              {unresolvedCount > 0 ? (
                assumptions
                  .filter(a => {
                    const al = getAlignment(answers[a.id], a.actualAnswer)
                    return al === 'off' || al === 'close'
                  })
                  .map(a => (
                    <div key={a.id} className="flex items-start gap-2 text-sm">
                      <span className="text-accent mt-0.5 flex-shrink-0">↯</span>
                      <span className="text-foreground">{a.claim}</span>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-emerald-700">
                  Your mental model looks accurate. You're ready to go deeper.
                </p>
              )}
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-3">
                The best way to resolve these is a short conversation with someone living this path.
              </p>
              <button
                onClick={() => setScreen('reality_guides')}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Talk to Clara Ruiz — Applied AI Engineer →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
