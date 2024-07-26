'use client'

import React, { useState, useEffect } from "react"

const Clock: React.FC = () => {
  const [ctime, setCTime] = useState<string>(new Date().toLocaleTimeString("en-GB"))

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      setCTime(`${hours}:${minutes}:${seconds}`)
    }

    const intervalId = setInterval(updateTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return <h1 className="h1">{ctime}</h1>
}

export default Clock
