import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  maxWidth?: string
  className?: string
}

/**
 * Shared section shell: full-height, scrollable on mobile, centred on desktop.
 * Every section uses this as its root element.
 */
export default function SectionWrapper({
  children,
  maxWidth = 'max-w-5xl',
  className = '',
}: Props) {
  return (
    <section
      data-scrollable
      className="h-full w-full overflow-y-auto flex flex-col scroll-smooth overscroll-contain px-5 sm:px-8 lg:px-12"
      style={{ scrollbarWidth: 'none' }}
    >
      <div className={`${maxWidth} w-full mx-auto my-auto py-10 sm:py-12 lg:py-16 ${className}`}>
        {children}
      </div>
    </section>
  )
}
