"use client"

import React from "react"
import TopBar from "./top-bar/top-bar.component"
import BottomBar from "./bottom-bar/bottom-bar.component"
import Socials from "../organism/socials/socials.component"
import CustomMouse from "./mouse/custom-mouse.component"
import { HORIZONTAL_BAR_HEIGHT, MAX_CONTENT_WIDTH, OUTER_BAR_WIDTH } from "@/styles/shared"
import PageTransition from "./page-transition"
import FreeDrawing from "./free-drawing"
import Menu from "../organism/menu.component"
import ResizablePanel from "./resizable-panel"
import { usePathname } from "next/navigation"

interface ILayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const pathname = usePathname()

  return (
    <div className="flex h-full min-h-screen w-screen justify-center bg-white">
      <TopBar />

      <div className="relative flex h-full w-screen">
        <div
          className={`fixed left-0 z-10 h-fit min-h-screen border-r border-primary bg-white`}
          style={{
            top: HORIZONTAL_BAR_HEIGHT,
            width: OUTER_BAR_WIDTH,
          }}
        >
          {<Socials />}
        </div>

        <div
          className="max-w-screen absolute h-full min-h-screen"
          style={{
            paddingTop: HORIZONTAL_BAR_HEIGHT,
            paddingBottom: HORIZONTAL_BAR_HEIGHT,
            left: OUTER_BAR_WIDTH,
            width: `calc(100% - (${OUTER_BAR_WIDTH} * 2))`,
          }}
        >
          <ResizablePanel
            className="pointer-events-none fixed top-0 h-screen"
            style={{
              width: MAX_CONTENT_WIDTH,
              zIndex: 1,
            }}
          />

          <FreeDrawing
            className="fixed top-0 z-0 h-fit w-full"
            showToolbar={pathname === "/"}
            style={{
              width: MAX_CONTENT_WIDTH,
              zIndex: 0,
            }}
          />

          <PageTransition className="relative z-[2]">{children}</PageTransition>
        </div>

        <div
          className={`fixed right-0 z-10 h-fit min-h-screen border-l border-primary bg-white`}
          style={{
            top: HORIZONTAL_BAR_HEIGHT,
            width: OUTER_BAR_WIDTH,
          }}
        >
          <Menu />
        </div>
      </div>

      <BottomBar />
      <CustomMouse />
    </div>
  )
}

export default Layout
