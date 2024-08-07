"use client"

import React from "react"
import TopBar from "./top-bar/top-bar.component"
import BottomBar from "./bottom-bar/bottom-bar.component"
import Socials from "../organism/socials/socials.component"
import CustomMouse from "./mouse/custom-mouse.component"
// import FreeDrawing from "./free-drawing"
import Menu from "../organism/menu.component"
import ResizablePanel from "./resizable-panel"
import { usePathname } from "next/navigation"
import { LINE1_SIZE_SM, MAX_CONTENT_WIDTH_SM } from "@/styles/shared"

interface ILayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const pathname = usePathname()

  return (
    <div className="flex h-full min-h-screen w-screen justify-center bg-tertiary">
      <TopBar />

      <div className="relative flex h-full w-screen">
        <div
          className={`w-line1 sm:w-line1-sm fixed left-0 z-10 h-fit min-h-screen border-r border-primary bg-tertiary`}
        >
          <Socials />
        </div>

        {/* // todo: top left doesnt work */}
        <div className="max-w-screen py-line sm:py-line-sm w-content sm:w-content-sm absolute left-[36px] top-[36px] h-full min-h-screen sm:left-[48px] sm:top-[48px]">
          {/* <FreeDrawing
            className="w-content sm:w-content-sm pointer-events-auto fixed top-0 z-0 h-fit"
            showToolbar={pathname === "/"}
          /> */}
          {pathname === "/" && (
            <ResizablePanel
              className="z-1 w-content sm:w-content-sm pointer-events-none fixed top-0 h-screen"
              style={{ width: MAX_CONTENT_WIDTH_SM, left: LINE1_SIZE_SM }}
            />
          )}

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
