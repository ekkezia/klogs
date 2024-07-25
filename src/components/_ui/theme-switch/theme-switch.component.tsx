"use client"

import React, { useEffect, useState } from "react"
import { useThemeContext } from "@/contexts/theme-context"

type IFunction = (...args: any[]) => any

type IColorVariant = "blue" | "orange" | "green"

interface IThemeSwitch {
  colorVariant: string
  onClick: IFunction
  active: boolean
}

const colorClasses: {[key: string]: string} = {
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  green: 'bg-green-500',
};

const ThemeSwitch: React.FC<IThemeSwitch> = ({ colorVariant, onClick, active }) => {

  return (
    <>
      <div
        className={`h-4 w-4 cursor-pointer rounded-full transition-all duration-200 ${colorClasses[colorVariant]} ${active ? "h-5 w-5 border-2 border-blue-300" : ""}`}
        onClick={() => onClick()}
      />
    </>
  )
}

const ThemeSwitches: React.FC = () => {
  const { setUserTheme } = useThemeContext()

  const COLOR_VARIANTS = ["blue", "orange", "green"]

  const [activeThemeSwitch, setActiveThemeSwitch] = useState("blue")
  const handleSelectTheme = (variant: string) => {
    setActiveThemeSwitch(variant)
  }

  function getUserTheme() {
    switch (activeThemeSwitch) {
      case "blue":
        return "blueTheme"
      case "orange":
        return "orangeTheme"
      case "green":
        return "greenTheme"
      default:
        return "theme"
    }
  }

  useEffect(() => {
    setUserTheme(getUserTheme())
  }, [activeThemeSwitch])

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-2">
      {COLOR_VARIANTS.map((variant, index) => {
        return (
          <ThemeSwitch
            colorVariant={variant}
            active={activeThemeSwitch === variant}
            onClick={() => handleSelectTheme(variant)}
            key={index}
          />
        )
      })}
    </div>
  )
}

export default ThemeSwitches
