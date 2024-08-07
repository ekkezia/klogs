"use client"

import Clock from "@/components/_ui/clock"
import useBoolean from "@/hooks/useBoolean"
import useScrollPosition from "@/hooks/useScrollPosition"
import getCurrentDate, { formatDate } from "@/utils/dates"
import { RefObject, useEffect, useRef } from "react"

export const ANIMATION_DURATION = 1

const LandingPageHero: React.FC = () => {
  const textContainerRef = useRef() as RefObject<HTMLDivElement>

  const { scrollPosition } = useScrollPosition()

  // const {
  //   setTrue: setCountUpIsFinished,
  //   setFalse: setCountUpIsNotFinished,
  //   value: countUpIsFinished,
  // } = useBoolean(false)

  // const handleCountUpIsFinished = () => {
  //   setTimeout(
  //     () => {
  //       setCountUpIsFinished()
  //     },
  //     (ANIMATION_DURATION / 10) * 1000
  //   )
  // }

  useEffect(() => {
    if (textContainerRef.current) {
      if (scrollPosition > 0) {
        textContainerRef.current.style.zIndex = "0"
      } else {
        textContainerRef.current.style.zIndex = "11"
      }
    }
  }, [scrollPosition])

  return (
    <main>
      <div
        className="pointer-events-none absolute flex h-screen w-full flex-col items-center justify-center"
        ref={textContainerRef}
        style={{
          zIndex: 11,
        }}
      >
        <Clock />

        <h2 className="h2 text-center text-secondary">Kezia</h2>
        
        <p className="body1 text-secondary">as of {formatDate(getCurrentDate())}</p>
      </div>
    </main>
  )
}

export default LandingPageHero
