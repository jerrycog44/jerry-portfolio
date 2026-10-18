import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import type { WebProject } from '../data/site'
import { ContactButton, SecondaryButton } from './Buttons'

function hostname(url: string) {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

interface ProjectCardProps {
  project: WebProject
  className?: string
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const [failed, setFailed] = useState(false)
  const host = hostname(project.liveUrl)

  return (
    <article className={`group flex flex-col ${className}`}>
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name} live site (opens in a new tab)`}
        className="relative block aspect-[16/10] overflow-hidden rounded-2xl border border-ink/10 bg-ink"
      >
        {failed ? (
          // Honest typographic preview, shown until a real screenshot exists in /public/projects.
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-muted/60" />
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-muted/60" />
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-muted/60" />
              <span className="ml-3 truncate rounded-md border border-line px-3 py-1 text-xs text-soft">{host}</span>
            </div>
            <div className="flex flex-1 items-end p-5 sm:p-7">
              <span className="text-[clamp(1.75rem,4vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-white">
                {project.name}
              </span>
            </div>
          </div>
        ) : (
          <motion.img
            src={project.image}
            alt={`Screenshot of the ${project.name} website`}
            width={1600}
            height={1000}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover object-top"
          />
        )}
        <span
          aria-hidden
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2"
        >
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </a>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="eyebrow text-neutral-600">{project.category}</p>
        <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight sm:text-3xl">{project.name}</h3>
        <p className="mt-2 max-w-md text-base font-light leading-relaxed text-neutral-700">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ContactButton href={project.liveUrl} external tone="light">
            View Live Project <ArrowUpRight aria-hidden className="h-4 w-4" />
          </ContactButton>
          {project.repoUrl && (
            <SecondaryButton href={project.repoUrl} external tone="light">
              <Github aria-hidden className="h-4 w-4" /> View Source
            </SecondaryButton>
          )}
        </div>
      </div>
    </article>
  )
}
