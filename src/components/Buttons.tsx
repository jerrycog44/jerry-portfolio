import type { ReactNode } from 'react'

interface ButtonProps {
  href: string
  children: ReactNode
  external?: boolean
  tone?: 'dark' | 'light'
  className?: string
}

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4'

const externalProps = (external?: boolean) =>
  external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

export function ContactButton({
  href,
  children,
  external,
  tone = 'dark',
  className = '',
}: ButtonProps) {
  const colors =
    tone === 'dark'
      ? 'bg-[#6585FF] text-white shadow-[0_8px_30px_rgba(101,133,255,0.22)] hover:bg-[#7C97FF] hover:shadow-[0_12px_35px_rgba(101,133,255,0.35)] focus-visible:outline-[#A3FF5F]'
      : 'bg-ink text-white hover:bg-neutral-800 focus-visible:outline-[#6585FF]'

  return (
    <a href={href} {...externalProps(external)} className={`${base} ${colors} ${className}`}>
      {children}
    </a>
  )
}

export function SecondaryButton({
  href,
  children,
  external,
  tone = 'dark',
  className = '',
}: ButtonProps) {
  const colors =
    tone === 'dark'
      ? 'border border-[#A3FF5F]/60 bg-[#A3FF5F]/[0.06] text-[#C5FF9B] hover:border-[#A3FF5F] hover:bg-[#A3FF5F]/[0.13] focus-visible:outline-[#A3FF5F]'
      : 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/5 focus-visible:outline-ink'

  return (
    <a href={href} {...externalProps(external)} className={`${base} ${colors} ${className}`}>
      {children}
    </a>
  )
}
