"use client"

import React, { createContext, useState, ReactNode, useContext, SetStateAction, Dispatch } from "react"

interface MouseContextType {
  showMouse: boolean
  setShowMouse: Dispatch<SetStateAction<boolean>>
}

const MouseContext = createContext<MouseContextType | null | undefined>(null)

export const MouseContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showMouse, setShowMouse] = useState<boolean>(false)

  return <MouseContext.Provider value={{ showMouse, setShowMouse }}>{children}</MouseContext.Provider>
}

export const useMouseContext = (): MouseContextType => {
  const context = useContext(MouseContext)
  if (!context) {
    throw new Error("useMouseContext must be used within a MouseContextProvider")
  }
  return context
}
