"use client"

import CustomCountUp from "@/components/_ui/count-up/custom-count-up.component"
import useBoolean from "@/hooks/useBoolean"
import useScrollPosition from "@/hooks/useScrollPosition"
import getCurrentDate from "@/utils/dates"
import { RefObject, useEffect, useRef } from "react"

export const ANIMATION_DURATION = 1

const LandingPageHero: React.FC = () => {
  const textContainerRef = useRef() as RefObject<HTMLDivElement>
  const scrollTextRef = useRef() as RefObject<HTMLDivElement>
  const countUpRef = useRef() as RefObject<HTMLDivElement>

  const { scrollPosition } = useScrollPosition()

  const {
    setTrue: setCountUpIsFinished,
    setFalse: setCountUpIsNotFinished,
    value: countUpIsFinished,
  } = useBoolean(false)

  const handleCountUpIsFinished = () => {
    setTimeout(
      () => {
        setCountUpIsFinished()
      },
      (ANIMATION_DURATION / 10) * 1000
    )
  }

  useEffect(() => {
    if (textContainerRef.current) {
      if (scrollPosition > 0) {
        textContainerRef.current.style.zIndex = '0'
      } else {
        textContainerRef.current.style.zIndex = '11'
      }
    }
  }, [scrollPosition])

  return (
    <main>
      <div
        className="absolute flex h-screen w-full flex-col items-center justify-center"
        ref={textContainerRef}
        style={{
          zIndex: 11,
        }}
      >
        <h1 className="h1 mr-2 text-center">Kezia's Diary 🐤</h1>

        <div className="flex flex-wrap items-center" ref={countUpRef}>
          <p className="body1">No. of Entries:&nbsp;</p>

          <CustomCountUp number={10} delay={0} duration={ANIMATION_DURATION} onEnd={handleCountUpIsFinished} />

          <p className="body1">&nbsp;as of {getCurrentDate()}</p>
        </div>
      </div>
    </main>
  )
}

export default LandingPageHero
