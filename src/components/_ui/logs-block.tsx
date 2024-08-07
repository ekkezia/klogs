import React from "react"
import { PortableText, PortableTextReactComponents } from "next-sanity"

export type TArticleBlock = {
  _key: string
  _type: string
  children: {
    _key: string
    _type: string
    marks: string[]
    text: string
  }[]
  markDefs: {
    _key: string
    _type: string
  }[]
  style: string
}[]

const serializer: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => <img src={value.imageUrl} />,
    callToAction: ({ value, isInline }) =>
      isInline ? <a href={value.url}>{value.text}</a> : <div className="callToAction">{value.text}</div>,
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
