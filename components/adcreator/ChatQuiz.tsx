'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ChatQuiz — single-column ChatGPT-style quiz.
 * - Bot bubbles drop in, then a 3-dot typing indicator appears (~800ms),
 *   then the input slot opens for the user.
 * - Auto-scroll is suspended if the user manually scrolls up (>40px from
 *   bottom) and resumes when they return to the bottom.
 * - Enter advances. Shift+Enter inserts a newline.
 */

export interface QuizQuestion {
  id: string
  prompt: string
  placeholder?: string
  type?: 'text' | 'url' | 'email'
  /** Predefined options the user can quick-pick (still typed into chat as user message). */
  options?: string[]
}

export interface ChatQuizAnswer {
  questionId: string
  value: string
}

export interface ChatQuizProps {
  questions: QuizQuestion[]
  onComplete: (answers: ChatQuizAnswer[]) => void
  greeting?: string
  /** ms the typing indicator shows before the next bot bubble appears. */
  typingMs?: number
  className?: string
  /**
   * Fired each time the user submits an answer (before the bot responds).
   * Non-breaking optional extension for analytics wiring.
   * Implementations must be fire-and-forget — they run inside the submit path.
   */
  onAnswer?: (answer: ChatQuizAnswer, stepIndex: number) => void
}

type Bubble =
  | { id: string; role: 'bot'; text: string }
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'typing' }

export function ChatQuiz({
  questions,
  onComplete,
  greeting,
  typingMs = 800,
  className = '',
  onAnswer,
}: ChatQuizProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<ChatQuizAnswer[]>([])
  const [draft, setDraft] = useState('')
  const [acceptingInput, setAcceptingInput] = useState(false)
  const [done, setDone] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const userScrolledUpRef = useRef(false)

  // Initial greeting + first question
  useEffect(() => {
    let cancelled = false
    const seed: Bubble[] = []
    if (greeting) seed.push({ id: 'greet', role: 'bot', text: greeting })
    setBubbles(seed)
    setBubbles((prev) => [...prev, { id: 't0', role: 'typing' }])
    const t = setTimeout(() => {
      if (cancelled) return
      setBubbles((prev) => [
        ...prev.filter((b) => b.role !== 'typing'),
        { id: `q-${questions[0].id}`, role: 'bot', text: questions[0].prompt },
      ])
      setAcceptingInput(true)
      requestAnimationFrame(() => inputRef.current?.focus())
    }, typingMs)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-scroll on new bubble — but only if user is near bottom.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    if (userScrolledUpRef.current) return
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight
    })
  }, [bubbles])

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    userScrolledUpRef.current = distFromBottom > 40
  }

  function submitAnswer(value: string) {
    const trimmed = value.trim()
    if (!trimmed || !acceptingInput) return
    const q = questions[currentIdx]
    const answer = { questionId: q.id, value: trimmed }
    const nextAnswers = [...answers, answer]
    setAnswers(nextAnswers)
    setDraft('')
    setAcceptingInput(false)
    // Fire-and-forget analytics hook; callback must never throw into this path.
    if (onAnswer) {
      try {
        onAnswer(answer, currentIdx)
      } catch {
        /* ignore analytics failures */
      }
    }

    setBubbles((prev) => [
      ...prev,
      { id: `u-${q.id}`, role: 'user', text: trimmed },
      { id: `t-${q.id}`, role: 'typing' },
    ])

    const nextIdx = currentIdx + 1
    setTimeout(() => {
      if (nextIdx >= questions.length) {
        setBubbles((prev) => [
          ...prev.filter((b) => b.role !== 'typing'),
          { id: 'done', role: 'bot', text: 'Got it. Building your report…' },
        ])
        setDone(true)
        onComplete(nextAnswers)
        return
      }
      setBubbles((prev) => [
        ...prev.filter((b) => b.role !== 'typing'),
        { id: `q-${questions[nextIdx].id}`, role: 'bot', text: questions[nextIdx].prompt },
      ])
      setCurrentIdx(nextIdx)
      setAcceptingInput(true)
      requestAnimationFrame(() => inputRef.current?.focus())
    }, typingMs)
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submitAnswer(draft)
    }
  }

  const currentQuestion = questions[currentIdx]
  const inputType = currentQuestion?.type ?? 'text'

  return (
    <div className={`flex flex-col h-full w-full max-w-2xl mx-auto ${className}`}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-3"
        style={{ background: 'transparent' }}
      >
        <AnimatePresence initial={false}>
          {bubbles.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className={`flex ${b.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {b.role === 'typing' ? (
                <TypingDots />
              ) : (
                <div
                  className="max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap"
                  style={
                    b.role === 'user'
                      ? {
                          background: 'rgba(0,255,148,0.08)',
                          color: 'rgba(255,255,255,0.95)',
                          fontFamily: 'JetBrains Mono, SF Mono, Menlo, monospace',
                          fontSize: '13px',
                          boxShadow: 'inset 0 0 0 1px rgba(0,255,148,0.16)',
                        }
                      : {
                          background: 'rgba(255,255,255,0.04)',
                          color: 'rgba(255,255,255,0.92)',
                          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                        }
                  }
                >
                  {b.role === 'bot' ? b.text : b.text}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!done && currentQuestion?.options && acceptingInput && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {currentQuestion.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => submitAnswer(opt)}
              className="text-[12px] font-medium rounded-full px-3 py-1.5 transition-colors duration-150"
              style={{
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.72)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 pb-4 pt-2">
        <div
          className="flex items-end gap-2 rounded-xl p-2"
          style={{
            background: 'rgba(255,255,255,0.04)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              done
                ? 'Done.'
                : acceptingInput
                ? currentQuestion?.placeholder ?? 'Type your answer…'
                : '…'
            }
            disabled={!acceptingInput || done}
            rows={1}
            spellCheck={inputType !== 'url' && inputType !== 'email'}
            className="flex-1 resize-none bg-transparent outline-none text-[14px] leading-relaxed disabled:opacity-50"
            style={{
              color: 'rgba(255,255,255,0.95)',
              fontFamily: 'JetBrains Mono, SF Mono, Menlo, monospace',
              fontSize: '13px',
              minHeight: 28,
              maxHeight: 120,
            }}
          />
          <button
            type="button"
            onClick={() => submitAnswer(draft)}
            disabled={!acceptingInput || done || !draft.trim()}
            className="rounded-md px-3 py-1.5 text-[12px] font-semibold text-black transition-opacity disabled:opacity-30"
            style={{ background: '#00FF94' }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div
      className="rounded-2xl px-4 py-3 inline-flex items-center gap-1.5"
      style={{
        background: 'rgba(255,255,255,0.04)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.6)' }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
