"use client"

import React from "react"
import { sanityImage } from "@/sanity/image-builder"
import { useLogsImageContext } from "@/contexts/logs-image-context"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"

const LogsImage: React.FC<{ className?: string }> = ({ className }) => {
  const { imageSrc } = useLogsImageContext()

  if (!imageSrc?.asset.url) {
    return <></>
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      className={twMerge(
        "pointer-events-none h-fit max-h-[400px] w-fit max-w-[200px] border-[8px] border-primary sm:max-h-[600px] sm:max-w-[300px]",
        className
      )}
    >
      {imageSrc ? <img src={sanityImage(imageSrc)} alt={imageSrc.asset.url ?? "image"} /> : <div />}
    </motion.div>
  )
}

export default LogsImage
