import type { PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { SITE } from '../data/site'
import { ContactButton, SecondaryButton } from './Buttons'

const ease = [0.22, 1, 0.36, 1] as const

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

export default function HeroSection() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 80, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 80, damping: 18, mass: 0.6 })

  // Subtle magnetic drift. Mouse only: touch and pen input are ignored.
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set(((e.clientX - r.left) / r.width - 0.5) * 24)
    y.set(((e.clientY - r.top) / r.height - 0.5) * 14)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      <div className="relative mx-auto flex w-full max-w-[1800px] flex-1 flex-col items-center px-5 pb-12 pt-24 sm:px-8 xl:px-12 xl:pb-0 xl:pt-28">
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="relative z-0 select-none text-center text-[clamp(5.5rem,27vw,30rem)] font-black uppercase leading-[0.8] tracking-[-0.05em] text-white"
        >
          Jerry
        </motion.h1>

        {/* Portrait */}
        <div className="relative z-10 -mt-[7vw] aspect-[2/3] w-[min(78vw,440px)] xl:absolute xl:bottom-0 xl:left-1/2 xl:mt-0 xl:h-[calc(100%-6rem)] xl:w-auto xl:-translate-x-1/2">
          <motion.div
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
            className="relative h-full w-full"
          >
            <div
              aria-hidden
              className="absolute inset-[-10%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent)]"
            />
            <img
              src="/portrait.webp"
              alt="Portrait of Jerry, a graphics designer and web developer, in a white shirt with a loosened black tie"
              width={1000}
              height={1500}
              decoding="async"
              className="relative h-full w-full object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink to-transparent" />
        </div>

        {/* Copy */}
        <div className="relative z-20 mt-8 w-full max-w-xl self-start xl:absolute xl:bottom-14 xl:left-12 xl:mt-0 xl:max-w-[21rem] 2xl:max-w-md">
          <motion.p {...rise(0.45)} className="eyebrow text-soft">
            {SITE.title}
          </motion.p>
          <motion.p {...rise(0.55)} className="mt-4 text-lg font-light leading-relaxed text-soft">
            {SITE.tagline}
          </motion.p>
          <motion.div {...rise(0.7)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ContactButton href="#contact">Contact Me</ContactButton>
            <SecondaryButton href="#projects">
              Explore My Work <ArrowDownRight aria-hidden className="h-4 w-4" />
            </SecondaryButton>
          </motion.div>
        </div>

        <motion.p
          {...rise(0.8)}
          className="relative z-20 mt-12 self-start text-sm font-medium uppercase tracking-[0.2em] text-muted xl:absolute xl:bottom-14 xl:right-12 xl:mt-0 xl:max-w-[16rem] xl:self-auto xl:text-right"
        >
          {SITE.philosophy}
        </motion.p>
      </div>
    </section>
  )
}
