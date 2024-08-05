"use client"

import React, { createContext, useState, ReactNode, useContext, SetStateAction, Dispatch } from "react"

interface ThemeContextType {
  primaryColor: string
  setPrimaryColor: Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState<string>("#CD2DD8")

  return <ThemeContext.Provider value={{ primaryColor, setPrimaryColor }}>{children}</ThemeContext.Provider>
}

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider")
  }
  return context
}
