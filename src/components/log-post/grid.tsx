import React from "react"
import { twMerge } from "tailwind-merge"

// Everything on a post page is measured in ruled lines.
// `--L` is one line2 row: 27px on phones, 36px from `sm` up (same as LinesBackground size="line2").
export const POST_ROOT_CLASS = "[--L:var(--h-line2)] sm:[--L:var(--h-line2-sm)]"

/** CSS length for n ruled lines, e.g. L(6) → calc(var(--L) * 6) */
export const L = (n: number) => `calc(var(--L) * ${n})`

/**
 * A bordered box whose horizontal borders land exactly on ruled lines.
 * Top border is pulled up 1px onto the line above; children should be whole-line rows
 * that each draw their own border-b.
 */
export const RuledBox: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={twMerge("-mt-px border-x border-t border-primary", className)} {...props} />
)

/** One line of vertical space. */
export const Gap: React.FC<{ lines?: number }> = ({ lines = 1 }) => <div aria-hidden style={{ height: L(lines) }} />

/** A row exactly n lines tall, with a bottom border on the line. */
export const Row: React.FC<React.HTMLAttributes<HTMLDivElement> & { lines?: number }> = ({
  lines = 1,
  className,
  style,
  ...props
}) => <div className={twMerge("flex items-center border-b border-primary", className)} style={{ height: L(lines), ...style }} {...props} />

export const pad = (n: number) => String(n).padStart(2, "0")
