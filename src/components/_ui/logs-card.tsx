import Link from "next/link"
import React from "react"
import { TLog } from "@/types/log-types"

// Card heights are multiples of the line height so every card sits on the
// dashed LinesBackground grid: 6 lines of image + 1 title line + 1 tag line.
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

  return (
    <Link href={`/logs/${slug}`} className="group block">
      <article className="border border-primary bg-tertiary duration-500 group-hover:bg-secondary">
        {/* Hero image */}
        <div className="relative h-[calc(var(--h-line1)*6)] w-full overflow-hidden border-b border-primary sm:h-[calc(var(--h-line1-sm)*6)]">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${imageUrl}${imageUrl.endsWith(".gif") ? "" : "?w=900&auto=format"}`}
              alt={log.title}
              loading={index < 6 ? "eager" : "lazy"}
              className="h-full w-full object-cover object-top duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary p-4">
              <span className="h3 text-center text-primary">{log.title}</span>
            </div>
          )}
          {year && (
            <span className="body4 absolute right-0 top-0 border-b border-l border-primary bg-tertiary px-2 py-1 text-primary">
              {year}
            </span>
          )}
        </div>

        {/* Title row */}
        <div className="flex h-line1 items-center border-b border-primary sm:h-line1-sm">
          <div className="body2 flex h-full w-line1 shrink-0 items-center justify-center border-r border-primary sm:w-line1-sm">
            {index}
          </div>
          <p className="body2 truncate px-3">{log.title}</p>
        </div>

        {/* Tech row */}
        <div className="flex h-line1 items-center gap-2 overflow-hidden px-3 sm:h-line1-sm">
          {techs.slice(0, 3).map((t) => (
            <span key={t} className="body4 shrink-0 whitespace-nowrap border border-primary px-2 py-[2px] text-primary">
              {t}
            </span>
          ))}
          {techs.length > 3 && <span className="body4 shrink-0 text-primary">+{techs.length - 3}</span>}
        </div>
      </article>
    </Link>
  )
}

export default LogsCard
