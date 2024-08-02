"use client"

import React from "react"
import { motion } from "framer-motion"

interface LogsIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  url: string | null | undefined
}

const LogsIframe: React.FC<LogsIframeProps> = ({ url, ...props }) => {
  if (!url) return <></>
  return (
    <motion.div
      drag
      dragMomentum={false}
      className=""
      style={{
        width: 36 * 6 * 4,
        height: 36 * 4 * 4,
      }}
    >
      <iframe
        {...props}
        style={{
          width: 36 * 6 * 4,
          height: 36 * 4 * 4,
        }}
        src={url}
      />
    </motion.div>
  )
}

export default LogsIframe
