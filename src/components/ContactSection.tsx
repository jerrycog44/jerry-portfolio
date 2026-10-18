import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react'
import { CONTACTS, SOCIALS } from '../data/site'
import FadeIn from './FadeIn'
import SocialIcon from './SocialIcon'

const icons = { whatsapp: MessageCircle, email: Mail, phone: Phone } as const

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-ink py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <p className="eyebrow text-muted">Contact</p>
          <h2 id="contact-title" className="mt-4 text-[clamp(2.75rem,9vw,8.5rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
            Let&rsquo;s work
            <br />
            together.
          </h2>
          <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-soft">
            Have a project in mind? Let&rsquo;s discuss how thoughtful design and effective development can help bring
            your ideas to life.
          </p>
        </FadeIn>

        <ul className="mt-16 border-b border-line">
          {CONTACTS.map((c, i) => {
            const Icon = icons[c.id as keyof typeof icons]
            return (
              <li key={c.id} className="border-t border-line">
                <FadeIn delay={i * 0.06}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex min-h-20 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-5 transition-colors hover:text-white"
                  >
                    <span className="flex items-center gap-4 text-soft transition-colors group-hover:text-white">
                      <Icon aria-hidden strokeWidth={1.5} className="h-6 w-6" />
                      <span className="eyebrow">{c.label}</span>
                    </span>
                    <span className="flex items-center gap-3 break-all text-xl font-bold sm:text-3xl">
                      {c.value}
                      <ArrowUpRight aria-hidden className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </span>
                  </a>
                </FadeIn>
              </li>
            )
          })}
        </ul>

        <FadeIn className="mt-12">
          <h3 className="eyebrow text-muted">Find me online</h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-line px-5 text-sm font-medium transition-colors hover:border-white hover:bg-white/10"
                >
                  <SocialIcon id={s.id} className="h-4 w-4" />
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}
