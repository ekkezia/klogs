import React from "react"
import { PortableText, PortableTextReactComponents } from "next-sanity"
import { sanityImage } from "@/sanity/image-builder"

export type TArticleBlock = Array<
  | {
      _type: "block" | string;
      style?: string;
      children: Array<{
        _key: string;
        _type: "span" | string;
        text: string;
        marks?: string[];
      }>;
      markDefs?: any[];
      _key?: string;
    }
  | {
      _type: "image";
      asset: { _ref: string; _type: "reference" };
      alt?: string;
    }
>;

const serializer: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => (
      <>
        <img
          src={sanityImage(value)} 
          alt={value.alt || "Blog image"}
          className="relative z-1 h-[calc(var(--h-line2)*10)] sm:h-[calc(var(--h-line2-sm)*10)] object-contain"
        />
        {value.caption && (
          <p className="opacity-80 text-sm relative z-1 h-[calc(var(--h-line2)*1)] sm:h-[calc(var(--h-line2-sm)*1)]">{value.caption}</p>
        )}
      </>
    ),

    video: ({ value }) => {
      const toYouTubeEmbed = (url?: string) => {
        if (!url) return ""
        try {
          const u = new URL(url)
          const host = u.hostname.replace(/^www\./, "")

          // youtube watch URL
          if (host.includes("youtube.com")) {
            if (u.pathname === "/watch") {
              const v = u.searchParams.get("v")
              if (v) return `https://www.youtube.com/embed/${v}?rel=0&modestbranding=1&playsinline=1`
            }

            // shorts URL: /shorts/ID
            if (u.pathname.startsWith("/shorts/")) {
              const parts = u.pathname.split("/")
              const id = parts[2]
              if (id) return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
            }

            // already embed
            if (u.pathname.startsWith("/embed/")) {
              const parts = u.pathname.split("/")
              const id = parts[2]
              if (id) return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
            }
          }

          // short youtu.be URL
          if (host === "youtu.be") {
            const id = u.pathname.replace(/^\//, "")
            if (id) return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
          }
        } catch (e) {
          // fallback to regex to extract typical ID (11 chars) from many URL variants
          const m = url.match(/(?:v=|shorts\/|embed\/|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/)
          if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1&playsinline=1`
        }
        // if not recognized, return the original URL (it may already be an embed URL)
        return url
      }

      const src = toYouTubeEmbed(value?.url)

      return (
        <>
          <div className="relative h-[calc(var(--h-line2)*10)] sm:h-[calc(var(--h-line2-sm)*10)]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              title={value?.title || "video-player"}
              src={src}
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <p className="opacity-80 text-sm relative z-1 h-[calc(var(--h-line2)*1)] sm:h-[calc(var(--h-line2-sm)*1)]">{value.caption}</p>
          )}
        </>
      )
    },
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
      return (
        <a href={value.href} rel={rel} className="inline w-fit cursor-pointer border border-primary px-2 duration-1000 hover:blur-[2px]">
            {children}
        </a>
      )
    },
    code: ({ children }) => (
      <code className="font-mono bg-secondary px-1 py-0.5 rounded">
        {children}
      </code>
    ),
  },

  block: {
    h4: ({ children }) => (
      <h4 className="h4 font-bold">
        {children}
      </h4>
    ),
  },
}

const LogsBlock: React.FC<{
  title: string
  blocks: TArticleBlock
}> = ({ title, blocks }) => {
  return (
    <>
      <div className="h-line2 sm:h-line2-sm body2 px-4 text-primary">{title}</div>
      <div className="body2 px-4">
        <PortableText value={blocks} components={serializer} />
      </div>
    </>
  )
}

export default LogsBlock
