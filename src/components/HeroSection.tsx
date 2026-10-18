import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { SITE } from '../data/site'
import { ContactButton, SecondaryButton } from './Buttons'

const ease = [0.22, 1, 0.36, 1] as const

const words = ['DESIGN', 'BUILD', 'CREATE', 'INNOVATE', 'DESIGN', 'BUILD', 'CREATE', 'INNOVATE']

export default function HeroSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* Decorative abstract composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="hero-glow absolute left-1/2 top-[42%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[560px] sm:w-[560px]" />

        <motion.div
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-[42%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 sm:h-[450px] sm:w-[450px]"
        >
          <div className="absolute inset-0 rounded-full border border-white/15" />
          <div className="absolute inset-[12%] rounded-full border border-dashed border-white/15" />
          <div className="absolute left-1/2 top-0 h-3 w-3 rounded-full bg-[#A3FF5F] shadow-[0_0_30px_rgba(163,255,95,0.65)]" />
          <div className="absolute bottom-[14%] left-[8%] h-2 w-2 rounded-full bg-[#6585FF]" />
        </motion.div>

        <motion.div
          animate={reduce ? {} : { y: [0, -18, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[12%] top-[36%] h-12 w-12 rotate-12 rounded-xl border border-white/20 bg-white/[0.04] backdrop-blur-sm sm:left-[20%] sm:h-16 sm:w-16"
        />

        <motion.div
          animate={reduce ? {} : { y: [0, 20, 0], rotate: [45, 65, 45] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[12%] top-[28%] h-16 w-16 rotate-45 rounded-2xl border border-[#6585FF]/50 bg-[#6585FF]/10 sm:right-[22%] sm:h-24 sm:w-24"
        />

        <motion.div
          animate={reduce ? {} : { y: [0, -12, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[27%] right-[15%] h-8 w-8 rounded-full border border-[#A3FF5F]/50 bg-[#A3FF5F]/10 sm:right-[28%] sm:h-12 sm:w-12"
        />

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1800px] flex-1 flex-col px-5 pb-8 pt-28 sm:px-8 sm:pt-32 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="relative z-10 mb-8 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-[#A3FF5F]" />
          <span className="eyebrow text-soft">{SITE.title}</span>
        </motion.div>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="relative z-10 select-none text-center text-[clamp(5rem,20vw,20rem)] font-black uppercase leading-[0.78] tracking-[-0.075em] text-white"
        >
          JERRY<span className="text-[#6585FF]">.</span>
        </motion.h1>

        <div className="relative z-10 mx-auto mt-12 flex w-full max-w-5xl flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="max-w-xl"
          >
            <p className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
              Ideas made visible.
              <br />
              <span className="text-soft">Experiences made useful.</span>
            </p>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-soft sm:text-lg">
              {SITE.tagline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ContactButton href="#contact">
                Let&apos;s Talk <ArrowUpRight aria-hidden className="h-4 w-4" />
              </ContactButton>

              <SecondaryButton href="#projects">
                Explore My Work <ArrowDownRight aria-hidden className="h-4 w-4" />
              </SecondaryButton>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xs text-sm uppercase leading-relaxed tracking-[0.16em] text-muted md:text-right"
          >
            {SITE.philosophy}
          </motion.p>
        </div>
      </div>

      {/* Seamless animated marquee */}
      <div
        className="marquee relative z-10 mt-12 border-y border-white/10 py-4 sm:mt-16"
        aria-label="Design, build, create, innovate"
      >
        <div className={`marquee-track ${reduce ? 'marquee-static' : ''}`}>
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="marquee-group"
              aria-hidden={copy === 1 ? 'true' : undefined}
            >
              {words.map((word, index) => (
                <span key={`${word}-${index}`} className="marquee-item">
                  {word}
                  <span className="marquee-dot">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
