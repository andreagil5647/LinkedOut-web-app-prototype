import { useState } from 'react'
import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
}

const ORGS = [
  {
    id: 'novatech',
    name: 'NovaTech',
    type: 'company',
    location: 'Barcelona, Spain',
    description: 'Applied AI startup building developer tooling. ~80 people, Series B.',
    tags: ['Applied AI', 'Product', 'Backend'],
    guides: 1,
    roles: ['Applied AI Engineer', 'ML Platform Engineer', 'Software Engineer'],
    logo: '🔮',
    logoSrc: '/logos/novatech.svg',
    logoColor: '#F97316',
    partnership: 'Founding sponsor',
    sponsorship: ['Reality Guides', 'Office visits', 'Applied AI projects'],
  },
  {
    id: 'deepmind',
    name: 'Google DeepMind',
    type: 'company',
    location: 'London, UK / Remote',
    description: 'Frontier AI research lab. Primarily research roles; some engineering positions.',
    tags: ['Research', 'ML Engineering', 'Science'],
    guides: 1,
    roles: ['Research Engineer', 'Research Scientist', 'SWE (Infrastructure)'],
    logo: '◈',
    logoSrc: '/logos/google-deepmind.svg',
    logoColor: '#3B82F6',
  },
  {
    id: 'eth',
    name: 'ETH Zürich',
    type: 'university',
    location: 'Zürich, Switzerland',
    description: 'Top European technical university. Strong AI/ML research groups, fully funded PhD positions.',
    tags: ['MSc', 'PhD', 'Research'],
    guides: 1,
    roles: ['MSc in Computer Science', 'PhD (AI/ML)', 'Research Assistant'],
    logo: '◻',
    logoSrc: '/logos/eth-zurich.svg',
    logoColor: '#10B981',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    type: 'company',
    location: 'Stockholm / Remote (EU)',
    description: 'Music streaming at scale. Strong ML teams across recommendation, content intelligence, and platform.',
    tags: ['ML', 'Data', 'Product Engineering'],
    guides: 1,
    roles: ['Data Scientist', 'ML Engineer', 'Product Engineer'],
    logo: '◎',
    logoSrc: '/logos/spotify.svg',
    logoColor: '#1DB954',
    partnership: 'Affiliate partner',
    sponsorship: ['Career talks', 'Product AI Q&A', 'Portfolio reviews'],
  },
  {
    id: 'codebridge',
    name: 'CodeBridge Labs',
    type: 'company',
    location: 'Madrid, Spain / Remote',
    description: 'Engineering consultancy helping early-career developers ship production software with senior teams.',
    tags: ['Software Engineering', 'Mentorship', 'Consulting'],
    guides: 2,
    roles: ['Junior Software Engineer', 'Backend Engineer', 'Graduate Consultant'],
    logo: 'CB',
    logoSrc: '/logos/codebridge-labs.svg',
    logoColor: '#0EA5A4',
    partnership: 'Hiring partner',
    sponsorship: ['Mock interviews', 'Graduate roles', 'Technical workshops'],
  },
]

const typeLabel: Record<string, string> = {
  company: 'Company',
  university: 'University',
}

const sponsorOrgs = ORGS.filter(org => org.partnership)

export default function Organizations({ setScreen }: Props) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'company' | 'university'>('all')

  const filtered = ORGS.filter(o => {
    const matchQuery = o.name.toLowerCase().includes(query.toLowerCase()) ||
      o.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    const matchType = filter === 'all' || o.type === filter
    return matchQuery && matchType
  })

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Organisations</div>
          <h1 className="font-display text-3xl font-medium text-foreground mb-2">
            Explore where your path leads
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            See what companies and universities look for, what roles they offer, and hear from people already there.
          </p>
        </div>

        {/* Affiliates + sponsors */}
        <section className="mb-8">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">
                Partner network
              </div>
              <h2 className="font-display text-2xl font-medium text-foreground">
                Companies helping students see the work up close
              </h2>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Sponsors support access, not ranking
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {sponsorOrgs.map(org => (
              <button
                key={org.id}
                onClick={() => {
                  setQuery(org.name)
                  setFilter('all')
                }}
                className="group bg-card rounded-xl border border-border p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div
                    className="flex h-10 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-white px-2"
                    style={{ border: `1.5px solid ${org.logoColor}30` }}
                  >
                    <img
                      src={org.logoSrc}
                      alt={`${org.name} logo`}
                      className="max-h-7 max-w-full object-contain"
                    />
                  </div>
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-mono text-secondary-foreground">
                    {org.partnership}
                  </span>
                </div>
                <div className="mb-1 font-semibold text-foreground">{org.name}</div>
                <div className="mb-3 text-xs text-muted-foreground">{org.location}</div>
                <div className="flex flex-wrap gap-1.5">
                  {org.sponsorship?.slice(0, 2).map(item => (
                    <span
                      key={item}
                      className="rounded-md border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs font-medium text-primary group-hover:underline">
                  View partner profile
                </div>
              </button>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
            <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <span className="font-medium text-foreground">How partners show up</span>
              <span>They can fund guides and workshops. They cannot buy ranking or student data.</span>
            </div>
          </div>
        </section>

        {/* Search + filter */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="flex-1 min-w-52 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name or role type…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex w-full gap-1.5 overflow-x-auto sm:w-auto">
            {(['all', 'company', 'university'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl border text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30'
                }`}
              >
                {f === 'all' ? 'All' : typeLabel[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(org => (
            <div
              key={org.id}
              className="bg-card rounded-2xl border border-border p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-24 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white px-2"
                  style={{ border: `1.5px solid ${org.logoColor}30` }}
                >
                  <img
                    src={org.logoSrc}
                    alt={`${org.name} logo`}
                    className="max-h-8 max-w-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h3 className="font-semibold text-foreground">{org.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                      {typeLabel[org.type]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{org.location}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{org.description}</p>

              {/* Roles */}
              <div className="mb-3">
                <div className="text-[10px] font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">Roles</div>
                <div className="flex flex-wrap gap-1.5">
                  {org.roles.map(r => (
                    <span
                      key={r}
                      className="text-[11px] px-2.5 py-0.5 rounded-full border border-border text-muted-foreground"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags + guides */}
              <div className="flex flex-col gap-3 pt-3 border-t border-border sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {org.tags.map(t => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {org.guides > 0 && (
                  <button
                    onClick={() => setScreen('reality_guides')}
                    className="self-start text-xs text-primary font-medium hover:underline sm:self-auto"
                  >
                    {org.guides} Reality Guide{org.guides !== 1 ? 's' : ''} →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No organisations match your search.</p>
            <button className="mt-2 text-sm text-primary underline" onClick={() => { setQuery(''); setFilter('all') }}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
