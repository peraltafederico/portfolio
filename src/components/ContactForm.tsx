import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Check } from 'lucide-react'
import { gsap } from '../hooks/useGsap'

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
  const pageRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

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

  const inputClasses = 'w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 bg-white dark:bg-[#1a1a1a] border border-[#e0e0e0] dark:border-[#2a2a2a] text-neutral-900 dark:text-neutral-100 focus:border-[#999] dark:focus:border-[#555]'

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-lg w-full flex-1 flex flex-col justify-center py-12">
        <div className="flex items-center justify-between mb-12" data-field>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm transition-all duration-200 hover:opacity-70 cursor-pointer text-[#666] dark:text-[#888]"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
          data-field
        >
          Let's talk
        </h1>
        <p
          className="text-base mt-4 leading-relaxed text-[#666] dark:text-[#888]"
          data-field
        >
          I'll get back to you as soon as I can.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div data-field>
            <label className="block text-xs font-medium uppercase tracking-widest mb-2 text-[#666] dark:text-[#888]">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputClasses}
            />
          </div>

          <div data-field>
            <label className="block text-xs font-medium uppercase tracking-widest mb-2 text-[#666] dark:text-[#888]">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={inputClasses}
            />
          </div>

          <div data-field>
            <label className="block text-xs font-medium uppercase tracking-widest mb-2 text-[#666] dark:text-[#888]">
              Message
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-500" data-field>
              {errorMessage}
            </p>
          )}

          <div data-field>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50 cursor-pointer bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900"
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
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#e8f5e8] dark:bg-[#1a2e1a]"
          >
            <Check size={28} className="text-green-500" />
          </div>
          <p className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
            Got it! I'll get back to you soon.
          </p>
        </div>

        <div ref={pillsRef} className="mt-10 text-center">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-4 text-[#666] dark:text-[#888]"
          >
            Companies I've worked with
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {companies.map((company) => (
              <span
                key={company}
                data-pill
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-[#1a1a1a] border border-[#e0e0e0] dark:border-[#2a2a2a] text-[#666] dark:text-[#888]"
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
