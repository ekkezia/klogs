"use client"

import React, { useEffect, useState } from "react"
import Searchbar from "../searchbar"
import fetchLog from "@/lib/data/fetch-log"
import { usePathname } from "next/navigation"

const TopBar: React.FC = () => {
  const pathname = usePathname()
  const [title, setTitle] = useState<string | undefined>(undefined)
  useEffect(() => {
    const fetchAndSetArticleTitle = async () => {
      try {
        const article = await fetchLog(pathname.split("/logs/")[1])
        console.log("article", article.title)
        setTitle(article.title)
      } catch (error) {
        console.error("Failed to fetch article:", error)
      }
    }

    fetchAndSetArticleTitle()
  }, [pathname])

  return (
    <div className="h-line1 sm:h-line1-sm fixed left-0 top-0 z-[11] flex w-full border-b border-primary bg-tertiary">
      <div className={`w-line1 sm:w-line1-sm h-full border-r border-primary`} />

      <div className="flex-1 bg-tertiary">
        <Searchbar defaultValue={title} placeholder={title} />
      </div>

      <div className={`w-line1 sm:w-line1-sm h-full border-l border-primary`} />
    </div>
  )
}

export default TopBar
