"use client"

import React from "react"
import Link from "next/link"
import ThemeSwitches from "../theme-switch/theme-switch.component"
import MouseSwitch from "../theme-switch/mouse-switch.component"
import useBreakpoints from "../../../hooks/useBreakpoints"
import {
  HORIZONTAL_BAR_HEIGHT,
  INNER_BAR_WIDTH,
  INNER_BAR_WIDTH_LG,
  INNER_BAR_WIDTH_SM,
  MAXWIDTH,
  OUTER_BAR_WIDTH,
  OUTER_BAR_WIDTH_LG,
  Z_INDEX_MODAL,
} from "@/styles/shared"
import LogsButton from "../logs-button"

interface ITopbarProps {
  isOpen: boolean
  toggle: () => void
}

const isLargeScreen = true
const TopBar: React.FC<ITopbarProps> = ({ isOpen, toggle }) => {
  // const { isLargeScreen } = useBreakpoints();

  return (
    <div
      className="fixed left-0 top-0 z-[11] flex w-full border-b border-primary"
      style={{ height: HORIZONTAL_BAR_HEIGHT }}
    >
      <div className={`h-full border-r border-primary`} style={{ width: OUTER_BAR_WIDTH }} />

      <div className="flex-1 bg-white">
        <LogsButton />
      </div>

      <div className={`h-full border-l border-primary`} style={{ width: OUTER_BAR_WIDTH }} />
    </div>
  )
}

export default TopBar
