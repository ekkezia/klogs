"use client"

import { useLogsImageContext } from "@/contexts/logs-image-context"
import { TItpClass } from '@/types/itp-class-types'
import { TLog } from "@/types/log-types"
import Link from "next/link"
import React from "react"

const LogsTitle: React.FC<{ log: TLog | TItpClass; logParentSlug?: string;index: number }> = ({ log, logParentSlug = 'logs', index }) => {
  const { setImageSrc } = useLogsImageContext()

  const slug =
    typeof log.slug === "string"
      ? log.slug
      : typeof log.slug === "object" && log.slug !== null && "current" in log.slug
      ? (log.slug as { current: string }).current
      : "";

  const handleMouseEnter = () => {
    if (typeof log === 'object' && 'image' in log) {
      setImageSrc(log.image)
    }
  }

  const handleMouseLeave = () => {
    setImageSrc(undefined)
  }

  return (
    <Link href={`/${logParentSlug}/${slug}`} passHref>
      <div
        className="flex w-full cursor-pointer bg-transparent duration-1000 hover:bg-secondary"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="body1 flex h-line1 w-line1 items-center justify-center border-r border-primary sm:h-line1-sm sm:w-line1-sm">
          {index}
        </div>

        <p className="body1 px-4">{log.title}</p>
      </div>
    </Link>
  )
}

export default LogsTitle
