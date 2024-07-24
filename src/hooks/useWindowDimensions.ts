import { RefObject, useEffect, useState } from 'react';

export const hasWindow = typeof window !== 'undefined';

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    x: 0,
    y: 0,
  });
  function handleResize() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    setWindowDimensions({
      x: width ?? 0,
      y: height ?? 0,
    });
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function useComponentDimensions(component: RefObject<HTMLDivElement>) {
  const [componentDimensions, setComponentDimensions] = useState({
    x: 0,
    y: 0,
  });
  function handleResize() {
    const width = hasWindow ? component?.current?.clientWidth : null;
    const height = hasWindow ? component?.current?.clientHeight : null;
    setComponentDimensions({
      x: width ?? 0,
      y: height ?? 0,
    });
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return componentDimensions;
}
