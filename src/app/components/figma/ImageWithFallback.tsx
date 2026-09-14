import { useState, type ImgHTMLAttributes } from 'react'
import { ImageOff } from 'lucide-react'

/**
 * An `<img>` that degrades gracefully when the source fails to load.
 *
 * All product photography is remote (Unsplash), so a blocked request or an
 * expired URL would otherwise leave a broken-image icon in the middle of the
 * grid. The placeholder is drawn in the brand palette instead of the browser
 * default, and it keeps the same box so the layout does not shift.
 */
export function ImageWithFallback(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const { src, alt, style, className, ...rest } = props

  if (didError) {
    return (
      <div
        role="img"
        aria-label={alt ? `${alt} (image unavailable)` : 'Image unavailable'}
        data-original-url={src}
        className={`flex flex-col items-center justify-center gap-2 bg-sand/60 text-muted-foreground ${className ?? ''}`}
        style={style}
      >
        <ImageOff className="h-6 w-6 opacity-60" aria-hidden="true" />
        <span className="px-3 text-center text-xs">Image unavailable</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={() => setDidError(true)}
    />
  )
}
