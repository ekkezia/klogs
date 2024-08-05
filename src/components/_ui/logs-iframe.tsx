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
      className="w-iframe sm:w-iframe-sm h-iframe sm:h-iframe-sm"
      // style={{
      //   width: 36 * 6 * 1,
      //   height: 36 * 4 * 1,
      // }}
    >
      <iframe
        {...props}
        className="w-iframe sm:w-iframe-sm h-iframe sm:h-iframe-sm"
        // style={{
        //   width: 36 * 6 * 1,
        //   height: 36 * 4 * 1,
        // }}
        src={url}
      />
    </motion.div>
  )
}

export default LogsIframe
