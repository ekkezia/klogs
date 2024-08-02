import React from "react"
import { PortableText } from "next-sanity"

export type TArticleBlock = {
  _key: string;
  _type: string;
  children: {
    _key: string;
    _type: string;
    marks: string[];
    text: string;
  }[];
  markDefs: {
    _key: string;
    _type: string;
  }[];
  style: string;
}[];

const LogsBlock: React.FC<{
  title: string
  blocks: TArticleBlock
}> = ({ title, blocks }) => {
  return (
    <>
      <div className="body2 border-b border-primary px-4 text-primary" style={{ height: 36 }}>
        {title}
      </div>
      <div className="body2 border-b border-primary px-4">
        <PortableText value={blocks} />
      </div>
    </>
  )
}

export default LogsBlock
