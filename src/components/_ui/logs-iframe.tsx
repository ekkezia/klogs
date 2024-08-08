"use client"

import React from "react"
import { motion } from "framer-motion"
import useBreakpoints from "@/hooks/useBreakpoints"
import { twMerge } from "tailwind-merge"
import { LINE2_SIZE, LINE2_SIZE_SM } from "@/styles/shared"

interface LogsIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  url: string | null | undefined
}

const LogsIframe: React.FC<LogsIframeProps> = ({ url, ...props }) => {
  const { isSmallScreen } = useBreakpoints()
  const lineSize = isSmallScreen ? LINE2_SIZE_SM : LINE2_SIZE

  if (!url) return <></>
  return (
    <motion.div
      drag
      dragMomentum={false}
      className={twMerge("pointer-events-auto relative cursor-grab overflow-hidden bg-primary")}
      style={{
        width: `calc(${lineSize}px * 12 * 1 + ${lineSize}px * 2)`,
        height: `calc(${lineSize}px * 9 * 1 + ${lineSize}px * 2)`,
      }}
    >
      <iframe
        {...props}
        className="absolute top-0 aspect-video origin-top-left"
        src={url}
        style={{
          width: `calc(${lineSize}px * 12 * 2)`,
          height: `calc(${lineSize}px * 9 * 2)`,
          transform: "scale(calc(1/2))",
          top: isSmallScreen ? LINE2_SIZE_SM : LINE2_SIZE,
          left: isSmallScreen ? LINE2_SIZE_SM : LINE2_SIZE,
        }}
      />
    </motion.div>
  )
}

export default LogsIframe
