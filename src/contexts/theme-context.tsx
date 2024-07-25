"use client"

import React, { createContext, useState, ReactNode, useContext, SetStateAction, Dispatch } from "react"

interface ThemeContextType {
  theme: boolean
  setTheme: Dispatch<SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<boolean>(false)

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider")
  }
  return context
}
