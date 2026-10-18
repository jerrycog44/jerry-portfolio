import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { DesignWork } from '../data/site'

interface LightboxProps {
  items: DesignWork[]
  index: number
  onClose: () => void
  onChange: (index: number) => void
}

export default function Lightbox({ items, index, onClose, onChange }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = items[index]
  const count = items.length

  const prev = useCallback(() => onChange((index - 1 + count) % count), [index, count, onChange])
  const next = useCallback(() => onChange((index + 1) % count), [index, count, onChange])

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  const nav = 'absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-ink/70 text-white transition-colors hover:bg-white hover:text-ink'

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}, image ${index + 1} of ${count}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
      onClick={onClose}
    >
      <button ref={closeRef} type="button" aria-label="Close" onClick={onClose} className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-ink">
        <X aria-hidden className="h-6 w-6" />
      </button>
      {count > 1 && (
        <>
          <button type="button" aria-label="Previous image" className={`${nav} left-3 sm:left-6`} onClick={(e) => { e.stopPropagation(); prev() }}>
            <ChevronLeft aria-hidden className="h-6 w-6" />
          </button>
          <button type="button" aria-label="Next image" className={`${nav} right-3 sm:right-6`} onClick={(e) => { e.stopPropagation(); next() }}>
            <ChevronRight aria-hidden className="h-6 w-6" />
          </button>
        </>
      )}
      <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          key={item.id}
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="max-h-[78svh] w-auto max-w-full rounded-xl object-contain"
        />
        <figcaption className="mt-4 text-center text-sm text-soft">
          <span className="font-semibold uppercase tracking-[0.15em] text-white">{item.title}</span>
          {item.brand && <span> · {item.brand}</span>}
        </figcaption>
      </figure>
    </motion.div>
  )
}
