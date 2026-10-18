import type { ReactNode } from 'react'

interface ButtonProps {
  href: string
  children: ReactNode
  external?: boolean
  /** 'dark' = for use on dark backgrounds (default); 'light' = for use on white backgrounds. */
  tone?: 'dark' | 'light'
  className?: string
}

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-200'

const externalProps = (external?: boolean) =>
  external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

/** Primary filled button. */
export function ContactButton({ href, children, external, tone = 'dark', className = '' }: ButtonProps) {
  const colors =
    tone === 'dark' ? 'bg-white text-ink hover:bg-soft' : 'bg-ink text-white hover:bg-neutral-700'
  return (
    <a href={href} {...externalProps(external)} className={`${base} ${colors} ${className}`}>
      {children}
    </a>
  )
}

/** Secondary outlined button. */
export function SecondaryButton({ href, children, external, tone = 'dark', className = '' }: ButtonProps) {
  const colors =
    tone === 'dark'
      ? 'border border-white/30 text-white hover:border-white hover:bg-white/10'
      : 'border border-ink/30 text-ink hover:border-ink hover:bg-ink/5'
  return (
    <a href={href} {...externalProps(external)} className={`${base} ${colors} ${className}`}>
      {children}
    </a>
  )
}
