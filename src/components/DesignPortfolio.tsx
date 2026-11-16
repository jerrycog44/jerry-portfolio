import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Folder, Layers, Church, Image as ImageIcon } from 'lucide-react'
import { DESIGN_WORKS, type DesignWork } from '../data/site'

type FolderId = 'logos' | 'church' | 'social'

const churchIds = new Set([
  'scriptural-hq-understanding',
  'scriptural-hq-may',
  'teenagers-retreat',
  'jesus-vibes-church',
])

const collections: Array<{
  id: FolderId
  title: string
  eyebrow: string
  description: string
  icon: typeof Folder
  works: DesignWork[]
}> = [
  {
    id: 'logos',
    title: 'Logo Designs',
    eyebrow: '01 / BRAND IDENTITY',
    description: 'Distinctive marks, symbols and visual identities.',
    icon: Layers,
    works: DESIGN_WORKS.filter((work) => work.category === 'Brand Identity'),
  },
  {
    id: 'church',
    title: 'Church Designs',
    eyebrow: '02 / FAITH & COMMUNITY',
    description: 'Creative visuals for churches, ministries and faith communities.',
    icon: Church,
    works: DESIGN_WORKS.filter((work) => churchIds.has(work.id)),
  },
  {
    id: 'social',
    title: 'Social Media Designs',
    eyebrow: '03 / DIGITAL CAMPAIGNS',
    description: 'Promotional graphics and social-first visual communication.',
    icon: ImageIcon,
    works: DESIGN_WORKS.filter(
      (work) => work.category === 'Flyers & Promotional Design' && !churchIds.has(work.id),
    ),
  },
]

function FolderVisual({ works }: { works: DesignWork[] }) {
  return (
    <div className="relative mx-auto h-36 w-full max-w-[230px] sm:h-44">
      <div className="absolute left-[13%] top-5 h-24 w-[72%] rotate-[-8deg] rounded-xl border border-white/30 bg-white/15 shadow-xl transition-transform duration-500 group-hover:-translate-y-3 group-hover:-rotate-12 sm:h-28" />
      <div className="absolute right-[10%] top-3 h-24 w-[66%] rotate-[8deg] overflow-hidden rounded-xl border border-white/30 bg-white/20 shadow-xl transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-12 sm:h-28">
        {works[1] && <img src={works[1].src} alt="" className="h-full w-full object-cover opacity-80" />}
      </div>
      <div className="absolute bottom-1 left-[7%] h-[88px] w-[86%] overflow-hidden rounded-t-xl border border-white/30 bg-[#303030] shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 sm:h-24">
        {works[0] && <img src={works[0].src} alt="" className="h-full w-full object-cover opacity-90" />}
      </div>
      <div className="absolute bottom-0 left-[7%] h-[62px] w-[86%] rounded-xl border border-white/20 bg-gradient-to-br from-[#4b4b4b] to-[#191919] shadow-2xl transition-all duration-500 group-hover:translate-y-1 sm:h-[70px]">
        <div className="absolute -top-[13px] left-0 h-[15px] w-[35%] rounded-t-lg border-x border-t border-white/20 bg-[#4b4b4b]" />
        <div className="flex h-full items-center justify-center">
          <Folder className="h-8 w-8 text-white/75" strokeWidth={1.2} />
        </div>
      </div>
    </div>
  )
}

function WorkGrid({ works }: { works: DesignWork[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {works.map((work, index) => (
        <motion.article
          key={work.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: Math.min(index * 0.045, 0.3) }}
          className="group overflow-hidden rounded-2xl border border-ink/10 bg-white"
        >
          <a
            href={work.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${work.title} in a new tab`}
            className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#eeeeec] p-3"
          >
            <img
              src={work.src}
              alt={work.alt}
              width={work.width}
              height={work.height}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <span className="absolute right-3 top-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </a>
          <div className="flex items-start justify-between gap-3 p-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-tight text-ink sm:text-base">{work.title}</h3>
              <p className="mt-1 text-xs text-neutral-500">{work.brand || 'Selected work'}</p>
            </div>
            <span className="mt-1 text-[10px] font-semibold tracking-widest text-neutral-400">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </motion.article>
      ))}
    </div>
  )
}

export default function DesignPortfolio() {
  const [active, setActive] = useState<FolderId | null>(null)
  const selected = collections.find((folder) => folder.id === active)

  return (
    <section id="design-projects" className="bg-paper px-5 pb-24 pt-10 text-ink sm:px-10 sm:pb-32 lg:px-16">
      <div className="mx-auto max-w-[1500px]">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="folders"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-14 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow text-neutral-500">02 / Graphic Design</p>
                  <h2 className="mt-3 text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
                    Design Archive<span className="text-neutral-400">.</span>
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                    A curated collection of visual work, organised by discipline. Open a folder to explore.
                  </p>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  {String(DESIGN_WORKS.length).padStart(2, '0')} selected pieces
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
                {collections.map((folder, index) => {
                  const Icon = folder.icon
                  return (
                    <motion.button
                      key={folder.id}
                      type="button"
                      onClick={() => setActive(folder.id)}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      whileHover={{ y: -7 }}
                      whileTap={{ scale: 0.985 }}
                      className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-[#111111] p-5 text-left text-white shadow-[0_14px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500 hover:shadow-[0_24px_55px_rgba(0,0,0,0.16)] sm:p-7"
                    >
                      <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full border border-white/[0.07] transition-transform duration-700 group-hover:scale-125" />
                      <div className="relative mb-3 flex items-center justify-between">
                        <span className="text-[10px] font-semibold tracking-[0.22em] text-white/45">
                          {String(index + 1).padStart(2, '0')} / 03
                        </span>
                        <Icon className="h-4 w-4 text-white/55 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.5} />
                      </div>
                      <FolderVisual works={folder.works} />
                      <div className="relative mt-5 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-[9px] font-semibold tracking-[0.2em] text-white/45">{folder.eyebrow.split(' / ')[1]}</p>
                          <h3 className="mt-2 text-xl font-bold uppercase leading-tight tracking-tight sm:text-2xl">{folder.title}</h3>
                          <p className="mt-2 max-w-[240px] text-xs leading-relaxed text-white/55">{folder.description}</p>
                        </div>
                        <span className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                      <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">Open collection</span>
                        <span className="text-xs tabular-nums text-white/55">{String(folder.works.length).padStart(2, '0')} works</span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.28 }}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="mb-10 inline-flex items-center gap-3 rounded-full border border-ink/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.13em] text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> Back to design folders
              </button>

              <div className="mb-9 flex flex-col justify-between gap-4 border-b border-ink/10 pb-7 sm:mb-12 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow text-neutral-500">{selected.eyebrow} / SELECTED WORK</p>
                  <h2 className="mt-3 text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
                    {selected.title}<span className="text-neutral-400">.</span>
                  </h2>
                  <p className="mt-4 max-w-xl text-sm text-neutral-600 sm:text-base">{selected.description}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  {String(selected.works.length).padStart(2, '0')} works
                </span>
              </div>

              {selected.works.length > 0 ? (
                <WorkGrid works={selected.works} />
              ) : (
                <div className="rounded-2xl border border-dashed border-ink/20 px-6 py-20 text-center">
                  <Folder className="mx-auto h-9 w-9 text-neutral-400" strokeWidth={1.2} />
                  <h3 className="mt-5 text-lg font-bold uppercase">Collection coming soon</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-500">
                    New pieces will appear here as this collection grows.
                  </p>
                </div>
              )}

              <div className="mt-20 border-t border-ink/10 pt-10 sm:mt-24 sm:pt-12">
                <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <p className="eyebrow text-neutral-500">KEEP EXPLORING</p>
                    <h3 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
                      Explore other collections<span className="text-neutral-400">.</span>
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-500">More of my graphic design work</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {collections
                    .filter((folder) => folder.id !== selected.id)
                    .map((folder) => (
                      <motion.button
                        key={folder.id}
                        type="button"
                        onClick={() => {
                          setActive(folder.id)
                          window.scrollTo({
                            top: document.getElementById('design-projects')?.offsetTop ?? 0,
                            behavior: 'smooth',
                          })
                        }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.99 }}
                        className="group flex min-h-[150px] items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-4 text-left text-white transition-colors hover:border-white/30 sm:gap-5 sm:p-5"
                      >
                        <div className="w-[42%] max-w-[170px] shrink-0">
                          <FolderVisual works={folder.works} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                            {folder.eyebrow}
                          </p>
                          <h4 className="mt-2 text-lg font-bold uppercase leading-tight tracking-tight sm:text-xl">
                            {folder.title}
                          </h4>
                          <p className="mt-2 text-xs leading-relaxed text-white/55">
                            {folder.description}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/65 transition-colors group-hover:text-white">
                            Explore collection
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </motion.button>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
