import { useState, useEffect } from 'react'
import type { Screen } from '../App'
import CopilotPanel from './CopilotPanel'

interface Props {
  setScreen: (s: Screen) => void
  copilotOpen: boolean
  setCopilotOpen: (v: boolean) => void
  updated: boolean
}

interface GraphNode {
  id: string
  label: string
  sublabel: string
  type: 'start' | 'work' | 'study' | 'research' | 'convergence'
  cx: number
  cy: number
  w: number
  h: number
  interest: number
  understanding: number
  exposure: number
  highlighted?: boolean
}

interface GraphEdge {
  fromId: string
  toId: string
  highlighted?: boolean
  confirmed?: boolean
}

const BASE_NODES: GraphNode[] = [
  {
    id: 'cs', label: 'Computer Engineering', sublabel: 'Your degree',
    type: 'start', cx: 120, cy: 235, w: 172, h: 80,
    interest: 5, understanding: 5, exposure: 5,
  },
  {
    id: 'swe', label: 'Software Engineer', sublabel: 'Industry · Work',
    type: 'work', cx: 460, cy: 105, w: 162, h: 76,
    interest: 3, understanding: 3, exposure: 2,
  },
  {
    id: 'msc', label: 'MSc in AI', sublabel: 'Academia · 1–2 yrs',
    type: 'study', cx: 460, cy: 250, w: 162, h: 76,
    interest: 4, understanding: 2, exposure: 1,
  },
  {
    id: 'phd_entry', label: 'PhD Research', sublabel: 'Academia · 3–4 yrs',
    type: 'research', cx: 460, cy: 385, w: 162, h: 76,
    interest: 1, understanding: 1, exposure: 0,
  },
  {
    id: 'backend', label: 'Backend Engineer', sublabel: 'Industry · Work',
    type: 'work', cx: 840, cy: 50, w: 162, h: 76,
    interest: 2, understanding: 3, exposure: 2,
  },
  {
    id: 'product', label: 'Product Engineer', sublabel: 'Industry · Work',
    type: 'work', cx: 840, cy: 175, w: 162, h: 76,
    interest: 2, understanding: 2, exposure: 1,
  },
  {
    id: 'applied_ai', label: 'Applied AI Engineer', sublabel: '2 paths converge here',
    type: 'convergence', cx: 840, cy: 315, w: 168, h: 82,
    interest: 5, understanding: 2, exposure: 1,
    highlighted: true,
  },
  {
    id: 'deep_research', label: 'Deep Research', sublabel: 'Academia · Long-term',
    type: 'research', cx: 840, cy: 430, w: 162, h: 76,
    interest: 1, understanding: 1, exposure: 0,
  },
]

const EDGES: GraphEdge[] = [
  { fromId: 'cs', toId: 'swe', highlighted: true },
  { fromId: 'cs', toId: 'msc', highlighted: true },
  { fromId: 'cs', toId: 'phd_entry' },
  { fromId: 'swe', toId: 'backend' },
  { fromId: 'swe', toId: 'product' },
  { fromId: 'swe', toId: 'applied_ai', highlighted: true },
  { fromId: 'msc', toId: 'applied_ai', highlighted: true },
  { fromId: 'msc', toId: 'deep_research' },
  { fromId: 'phd_entry', toId: 'deep_research' },
]

const typeStyle: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  start:       { bg: '#FFF1E7', border: '#FDBA74', text: '#9A3412', badge: '#F97316' },
  work:        { bg: '#EBF1FF', border: '#AABDE8', text: '#1E3A8A', badge: '#3B82F6' },
  study:       { bg: '#FFF8E6', border: '#F0C95C', text: '#78530A', badge: '#F59E0B' },
  research:    { bg: '#EDFAF3', border: '#7DD3AB', text: '#145A38', badge: '#10B981' },
  convergence: { bg: '#FFF7ED', border: '#F97316', text: '#9A3412', badge: '#F97316' },
}

function nodePath(nodes: GraphNode[], fromId: string, toId: string): string {
  const from = nodes.find(n => n.id === fromId)!
  const to   = nodes.find(n => n.id === toId)!
  const x1 = from.cx + from.w / 2
  const y1 = from.cy
  const x2 = to.cx - to.w / 2
  const y2 = to.cy
  const midX = (x1 + x2) / 2
  return `M ${x1},${y1} C ${midX},${y1} ${midX},${y2} ${x2},${y2}`
}

function Dots({ count, filled, color }: { count: number; filled: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: i < filled ? color : `${color}30` }}
        />
      ))}
    </div>
  )
}

export default function CareerGraph({ setScreen, copilotOpen, setCopilotOpen, updated }: Props) {
  const [animated, setAnimated] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const nodes = BASE_NODES.map(n => {
    if (updated && n.id === 'applied_ai') {
      return { ...n, understanding: 4, exposure: 2 }
    }
    if (updated && n.id === 'phd_entry') {
      return { ...n, interest: 0, understanding: 0 }
    }
    return n
  })

  const edges = EDGES.map(e => {
    if (updated && (e.fromId === 'swe' && e.toId === 'applied_ai')) {
      return { ...e, confirmed: true }
    }
    return e
  })

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 50)
    return () => clearTimeout(t)
  }, [])

  const SVG_W = 1000
  const SVG_H = 490

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col">
      {/* Page header */}
      <div className="px-4 pt-6 pb-4 flex items-start justify-between flex-wrap gap-4 sm:px-8 sm:pt-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display text-2xl font-medium text-foreground">
              {updated ? 'My Path — Updated' : 'My Path'}
            </h1>
            {updated && (
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                Reality Checked ✓
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Laura Martín · Computer Engineering, Final Year
          </p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <GraphButton label="Add path" icon="+" onClick={() => {}} />
          <GraphButton label="Compare" icon="⇌" onClick={() => {}} />
          <GraphButton
            label="Ask LinkedOut"
            icon="✦"
            primary
            onClick={() => setCopilotOpen(!copilotOpen)}
            active={copilotOpen}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 mb-3 flex items-center gap-4 flex-wrap sm:px-8">
        <span className="text-xs text-muted-foreground">Path type:</span>
        {[
          { type: 'work', label: 'Work' },
          { type: 'study', label: 'Study' },
          { type: 'research', label: 'Research' },
          { type: 'convergence', label: 'Your focus' },
        ].map(({ type, label }) => (
          <div key={type} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: typeStyle[type].badge }}
            />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
        <div className="w-px h-4 bg-border mx-1" />
        <span className="text-xs text-muted-foreground">Dots = Interest level</span>
      </div>

      {/* Graph + Copilot */}
      <div className="flex flex-1 overflow-hidden">
        {/* Graph area */}
        <div
          className={`flex-1 overflow-x-auto transition-all duration-300 ${copilotOpen ? 'mr-0' : ''}`}
        >
          <div className="px-4 pb-8 sm:px-8">
            <div
              className={`relative transition-all duration-500 ${animated ? 'opacity-100' : 'opacity-0'}`}
              style={{ width: '100%', minWidth: SVG_W, height: SVG_H }}
            >
              {/* SVG for edges */}
              <svg
                className="absolute inset-0 pointer-events-none"
                width="100%"
                height={SVG_H}
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                preserveAspectRatio="none"
                style={{ zIndex: 0 }}
              >
                <defs>
                  <marker id="arrow-normal" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#C9C6BE" />
                  </marker>
                  <marker id="arrow-hi" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#F97316" />
                  </marker>
                  <marker id="arrow-confirm" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#10B981" />
                  </marker>
                </defs>
                {edges.map((edge, i) => {
                  const d = nodePath(nodes, edge.fromId, edge.toId)
                  const isHi = edge.highlighted
                  const isConfirm = edge.confirmed
                  // dim PhD paths when updated
                  const isDimmed = updated && (
                    edge.fromId === 'phd_entry' || edge.toId === 'phd_entry' ||
                    (edge.fromId === 'msc' && edge.toId === 'deep_research')
                  )
                  return (
                    <path
                      key={i}
                      d={d}
                      fill="none"
                      stroke={isConfirm ? '#10B981' : isHi ? '#F97316' : '#C9C6BE'}
                      strokeWidth={isConfirm || isHi ? 2.5 : 1.5}
                      vectorEffect="non-scaling-stroke"
                      strokeDasharray={isHi || isConfirm ? undefined : '5,4'}
                      opacity={isDimmed ? 0.2 : isHi ? 0.85 : 0.55}
                      markerEnd={`url(#arrow-${isConfirm ? 'confirm' : isHi ? 'hi' : 'normal'})`}
                      className={animated ? 'graph-edge-animated' : ''}
                      style={{ animationDelay: `${i * 80}ms` }}
                    />
                  )
                })}
              </svg>

              {/* Nodes */}
              {nodes.map((node, i) => {
                const style = typeStyle[node.type]
                const isHovered = hoveredNode === node.id
                const isDimmed = updated && (node.id === 'phd_entry' || node.id === 'deep_research')
                const isConfirmed = updated && node.id === 'applied_ai'
                return (
                  <div
                    key={node.id}
                    className="absolute cursor-pointer select-none"
                    style={{
                      left: `${((node.cx - node.w / 2) / SVG_W) * 100}%`,
                      top: node.cy - node.h / 2,
                      width: `${(node.w / SVG_W) * 100}%`,
                      height: node.h,
                      zIndex: 1,
                      opacity: isDimmed ? 0.3 : 1,
                      animationDelay: `${i * 60}ms`,
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => node.id === 'applied_ai' && setScreen('path_detail')}
                  >
                    <div
                      className="w-full h-full rounded-2xl border-2 flex flex-col justify-between p-3 transition-all duration-200"
                      style={{
                        background: style.bg,
                        borderColor: isHovered ? style.badge : style.border,
                        borderWidth: node.type === 'convergence' ? 2 : isHovered ? 2 : 1.5,
                        boxShadow: isHovered
                          ? `0 8px 24px ${style.badge}25`
                          : node.type === 'convergence'
                          ? `0 4px 16px ${style.badge}20`
                          : undefined,
                        transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                      }}
                    >
                      {/* Top: label */}
                      <div>
                        <div className="text-[13px] font-semibold leading-tight" style={{ color: style.text }}>
                          {node.label}
                        </div>
                      </div>
                      {/* Bottom: sublabel + dots */}
                      <div className="flex items-end justify-between gap-2">
                        <span
                          className="text-[9px] font-mono uppercase tracking-wider leading-none opacity-60"
                          style={{ color: style.text }}
                        >
                          {node.sublabel}
                        </span>
                        <Dots count={5} filled={node.interest} color={style.badge} />
                      </div>
                      {/* Convergence badge */}
                      {node.type === 'convergence' && (
                        <div
                          className="absolute -top-2.5 right-3 text-[9px] font-mono px-2 py-0.5 rounded-full border"
                          style={{
                            background: style.bg,
                            borderColor: style.badge,
                            color: style.badge,
                          }}
                        >
                          2 paths
                        </div>
                      )}
                      {/* Confirmed badge */}
                      {isConfirmed && (
                        <div className="absolute -top-2.5 left-3 text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700">
                          ✓ Confirmed
                        </div>
                      )}
                      {/* Click hint */}
                      {node.id === 'applied_ai' && isHovered && (
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap">
                          Click to explore →
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copilot panel */}
        {copilotOpen && (
          <CopilotPanel
            setScreen={setScreen}
            onClose={() => setCopilotOpen(false)}
            onUpdateGraph={() => setScreen('updated_graph')}
          />
        )}
      </div>

      {/* Bottom bar — understanding legend */}
      <div className="border-t border-border px-4 py-3 flex items-center gap-4 flex-wrap sm:px-8 sm:gap-6">
        <span className="text-xs text-muted-foreground font-mono">Dot scale = Interest (1–5)</span>
        <div className="flex items-center gap-1.5">
          <Dots count={5} filled={5} color="#F97316" />
          <span className="text-xs text-muted-foreground ml-1">High interest</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Dots count={5} filled={2} color="#F97316" />
          <span className="text-xs text-muted-foreground ml-1">Uncertain</span>
        </div>
        {!updated && (
          <button
            className="text-xs text-primary underline underline-offset-2 sm:ml-auto"
            onClick={() => setScreen('path_detail')}
          >
            Explore Applied AI Engineer →
          </button>
        )}
        {updated && (
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-xs text-emerald-600">Graph updated after Reality Check with Clara Ruiz</span>
          </div>
        )}
      </div>
    </div>
  )
}

function GraphButton({
  label, icon, onClick, primary, active,
}: {
  label: string; icon: string; onClick: () => void; primary?: boolean; active?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-shrink-0 items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        primary
          ? active
            ? 'bg-primary text-primary-foreground'
            : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
          : 'border border-border text-foreground hover:border-primary/30 hover:bg-secondary'
      }`}
    >
      <span className="text-xs">{icon}</span>
      {label}
    </button>
  )
}
