"use client"

import { useThemeContext } from "@/contexts/theme-context"
import { hexToHSL, hslToHex } from "@/utils/colors"
import React, { useRef, useState } from "react"
import { HexColorPicker } from "react-colorful"

const ColorPicker: React.FC = () => {
  const { primaryColor, setPrimaryColor } = useThemeContext()
  const colorPickerDialogRef = useRef<HTMLDialogElement>(null)

  const handleClickBtn = () => {
    if (colorPickerDialogRef.current) {
      if (!colorPickerDialogRef.current.open) {
        colorPickerDialogRef.current.show()
      } else {
        colorPickerDialogRef.current.close()
      }
    }
  }

  const handleBlur = () => {
    if (colorPickerDialogRef.current) {
      colorPickerDialogRef.current.close()
    }
  }

  const handleChange = (newColor: string) => {
    setPrimaryColor(newColor)
    // primary
    document.documentElement.style.setProperty("--primary-default", newColor)

    // secondary
    const hsl = hexToHSL(newColor)
    console.log("hsl", hsl)
    const secondaryColor = hslToHex((hsl.h - 0.5) % 1, hsl.s, hsl.l)
    document.documentElement.style.setProperty("--secondary-default", secondaryColor)

    // text-primary
    const textColor = hsl.l > 0.7 ? "#FFFFFF" : hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 0.4))
    document.documentElement.style.setProperty("--text-primary", textColor)

    // background
    if (hsl.l > 0.7) {
      document.documentElement.style.setProperty("--tertiary-default", "#000000")
    } else {
      document.documentElement.style.setProperty("--tertiary-default", "#FAFAFA")
    }
  }

  return (
    <div className="group relative cursor-pointer">
      <button className="h-[48px] w-[48px] bg-primary" onClick={handleClickBtn} />
      <dialog
        className="open:animate-in open:fade-in absolute left-[-248px] top-[-200px] duration-500"
        ref={colorPickerDialogRef}
      >
        <HexColorPicker
          color={primaryColor}
          onChange={handleChange}
          style={{
            width: 200,
            height: 200,
            borderRadius: 0,
            borderColor: "var(--primary-default)",
            borderWidth: 1,
            borderStyle: "solid",
          }}
          // onBlur={handleBlur}
        />
      </dialog>
    </div>
  )
}

export default ColorPicker
