"use client"

import { TArticleImage } from "@/types/article-types"
import React, { createContext, useState, ReactNode, useContext, SetStateAction, Dispatch } from "react"

interface LogsImageContextType {
  imageSrc: TArticleImage | null | undefined
  setImageSrc: Dispatch<SetStateAction<TArticleImage | null | undefined>>
}

const LogsImageContext = createContext<LogsImageContextType | null | undefined>(null)

export const LogsImageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [imageSrc, setImageSrc] = useState<TArticleImage | null | undefined>()

  return <LogsImageContext.Provider value={{ imageSrc, setImageSrc }}>{children}</LogsImageContext.Provider>
}

export const useLogsImageContext = (): LogsImageContextType => {
  const context = useContext(LogsImageContext)
  if (!context) {
    throw new Error("useLogsImageContext must be used within a LogsImageContextProvider")
  }
  return context
}
