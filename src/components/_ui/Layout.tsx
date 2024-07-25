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
import { INNER_BAR_WIDTH, MAXWIDTH, OUTER_BAR_WIDTH } from "@/styles/shared"

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
          className={`min-h-screen border-r border-primary`}
          style={{
            width: OUTER_BAR_WIDTH,
          }}
        >
          {<Socials />}
        </div>

        <div
          className={`absolute top-0 min-h-screen border-r border-primary`}
          style={{
            left: OUTER_BAR_WIDTH,
            width: INNER_BAR_WIDTH,
            minWidth: INNER_BAR_WIDTH,
            maxWidth: INNER_BAR_WIDTH,
          }}
        />

        <div
          className="absolute border-r border-primary w-full min-h-screen"
          style={{
            left: `calc(${OUTER_BAR_WIDTH} + ${INNER_BAR_WIDTH})`,
            width: `calc(100% - (${OUTER_BAR_WIDTH} * 2) - (${INNER_BAR_WIDTH} * 2))`,
          }}
        >
          {children}
        </div>

        <div
          className="min-h-screen"
          style={{
            right: OUTER_BAR_WIDTH,
            width: INNER_BAR_WIDTH,
          }}
        >
          {/* Only display navbar INSIDE INNER RIGHT BAR when it is NOT xs screen */}
          {<NavBar navItems={ROUTES} isOpen={isOpen} />}
        </div>

        <div
          className={`min-h-screen border-l border-primary`}
          style={{ right: 0, width: OUTER_BAR_WIDTH }}
        />
      </div>

      <BottomBar />
      <CustomMouse />
    </div>
  )
}

export default Layout
