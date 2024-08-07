import React from "react"
import TopBar from "./top-bar/top-bar.component"
import BottomBar from "./bottom-bar/bottom-bar.component"
import Socials from "../organism/socials/socials.component"
import CustomMouse from "./mouse/custom-mouse.component"
import Menu from "../organism/menu.component"
import DrawingPanel from "./drawing-panel"

interface ILayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen w-screen justify-center bg-tertiary">
      <TopBar />

      <div className="relative flex h-full w-screen">
        <div
          className={`fixed left-0 z-10 h-fit min-h-screen w-line1 border-r border-primary bg-tertiary sm:w-line1-sm`}
        >
          <Socials />
        </div>

        {/* // todo: top left doesnt work */}
        <div className="max-w-screen py-line sm:py-line-sm absolute left-[36px] top-[36px] h-full min-h-screen w-content sm:left-[48px] sm:top-[48px] sm:w-content-sm">

          <DrawingPanel />

          <div className="pointer-events-auto">{children}</div>
          {/* <PageTransition className="relative z-[2]">{children}</PageTransition> */}
        </div>

        <div
          className={`top-line1 sm:top-line1-sm fixed right-0 z-10 h-fit min-h-screen w-line1 border-l border-primary bg-tertiary sm:w-line1-sm`}
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
