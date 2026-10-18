import { useState } from 'react'
import { ImageOff } from 'lucide-react'

interface SafeImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  eager?: boolean
}

/** Image with lazy loading, intrinsic size (prevents layout shift) and a neutral fallback if it fails. */
export default function SafeImage({ src, alt, width, height, className = '', eager = false }: SafeImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ aspectRatio: `${width} / ${height}` }}
        className={`flex w-full items-center justify-center bg-neutral-200 text-neutral-500 ${className}`}
      >
        <ImageOff aria-hidden className="h-8 w-8" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
