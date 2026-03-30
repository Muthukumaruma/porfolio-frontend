import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, MessageCircle, RotateCcw } from 'lucide-react'

const WORKER_URL = import.meta.env.VITE_AI_WORKER_URL || 'https://portfolio-ai-worker.muthukumaruma.workers.dev'

const SUGGESTIONS = [
  'What are your top skills?',
  'Tell me about your experience',
  'What AI projects have you worked on?',
  'Which companies have you worked at?',
]

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-theme animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}

export default function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Show hint tooltip on load, auto-dismiss after 4s
  useEffect(() => {
    const show = setTimeout(() => setShowHint(true), 1500)
    const hide = setTimeout(() => setShowHint(false), 5500)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm Muthu's AI assistant. Ask me anything about his skills, experience, or background! 👋",
      }])
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text: string) => {
    const userMsg = text.trim()
    if (!userMsg || loading) return
    setInput('')
    const updated: Message[] = [...messages, { role: 'user', content: userMsg }]
    setMessages(updated)
    setLoading(true)

    try {
      const res = await fetch(`${WORKER_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json() as { reply?: string; error?: string }
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply ?? 'Sorry, something went wrong. Please try again.' },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setMessages([{
      role: 'assistant',
      content: "Hi! I'm Muthu's AI assistant. Ask me anything about his skills, experience, or background! 👋",
    }])
  }

  return (
    <>
      {/* Speech bubble hint on load */}
      <AnimatePresence>
        {showHint && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-[240px] right-6 z-50 cursor-pointer"
            onClick={() => { setShowHint(false); setOpen(true) }}
          >
            <div className="relative bg-white dark:bg-metal border border-theme/30 rounded-2xl rounded-br-none px-4 py-2.5 shadow-lg max-w-[180px]">
              <p className="text-xs font-semibold text-gray-800 dark:text-white leading-snug">
                👋 Ask me anything about Muthu!
              </p>
              {/* Triangle pointer */}
              <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white dark:bg-metal border-r border-b border-theme/30 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single container — GIF + dot + bubble + label all centered */}
      <div className="fixed bottom-2 right-6 z-50 flex flex-col items-center gap-1">
        <AnimatePresence>
          {!open && (
            <motion.img
              src={`${import.meta.env.BASE_URL}avatarToChat.gif`}
              alt="Chat with me"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="w-28 h-28 object-contain cursor-pointer"
              onClick={() => setOpen(true)}
            />
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!open && (
          <span className="w-3 h-3 rounded-full bg-green-400 border-2 border-white dark:border-night animate-pulse" />
        )}

        {/* Floating bubble */}
        <motion.button
          onClick={() => { setShowHint(false); setOpen((o) => !o) }}
          className="w-14 h-14 rounded-full bg-theme shadow-glow flex items-center justify-center hover:scale-110 transition-transform duration-300"
          whileTap={{ scale: 0.95 }}
          animate={!open && showHint ? { scale: [1, 1.15, 1, 1.15, 1] } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          title="Chat with AI about Muthukumar"
        >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} className="text-night" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={22} className="text-night" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-grey-dark bg-white dark:bg-metal"
            style={{ maxHeight: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-theme">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-night/20 flex items-center justify-center">
                  <Bot size={16} className="text-night" />
                </div>
                <div>
                  <p className="text-night font-bold text-sm">Ask about Muthu</p>
                  <p className="text-night/70 text-xs">AI-powered · Always available</p>
                </div>
              </div>
              <button onClick={reset} title="Reset chat" className="text-night/60 hover:text-night transition-colors">
                <RotateCcw size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '340px' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    msg.role === 'assistant' ? 'bg-theme/20' : 'bg-gray-100 dark:bg-grey-dark'
                  }`}>
                    {msg.role === 'assistant'
                      ? <Bot size={13} className="text-theme" />
                      : <User size={13} className="text-gray-500 dark:text-white/50" />
                    }
                  </div>
                  {/* Bubble */}
                  <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-gray-100 dark:bg-grey-dark text-gray-800 dark:text-white/90 rounded-tl-sm'
                      : 'bg-theme text-night rounded-tr-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-theme/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={13} className="text-theme" />
                  </div>
                  <div className="bg-gray-100 dark:bg-grey-dark rounded-2xl rounded-tl-sm px-3 py-2">
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions — show only at start */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-theme/30 text-theme hover:bg-theme/10 transition-colors duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3">
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-grey-dark-200 bg-gray-50 dark:bg-grey-dark px-3 py-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send(input)}
                  placeholder="Ask anything about Muthu..."
                  className="flex-1 text-sm bg-transparent outline-none text-gray-800 dark:text-white/90 placeholder-gray-400 dark:placeholder-white/30"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg bg-theme flex items-center justify-center disabled:opacity-40 hover:bg-theme-dark transition-colors duration-200 flex-shrink-0"
                >
                  <Send size={13} className="text-night" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
