"use client"

import React, { RefObject, useEffect, useRef } from "react"
import dynamic from "next/dynamic"

import useScrollPosition from "../../../hooks/useScrollPosition"
import { useWindowDimensions } from "../../../hooks/useWindowDimensions"

const InteractiveCssCubes = dynamic(
  () => import("@/components/_ui/interactive-animation/interactive-css-cubes.component"),
  { ssr: false }
)

const LandingPageAnimation: React.FC = () => {
  const interactiveCubesContainerRef = useRef() as RefObject<HTMLDivElement>

  const { scrollPosition } = useScrollPosition()

  const windowDimensions = useWindowDimensions()

  useEffect(() => {
    // Transform
    if (scrollPosition > 0) {
      if (interactiveCubesContainerRef.current)
        interactiveCubesContainerRef.current.style.transform = `translateY(-${windowDimensions.y * 1.1}px)`
    } else {
      if (interactiveCubesContainerRef.current) interactiveCubesContainerRef.current.style.transform = "translateY(0px)"
    }
    // zIndex
    if (scrollPosition <= windowDimensions.y / 2) {
      if (interactiveCubesContainerRef.current) {
        interactiveCubesContainerRef.current.style.zIndex = "9"
      }
    } else {
      if (interactiveCubesContainerRef.current) {
        interactiveCubesContainerRef.current.style.zIndex = "1"
      }
    }
  }, [scrollPosition, windowDimensions.y])

  return (
    <div
      className="max-w-screen fixed left-0 top-0 z-[9] flex h-screen w-screen items-center justify-center duration-1000"
      ref={interactiveCubesContainerRef}
    >
      <InteractiveCssCubes />
    </div>
  )
}

export default LandingPageAnimation
