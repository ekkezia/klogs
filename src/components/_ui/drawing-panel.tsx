"use client"

import React from "react"
import ResizablePanel from "./resizable-panel"
import { LINE1_SIZE_SM, MAX_CONTENT_WIDTH_SM } from "@/styles/shared"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

const FreeDrawing = dynamic(() => import("@/components/_ui/free-drawing"), { ssr: false })

interface ILayoutProps {
  children?: React.ReactNode
}

const DrawingPanel: React.FC<ILayoutProps> = () => {
  const pathname = usePathname()
  return (
    <div>
      <FreeDrawing
        className={`pointer-events-auto fixed top-0 z-0 h-fit w-content sm:w-content-sm ${pathname === "/" ? "opacity-100" : "opacity-10"}`}
        showToolbar={pathname === "/"}
      />
      {pathname === "/" && (
        <ResizablePanel
          className="z-1 pointer-events-none fixed top-0 h-screen w-content sm:w-content-sm"
          style={{ width: MAX_CONTENT_WIDTH_SM, left: LINE1_SIZE_SM }}
        />
      )}
    </div>
  )
}

export default DrawingPanel
