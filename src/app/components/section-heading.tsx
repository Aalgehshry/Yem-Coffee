import type { ReactNode } from 'react';
import { cn } from './ui/utils';

interface SectionHeadingProps {
  /** Small all-caps line above the title, e.g. "Featured". */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Renders the title as `<h1>` on pages where it is the document title. */
  as?: 'h1' | 'h2';
  className?: string;
}

/**
 * The title / subtitle block that opens each section.
 *
 * Every page built this by hand, so the five section headers on the site had
 * four different sizes and two different spacings. One component gives the
 * whole storefront a single typographic rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Title = 'h2',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper-text',
            centered && 'justify-center',
          )}
        >
          <span aria-hidden="true" className="h-px w-8 bg-copper/50" />
          {eyebrow}
          {centered && <span aria-hidden="true" className="h-px w-8 bg-copper/50" />}
        </p>
      )}

      <Title
        className={cn(
          'text-balance text-primary',
          Title === 'h1'
            ? 'text-4xl sm:text-5xl'
            : 'text-3xl sm:text-4xl',
        )}
      >
        {title}
      </Title>

      {description && (
        <p
          className={cn(
            'mt-3 text-pretty text-lg text-muted-foreground',
            centered && 'mx-auto max-w-2xl',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
