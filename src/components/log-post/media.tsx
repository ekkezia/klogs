import React from "react"
import { TAsset, TMediaItem, TMediaLayout } from "@/types/log-sections"
import { L, Row } from "./grid"

// Sanity image URL, resized for the web — GIFs are passed through untouched so they keep animating.
export const imgSrc = (a?: TAsset | null, w = 1600) => {
  if (!a?.url) return ""
  return a.url.endsWith(".gif") ? a.url : `${a.url}?w=${w}&auto=format&fit=max`
}

export const youTubeEmbed = (url?: string) => {
  if (!url) return ""
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, "")
    let id = ""
    if (host === "youtu.be") id = u.pathname.slice(1)
    else if (u.pathname === "/watch") id = u.searchParams.get("v") ?? ""
    else if (/^\/(shorts|embed)\//.test(u.pathname)) id = u.pathname.split("/")[2]
    if (id) return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
    if (host.includes("vimeo.com")) return `https://player.vimeo.com/video/${u.pathname.split("/").pop()}`
  } catch {}
  return url
}

/** One media item filling its box (box height is set by the layout). */
const MediaItem: React.FC<{ item: TMediaItem; fit?: "contain" | "cover" }> = ({ item, fit = "contain" }) => {
  const fitClass = fit === "cover" ? "object-cover" : "object-contain"
  if (item._type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imgSrc(item)} alt={item.alt ?? item.caption ?? ""} loading="lazy" className={`h-full w-full ${fitClass}`} />
  }
  if (item._type === "videoFile") {
    return (
      <video
        src={item.fileUrl}
        poster={imgSrc(item.poster)}
        autoPlay
        muted
        loop
        playsInline
        className={`h-full w-full ${fitClass}`}
      />
    )
  }
  return (
    <iframe
      src={youTubeEmbed(item.url)}
      title={item.caption ?? "video"}
      className="h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )
}

const Caption: React.FC<{ text?: string | null; inset?: boolean }> = ({ text, inset = true }) =>
  text ? (
    <p
      className={`body4 truncate uppercase tracking-wide !text-primary ${inset ? "px-4" : ""}`}
      style={{ height: L(1), lineHeight: L(1) }}
    >
      {text}
    </p>
  ) : null

// Heights in ruled lines for each layout
const H = { full: 14, grid2: 9, grid3: 7, strip: 5 }

export const MediaBlock: React.FC<{ layout?: TMediaLayout; items: TMediaItem[]; caption?: string | null }> = ({
  layout = "full",
  items,
  caption,
}) => {
  if (!items?.length) return null

  if (layout === "grid2" || layout === "grid3") {
    const cols = layout === "grid2" ? "sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
    return (
      <figure>
        <div className={`grid gap-x-4 px-4 ${layout === "grid2" ? "grid-cols-1" : ""} ${cols}`} style={{ rowGap: L(1) }}>
          {items.map((it) => (
            <div key={it._key}>
              <div className="overflow-hidden" style={{ height: L(H[layout]) }}>
                <MediaItem item={it} fit="cover" />
              </div>
              <Caption text={it.caption} inset={false} />
            </div>
          ))}
        </div>
        <Caption text={caption} />
      </figure>
    )
  }

  if (layout === "strip") {
    return (
      <figure>
        <div className="flex gap-2 overflow-x-auto px-4" style={{ height: L(H.strip) }}>
          {items.map((it) => {
            const ratio = it._type === "image" && it.dims?.aspectRatio ? it.dims.aspectRatio : 1
            return (
              <div key={it._key} className="h-full shrink-0" style={{ aspectRatio: ratio }}>
                <MediaItem item={it} fit="cover" />
              </div>
            )
          })}
        </div>
        <Caption text={caption} />
      </figure>
    )
  }

  // full + stack: one item per box, each 14 lines tall
  return (
    <figure>
      {items.map((it) => (
        <div key={it._key}>
          <div className="px-4" style={{ height: L(H.full) }}>
            <MediaItem item={it} />
          </div>
          <Caption text={it.caption} />
        </div>
      ))}
      <Caption text={caption} />
    </figure>
  )
}

export { Row }
