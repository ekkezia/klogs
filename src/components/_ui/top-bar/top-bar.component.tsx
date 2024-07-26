"use client"

import React from "react"
import {
  HORIZONTAL_BAR_HEIGHT,
  OUTER_BAR_WIDTH,

} from "@/styles/shared"
import Searchbar from '../searchbar'

const TopBar: React.FC = () => {
  // const { isLargeScreen } = useBreakpoints();

  return (
    <div
      className="fixed left-0 top-0 z-[11] flex w-full border-b border-primary bg-white"
      style={{ height: HORIZONTAL_BAR_HEIGHT }}
    >
      <div className={`h-full border-r border-primary`} style={{ width: OUTER_BAR_WIDTH }} />

      <div className="flex-1 bg-white">
        <Searchbar />
      </div>

      <div className={`h-full border-l border-primary`} style={{ width: OUTER_BAR_WIDTH }} />
    </div>
  )
}

export default TopBar
