"use client"

import React, { useEffect, useState } from "react"
import { HORIZONTAL_BAR_HEIGHT, OUTER_BAR_WIDTH } from "@/styles/shared"
import Searchbar from "../searchbar"
import fetchArticle from "@/lib/data/fetch-article"
import { usePathname } from "next/navigation"

const TopBar: React.FC = () => {
  const pathname = usePathname()
  const [title, setTitle] = useState<string | undefined>(undefined)
  useEffect(() => {
    const fetchAndSetArticleTitle = async () => {
      try {
        const article = await fetchArticle(pathname.split("/logs/")[1])
        console.log("article", article.title)
        setTitle(article.title)
      } catch (error) {
        console.error("Failed to fetch article:", error)
      }
    }

    fetchAndSetArticleTitle()
  }, [pathname])

  return (
    <div
      className="fixed left-0 top-0 z-[11] flex w-full border-b border-primary bg-white"
      style={{ height: HORIZONTAL_BAR_HEIGHT }}
    >
      <div className={`h-full border-r border-primary`} style={{ width: OUTER_BAR_WIDTH }} />

      <div className="flex-1 bg-white">
        <Searchbar defaultValue={title} placeholder={title} />
      </div>

      <div className={`h-full border-l border-primary`} style={{ width: OUTER_BAR_WIDTH }} />
    </div>
  )
}

export default TopBar
