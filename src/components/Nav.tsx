import type { Screen } from '../App'

interface Props {
  screen: Screen
  setScreen: (s: Screen) => void
}

export default function Nav({ screen, setScreen }: Props) {
  const isGraph = screen === 'graph' || screen === 'updated_graph'
  const isExplore = ['path_detail', 'expectation_check', 'reality_guides', 'reality_check', 'expectation_delta', 'organizations'].includes(screen)
  const isCommunity = screen === 'community'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/90 backdrop-blur-md border-b border-border flex items-center gap-3 px-3 sm:px-6">
      <div className="min-w-0 flex-1 flex items-center gap-3 sm:gap-8">
        {/* Logo */}
        <button
          onClick={() => setScreen('graph')}
          className="flex-shrink-0 font-display text-lg font-semibold text-foreground tracking-tight"
        >
          Linked<span className="text-primary">Out</span>
        </button>

        {/* Nav links */}
        <nav className="min-w-0 flex items-center gap-1 overflow-x-auto">
          <NavItem
            label="My Path"
            active={isGraph}
            onClick={() => setScreen('graph')}
          />
          <NavItem
            label="Explore"
            active={isExplore}
            onClick={() => setScreen('reality_guides')}
          />
          <NavItem
            label="Organisations"
            active={screen === 'organizations'}
            onClick={() => setScreen('organizations')}
          />
          <NavItem
            label="Community"
            active={isCommunity}
            onClick={() => setScreen('community')}
          />
        </nav>
      </div>

      {/* Right: user */}
      <div className="flex flex-shrink-0 items-center gap-3">
        <div className="text-sm text-muted-foreground hidden md:block">Laura Martín</div>
        <div className="w-8 h-8 rounded-full bg-secondary border border-primary/20 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary">LM</span>
        </div>
      </div>
    </header>
  )
}

function NavItem({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-2.5 py-1.5 rounded-full text-sm transition-all sm:px-3.5 ${
        active
          ? 'bg-secondary text-secondary-foreground font-medium'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {label}
    </button>
  )
}
