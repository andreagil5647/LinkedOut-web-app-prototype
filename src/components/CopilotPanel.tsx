import { useState } from 'react'
import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
  onClose: () => void
  onUpdateGraph: () => void
}

type Stage = 'idle' | 'thinking' | 'response' | 'updated'

const LAURA_MESSAGE = "I don't think I want years of theoretical research."

const RESPONSE_TEXT = `That's a valuable insight — and one many students in AI reach at exactly your stage.

A PhD typically means **3–5 years of narrowly focused, independent work**, often on problems that feel distant from product impact. It suits people who find the process of generating new knowledge intrinsically rewarding, not just the results.

What you're describing — liking **AI and software development** — maps well to the **Applied AI Engineer** role. This path is much more engineering than research: deploying models, building pipelines, integrating ML into products.

The key fork is whether you go directly (Software Engineer → Applied AI) or via a structured year of theory (MSc → Applied AI). Both routes are real.`

export default function CopilotPanel({ setScreen, onClose, onUpdateGraph }: Props) {
  const [stage, setStage] = useState<Stage>('idle')
  const [inputValue, setInputValue] = useState(LAURA_MESSAGE)

  const handleSend = () => {
    if (!inputValue.trim()) return
    setStage('thinking')
    setTimeout(() => setStage('response'), 1600)
  }

  const handleUpdatePath = () => {
    setStage('updated')
    setTimeout(() => {
      onUpdateGraph()
    }, 800)
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 top-16 z-40 w-full max-w-full border-t border-border bg-card flex flex-col animate-slide-in sm:relative sm:inset-auto sm:z-auto sm:w-96 sm:border-l sm:border-t-0"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <span className="text-[10px] text-primary-foreground font-mono">✦</span>
          </div>
          <span className="text-sm font-semibold text-foreground">Ask LinkedOut</span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Context pill */}
        <div className="bg-muted rounded-xl p-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Context:</span> Your career graph, interests in AI + SWE, worry about "choosing the wrong path"
        </div>

        {/* Laura's message */}
        {stage !== 'idle' && (
          <div className="flex justify-end animate-fade-in">
            <div className="bg-secondary text-secondary-foreground text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
              {inputValue}
            </div>
          </div>
        )}

        {/* Thinking */}
        {stage === 'thinking' && (
          <div className="flex gap-2 items-start animate-fade-in">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[9px] text-primary">✦</span>
            </div>
            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse-dot"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Response */}
        {(stage === 'response' || stage === 'updated') && (
          <div className="flex gap-2 items-start animate-fade-in">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[9px] text-primary">✦</span>
            </div>
            <div className="flex-1">
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground leading-relaxed">
                {RESPONSE_TEXT.split('**').map((part, i) =>
                  i % 2 === 0
                    ? <span key={i}>{part}</span>
                    : <strong key={i} className="font-semibold">{part}</strong>
                )}
              </div>

              {/* Action buttons */}
              {stage === 'response' && (
                <div className="mt-3 space-y-2 animate-fade-in">
                  <p className="text-xs text-muted-foreground px-1 mb-2">What would you like to do?</p>
                  <ActionBtn
                    label="Update my path"
                    desc="Dim the PhD branch, highlight applied routes"
                    icon="↗"
                    primary
                    onClick={handleUpdatePath}
                  />
                  <ActionBtn
                    label="Explore applied Master's"
                    desc="See MEng / conversion MSc options"
                    icon="◎"
                    onClick={() => {}}
                  />
                  <ActionBtn
                    label="Talk to someone in AI"
                    desc="Find a Reality Guide on this path"
                    icon="↪"
                    onClick={() => setScreen('reality_guides')}
                  />
                </div>
              )}

              {/* Updated confirmation */}
              {stage === 'updated' && (
                <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 animate-fade-in">
                  <div className="font-medium mb-0.5">Graph updated ✓</div>
                  <div className="text-xs text-emerald-600">PhD branch dimmed. Applied AI Engineer highlighted. Saving…</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {stage === 'idle' && (
        <div className="border-t border-border p-4">
          <div className="bg-background rounded-xl border border-border flex items-end gap-2 px-3 py-2.5">
            <textarea
              rows={2}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="flex-1 text-sm text-foreground bg-transparent resize-none focus:outline-none leading-relaxed"
              placeholder="Ask anything about your path…"
            />
            <button
              onClick={handleSend}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ActionBtn({
  label, desc, icon, onClick, primary,
}: { label: string; desc: string; icon: string; onClick: () => void; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all hover:shadow-sm ${
        primary
          ? 'border-primary/30 bg-primary/5 hover:bg-primary/10'
          : 'border-border hover:border-primary/20'
      }`}
    >
      <div className={`mt-0.5 text-base leading-none ${primary ? 'text-primary' : 'text-muted-foreground'}`}>
        {icon}
      </div>
      <div>
        <div className={`text-sm font-medium ${primary ? 'text-primary' : 'text-foreground'}`}>{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </div>
    </button>
  )
}
