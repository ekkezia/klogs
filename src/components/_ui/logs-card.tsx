import Link from "next/link"
import React from "react"
import { TLog } from "@/types/log-types"

// Layout rules (so everything sits on the dashed LinesBackground):
// - Every row is a whole number of lines tall (6 for the photo, 1 + 3 + 1 for text).
// - Horizontal borders are only ever the *bottom* border of a row, which lands on the
//   same pixel row as the dashed line. The text box's top border is pulled up 1px
//   (-mt-px) for the same reason.

// Stable pseudo-random tilt per log, between ±0.8° and ±2.6°.
const tiltFor = (seed: string) => {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  const n = (Math.abs(h) % 1000) / 1000
  const deg = 0.8 + n * 1.8
  return h % 2 === 0 ? deg : -deg
}

const toPlainText = (blocks: TLog["overview"] | null | undefined) =>
  (blocks ?? [])
    .map((b) => (b?.children ?? []).map((c) => c.text).join(""))
    .filter((t) => t.trim().length > 0)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()

const LogsCard: React.FC<{ log: TLog; index: number }> = ({ log, index }) => {
  const slug =
    typeof log.slug === "string"
      ? log.slug
      : typeof log.slug === "object" && log.slug !== null && "current" in log.slug
        ? (log.slug as { current: string }).current
        : ""

  const imageUrl = log.image?.asset?.url
  const parsedYear = log.date ? new Date(log.date).getFullYear() : NaN
  const year = Number.isNaN(parsedYear) ? null : parsedYear
  const techs = (log.techStacks ?? []).map((t) => t.label)
  const blurb = toPlainText(log.overview)
  const cats = log.categories ?? []
  const tilt = tiltFor(log._id ?? log.title ?? String(index))

  return (
    <Link href={`/logs/${slug}`} className="group block">
      <article className="lg:flex lg:items-stretch">
        {/* Photo "pasted" on the page: the row is 6 lines tall (keeps the grid), the photo
            itself sits low and pokes ~12px over the text box, above it in z-order */}
        <div className="relative z-10 flex h-[calc(var(--h-line1)*6)] w-full shrink-0 items-end justify-center px-3 sm:h-[calc(var(--h-line1-sm)*6)] lg:w-[40%] lg:items-center lg:justify-center lg:px-4">
          <div
            className="relative flex max-w-full items-center justify-center bg-white p-[6px] [--photo-overlap:4px] sm:[--photo-overlap:12px] lg:[--photo-overlap:0px] lg:[--photo-x:16px] shadow-[0_2px_6px_rgba(0,0,0,0.18)] duration-500 group-hover:shadow-[0_8px_18px_rgba(0,0,0,0.22)]"
            style={{ transform: `translate(var(--photo-x, 0px), var(--photo-overlap)) rotate(${tilt}deg)` }}
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${imageUrl}${imageUrl.endsWith(".gif") ? "" : "?w=1000&auto=format"}`}
                alt={log.title}
                loading={index < 6 ? "eager" : "lazy"}
                className="block max-h-[calc(var(--h-line1)*6-12px)] max-w-full object-contain sm:max-h-[calc(var(--h-line1-sm)*6-12px)] lg:max-h-[calc(var(--h-line1-sm)*7)]"
              />
            ) : (
              <div className="flex aspect-[4/3] h-[calc(var(--h-line1)*6-12px)] items-center justify-center bg-secondary p-4 sm:h-[calc(var(--h-line1-sm)*6-12px)]">
                <span className="h3 text-center text-primary">{log.title}</span>
              </div>
            )}
          </div>
        </div>

        {/* Text box: stays straight */}
        <div className="-mt-px border-x border-t border-primary duration-500 lg:min-w-0 lg:flex-1 group-hover:bg-[color-mix(in_srgb,var(--secondary-default)_45%,transparent)]">
          {/* Title row — 1 line */}
          <div className="flex h-line1 items-center border-b border-primary sm:h-line1-sm">
            <div className="body1 flex h-full w-line1 shrink-0 items-center justify-center border-r border-primary sm:w-line1-sm">
              {index}
            </div>
            <p className="body1 min-w-0 flex-1 truncate px-3">{log.title}</p>
            {year && <span className="body4 shrink-0 px-3 text-primary">{year}</span>}
            {/* One square cell per category emoji, split by lines */}
            {cats.map((c) => (
              <span
                key={c.slug ?? c.title}
                title={c.title}
                className="flex h-full w-line1 shrink-0 items-center justify-center border-l border-primary text-[18px] leading-none sm:w-line1-sm sm:text-[22px]"
              >
                {c.emoji ?? "•"}
              </span>
            ))}
          </div>

          {/* Blurb — 3 ruled rows: line-height = one line, so each text line sits in its own row */}
          <div className="h-[calc(var(--h-line1)*3)] overflow-hidden border-b border-primary px-3 sm:h-[calc(var(--h-line1-sm)*3)] lg:h-[calc(var(--h-line1-sm)*4)] lg:pl-8">
            <p className="body2 line-clamp-3 !leading-[var(--h-line1)] opacity-80 sm:!leading-[var(--h-line1-sm)] lg:line-clamp-4">
              {blurb || "—"}
            </p>
          </div>

          {/* Tech row — 1 line */}
          <div className="flex h-line1 items-center gap-2 overflow-hidden border-b border-primary px-3 sm:h-line1-sm lg:pl-8">
            {techs.slice(0, 3).map((t) => (
              <span key={t} className="body4 shrink-0 whitespace-nowrap border border-primary px-2 py-[2px] text-primary">
                {t}
              </span>
            ))}
            {techs.length > 3 && <span className="body4 shrink-0 text-primary">+{techs.length - 3}</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default LogsCard
