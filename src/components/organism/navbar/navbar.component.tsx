"use client"

import React, { RefObject, useEffect, useRef } from "react"
import NavBarItem from "./navbar-item.component"
import CustomButton from "../../atoms/buttons/custom-button.component"
import ThemeSwitches from "../../_ui/theme-switch/theme-switch.component"
import Socials from "../socials/socials.component"
import MouseSwitch from "../../_ui/theme-switch/mouse-switch.component"
// import useBreakpoints from "../../../hooks/useBreakpoints"
import useScrollPosition from "../../../hooks/useScrollPosition"
import { HORIZONTAL_BAR_HEIGHT, INNER_BAR_WIDTH, Z_INDEX_BELOW, Z_INDEX_FIXED_BARS, Z_INDEX_MODAL } from "@/styles/shared"

export interface ILink {
  label: string
  linkTo: string
  disabled?: boolean
  children?: {
    label: string
    linkTo: string
    disabled?: boolean
  }[]
}

export interface IDropdown {
  label: string
  linkTo: string
  disabled?: boolean
  sub: ILink[]
}

export interface INavItems {
  [key: string]: ILink | IDropdown
  home: ILink
}

export interface INavBarComponentProps {
  navItems: INavItems
  isOpen: boolean
}

const NavBar: React.FC<INavBarComponentProps> = ({ navItems, isOpen }) => {
  // const { isLargeScreen, isSmallScreen } = useBreakpoints()
  const navbarRef = useRef() as RefObject<HTMLDivElement>
  const { scrollPosition } = useScrollPosition()

  useEffect(() => {
    if (navbarRef.current) {
      navbarRef.current.style.zIndex =
        scrollPosition > 0 ? `${1 * Z_INDEX_BELOW + Z_INDEX_MODAL}` : `${Z_INDEX_FIXED_BARS}`
    }
  }, [scrollPosition])

  const dynamicNavContainerStyles = {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "var(--background-primary)", // Replace with your theme color
    maxWidth: `calc(${INNER_BAR_WIDTH} - 1px)`,
    maxHeight: "100vh",
    zIndex: Z_INDEX_FIXED_BARS,
  }

  const dynamicNavCollapsedStyles = {
    position: "fixed",
    top: HORIZONTAL_BAR_HEIGHT,
    right: 0,
    backgroundColor: "var(--background-primary)",
    maxWidth: "100%",
    maxHeight: "100vh",
    borderLeft: `1px solid var(--tertiary-default)`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    height: "100vh",
  }

  const dynamicNavSmallStyles = {
    position: "fixed",
    top: `calc(${HORIZONTAL_BAR_HEIGHT} - 1px)`,
    borderTop: `1px solid var(--tertiary-default)`, // Replace with your theme color
    left: 0,
    backgroundColor: "var(--background-primary)", // Replace with your theme color
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "10vh",
    paddingBottom: "20vh",
  }

  const btnContainerStyles = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "2rem",
  }

  // if (isSmallScreen) {
  //   if (isOpen) {
  //     return (
  //       <div style={dynamicNavSmallStyles} className="overflow-scroll" ref={navbarRef}>
  //         <div className="flex w-full flex-col items-center gap-1">
  //           <div className="w-full">
  //             <CustomButton variant="primary" url="https://e-kezia.com/portfolio" newTab fitContent>
  //               Portfolio
  //             </CustomButton>
  //             <ThemeSwitches />
  //           </div>
  //           <Socials />
  //         </div>
  //       </div>
  //     )
  //   }
  //   return null
  // }

  // if (isLargeScreen) {
  //   if (isOpen) {
  //     return (
  //       <div style={dynamicNavCollapsedStyles} className="overflow-scroll" ref={navbarRef}>
  //         <div className="overflow-scroll">
  //           {Object.keys(navItems).map((itemKey, idx) => (
  //             <NavBarItem
  //               navItems={navItems}
  //               key={`${itemKey}-${idx}`}
  //               itemKey={itemKey}
  //             />
  //           ))}
  //         </div>
  //         <div style={btnContainerStyles}>
  //           <CustomButton variant="primary" url="https://e-kezia.com/portfolio" newTab fitContent>
  //             Portfolio
  //           </CustomButton>
  //           <ThemeSwitches />
  //           <MouseSwitch />
  //         </div>
  //       </div>
  //     )
  //   }
  //   return null
  // }

  return (
    <div style={dynamicNavContainerStyles} className="overflow-scroll">
      {Object.keys(navItems).map((itemKey, idx) => (
        <NavBarItem
          navItems={navItems}
          key={`${itemKey}-${idx}`}
          itemKey={itemKey}
        />
      ))}
    </div>
  )
}

export default NavBar
