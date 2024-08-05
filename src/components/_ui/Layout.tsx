"use client"

import React from "react"
import TopBar from "./top-bar/top-bar.component"
import BottomBar from "./bottom-bar/bottom-bar.component"
import Socials from "../organism/socials/socials.component"
import CustomMouse from "./mouse/custom-mouse.component"
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
    <div className="flex h-full min-h-screen w-screen justify-center bg-tertiary">
      <TopBar />

      <div className="relative flex h-full w-screen">
        <div className={`w-line1 sm:w-line1-sm fixed left-0 z-10 h-fit min-h-screen border-r border-primary bg-tertiary`}>
          <Socials />
        </div>

        {/* // todo: top left doesnt work */}
        <div className="max-w-screen sm:top-[48px] py-line sm:py-line-sm w-content sm:w-content-sm absolute left-[36px] top-[36px] h-full min-h-screen sm:left-[48px]">
          <ResizablePanel className="w-content sm:w-content-sm z-1 pointer-events-none fixed top-0 h-screen" />

          <FreeDrawing
            className="fixed top-0 z-0 h-fit w-content sm:w-content-sm"
            showToolbar={pathname === "/"}
            // style={{
            //   width: MAX_CONTENT_WIDTH,
            //   zIndex: 0,
            // }}
          />
          <div className="pointer-events-auto">{children}</div>
          {/* <PageTransition className="relative z-[2]">{children}</PageTransition> */}
        </div>

        <div
          className={`top-line1 sm:top-line1-sm w-line1 sm:w-line1-sm fixed right-0 z-10 h-fit min-h-screen border-l border-primary bg-tertiary`}
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
