import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
}

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
    </div>
  )
}
