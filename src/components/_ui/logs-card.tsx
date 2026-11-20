import Link from "next/link"
import React from "react"
import { TLog } from "@/types/log-types"

// Layout rules (so everything sits on the dashed LinesBackground):
// - Every row is a whole number of lines tall (6 for the photo, 1 + 2 + 1 for text).
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
  const tilt = tiltFor(log._id ?? log.title ?? String(index))

  return (
    <Link href={`/logs/${slug}`} className="group block">
      <article>
        {/* Photo "pasted" on the page: 6 lines tall, transparent so the lines show through */}
        <div className="relative flex h-[calc(var(--h-line1)*6)] w-full items-center justify-center px-6 py-4 sm:h-[calc(var(--h-line1-sm)*6)]">
          <div
            className="relative flex max-h-full max-w-full items-center justify-center bg-white p-[6px] shadow-[0_2px_6px_rgba(0,0,0,0.18)] duration-500 group-hover:shadow-[0_8px_18px_rgba(0,0,0,0.22)]"
            style={{ transform: `rotate(${tilt}deg)` }}
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${imageUrl}${imageUrl.endsWith(".gif") ? "" : "?w=900&auto=format"}`}
                alt={log.title}
                loading={index < 6 ? "eager" : "lazy"}
                className="block max-h-[calc(var(--h-line1)*6-32px-12px)] max-w-full object-contain sm:max-h-[calc(var(--h-line1-sm)*6-32px-12px)]"
              />
            ) : (
              <div className="flex aspect-[4/3] h-[calc(var(--h-line1)*6-32px-12px)] items-center justify-center bg-secondary p-4 sm:h-[calc(var(--h-line1-sm)*6-32px-12px)]">
                <span className="h3 text-center text-primary">{log.title}</span>
              </div>
            )}
          </div>
        </div>

        {/* Text box: stays straight */}
        <div className="-mt-px border-x border-t border-primary bg-tertiary duration-500 group-hover:bg-secondary">
          {/* Title row — 1 line */}
          <div className="flex h-line1 items-center border-b border-primary sm:h-line1-sm">
            <div className="body2 flex h-full w-line1 shrink-0 items-center justify-center border-r border-primary sm:w-line1-sm">
              {index}
            </div>
            <p className="body2 min-w-0 flex-1 truncate px-3">{log.title}</p>
            {year && <span className="body4 shrink-0 px-3 text-primary">{year}</span>}
          </div>

          {/* Blurb — 2 lines */}
          <div className="flex h-[calc(var(--h-line1)*2)] items-center border-b border-primary px-3 sm:h-[calc(var(--h-line1-sm)*2)]">
            <p className="body3 line-clamp-3 leading-[1.35] opacity-80">{blurb || "—"}</p>
          </div>

          {/* Tech row — 1 line */}
          <div className="flex h-line1 items-center gap-2 overflow-hidden border-b border-primary px-3 sm:h-line1-sm">
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
