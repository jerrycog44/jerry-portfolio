import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { DESIGN_FILTERS, DESIGN_WORKS, SOCIALS, WEB_PROJECTS, type DesignCategory } from '../data/site'
import FadeIn from './FadeIn'
import Lightbox from './Lightbox'
import ProjectCard from './ProjectCard'
import SafeImage from './SafeImage'
import SectionHeading from './SectionHeading'
import { SecondaryButton } from './Buttons'

// Large first row, then an even row of three: varied scale without chaos.
const webSpans = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
]

export default function ProjectGallery() {
  const [filter, setFilter] = useState<'All' | DesignCategory>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visible = useMemo(
    () => (filter === 'All' ? DESIGN_WORKS : DESIGN_WORKS.filter((w) => w.category === filter)),
    [filter],
  )
  const instagram = SOCIALS.find((s) => s.id === 'instagram')

  return (
    <section id="projects" aria-labelledby="projects-title" className="on-light bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-8 lg:px-12">
        <FadeIn>
          <SectionHeading id="projects-title" eyebrow="Selected Projects" title="Work that communicates." tone="light" />
        </FadeIn>

        {/* Web development */}
        <div className="mt-16 sm:mt-20">
          <FadeIn>
            <h3 className="eyebrow border-b border-ink/15 pb-4 text-neutral-600">Web Development</h3>
          </FadeIn>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12">
            {WEB_PROJECTS.map((project, i) => (
              <FadeIn key={project.slug} delay={(i % 3) * 0.08} className={webSpans[i] ?? 'lg:col-span-4'}>
                <ProjectCard project={project} className="h-full" />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Graphics design */}
        <div className="mt-24 sm:mt-32">
          <FadeIn>
            <div className="flex flex-col gap-6 border-b border-ink/15 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="eyebrow text-neutral-600">Graphics Design</h3>
              <div role="group" aria-label="Filter graphics design work" className="flex flex-wrap gap-2">
                {DESIGN_FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                    className={`min-h-11 rounded-lg border px-4 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                      filter === f ? 'border-ink bg-ink text-white' : 'border-ink/25 text-ink hover:border-ink'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <ul className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {visible.map((work, i) => (
              <li key={work.id} className="mb-6 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`View ${work.title}${work.brand ? `, ${work.brand}` : ''} full size`}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-ink/10 bg-neutral-100 text-left"
                >
                  <SafeImage
                    src={work.src}
                    alt={work.alt}
                    width={work.width}
                    height={work.height}
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-12 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <span className="block text-sm font-semibold uppercase tracking-[0.12em]">{work.title}</span>
                    <span className="block text-xs text-soft">
                      {[work.brand, work.category].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {instagram && (
            <FadeIn className="mt-10 flex justify-center">
              <SecondaryButton href={instagram.href} external tone="light">
                <Instagram aria-hidden className="h-4 w-4" /> See more work on Instagram
              </SecondaryButton>
            </FadeIn>
          )}
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && visible[openIndex] && (
          <Lightbox items={visible} index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
        )}
      </AnimatePresence>
    </section>
  )
}
