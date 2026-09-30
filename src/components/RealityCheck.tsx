import { useState } from 'react'
import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
}

const SLOTS = [
  { day: 'Mon 14 Oct', times: ['10:00', '11:30', '14:00'] },
  { day: 'Tue 15 Oct', times: ['09:00', '12:00', '15:30'] },
  { day: 'Wed 16 Oct', times: ['10:30', '16:00'] },
  { day: 'Thu 17 Oct', times: ['09:30', '11:00', '14:30'] },
]

const SUGGESTED_QUESTIONS = [
  {
    generated: true,
    text: 'Did you do a Master\'s, and do you think it was necessary for the Applied AI role?',
    source: 'From your expectation: "I need a Master\'s to get this role"',
  },
  {
    generated: true,
    text: 'How much of your actual day-to-day job is software engineering versus ML-specific work?',
    source: 'From your expectation: "Most of the job is model training"',
  },
  {
    generated: true,
    text: 'Looking back, when would you have recommended studying first versus jumping into industry?',
    source: 'From your quiz: "Undecided between work and Master\'s"',
  },
  {
    generated: false,
    text: 'What would you do differently if you were starting again today?',
    source: null,
  },
  {
    generated: false,
    text: 'What does a normal non-exciting week look like in your role?',
    source: null,
  },
]

export default function RealityCheck({ setScreen }: Props) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [editingIdx, setEditingIdx] = useState<number | null>(null)

  const handleConfirm = () => {
    if (!selectedDay || !selectedTime) return
    setConfirmed(true)
    setTimeout(() => setScreen('expectation_delta'), 3000)
  }

  const selectedSlot = SLOTS.find(s => s.day === selectedDay)

  if (confirmed) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 32 32">
              <path d="M6 16l8 8 12-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-medium text-foreground mb-2">Reality Check booked</h2>
          <p className="text-sm text-muted-foreground mb-1">
            <span className="font-medium text-foreground">Clara Ruiz</span> · {selectedDay} at {selectedTime}
          </p>
          <p className="text-xs text-muted-foreground mb-8">
            You'll receive a calendar invite. LinkedOut will send Clara your questions in advance.
          </p>
          <div className="bg-muted rounded-xl p-4 text-left mb-6">
            <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Questions sent to Clara</div>
            <div className="space-y-1.5">
              {SUGGESTED_QUESTIONS.slice(0, 3).map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-xs text-muted-foreground font-mono mt-0.5">{i + 1}.</span>
                  <span className="text-xs text-foreground">{q.text}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground animate-pulse-dot">
            Preparing your Expectation Delta…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => setScreen('reality_guides')}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          ← Clara Ruiz
        </button>

        <div className="mb-8">
          <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Reality Check</div>
          <h1 className="font-display text-3xl font-medium text-foreground mb-2">
            Book a 15-minute call
          </h1>
          <p className="text-sm text-muted-foreground">
            An unscripted conversation — not a pitch, not a coaching session.
            Clara gets your questions in advance so the 15 minutes go deep.
          </p>
        </div>

        {/* Clara header */}
        <div className="flex items-center gap-4 bg-card rounded-2xl border border-border p-4 mb-6">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format"
            alt="Clara Ruiz"
            className="w-12 h-12 rounded-xl object-cover bg-muted flex-shrink-0"
          />
          <div>
            <div className="font-semibold text-foreground text-sm">Clara Ruiz</div>
            <div className="text-xs text-muted-foreground">Applied AI Engineer · NovaTech</div>
            <div className="text-xs text-emerald-600 mt-0.5">● Available this week</div>
          </div>
          <div className="ml-auto text-right hidden sm:block">
            <div className="text-2xl font-display font-medium text-foreground">15</div>
            <div className="text-xs text-muted-foreground">minutes</div>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground text-sm">Your questions for Clara</h2>
            <span className="text-xs text-muted-foreground">Generated from your profile</span>
          </div>
          <div className="space-y-3">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${
                  q.generated ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <span className={`text-[9px] ${q.generated ? 'text-primary' : 'text-muted-foreground'}`}>
                    {q.generated ? '✦' : i + 1}
                  </span>
                </div>
                <div className="flex-1">
                  {editingIdx === i ? (
                    <textarea
                      className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring bg-background resize-none"
                      rows={2}
                      defaultValue={q.text}
                      onBlur={() => setEditingIdx(null)}
                      autoFocus
                    />
                  ) : (
                    <div
                      className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
                      onClick={() => setEditingIdx(i)}
                    >
                      {q.text}
                    </div>
                  )}
                  {q.source && (
                    <div className="text-[10px] text-muted-foreground mt-0.5">{q.source}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
          <h2 className="font-semibold text-foreground text-sm mb-4">Pick a time</h2>
          <div className="space-y-3">
            {SLOTS.map(slot => (
              <div key={slot.day}>
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    setSelectedDay(slot.day === selectedDay ? null : slot.day)
                    setSelectedTime(null)
                  }}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                    selectedDay === slot.day
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}>
                    {selectedDay === slot.day && (
                      <div className="w-1.5 h-1.5 rounded-sm bg-primary-foreground" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">{slot.day}</span>
                </div>
                {selectedDay === slot.day && (
                  <div className="mt-2 ml-7 flex gap-2 flex-wrap animate-fade-in">
                    {slot.times.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`px-3.5 py-1.5 rounded-full border text-sm font-medium transition-all ${
                          selectedTime === t
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border text-muted-foreground hover:border-primary/40'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          {selectedDay && selectedTime ? (
            <p className="text-sm text-foreground">
              <span className="font-medium">{selectedDay}</span> at <span className="font-medium">{selectedTime}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Select a time above</p>
          )}
          <button
            onClick={handleConfirm}
            disabled={!selectedDay || !selectedTime}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              selectedDay && selectedTime
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Confirm booking →
          </button>
        </div>
      </div>
    </div>
  )
}
