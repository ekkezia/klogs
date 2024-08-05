import React from "react"
import { PortableText } from "next-sanity"

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

const LogsBlock: React.FC<{
  title: string
  blocks: TArticleBlock
}> = ({ title, blocks }) => {
  return (
    <>
      <div className="h-line2 sm:h-line2-sm body2 px-4 text-primary">{title}</div>
      <div className="body2 px-4">
        <PortableText value={blocks} />
      </div>
    </>
  )
}

export default LogsBlock
