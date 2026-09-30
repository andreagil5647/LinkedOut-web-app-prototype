import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
}

const DELTAS = [
  {
    topic: "Master's degree requirement",
    before: "I thought a Master's was essentially required to become an Applied AI Engineer.",
    after: "I understand now that Software Engineer → Applied AI is a well-trodden path. A Master's helps in some roles, but it's not the gate I assumed.",
    status: 'resolved',
  },
  {
    topic: 'Day-to-day reality',
    before: 'I imagined most of the work was model training and ML experimentation.',
    after: "Clara confirmed it's ~70% software engineering — pipelines, integration, debugging. The ML part is adapting models, not building them from scratch.",
    status: 'resolved',
  },
  {
    topic: 'Mathematical depth needed',
    before: 'I worried I needed to be strong in deep theory (linear algebra, probability proofs).',
    after: 'Intuition matters more than formal derivation. Clara said she almost never needs pen-and-paper maths. Good coding instincts matter more.',
    status: 'resolved',
  },
]

const STILL_OPEN = [
  'Whether I\'d enjoy production engineering as much as exploratory ML work',
  'How long it typically takes to move from SWE into an Applied AI role',
  'Whether Barcelona or another city makes sense for this career path',
]

const NOW_UNDERSTAND = [
  'The difference between Applied AI Engineering and ML Research',
  'Why an MSc is optional, not required, for this specific role',
  'What a realistic week looks like — more engineering than I expected',
  'That Clara\'s path (no MSc) is common, not exceptional',
]

export default function ExpectationDelta({ setScreen }: Props) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">After your Reality Check with Clara Ruiz</div>
          <h1 className="font-display text-3xl font-medium text-foreground mb-2">
            Your Expectation Delta
          </h1>
          <p className="text-sm text-muted-foreground">
            What shifted, what's still uncertain, and what you now understand clearly.
          </p>
        </div>

        {/* Timeline: before / after */}
        <div className="space-y-4 mb-8">
          {DELTAS.map((d, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-foreground uppercase tracking-wider">{d.topic}</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Resolved ✓
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Before */}
                <div className="p-5 sm:border-r border-border border-b sm:border-b-0">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-accent/40" />
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Before</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{d.before}"
                  </p>
                </div>
                {/* After */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-wider">After</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {d.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Two columns: still open + now understand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card rounded-2xl border border-amber-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                <span className="text-[9px] text-amber-600">?</span>
              </div>
              <span className="text-sm font-semibold text-foreground">Still uncertain</span>
            </div>
            <div className="space-y-2">
              {STILL_OPEN.map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5 text-xs flex-shrink-0">◦</span>
                  <span className="text-sm text-muted-foreground">{q}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-emerald-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <span className="text-[9px] text-emerald-600">✓</span>
              </div>
              <span className="text-sm font-semibold text-foreground">Now understood</span>
            </div>
            <div className="space-y-2">
              {NOW_UNDERSTAND.map((u, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 text-xs flex-shrink-0">✓</span>
                  <span className="text-sm text-muted-foreground">{u}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Laura's reflection */}
        <div className="bg-secondary rounded-2xl border border-primary/20 p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] text-primary-foreground font-semibold">LM</span>
            </div>
            <span className="text-sm font-medium text-foreground">Laura's reflection</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed italic">
            "I went into the call thinking an MSc was almost mandatory. Clara made it clear it isn't — and explained exactly what the role actually involves day-to-day.
            I still don't know if I'll enjoy production engineering as much as I imagine, but I feel like I know what question I'm actually trying to answer now.
            That's progress."
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-card rounded-2xl border border-border">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-0.5">Ready to update your path?</p>
            <p className="text-xs text-muted-foreground">
              The graph will reflect your new understanding — Applied AI confirmed, PhD branch dimmed.
            </p>
          </div>
          <button
            onClick={() => setScreen('updated_graph')}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 whitespace-nowrap flex-shrink-0"
          >
            Update my path →
          </button>
        </div>
      </div>
    </div>
  )
}
