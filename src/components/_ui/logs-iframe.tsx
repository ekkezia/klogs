"use client"

import React from "react"
import { motion } from "framer-motion"

interface LogsIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  url: string | null | undefined
}

const LogsIframe: React.FC<LogsIframeProps> = ({ url, ...props }) => {
  if (!url) return <></>
  return (
    <motion.div drag dragMomentum={false} className="p-line2 sm:p-line2-sm h-fit w-fit bg-primary cursor-grab">
      <iframe {...props} className="w-iframe sm:w-iframe-sm h-iframe sm:h-iframe-sm" src={url} />
    </motion.div>
  )
}

export default LogsIframe
