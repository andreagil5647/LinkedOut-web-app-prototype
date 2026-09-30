import { useState } from 'react'
import Landing from './components/Landing'
import Onboarding from './components/Onboarding'
import AILoading from './components/AILoading'
import Nav from './components/Nav'
import CareerGraph from './components/CareerGraph'
import PathDetail from './components/PathDetail'
import ExpectationCheck from './components/ExpectationCheck'
import RealityGuides from './components/RealityGuides'
import RealityCheck from './components/RealityCheck'
import ExpectationDelta from './components/ExpectationDelta'
import Organizations from './components/Organizations'
import Community from './components/Community'

export type Screen =
  | 'landing'
  | 'onboarding'
  | 'loading'
  | 'graph'
  | 'path_detail'
  | 'expectation_check'
  | 'reality_guides'
  | 'reality_check'
  | 'expectation_delta'
  | 'updated_graph'
  | 'organizations'
  | 'community'

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [copilotOpen, setCopilotOpen] = useState(false)

  const showNav = !['landing', 'onboarding', 'loading'].includes(screen)

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {showNav && (
        <Nav
          screen={screen}
          setScreen={(s: Screen) => {
            setCopilotOpen(false)
            setScreen(s)
          }}
        />
      )}
      <div className={showNav ? 'pt-16' : ''}>
        {screen === 'landing' && <Landing setScreen={setScreen} />}
        {screen === 'onboarding' && <Onboarding setScreen={setScreen} />}
        {screen === 'loading' && <AILoading setScreen={setScreen} />}
        {(screen === 'graph' || screen === 'updated_graph') && (
          <CareerGraph
            setScreen={setScreen}
            copilotOpen={copilotOpen}
            setCopilotOpen={setCopilotOpen}
            updated={screen === 'updated_graph'}
          />
        )}
        {screen === 'path_detail' && <PathDetail setScreen={setScreen} />}
        {screen === 'expectation_check' && <ExpectationCheck setScreen={setScreen} />}
        {screen === 'reality_guides' && <RealityGuides setScreen={setScreen} />}
        {screen === 'reality_check' && <RealityCheck setScreen={setScreen} />}
        {screen === 'expectation_delta' && <ExpectationDelta setScreen={setScreen} />}
        {screen === 'organizations' && <Organizations setScreen={setScreen} />}
        {screen === 'community' && <Community setScreen={setScreen} />}
      </div>
    </div>
  )
}
