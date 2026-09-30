import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
}

const loopSteps = [
  {
    label: 'Map',
    title: 'Start with a messy map',
    body: 'A degree rarely points to one job. The graph keeps several plausible futures visible at once.',
  },
  {
    label: 'Check',
    title: 'Ask about the parts you cannot Google',
    body: 'Reality Guides answer the small practical questions that usually decide whether a path fits.',
  },
  {
    label: 'Adjust',
    title: 'Change the plan without starting over',
    body: 'After each check-in, the graph updates. Uncertainty becomes part of the process instead of a failure state.',
  },
]

const responsibilityPoints = [
  {
    title: 'No social scoreboard',
    body: 'No rankings, streaks, follower counts, or public popularity loops.',
  },
  {
    title: 'Room for uneven paths',
    body: 'Work-first, research-first, undecided, and non-linear routes can all sit in the same map.',
  },
  {
    title: 'Clear partner boundaries',
    body: 'Sponsors can support access, but they cannot buy ranking or student data.',
  },
]

const prototypeSignals = [
  'Path graph',
  'Guide profiles',
  'Expectation check',
  'Partner directory',
]

export default function Landing({ setScreen }: Props) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 px-4 py-5 sm:px-8 sm:py-6">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold text-foreground tracking-tight">
            Linked<span className="text-primary">Out</span>
          </span>
        </div>
        <nav className="flex items-center gap-2 sm:gap-6">
          <button className="hidden text-sm text-muted-foreground hover:text-foreground transition-colors sm:inline">
            How it works
          </button>
          <button className="hidden text-sm text-muted-foreground hover:text-foreground transition-colors sm:inline">
            Reality Guides
          </button>
          <button
            onClick={() => setScreen('onboarding')}
            className="whitespace-nowrap text-sm bg-foreground text-background px-4 py-2 rounded-full hover:bg-foreground/85 transition-colors"
          >
            Get started
          </button>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-8 pb-16 text-center sm:px-6 sm:pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-xs font-mono px-3.5 py-1.5 rounded-full mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot"></span>
            For final-year students figuring out what comes next
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl font-medium leading-[1.1] text-foreground mb-6 animate-fade-in-up delay-100 sm:text-5xl lg:text-6xl"
            style={{ fontStyle: 'italic' }}>
            Not sure what comes<br />
            <span className="not-italic">after your degree?</span>
          </h1>

          <p className="text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200 sm:text-lg">
            You don't need to know your future yet.{' '}
            <span className="text-foreground font-medium">LinkedOut</span> helps you
            explore it before committing — through real paths, real experiences, and
            honest conversations with people already living them.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center animate-fade-in-up delay-300">
            <button
              onClick={() => setScreen('onboarding')}
              className="w-full bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 sm:w-auto"
            >
              Build my path →
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border">
              See how it works
            </button>
          </div>

          {/* Differentiators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-muted-foreground animate-fade-in-up delay-400 sm:mt-16">
            <div className="flex items-center gap-2">
              <span className="text-accent">✕</span> No follower counts
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-accent">✕</span> No self-promotion feeds
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-accent">✕</span> No popularity scores
            </div>
          </div>
        </div>
      </main>

      {/* Bottom comparison strip */}
      <section className="border-t border-border bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:px-6 sm:py-8 sm:gap-6">
          <div className="p-5 rounded-2xl border border-border bg-card sm:p-6">
            <div className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">LinkedIn asks</div>
            <p className="font-display text-xl font-medium text-muted-foreground" style={{ fontStyle: 'italic' }}>
              "Who are you professionally?"
            </p>
          </div>
          <div className="p-5 rounded-2xl border-2 border-primary/20 bg-secondary sm:p-6">
            <div className="text-xs font-mono text-primary/70 mb-3 uppercase tracking-wider">LinkedOut asks</div>
            <p className="font-display text-xl font-medium text-foreground" style={{ fontStyle: 'italic' }}>
              "What could you become, and what do you still need to understand before choosing?"
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 sm:py-12">
          <div className="mb-6 max-w-2xl">
            <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
              What makes it different
            </div>
            <h2 className="font-display text-3xl font-medium text-foreground mb-2">
              See, check, adjust.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              LinkedOut treats career choice as something students can test in small steps, not a public identity they have to perform.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card">
            {loopSteps.map((step, i) => (
              <div
                key={step.title}
                className={`grid grid-cols-1 gap-2 p-5 sm:grid-cols-[7rem_1fr] sm:gap-5 ${
                  i < loopSteps.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="text-xs font-mono uppercase tracking-wider text-primary">
                  {step.label}
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">
                Quiet guardrails
              </div>
              <h2 className="font-display text-3xl font-medium text-foreground mb-3">
                Useful without becoming another feed.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The product keeps the social layer deliberately small: enough human context to make better choices, without turning uncertainty into content.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card">
              {responsibilityPoints.map(point => (
                <div key={point.title} className="border-b border-border p-4 last:border-b-0">
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{point.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{point.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">
                  Already clickable
                </div>
                <p className="text-sm font-medium text-foreground">
                  The prototype covers the core student journey, from first uncertainty to an updated path.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {prototypeSignals.map(signal => (
                  <span key={signal} className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
