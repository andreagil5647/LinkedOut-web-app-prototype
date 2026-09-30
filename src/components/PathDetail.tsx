import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
}

const weekDays = [
  {
    day: 'Mon',
    activities: [
      { time: '9:00', task: 'Team standup', tag: 'team', dur: '30 min' },
      { time: '9:30', task: 'Sprint planning', tag: 'planning', dur: '1 h' },
      { time: '11:00', task: 'Data pipeline debugging', tag: 'engineering', dur: '3 h' },
      { time: '15:00', task: 'Code review', tag: 'engineering', dur: '1 h' },
    ],
  },
  {
    day: 'Tue',
    activities: [
      { time: '9:00', task: 'Model eval + metrics', tag: 'ml', dur: '4 h' },
      { time: '14:00', task: 'Pair programming (backend)', tag: 'engineering', dur: '2 h' },
    ],
  },
  {
    day: 'Wed',
    activities: [
      { time: '9:00', task: 'Feature implementation', tag: 'engineering', dur: '5 h' },
      { time: '14:30', task: 'Integration testing', tag: 'engineering', dur: '2 h' },
    ],
  },
  {
    day: 'Thu',
    activities: [
      { time: '9:00', task: 'Cross-team product sync', tag: 'team', dur: '1 h' },
      { time: '10:30', task: 'Documentation + testing', tag: 'engineering', dur: '3 h' },
      { time: '15:00', task: '1:1 with manager', tag: 'team', dur: '30 min' },
    ],
  },
  {
    day: 'Fri',
    activities: [
      { time: '9:00', task: 'Learning time (papers/courses)', tag: 'learning', dur: '2 h' },
      { time: '11:30', task: 'Demo prep', tag: 'team', dur: '1 h' },
      { time: '14:00', task: 'Team retrospective', tag: 'team', dur: '1 h' },
    ],
  },
]

const tagColors: Record<string, string> = {
  engineering: 'bg-blue-50 text-blue-700 border-blue-200',
  ml:          'bg-sky-50 text-sky-700 border-sky-200',
  team:        'bg-amber-50 text-amber-700 border-amber-200',
  planning:    'bg-orange-50 text-orange-700 border-orange-200',
  learning:    'bg-emerald-50 text-emerald-700 border-emerald-200',
}

const misconceptions = [
  {
    myth: 'You need a Master\'s to get the role.',
    reality: 'Many Applied AI Engineers came straight from SWE roles. An MSc helps but isn\'t a gate.',
  },
  {
    myth: 'Most of the job is training and tuning models.',
    reality: 'In production: ~60% is data pipelines, integration, monitoring. Model work is maybe 20%.',
  },
  {
    myth: 'It\'s isolated academic-style work.',
    reality: 'You\'re embedded in a product team. You work daily with engineers, PMs, and designers.',
  },
  {
    myth: 'You need research publications.',
    reality: 'Almost never required. Strong coding + systems thinking is what companies hire for.',
  },
]

const routes = [
  {
    label: 'Route A',
    path: ['Computer Engineering', 'Software Engineer', 'Applied AI Engineer'],
    color: '#3B82F6',
    note: '2–4 years in industry first. Builds production systems instinct.',
  },
  {
    label: 'Route B',
    path: ['Computer Engineering', 'MSc in AI', 'Applied AI Engineer'],
    color: '#F59E0B',
    note: '1–2 year structured ML foundation. Better for roles requiring deep model knowledge.',
  },
]

export default function PathDetail({ setScreen }: Props) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => setScreen('graph')}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          ← My Path
        </button>

        {/* Title area */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700">Convergence point</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">Industry</span>
            </div>
            <h1 className="font-display text-4xl font-medium text-foreground">Applied AI Engineer</h1>
            <p className="text-muted-foreground mt-1.5">Where software engineering meets machine learning in production</p>
          </div>
          <button
            onClick={() => setScreen('expectation_check')}
            className="w-full bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 sm:w-auto"
          >
            Check my expectations →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* What the role involves */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-medium text-foreground mb-4">What the role actually involves</h2>
              <div className="space-y-3 text-sm text-foreground leading-relaxed">
                <p>
                  An Applied AI Engineer bridges the gap between ML research and real software products.
                  You don't typically invent new algorithms — you take existing models and techniques and make them
                  work reliably in production environments at scale.
                </p>
                <p>
                  Most of your time goes toward <span className="font-medium">data infrastructure</span>,
                  <span className="font-medium"> system integration</span>,
                  <span className="font-medium"> evaluation frameworks</span>, and
                  <span className="font-medium"> deployment pipelines</span> — not model experimentation.
                  That's a surprise to most people entering the field.
                </p>
                <p>
                  Strong software engineering fundamentals matter more than deep mathematical theory.
                  You'll write a lot of Python, work with APIs, debug distributed systems, and collaborate
                  closely with product and backend teams.
                </p>
              </div>
            </section>

            {/* Common misconceptions */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-medium text-foreground mb-4">Common misconceptions</h2>
              <div className="space-y-3">
                {misconceptions.map((m, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl bg-muted/50">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
                        <span className="text-[9px] text-accent font-bold">✕</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground line-through decoration-accent/40">{m.myth}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{m.reality}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Example week */}
            <section className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display text-xl font-medium text-foreground mb-1">Example week</h2>
              <p className="text-xs text-muted-foreground mb-5">Based on a mid-level role at a product AI company</p>
              <div className="overflow-x-auto pb-1">
                <div className="grid min-w-[620px] grid-cols-5 gap-2">
                  {weekDays.map(({ day, activities }) => (
                    <div key={day}>
                      <div className="text-xs font-mono text-muted-foreground mb-2 text-center">{day}</div>
                      <div className="space-y-1.5">
                        {activities.map((a, i) => (
                          <div key={i} className={`text-[10px] px-2 py-1.5 rounded-lg border leading-tight ${tagColors[a.tag]}`}>
                            <div className="font-medium">{a.task}</div>
                            <div className="opacity-60 mt-0.5">{a.dur}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(tagColors).map(([tag, cls]) => (
                  <span key={tag} className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${cls}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Routes */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Possible routes</h3>
              <div className="space-y-4">
                {routes.map(r => (
                  <div key={r.label}>
                    <div className="text-[10px] font-mono text-muted-foreground mb-2">{r.label}</div>
                    <div className="flex items-center gap-1 flex-wrap mb-2">
                      {r.path.map((step, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-medium border"
                            style={{
                              background: `${r.color}10`,
                              borderColor: `${r.color}40`,
                              color: r.color,
                            }}
                          >
                            {step}
                          </span>
                          {i < r.path.length - 1 && (
                            <span className="text-muted-foreground text-[10px]">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{r.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Role snapshot</h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Typical entry-level salary', value: '€45–65K' },
                  { label: 'MSc required', value: 'Rarely' },
                  { label: 'Maths intensity', value: 'Moderate' },
                  { label: 'Remote friendliness', value: 'High' },
                  { label: 'Career ceiling', value: 'ML Lead, Staff Eng' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <span className="text-xs font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-secondary rounded-2xl border border-primary/20 p-5">
              <div className="text-xs font-mono text-primary/70 mb-1">Reality Guide available</div>
              <p className="text-sm font-medium text-foreground mb-3">
                Clara Ruiz lives this path at NovaTech
              </p>
              <button
                onClick={() => setScreen('reality_guides')}
                className="w-full bg-primary text-primary-foreground py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                View Clara's profile →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
