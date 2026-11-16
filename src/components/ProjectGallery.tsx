import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { WEB_PROJECTS } from '../data/site'
import ProjectCard from './ProjectCard'
import DesignPortfolio from './DesignPortfolio'
import SectionHeading from './SectionHeading'

interface HorizontalShowcaseProps {
  id: string
  eyebrow: string
  title: string
  description: string
  count: number
  children: ReactNode
}

function HorizontalShowcase({ id, eyebrow, title, description, count, children }: HorizontalShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${Math.max(0, count - 1) * 100}vw`])

  return (
    <section id={id} ref={sectionRef} aria-label={title} className="relative bg-paper text-ink" style={{ height: `${count * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ x }} className="flex h-full w-max will-change-transform">
          {Array.from({ length: count }, (_, index) => (
            <article key={index} className="flex h-[100svh] w-screen shrink-0 flex-col justify-center px-5 py-20 sm:px-10 lg:px-16">
              <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col justify-center">
                <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
                  <div>
                    <p className="eyebrow text-neutral-500">{eyebrow}</p>
                    <h2 className="mt-2 text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">{title}</h2>
                    <p className="mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">{description}</p>
                  </div>
                  <span className="shrink-0 pb-1 text-xs font-semibold tracking-widest text-neutral-500 sm:text-sm">
                    {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                  </span>
                </div>
                <div className="min-h-0 flex-1">
                  {Array.isArray(children) ? children[index] : index === 0 ? children : null}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-ink/15 pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">Jerry · Selected Work</span>
                  <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500 sm:text-xs">
                    Scroll to explore <ArrowDown aria-hidden className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function WebProjects() {
  return (
    <HorizontalShowcase
      id="projects"
      eyebrow="01 / Digital"
      title="Web Development"
      description="Digital experiences designed to work beautifully and communicate clearly."
      count={WEB_PROJECTS.length}
    >
      {WEB_PROJECTS.map((project) => (
        <div key={project.slug} className="flex h-full min-h-0 items-center justify-center overflow-y-auto pb-1">
          <div className="w-full max-w-5xl">
            <ProjectCard project={project} />
          </div>
        </div>
      ))}
    </HorizontalShowcase>
  )
}

export default function ProjectGallery() {
  return (
    <div className="on-light">
      <div className="bg-paper px-5 pb-12 pt-24 text-ink sm:px-10 sm:pb-16 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <p className="eyebrow text-neutral-500">Selected Projects</p>
          <SectionHeading id="projects-heading" eyebrow="Selected Projects" title="Work that communicates." tone="light" />
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-neutral-600 sm:text-lg">
            A selection of websites, brand identities and graphics created to make ideas stand out.
          </p>
        </div>
      </div>
      <WebProjects />
      <DesignPortfolio />
    </div>
  )
}
