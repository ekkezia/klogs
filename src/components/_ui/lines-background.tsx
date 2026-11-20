import { twMerge } from "tailwind-merge"

// Ruled-paper background, drawn as ONE element instead of hundreds of divs.
// It stretches to the height of its (relative) parent — i.e. exactly as long as the
// content — plus the 2-line bottom padding from Layout, and at least to the bottom of the viewport.
//
// Each line sits on the bottom pixel of every `size` row, the same spot the old
// `border-b border-dashed` lines used, so everything aligned to the old grid still aligns.
//
// size="line1" → 36px rows (48px ≥ sm), size="line2" → 27px rows (36px ≥ sm)

const sizeClass = {
  line1: "[--lines-h:var(--h-line1)] sm:[--lines-h:var(--h-line1-sm)]",
  line2: "[--lines-h:var(--h-line2)] sm:[--lines-h:var(--h-line2-sm)]",
} as const

const LinesBackground: React.FC<{ size?: keyof typeof sizeClass; className?: string }> = ({
  size = "line1",
  className,
}) => {
  return (
    <div
      aria-hidden
      className={twMerge(
        "lines-background pointer-events-none absolute inset-x-0 top-0 h-[calc(100%+var(--h-line1)*2)] sm:h-[calc(100%+var(--h-line1-sm)*2)] min-h-[calc(100vh-var(--h-line1)*2)] sm:min-h-[calc(100vh-var(--h-line1-sm)*2)]",
        sizeClass[size],
        className
      )}
    />
  )
}

export default LinesBackground
