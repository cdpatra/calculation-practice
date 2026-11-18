import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeftRight, SkipForward } from 'lucide-react'
import { recordResult, type Topic } from '../lib/stats'
import type { Question } from '../lib/questions'
import { useSaved } from '../lib/useSaved'
import { Keypad } from './Keypad'
import { Screen } from './Screen'

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

function defaultReverse(topic: Topic): boolean {
  return topic === 'addition' || topic === 'subtraction' || topic === 'multiplication'
}

type Status = 'typing' | 'correct' | 'wrong'

function signature(question: Question) {
  return `${question.operator}:${question.operands.join(',')}`
}

export function Drill({
  title,
  topic,
  revision,
  makeQuestion,
  note,
  toolbar,
}: {
  title: string
  topic: Topic
  revision: string
  makeQuestion: () => Question
  note?: string
  toolbar?: ReactNode
}) {
  const makeRef = useRef(makeQuestion)
  makeRef.current = makeQuestion

  const fresh = useCallback((previous?: Question) => {
    const previousKey = previous ? signature(previous) : ''
    let question = makeRef.current()
    let tries = 0
    while (previousKey && signature(question) === previousKey && tries < 6) {
      question = makeRef.current()
      tries += 1
    }
    return question
  }, [])

  const [question, setQuestion] = useState<Question>(() => fresh())
  const [input, setInput] = useState('')
  const [reverseInput, setReverseInput] = useSaved(`ssc-reverse-${topic}`, defaultReverse(topic), isBoolean)
  const reverseRef = useRef(reverseInput)
  reverseRef.current = reverseInput
  const [status, setStatus] = useState<Status>('typing')
  const [session, setSession] = useState({ correct: 0, wrong: 0, streak: 0, totalMs: 0 })
  const [now, setNow] = useState(() => Date.now())
  const [seenRevision, setSeenRevision] = useState(revision)
  const started = useRef(Date.now())
  const locked = useRef(false)
  const activeId = useRef(question.id)
  const timeoutRef = useRef<number | null>(null)
  activeId.current = question.id

  if (seenRevision !== revision) {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    setSeenRevision(revision)
    setQuestion(fresh())
    setInput('')
    setStatus('typing')
    locked.current = false
    started.current = Date.now()
  }

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 200)
    return () => window.clearInterval(id)
  }, [])

  const pushDigit = useCallback((digit: string) => {
    setInput((value) => {
      if (value.length >= 12) return value
      return reverseRef.current ? digit + value : value + digit
    })
  }, [])

  const popDigit = useCallback(() => {
    setInput((value) => (reverseRef.current ? value.slice(1) : value.slice(0, -1)))
  }, [])

  const goNext = useCallback(() => {
    locked.current = false
    started.current = Date.now()
    setQuestion((current) => fresh(current))
    setInput('')
    setStatus('typing')
  }, [fresh])

  const submit = useCallback(() => {
    if (locked.current || status !== 'typing' || input === '') return
    const value = Number(input)
    if (!Number.isFinite(value)) return
    locked.current = true
    const ok = value === question.answer
    const ms = Date.now() - started.current
    const nextStreak = ok ? session.streak + 1 : 0
    setSession((current) => ({
      correct: current.correct + (ok ? 1 : 0),
      wrong: current.wrong + (ok ? 0 : 1),
      streak: nextStreak,
      totalMs: current.totalMs + ms,
    }))
    recordResult(topic, ok, ms, nextStreak)
    setStatus(ok ? 'correct' : 'wrong')
    if (ok) {
      const id = question.id
      timeoutRef.current = window.setTimeout(() => {
        if (activeId.current === id) goNext()
      }, 350)
    }
  }, [status, input, question.answer, question.id, session.streak, topic, goNext])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return
      }
      if (status === 'wrong') {
        if (event.key === 'Enter') {
          event.preventDefault()
          goNext()
        }
        return
      }
      if (status !== 'typing') return
      if (event.key >= '0' && event.key <= '9') {
        event.preventDefault()
        pushDigit(event.key)
      } else if (event.key === 'Backspace') {
        event.preventDefault()
        popDigit()
      } else if (event.key === 'Enter') {
        event.preventDefault()
        submit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status, submit, goNext, pushDigit, popDigit])

  const attempts = session.correct + session.wrong
  const average = attempts ? session.totalMs / attempts / 1000 : 0
  const seconds = status === 'typing' ? (now - started.current) / 1000 : null
  const last = question.operands.length - 1

  const dock = (
    <div className="dock">
      <Keypad
        disabled={status !== 'typing'}
        onDigit={pushDigit}
        onClear={() => setInput('')}
        onBackspace={popDigit}
      />
      {status === 'wrong' ? (
        <button type="button" className="primary" onClick={goNext}>
          Next question
        </button>
      ) : (
        <button type="button" className="primary" onClick={submit} disabled={status !== 'typing' || input === ''}>
          {status === 'correct' ? 'Correct' : 'Check'}
        </button>
      )}
    </div>
  )

  return (
    <Screen title={title} topic={topic} footer={dock}>
      {toolbar}
      {note ? <p className="note">{note}</p> : null}
      <p className="stats">
        <span className="stat stat-ok">{session.correct} correct</span>
        <span className="stat stat-bad">{session.wrong} wrong</span>
        <span className={session.streak > 0 ? 'stat stat-streak' : 'stat stat-muted'}>streak {session.streak}</span>
        <span className="stat stat-time">{attempts ? `${average.toFixed(1)}s avg` : 'avg —'}</span>
      </p>
      <div className="action-row">
        <button
          type="button"
          className={reverseInput ? 'switch on' : 'switch'}
          aria-pressed={reverseInput}
          aria-label={reverseInput ? 'Reverse input on' : 'Reverse input off'}
          onClick={() => {
            setReverseInput((value) => !value)
            if (status === 'typing') setInput('')
          }}
        >
          <ArrowLeftRight size={16} aria-hidden />
          <span className="switch-track" aria-hidden>
            <span className="switch-thumb" />
          </span>
        </button>
        {status === 'typing' ? (
          <button type="button" className="icon-btn" aria-label="Skip" onClick={goNext}>
            <SkipForward size={18} aria-hidden />
          </button>
        ) : null}
      </div>

      {question.layout === 'column' ? (
        <div className={`qcard ${status}`}>
          <div className="time">{seconds === null ? '' : `${seconds.toFixed(1)}s`}</div>
          <div className={question.operands.length >= 5 ? 'column dense' : 'column'}>
            {question.operands.map((value, index) => (
              <Fragment key={index}>
                <span className="op">{index === last ? question.operator : ''}</span>
                <span className="num">{value}</span>
              </Fragment>
            ))}
            <div className="rule" />
            <span className="op" />
            <span className={`num answer ${input ? '' : 'ghost'}`}>{input || '?'}</span>
          </div>
        </div>
      ) : (
        <div className={`qcard expression ${status}`}>
          <div className="time">{seconds === null ? '' : `${seconds.toFixed(1)}s`}</div>
          <div className="expr">{question.expression}</div>
          <div className={`expr-answer ${input ? '' : 'ghost'}`}>{input || '?'}</div>
        </div>
      )}

      {status !== 'typing' ? (
        <div className="result-pop-layer" role="status" aria-live="polite">
          <div className={`result-pop ${status}`}>
            {status === 'correct' ? (
              <span className="result-title">Correct</span>
            ) : (
              <>
                <span className="result-title">Wrong</span>
                <span className="result-answer">{question.answer}</span>
              </>
            )}
          </div>
        </div>
      ) : null}
    </Screen>
  )
}
