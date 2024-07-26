'use client'

import React, { RefObject, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import InteractiveCssCubes from './interactive-animation/interactive-css-cubes.component';

  const variants = {
  hidden: {  y: '-100%' },
  enter: {  y: 0 },
  exit: {  y: '-100%' },
};

const AnimatedTransition: React.FC = () => {
  const interactiveCubesContainerRef = useRef() as RefObject<HTMLDivElement>;

  // The `key` is tied to the url using the `usePathname` hook.
  const key = usePathname();

  if (key == '/') {
    return <></>
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={key}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ ease: 'easeInOut', duration: 1 }}
              className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-[11] duration-1000"
                    ref={interactiveCubesContainerRef}

      >
      <InteractiveCssCubes
      />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTransition;
