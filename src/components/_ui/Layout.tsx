"use client"

import React, { useEffect } from "react"
import TopBar from "./top-bar/top-bar.component"
import BottomBar from "./bottom-bar/bottom-bar.component"
import NavBar from "../organism/navbar/navbar.component"
import ROUTES from "../../routes"
// import useBreakpoints from "../../hooks/useBreakpoints"
import Socials from "../organism/socials/socials.component"
import useBoolean from "../../hooks/useBoolean"
import { useRouter } from "next/navigation"
import CustomMouse from "./mouse/custom-mouse.component"
import { HORIZONTAL_BAR_HEIGHT, INNER_BAR_WIDTH, MAXWIDTH, OUTER_BAR_WIDTH } from "@/styles/shared"

interface ILayoutProps {
  children?: React.ReactNode
}

const isSmallScreen = true
const isExtraSmallScreen = true

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  // const { isExtraSmallScreen, isSmallScreen } = useBreakpoints()
  const router = useRouter()

  const { value: isOpen, setFalse: closeNavbar, toggle: toggleExpanded } = useBoolean(false)

  const toggle = () => {
    toggleExpanded()
  }

  // Navbar-related Layout Configuration
  useEffect(() => {
    closeNavbar() // close navbar on redirect to other route
  }, [router])

  return (
    <div className="flex min-h-screen w-screen justify-center bg-white">
      <TopBar isOpen={isOpen} toggle={toggle} />

      <div className="relative flex w-screen">
        <div
          className={`absolute left-0 z-10 min-h-screen border-r border-primary bg-white`}
          style={{
            top: HORIZONTAL_BAR_HEIGHT,
            width: OUTER_BAR_WIDTH,
          }}
        >
          {<Socials />}
        </div>

        <div
          className="absolute min-h-screen w-full"
          style={{
            top: HORIZONTAL_BAR_HEIGHT,
            left: OUTER_BAR_WIDTH,
            width: `calc(100% - (${OUTER_BAR_WIDTH} * 2))`,
          }}
        >
          {children}
        </div>

        <div
          className={`absolute right-0 z-10 min-h-screen border-l border-primary bg-white`}
          style={{
            top: HORIZONTAL_BAR_HEIGHT,
            width: OUTER_BAR_WIDTH,
          }}
        />
      </div>

      <BottomBar />
      <CustomMouse />
    </div>
  )
}

export default Layout
