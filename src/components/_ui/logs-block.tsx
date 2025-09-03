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
    image: ({ value }) => {
      return (
        <img
          src={sanityImage(value)} 
          alt={value.alt || "Blog image"}
          className="my-4 rounded-lg"
        />
      )
    },
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
      return (
        <a href={value.href} rel={rel}>
          <div className="inline w-fit cursor-pointer border border-primary px-2 duration-1000 hover:blur-[2px]">
            {children}
          </div>
        </a>
      )
    },
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
