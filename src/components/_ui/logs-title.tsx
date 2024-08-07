"use client"

import { useLogsImageContext } from "@/contexts/logs-image-context"
import { TLog } from "@/types/log-types"
import Link from "next/link"
import React from "react"

const LogsTitle: React.FC<{ log: TLog; index: number }> = ({ log, index }) => {
  const { setImageSrc } = useLogsImageContext()

  const handleMouseEnter = () => {
    setImageSrc(log?.image)
  }

  const handleMouseLeave = () => {
    setImageSrc(undefined)
  }

  return (
    <Link href={`/logs/${log.slug}`} passHref>
      <div
        className="flex w-full cursor-pointer bg-transparent duration-1000 hover:bg-secondary"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-line1 sm:h-line1-sm w-line1 sm:w-line1-sm body1 flex items-center justify-center border-r border-primary">
          {index}
        </div>

        <p className="body1 px-4">{log.title}</p>
      </div>
    </Link>
  )
}

export default LogsTitle
