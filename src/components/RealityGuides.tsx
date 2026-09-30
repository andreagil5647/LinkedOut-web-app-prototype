import { useState } from 'react'
import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
}

const CLARA_PATH = [
  { label: 'Computer Science BSc', type: 'edu' },
  { label: 'SWE Intern', type: 'work' },
  { label: 'Software Engineer', type: 'work' },
  { label: 'ML Engineer', type: 'work' },
  { label: 'Applied AI Engineer', type: 'current' },
]

const CLARA_FAQS = [
  {
    q: 'Did you do a Master\'s?',
    a: 'No. I went straight from my CS degree into a SWE role at a startup. After two years, I transitioned into ML-adjacent work. A Master\'s wasn\'t on my path.',
  },
  {
    q: 'How much of your job is actually software engineering vs ML?',
    a: 'Probably 70/30. I write a lot of Python, build pipelines, review PRs. The ML part is selecting and adapting models, not deriving them. You\'d be surprised how much it\'s just engineering.',
  },
  {
    q: 'What would you recommend: work first, or Master\'s first?',
    a: 'If you like building things and want to see results quickly, work first. If you\'re not sure whether you prefer engineering or research, a Master\'s gives you time to find out in a structured way.',
  },
  {
    q: 'What\'s the hardest part of the role?',
    a: 'Debugging ML systems in production. When a model starts behaving weirdly, the root cause is almost never the model. It\'s usually data drift, a schema change, or an upstream bug.',
  },
]

const CLARA_RESOURCES = [
  'Made With ML (madewithml.com)',
  'Chip Huyen — Designing ML Systems',
  'fast.ai Practical Deep Learning',
  'Eugene Yan\'s newsletter on Applied ML',
  '"Effective ML Teams" — Jason Liu',
]

const OTHER_GUIDES = [
  {
    name: 'Arjun Mehta',
    role: 'ML Research Engineer',
    company: 'DeepMind',
    path: ['CS MSc', 'PhD → left after 2y', 'ML Research Eng'],
    about: ['Research vs engineering trade-offs', 'Leaving a PhD', 'DeepMind culture'],
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
  },
  {
    name: 'Sofia Chen',
    role: 'Data Scientist → PM (AI Products)',
    company: 'Spotify',
    path: ['Statistics MSc', 'Data Scientist', 'PM (AI)'],
    about: ['Non-linear careers', 'Data Sci → PM transition', 'MSc value in industry'],
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format',
  },
  {
    name: 'Marcus Osei',
    role: 'PhD Candidate',
    company: 'ETH Zürich',
    path: ['Computer Eng', 'RA internship', 'PhD (NLP)'],
    about: ['PhD daily reality', 'When to choose research', 'Funding and visa tips'],
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
  },
]

export default function RealityGuides({ setScreen }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [view, setView] = useState<'all' | 'clara'>('all')

  if (view === 'clara') {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <button
            onClick={() => setView('all')}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            ← Reality Guides
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: profile */}
            <div className="space-y-4">
              {/* Profile card */}
              <div className="bg-card rounded-2xl border border-border p-6 text-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format"
                  alt="Clara Ruiz"
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover ring-2 ring-primary/20"
                />
                <h2 className="font-semibold text-foreground text-lg">Clara Ruiz</h2>
                <p className="text-sm text-muted-foreground">Applied AI Engineer</p>
                <p className="text-xs text-primary font-medium mt-0.5">NovaTech · Barcelona</p>
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground">3 yrs in role · verified ✓</div>
                </div>
              </div>

              {/* Career path */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">Career path</div>
                <div className="space-y-2">
                  {CLARA_PATH.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        step.type === 'current' ? 'bg-primary' :
                        step.type === 'work' ? 'bg-blue-400' : 'bg-amber-400'
                      }`} />
                      <span className={`text-xs ${step.type === 'current' ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                        {step.label}
                      </span>
                      {step.type === 'current' && (
                        <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">now</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ask me about */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">Ask me about</div>
                <div className="flex flex-wrap gap-1.5">
                  {['No MSc path', 'SWE → ML transition', 'Production ML', 'Interview prep', 'Daily reality', 'When to upskill'].map(t => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-primary/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: content */}
            <div className="lg:col-span-2 space-y-4">
              {/* What surprised me */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display text-xl font-medium text-foreground mb-3">What surprised me</h3>
                <div className="space-y-3 text-sm text-foreground leading-relaxed">
                  <p>
                    "I thought I'd be training models all day. The first month was mostly fixing data pipelines. That was a shock.
                    But then I realised — that <em>is</em> the job. Reliable data is the whole game."
                  </p>
                  <p>
                    "I also didn't expect how collaborative it would be. Researchers tend to imagine AI work as solitary.
                    I'm in four cross-functional meetings a day. My job is mostly making models work for product teams."
                  </p>
                  <p>
                    "And honestly? I don't miss the MSc. The things I wished I knew deeper — I learned on the job in six months,
                    because I had a real reason to learn them."
                  </p>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display text-xl font-medium text-foreground mb-4">Frequently asked</h3>
                <div className="space-y-2">
                  {CLARA_FAQS.map((faq, i) => (
                    <div key={i} className="border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors"
                      >
                        <span className="text-sm font-medium text-foreground">{faq.q}</span>
                        <span className={`text-muted-foreground ml-2 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                          ▾
                        </span>
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-display text-xl font-medium text-foreground mb-3">Resources Clara recommends</h3>
                <ul className="space-y-2">
                  {CLARA_RESOURCES.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setScreen('reality_check')}
                  className="bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Book 15-min Reality Check
                </button>
                <button className="border border-border text-foreground py-3 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                  Send async question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Reality Guides</div>
          <h1 className="font-display text-3xl font-medium text-foreground mb-2">
            Talk to people already living these paths
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg">
            Every Reality Guide is a verified professional who shares their unfiltered experience — not a mentor trying to impress you.
          </p>
        </div>

        {/* Featured: Clara */}
        <div
          className="bg-card rounded-2xl border-2 border-primary/20 p-6 mb-6 cursor-pointer hover:shadow-lg hover:shadow-primary/10 transition-all"
          onClick={() => setView('clara')}
        >
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Matches your path
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">Featured guide</span>
          </div>
          <div className="flex items-start gap-5 flex-wrap">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format"
              alt="Clara Ruiz"
              className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 bg-muted"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h3 className="font-semibold text-foreground text-lg">Clara Ruiz</h3>
                <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">Available</span>
              </div>
              <p className="text-sm font-medium text-primary mb-0.5">Applied AI Engineer · NovaTech, Barcelona</p>
              <p className="text-sm text-muted-foreground mb-3">
                3 years in the role. Went CS degree → SWE → ML Engineer → Applied AI. No Master's.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['No MSc path', 'Production ML reality', 'SWE to ML transition'].map(t => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary border border-primary/15 text-secondary-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 flex-shrink-0 sm:w-auto">
              <button
                onClick={e => { e.stopPropagation(); setScreen('reality_check') }}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Book 15 min
              </button>
              <button
                onClick={e => { e.stopPropagation(); setView('clara') }}
                className="border border-border text-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted transition-colors whitespace-nowrap"
              >
                View profile
              </button>
            </div>
          </div>
        </div>

        {/* Other guides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OTHER_GUIDES.map(guide => (
            <div key={guide.name} className="bg-card rounded-2xl border border-border p-5 hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={guide.img}
                  alt={guide.name}
                  className="w-10 h-10 rounded-xl object-cover bg-muted flex-shrink-0"
                />
                <div>
                  <div className="text-sm font-semibold text-foreground">{guide.name}</div>
                  <div className="text-[11px] text-muted-foreground">{guide.company}</div>
                </div>
              </div>
              <p className="text-xs font-medium text-foreground mb-2">{guide.role}</p>
              <div className="flex items-center gap-1 flex-wrap mb-3">
                {guide.path.map((p, i) => (
                  <span key={i} className="flex items-center gap-0.5">
                    <span className="text-[10px] text-muted-foreground">{p}</span>
                    {i < guide.path.length - 1 && <span className="text-[10px] text-muted-foreground">→</span>}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {guide.about.map(t => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <button className="w-full py-1.5 border border-border rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
                View profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
