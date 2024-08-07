"use client"

import React, { useEffect, useState } from "react"
import Searchbar from "../searchbar"
import fetchLog from "@/lib/data/fetch-log"
import { usePathname } from "next/navigation"

const TopBar: React.FC = () => {
  const pathname = usePathname()
  // TODO: review if this can be server action
  const [loading, setLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string | undefined>()
  useEffect(() => {
    const fetchAndSetArticleTitle = async () => {
      try {
        setLoading(true)
        if (pathname === "/logs") {
          setTitle("🗒️ Logs")
        } else {
          const log = await fetchLog(pathname.split("/logs/")[1])
          console.log("article", log?.title)
          setTitle(log?.title)  
        }
        setLoading(false)
      } catch (error) {
        console.error("❌ top-bar: Failed to fetch article:", error)
      }
    }

    fetchAndSetArticleTitle()
  }, [pathname])

  return (
    <div className="fixed left-0 top-0 z-[11] flex h-line1 w-full border-b border-primary bg-tertiary sm:h-line1-sm">
      <div className={`h-full w-line1 border-r border-primary sm:w-line1-sm`} />

      <div className="flex-1 bg-tertiary">
        <Searchbar defaultValue={loading ? "⌛️ Loading..." : title} placeholder={title} />
      </div>

      <div className={`h-full w-line1 border-l border-primary sm:w-line1-sm`} />
    </div>
  )
}

export default TopBar
