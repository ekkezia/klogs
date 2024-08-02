"use client"

import React from "react"
import { sanityImage } from "@/sanity/image-builder"
import { useLogsImageContext } from "@/contexts/logs-image-context"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"

const LogsImage: React.FC<{ className?: string }> = ({ className }) => {
  const { imageSrc } = useLogsImageContext()

  if (!imageSrc?.asset._ref) {
    return <></>
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      className={twMerge("h-[400px] w-[300px] border-[16px] border-primary", className)}
    >
      {imageSrc ? <img src={sanityImage(imageSrc)} alt={imageSrc.asset._ref ?? "image"} /> : <div />}
    </motion.div>
  )
}

export default LogsImage
