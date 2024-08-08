"use client"

import React, { createContext, useState, ReactNode, useContext, SetStateAction, Dispatch } from "react"

interface LogTitleContextType {
  title: string | null | undefined
  setTitle: Dispatch<SetStateAction<string | null | undefined>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const LogTitleContext = createContext<LogTitleContextType | null | undefined>(null)

export const LogTitleContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<string | null | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  // useEffect(() => {
  //   if (title) setLoading(false)
  // }, [title])

  return (
    <LogTitleContext.Provider value={{ title, setTitle, loading, setLoading }}>{children}</LogTitleContext.Provider>
  )
}

export const useLogTitleContext = (): LogTitleContextType => {
  const context = useContext(LogTitleContext)
  if (!context) {
    throw new Error("useLogTitleContext must be used within a LogTitleContextProvider")
  }
  return context
}
