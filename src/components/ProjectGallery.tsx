import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Instagram } from 'lucide-react'
import { DESIGN_WORKS, SOCIALS, WEB_PROJECTS, type DesignWork } from '../data/site'
import ProjectCard from './ProjectCard'
import SafeImage from './SafeImage'
import SectionHeading from './SectionHeading'
import { SecondaryButton } from './Buttons'

interface HorizontalShowcaseProps {
  id: string
  eyebrow: string
  title: string
  description: string
  count: number
  children: ReactNode
}

function HorizontalShowcase({
  id,
  eyebrow,
  title,
  description,
  count,
  children,
}: HorizontalShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${Math.max(0, count - 1) * 100}vw`],
  )

  return (
    <section
      id={id}
      ref={sectionRef}
      aria-label={title}
      className="relative bg-paper text-ink"
      style={{ height: `${count * 100}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full w-max will-change-transform"
        >
          {Array.from({ length: count }, (_, index) => (
            <article
              key={index}
              className="flex h-[100svh] w-screen shrink-0 flex-col justify-center px-5 py-20 sm:px-10 lg:px-16"
            >
              <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col justify-center">
                <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
                  <div>
                    <p className="eyebrow text-neutral-500">{eyebrow}</p>
                    <h2 className="mt-2 text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
                      {title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
                      {description}
                    </p>
                  </div>

                  <span className="shrink-0 pb-1 text-xs font-semibold tracking-widest text-neutral-500 sm:text-sm">
                    {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                  </span>
                </div>

                {/*
                  Each slide occupies exactly one viewport width.
                  Vertical page scrolling drives the horizontal movement.
                */}
                <div className="min-h-0 flex-1">
                  {Array.isArray(children)
                    ? children[index]
                    : index === 0
                      ? children
                      : null}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-ink/15 pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
                    Jerry · Selected Work
                  </span>
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
        <div
          key={project.slug}
          className="flex h-full min-h-0 items-center justify-center overflow-y-auto pb-1"
        >
          <div className="w-full max-w-5xl">
            <ProjectCard project={project} />
          </div>
        </div>
      ))}
    </HorizontalShowcase>
  )
}

function DesignSlides({
  works,
  eyebrow,
  title,
  description,
  id,
}: {
  works: DesignWork[]
  eyebrow: string
  title: string
  description: string
  id: string
}) {
  return (
    <HorizontalShowcase
      id={id}
      eyebrow={eyebrow}
      title={title}
      description={description}
      count={works.length}
    >
      {works.map((work) => (
        <div
          key={work.id}
          className="flex h-full min-h-0 flex-col items-center justify-center"
        >
          <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-neutral-100 p-3 sm:p-5">
            <SafeImage
              src={work.src}
              alt={work.alt}
              width={work.width}
              height={work.height}
              eager={works.indexOf(work) === 0}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex w-full items-start justify-between gap-4 py-4">
            <div>
              <h3 className="text-lg font-bold uppercase tracking-tight sm:text-2xl">
                {work.title}
              </h3>
              <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                {[work.brand, work.category].filter(Boolean).join(' · ')}
              </p>
            </div>

            <a
              href={work.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${work.title} image in a new tab`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform hover:scale-105"
            >
              <ArrowUpRight aria-hidden className="h-5 w-5" />
            </a>
          </div>
        </div>
      ))}
    </HorizontalShowcase>
  )
}

export default function ProjectGallery() {
  const logos = DESIGN_WORKS.filter(
    (work) => work.category === 'Brand Identity',
  )

  const flyers = DESIGN_WORKS.filter(
    (work) => work.category === 'Flyers & Promotional Design',
  )

  const instagram = SOCIALS.find((social) => social.id === 'instagram')

  return (
    <div className="on-light">
      <div className="bg-paper px-5 pb-12 pt-24 text-ink sm:px-10 sm:pb-16 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-[1500px]">
          <p className="eyebrow text-neutral-500">Selected Projects</p>
          <SectionHeading
            id="projects-heading"
            eyebrow="Selected Projects"
            title="Work that communicates."
            tone="light"
          />
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-neutral-600 sm:text-lg">
            A selection of websites, brand identities and graphics created to
            make ideas stand out.
          </p>
        </div>
      </div>

      <WebProjects />

      <DesignSlides
        id="logo-design"
        eyebrow="02 / Brand Identity"
        title="Logo Design"
        description="Distinctive marks and visual identities built to be remembered."
        works={logos}
      />

      <DesignSlides
        id="flyer-design"
        eyebrow="03 / Graphic Design"
        title="Flyer Design"
        description="Promotional visuals that bring the message, details and personality together."
        works={flyers}
      />

      {instagram && (
        <div className="flex justify-center bg-paper px-5 py-12 sm:py-16">
          <SecondaryButton href={instagram.href} external tone="light">
            <Instagram aria-hidden className="h-4 w-4" />
            See more work on Instagram
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </SecondaryButton>
        </div>
      )}
    </div>
  )
}
