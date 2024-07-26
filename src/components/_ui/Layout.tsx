"use client"

import React from "react"
import TopBar from "./top-bar/top-bar.component"
import BottomBar from "./bottom-bar/bottom-bar.component"
import Socials from "../organism/socials/socials.component"
import CustomMouse from "./mouse/custom-mouse.component"
import { HORIZONTAL_BAR_HEIGHT, INNER_BAR_WIDTH, MAXWIDTH, OUTER_BAR_WIDTH } from "@/styles/shared"
import PageTransition from './page-transition'
import FreeDrawing from './free-drawing'
import Menu from '../organism/menu.component'
import ResizablePanel from './resizable-panel'

interface ILayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {

  return (
    <div className="flex min-h-screen w-screen justify-center bg-white">
      <TopBar />

      <div className="relative flex w-screen">
        <div
          className={`absolute left-0 z-10 min-h-screen h-full border-r border-primary bg-white`}
          style={{
            top: HORIZONTAL_BAR_HEIGHT,
            width: OUTER_BAR_WIDTH,
          }}
        >
          {<Socials />}
        </div>

        <div
          className="absolute min-h-screen max-w-screen h-full"
          style={{
            paddingTop: HORIZONTAL_BAR_HEIGHT,
            paddingBottom: HORIZONTAL_BAR_HEIGHT,
            left: OUTER_BAR_WIDTH,
            width: `calc(100% - (${OUTER_BAR_WIDTH} * 2))`,
          }}
        >

                                        <ResizablePanel
          className="absolute top-0 pointer-events-auto"
            />

          <FreeDrawing className="absolute h-fit w-full z-0" />

          <PageTransition className="relative z-[2]">
            {children}
          </PageTransition>

        </div>

        <div
          className={`absolute right-0 z-10 min-h-screen h-full border-l border-primary bg-white`}
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
