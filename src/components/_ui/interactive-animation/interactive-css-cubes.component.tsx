"use client"

import React, { RefObject, useEffect, useRef, useState } from "react"
import { useWindowDimensions } from "../../../hooks/useWindowDimensions"
import { gsap } from "gsap"
import useBreakpoints from "@/hooks/useBreakpoints"
import { LINE1_SIZE, LINE1_SIZE_SM } from "@/styles/shared"

interface IInteractiveCssCubesProps {
  color?: string
  animated?: boolean
}

const InteractiveCssCubes: React.FC<IInteractiveCssCubesProps> = ({ color, animated }) => {
  const { isSmallScreen } = useBreakpoints()
  const cubeSize = isSmallScreen ? LINE1_SIZE_SM : LINE1_SIZE

  const [numberOfCubes, setNumberOfCubes] = useState({
    x: 0,
    y: 0,
  })

  const windowDimensions = useWindowDimensions()
  const containerRef = useRef() as RefObject<HTMLDivElement>

  useEffect(() => {
    setNumberOfCubes({
      x: Math.floor(windowDimensions.x / cubeSize),
      y: Math.floor(windowDimensions.y / cubeSize),
    })
  }, [windowDimensions])

  useEffect(() => {
    if (animated) {
      const ctx = gsap.context(() => {
        var tl = gsap.timeline({ repeat: -1, repeatDelay: 0 })

        tl.to(".cube", {
          background: color ?? "lightgrey",
          duration: 0.1,
          stagger: 0.1,
        })
        tl.to(".cube", {
          background: "blue",
          duration: 0.01,
          stagger: 0.1,
        })
      }, containerRef)

      return () => ctx.revert()
    }
  }, [numberOfCubes])

  return (
    <div className="absolute left-0 top-0 flex flex-wrap items-center justify-center" ref={containerRef}>
      {[...Array(numberOfCubes.x * numberOfCubes.y)].map((_, index) => {
        return (
          <div
            key={index}
            className="cube cursor-pointer border border-primary border-b-[0.5] border-l-[0.5] border-r-[0.5] border-t-[0.5] bg-tertiary duration-1000 hover:bg-transparent"
            style={{
              width: cubeSize,
              height: cubeSize,
            }}
          />
        )
      })}
    </div>
  )
}

export default InteractiveCssCubes
