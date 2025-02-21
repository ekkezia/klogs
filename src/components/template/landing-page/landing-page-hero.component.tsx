"use client"

import Clock from "@/components/_ui/clock"
import { AnimatePresence, motion } from 'framer-motion'
import useScrollPosition from "@/hooks/useScrollPosition"
import getCurrentDate from "@/utils/dates"
import { RefObject, useEffect, useRef, useState } from "react"

export const ANIMATION_DURATION = 1

const LandingPageHero: React.FC = () => {
  const textContainerRef = useRef() as RefObject<HTMLDivElement>

  const { scrollPosition } = useScrollPosition()

  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    setDate(getCurrentDate())
  }, []);

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
    <AnimatePresence>
      <main>
        <div
          className="pointer-events-none absolute z-[11] flex h-screen w-full flex-col items-center justify-center"
          ref={textContainerRef}
        >
          <motion.div        
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Clock />
          </motion.div>


          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="body1 text-center text-secondary">
              Elizabeth Kezia
          </motion.h2>

          <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="body1 text-center text-secondary">
            as of {date ?? "--/--/--"}
          </motion.p>
        </div>
      </main>
    </AnimatePresence>
  )
}

export default LandingPageHero
