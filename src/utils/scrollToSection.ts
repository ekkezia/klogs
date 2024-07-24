import { RefObject } from 'react';
import { HORIZONTAL_BAR_HEIGHT } from '../components/_ui/Layout';

const horizontalBarHeight = parseInt(HORIZONTAL_BAR_HEIGHT.split('px')[0]); // in px by standard

// to scroll to a specific section, named manually
const scrollToSection = (ref: RefObject<HTMLDivElement>) => {
  if (ref.current)
    // window.scrollTo(0, ref.current.offsetTop - horizontalBarHeight);
    ref.current.scrollIntoView({ behavior: 'smooth' });
};
export default scrollToSection;

export const scrollToSectionByPathname = (pathname: string) => {
  //router.asPath
  const subPath = pathname.split('#')[1];
  let element = document.querySelector(`#${subPath}`);
  if (element) {
    window.scroll({
      top: element.scrollTop - horizontalBarHeight,
      behavior: 'smooth',
    });
  }
};

export const normalizeScroll = () => {
  window.scroll({
    top: document.documentElement.scrollTop - horizontalBarHeight,
    behavior: 'smooth',
  });
};
