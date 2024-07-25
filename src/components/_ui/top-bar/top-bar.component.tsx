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

interface ITopbarProps {
  isOpen: boolean
  toggle: () => void
}

const isLargeScreen = true
const TopBar: React.FC<ITopbarProps> = ({ isOpen, toggle }) => {
  // const { isLargeScreen } = useBreakpoints();

  return (
    <div
      className="fixed top-0 left-0 z-[Z_INDEX_FIXED_BARS] w-screen border-b border-primary bg-white"
      style={{ height: HORIZONTAL_BAR_HEIGHT }}
    >
      <div className="flex w-full" style={{ maxWidth: MAXWIDTH, height: HORIZONTAL_BAR_HEIGHT }}>
        <div className={`h-full border-r border-primary`} style={{ width: OUTER_BAR_WIDTH }} />

        <div
          className={`h-full border-r border-primary`}
          style={{
            width: INNER_BAR_WIDTH,
          }}
        >
          <Link href="/">
            LOGO
            {/* <img src="/logo/logo.png" alt=" Logo" width="100%" height={`calc(${HORIZONTAL_BAR_HEIGHT} - 1px)`} /> */}
          </Link>
        </div>

        <div className="flex-1"></div>

        <div className={`h-full border-l border-primary`} style={{ width: INNER_BAR_WIDTH }}>
          THEME
        </div>

        <div
          className={`h-full border-l border-primary ${OUTER_BAR_WIDTH} hidden lg:block`}
          style={{ width: OUTER_BAR_WIDTH }}
        />
      </div>
    </div>
  )
}

export default TopBar
