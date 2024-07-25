'use client'

import { useMediaQuery } from "@uidotdev/usehooks";

const useBreakpoints = () => {
  const isExtraLargeScreen = useMediaQuery("only screen and (max-width : 1440px)");
  const isLargeScreen = useMediaQuery("only screen and (max-width : 1200px)");
  const isMediumScreen = useMediaQuery("only screen and (max-width : 900px)");
  const isSmallScreen = useMediaQuery("only screen and (max-width : 600px)");
  const isExtraSmallScreen = useMediaQuery("only screen and (max-width : 425px)");
  const isExtraExtraSmallScreen = useMediaQuery("only screen and (max-width : 375px)");

  let size;
  if (isExtraLargeScreen) size = 'xl';
  else if (isLargeScreen) size = 'lg';
  else if (isMediumScreen) size = 'md';
  else if (isSmallScreen) size = 'sm';
  else if (isExtraSmallScreen) size = 'xs';
  else if (isExtraExtraSmallScreen) size = 'xxs';
  else size = 'xl'; // default size

  return {
    isLargeScreen,
    isExtraLargeScreen,
    isMediumScreen,
    isSmallScreen,
    isExtraSmallScreen,
    isExtraExtraSmallScreen,
    size,
  };
};

export default useBreakpoints;

export const xxs = `@media (max-width: 375px)`;
export const xs = `@media (min-width: 425px)`;
export const sm = `@media (min-width: 600px)`;
export const md = `@media (min-width: 900px)`;
export const lg = `@media (max-width: 1200px)`;
export const xl = `@media (min-width: 1440px)`;
