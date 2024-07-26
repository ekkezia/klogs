"use client"

import React from "react"
import { sanityImage } from "@/sanity/image-builder"
import { useLogsImageContext } from "@/contexts/logs-image-context"
import { twMerge } from "tailwind-merge"

const LogsImage: React.FC<{ className?: string }> = ({ className }) => {
  const { imageSrc } = useLogsImageContext()

  return (
    <div className={twMerge("h-[400px] w-[300px] border-[16px] border-primary", className)}>
      {imageSrc ? <img src={sanityImage(imageSrc)} alt={imageSrc.asset._ref} /> : <div />}
    </div>
  )
}

export default LogsImage
