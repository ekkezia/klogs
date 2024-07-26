"use client"

import { useLogsImageContext } from "@/contexts/logs-image-context"
import { TArticle } from "@/types/article-types"
import Link from "next/link"
import React from "react"

const LogsTitle: React.FC<{ article: TArticle; index: number }> = ({ article, index }) => {
  const { setImageSrc } = useLogsImageContext()

  const handleMouseEnter = () => {
    setImageSrc(article.image)
  }

  const handleMouseLeave = () => {
    setImageSrc(undefined)
  }

  return (
    <Link href={`/logs/${article._id}`} passHref>
      <div
        className="flex w-full cursor-pointer border-b border-primary text-primary duration-1000 hover:bg-secondary"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="body1 flex h-[48px] w-[48px] items-center justify-center border-r border-primary">{index}</div>

        <p className="body1 px-4">{article.title}</p>
      </div>
    </Link>
  )
}

export default LogsTitle
