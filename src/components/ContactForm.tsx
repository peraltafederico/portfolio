import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Check } from 'lucide-react'
import { gsap } from '../hooks/useGsap'
import { useTheme } from '../hooks/useTheme'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const companies = [
  'Pager Health',
  'Stateful',
  'ReachSuite.io',
  'Fusebit',
  'Molo Marine',
  'Banco del Sol',
  'Swiss Medical',
]

export function ContactForm() {
  const { dark } = useTheme()
  const pageRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const textColor = dark ? '#ededed' : '#171717'
  const mutedColor = dark ? '#888' : '#666'
  const inputBg = dark ? '#1a1a1a' : '#fff'
  const inputBorder = dark ? '#2a2a2a' : '#e0e0e0'
  const inputFocusBorder = dark ? '#555' : '#999'
  const buttonBg = dark ? '#ededed' : '#171717'
  const buttonText = dark ? '#141414' : '#fafafa'
  const pillBg = dark ? '#1a1a1a' : '#f5f5f5'
  const pillBorder = dark ? '#2a2a2a' : '#e0e0e0'

  

  useEffect(() => {
    if (status !== 'success') return
    const form = formRef.current
    const success = successRef.current
    if (!form || !success) return

    gsap.to(form, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        form.style.display = 'none'
        success.style.display = 'flex'
        gsap.fromTo(success, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' })
      },
    })
  }, [status])

  const handleBack = () => {
    const el = pageRef.current
    if (!el) {
      window.location.href = '/'
      return
    }
    gsap.to(el, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => { window.location.href = '/' },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json() as { error?: string }
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Network error. Please try again.')
      setStatus('error')
    }
  }

  const inputClasses = 'w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200'

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-lg w-full flex-1 flex flex-col justify-center py-12">
        <div className="flex items-center justify-between mb-12" data-field>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm transition-all duration-200 hover:opacity-70 cursor-pointer"
            style={{ color: mutedColor }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight"
          style={{ color: textColor }}
          data-field
        >
          Let's talk
        </h1>
        <p
          className="text-base mt-4 leading-relaxed"
          style={{ color: mutedColor }}
          data-field
        >
          I'll get back to you as soon as I can.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div data-field>
            <label className="block text-xs font-medium uppercase tracking-widest mb-2" style={{ color: mutedColor }}>
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputClasses}
              style={{
                backgroundColor: inputBg,
                border: `1px solid ${inputBorder}`,
                color: textColor,
              }}
              onFocus={(e) => (e.target.style.borderColor = inputFocusBorder)}
              onBlur={(e) => (e.target.style.borderColor = inputBorder)}
            />
          </div>

          <div data-field>
            <label className="block text-xs font-medium uppercase tracking-widest mb-2" style={{ color: mutedColor }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={inputClasses}
              style={{
                backgroundColor: inputBg,
                border: `1px solid ${inputBorder}`,
                color: textColor,
              }}
              onFocus={(e) => (e.target.style.borderColor = inputFocusBorder)}
              onBlur={(e) => (e.target.style.borderColor = inputBorder)}
            />
          </div>

          <div data-field>
            <label className="block text-xs font-medium uppercase tracking-widest mb-2" style={{ color: mutedColor }}>
              Message
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              className={`${inputClasses} resize-none`}
              style={{
                backgroundColor: inputBg,
                border: `1px solid ${inputBorder}`,
                color: textColor,
              }}
              onFocus={(e) => (e.target.style.borderColor = inputFocusBorder)}
              onBlur={(e) => (e.target.style.borderColor = inputBorder)}
            />
          </div>

          {status === 'error' && (
            <p className="text-sm" style={{ color: '#ef4444' }} data-field>
              {errorMessage}
            </p>
          )}

          <div data-field>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50 cursor-pointer"
              style={{ backgroundColor: buttonBg, color: buttonText }}
            >
              {status === 'submitting' ? 'Sending...' : 'Send message'}
            </button>
          </div>
        </form>

        <div
          ref={successRef}
          className="mt-12 flex-col items-center text-center"
          style={{ display: 'none' }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: dark ? '#1a2e1a' : '#e8f5e8' }}
          >
            <Check size={28} style={{ color: '#22c55e' }} />
          </div>
          <p className="text-xl font-medium" style={{ color: textColor }}>
            Got it! I'll get back to you soon.
          </p>
        </div>

        <div ref={pillsRef} className="mt-10 text-center">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-4"
            style={{ color: mutedColor }}
          >
            Companies I've worked with
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {companies.map((company) => (
              <span
                key={company}
                data-pill
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: pillBg,
                  border: `1px solid ${pillBorder}`,
                  color: mutedColor,
                }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
