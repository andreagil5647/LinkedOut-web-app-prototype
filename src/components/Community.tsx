import { useState } from 'react'
import type { Screen } from '../App'

interface Props {
  setScreen: (s: Screen) => void
}

interface Post {
  id: number
  title: string
  body: string
  author: string
  anonymous: boolean
  time: string
  replies: number
  tags: string[]
  likes: number
  liked: boolean
}

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    title: "Master's or work first? I have both options open.",
    body: "I have a SWE offer from a Series B startup and an acceptance at UCL for their MSc in AI. I keep going back and forth. The startup feels exciting but temporary — the MSc feels safe but also like I'm delaying. Has anyone made this specific choice and can share how it turned out?",
    author: 'Miguel Santos',
    anonymous: false,
    time: '5 days ago',
    replies: 23,
    tags: ["Master's", 'Work', 'Decision'],
    likes: 18,
    liked: false,
  },
  {
    id: 2,
    title: "I like AI but I don't know if research is actually for me",
    body: "I'm good at maths and I enjoy reading papers, but I honestly don't know if I have the patience for a 4-year PhD. The topics excite me but the actual process — writing, uncertainty, slow feedback loops — scares me. Is there a way to try research before committing?",
    author: 'Priya Sharma',
    anonymous: false,
    time: '2 days ago',
    replies: 41,
    tags: ['Research', 'PhD', 'AI'],
    likes: 34,
    liked: false,
  },
  {
    id: 3,
    title: "I genuinely don't know what I want after graduation",
    body: "I'm finishing my CS degree, I'm decent at most things, but nothing clicks hard enough to commit to. AI? Product? Startups? Big companies? I just feel like everyone around me has a plan and I'm just... finishing my degree. Is this normal? Does it get better?",
    author: 'Anonymous',
    anonymous: true,
    time: '12 hours ago',
    replies: 67,
    tags: ['Undecided', 'Career', 'Uncertainty'],
    likes: 92,
    liked: false,
  },
  {
    id: 4,
    title: "Nobody talks about how isolating the PhD is in year 2",
    body: "Year 1 was exciting — courses, a new city, a clear structure. Year 2 is just... me, my laptop, and a research direction I'm no longer sure about. Before committing to a PhD, ask your potential supervisor what year 2 typically looks like for their students.",
    author: 'Thomas Bergström',
    anonymous: false,
    time: '3 days ago',
    replies: 29,
    tags: ['PhD', 'Reality Check', 'Mental Health'],
    likes: 56,
    liked: false,
  },
]

export default function Community({ setScreen }: Props) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [composing, setComposing] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [isAnon, setIsAnon] = useState(false)
  const [expandedPost, setExpandedPost] = useState<number | null>(null)

  const toggleLike = (id: number) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ))
  }

  const handlePost = () => {
    if (!newTitle.trim() || !newBody.trim()) return
    const newPost: Post = {
      id: Date.now(),
      title: newTitle,
      body: newBody,
      author: isAnon ? 'Anonymous' : 'Laura Martín',
      anonymous: isAnon,
      time: 'just now',
      replies: 0,
      tags: [],
      likes: 0,
      liked: false,
    }
    setPosts(prev => [newPost, ...prev])
    setNewTitle('')
    setNewBody('')
    setComposing(false)
  }

  const tagColors: Record<string, string> = {
    "Master's": 'bg-amber-50 text-amber-700 border-amber-200',
    Work: 'bg-blue-50 text-blue-700 border-blue-200',
    Decision: 'bg-purple-50 text-purple-700 border-purple-200',
    Research: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    PhD: 'bg-teal-50 text-teal-700 border-teal-200',
    AI: 'bg-violet-50 text-violet-700 border-violet-200',
    Undecided: 'bg-orange-50 text-orange-700 border-orange-200',
    Career: 'bg-pink-50 text-pink-700 border-pink-200',
    Uncertainty: 'bg-red-50 text-red-700 border-red-200',
    'Reality Check': 'bg-sky-50 text-sky-700 border-sky-200',
    'Mental Health': 'bg-rose-50 text-rose-700 border-rose-200',
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wider">Community</div>
          <h1 className="font-display text-3xl font-medium text-foreground mb-2">
            You are not the only one<br />figuring this out.
          </h1>
          <p className="text-sm text-muted-foreground">
            A space for honest conversations about uncertainty, not a place to perform certainty.
            Posts from verified students — anonymous or named.
          </p>
        </div>

        {/* Compose button */}
        {!composing ? (
          <button
            onClick={() => setComposing(true)}
            className="w-full bg-card border border-border rounded-2xl p-4 text-left text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all mb-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-primary">LM</span>
              </div>
              Share what's on your mind…
            </div>
          </button>
        ) : (
          <div className="bg-card border border-primary/20 rounded-2xl p-5 mb-6 animate-fade-in">
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="What's your question or thought?"
              className="w-full text-sm font-medium text-foreground bg-transparent border-b border-border pb-3 mb-3 focus:outline-none placeholder:text-muted-foreground"
            />
            <textarea
              value={newBody}
              onChange={e => setNewBody(e.target.value)}
              placeholder="Add more context if you want…"
              rows={3}
              className="w-full text-sm text-foreground bg-transparent resize-none focus:outline-none placeholder:text-muted-foreground"
            />
            <div className="flex flex-col gap-3 mt-4 pt-3 border-t border-border sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
                <div
                  onClick={() => setIsAnon(!isAnon)}
                  className={`w-4 h-4 rounded border-2 transition-all ${
                    isAnon ? 'bg-primary border-primary' : 'border-border'
                  }`}
                />
                Post anonymously to community
              </label>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setComposing(false)}
                  className="px-3.5 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePost}
                  disabled={!newTitle.trim()}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    newTitle.trim()
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-4">
          {posts.map(post => (
            <div
              key={post.id}
              className={`bg-card rounded-2xl border transition-all ${
                expandedPost === post.id ? 'border-primary/20 shadow-lg shadow-primary/5' : 'border-border hover:border-primary/15'
              }`}
            >
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
              >
                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex gap-1.5 mb-2 flex-wrap">
                    {post.tags.map(t => (
                      <span
                        key={t}
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${tagColors[t] ?? 'bg-muted text-muted-foreground border-border'}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="font-semibold text-foreground text-sm mb-2 leading-snug">{post.title}</h3>
                <p className={`text-sm text-muted-foreground leading-relaxed ${expandedPost === post.id ? '' : 'line-clamp-2'}`}>
                  {post.body}
                </p>
              </div>

              <div className="px-5 pb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  {/* Author */}
                  <div className="flex min-w-0 items-center gap-1.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${post.anonymous ? 'bg-muted' : 'bg-secondary'}`}>
                      <span className="text-[8px] font-semibold text-muted-foreground">
                        {post.anonymous ? '?' : post.author[0]}
                      </span>
                    </div>
                    <span className="truncate text-[11px] text-muted-foreground">{post.author}</span>
                    <span className="text-[11px] text-border">·</span>
                    <span className="text-[11px] text-muted-foreground">{post.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={e => { e.stopPropagation(); toggleLike(post.id) }}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      post.liked ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>{post.liked ? '♥' : '♡'}</span>
                    {post.likes}
                  </button>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>💬</span>
                    {post.replies}
                  </div>
                </div>
              </div>

              {/* Expanded: simulated replies */}
              {expandedPost === post.id && (
                <div className="border-t border-border px-5 py-4 animate-fade-in">
                  <div className="space-y-3 mb-4">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[9px] text-blue-600 font-semibold">AR</span>
                      </div>
                      <div className="flex-1 bg-muted rounded-xl rounded-tl-sm px-3 py-2.5 text-sm text-foreground leading-relaxed">
                        Really glad someone said this. I chose MSc and I sometimes wonder if I made the right call. Still figuring it out honestly.
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[9px] text-muted-foreground font-semibold">?</span>
                      </div>
                      <div className="flex-1 bg-muted rounded-xl rounded-tl-sm px-3 py-2.5 text-sm text-foreground leading-relaxed">
                        The real answer might be: try to talk to people 2-3 years ahead of you on both paths. Not to copy them, but to see what they actually think now.
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-[8px] font-semibold text-primary">LM</span>
                    </div>
                    <input
                      placeholder="Reply…"
                      className="flex-1 text-sm bg-muted rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
