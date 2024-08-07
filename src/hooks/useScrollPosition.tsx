'use client'

import { useEffect, useState } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [documentLength, setDocumentLength] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); // ensure window starts at 0

    window.addEventListener(
      'scroll',
      () => {
        setScrollPosition(window?.scrollY);
      },
      { passive: true },
    );
    setDocumentLength(document.documentElement.scrollHeight);
  }, []);

  return { scrollPosition, documentLength };
}

export default useScrollPosition;

// export function useCustomScrollPosition(
//   axis: string,
//   scrollContainer: RefObject<HTMLDivElement>,
//   document: RefObject<HTMLDivElement>,
// ) {
//   // input scroll container parent (the div that has overflow)
//   const [scrollPosition, setScrollPosition] = useState<number | undefined>(0);
//   const [documentLength, setDocumentLength] = useState<number | undefined>(0);

//   useEffect(() => {
//     if (document) {
//       setDocumentLength(
//         axis === 'y'
//           ? document?.current?.scrollHeight
//           : document?.current?.scrollWidth,
//       );
//     }
//   }, []);

//   const onScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
//     const target = e.target as HTMLDivElement;
//     setScrollPosition(axis === 'y' ? target.scrollTop : target.scrollLeft);
//     }, []);

//   useEffect(() => {
//     scrollContainer?.current?.addEventListener('scroll', onScroll);
//     // return () => scrollContainer.current.removeEventListener('scroll', onScroll);
//   }, [onScroll]);

//   return { scrollPosition, documentLength };
// }
