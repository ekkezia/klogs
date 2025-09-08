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
      <img
        src={sanityImage(value)} 
        alt={value.alt || "Blog image"}
        className="relative z-1 h-[calc(var(--h-line2)*10)] sm:h-[calc(var(--h-line2-sm)*10)]"
      />
    ),

    video: ({ value }) => (
      <>
        <video controls className="relative z-1 h-[calc(var(--h-line2)*10)] sm:h-[calc(var(--h-line2-sm)*10)]">
          <source src={value.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {value.caption && (
          <p className="opacity-80 text-sm relative z-1 h-[calc(var(--h-line2)*1)] sm:h-[calc(var(--h-line2-sm)*1)]">{value.caption}</p>
        )}
      </>
    ),
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
