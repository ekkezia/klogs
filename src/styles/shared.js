export const INNER_BAR_WIDTH = '12rem'; // 192px
export const INNER_BAR_WIDTH_LG = '6rem'; // 96px
export const INNER_BAR_WIDTH_SM = '3rem'; // 48px
export const OUTER_BAR_WIDTH = '3rem'; // 48px
export const OUTER_BAR_WIDTH_SM = '2rem'; // 32px
export const OUTER_BAR_WIDTH_LG = '2rem'; // 32px
export const HORIZONTAL_BAR_HEIGHT = '3rem'; // 48px
export const MAXWIDTH = '90rem'; // 1440px
export const MAX_CONTENT_WIDTH = `calc(100% - (${OUTER_BAR_WIDTH} * 2)`;
export const MAX_CONTENT_VIEWPORT_HEIGHT = `calc(100vh - (${HORIZONTAL_BAR_HEIGHT} * 2))`;
export const HEADING_HEIGHT = '6.25rem'; // 100px


export const Z_INDEX_BASE = 0;
export const Z_INDEX_ABOVE = 1;
export const Z_INDEX_BELOW = -1;
export const Z_INDEX_FIXED_BARS = 10;
export const Z_INDEX_MODAL = 999;

export const MAX_VIEWPORT_SIZE = (size) => {
  let defaultVWSize = 1440;
  let calculatedVWSize;

  if (size === 'xl')
    calculatedVWSize = defaultVWSize - SCROLLBAR_SIZE('xl').width;
  else if (size === 'lg')
    calculatedVWSize = defaultVWSize - SCROLLBAR_SIZE('lg').width;
  else if (size === 'sm')
    calculatedVWSize = defaultVWSize - SCROLLBAR_SIZE('sm').width;
  else if (size === 'xs')
    calculatedVWSize = defaultVWSize - SCROLLBAR_SIZE('xs').width;
  else calculatedVWSize = defaultVWSize - SCROLLBAR_SIZE('xl').width; // default is xl

  return `${calculatedVWSize}px`;
};

export const SCROLLBAR_SIZE = (size) => {
  if (size === 'xl') return { width: 48 };
  else if (size === 'lg') return { width: 32 };
  else if (size === 'sm') return { width: 16 };
  else if (size === 'xs') return { width: 8 };
  else return { width: 48 }; // default is xl
};

export const ICON_SIZES = {
  small: '30px',
};

export const BAR_SIZES = (size) => {
  // SIZE = XL
  if (size === 'xl')
    return {
      horizontal: {
        height: '48px',
      },
      vertical: {
        // for Socialbar and Scrollbar width size
        outer: {
          width: '48px',
          height: '100vh',
        },
        // for Logo and Navigation / Hamburger Menu column
        inner: {
          width: '200px',
          height: '100vh',
        },
      },
    };

  // SIZE = 'LG'
  if (size === 'lg')
    return {
      horizontal: {
        height: '48px',
      },
      vertical: {
        // for Socialbar and Scrollbar width size
        outer: {
          width: '32px',
          height: '100vh',
        },
        // for Logo and Navigation / Hamburger Menu column
        inner: {
          width: '96px',
          height: '100vh',
        },
      },
    };

  // SIZE = 'SM'
  if (size === 'xl')
    return {
      horizontal: {
        height: '48px',
      },
      vertical: {
        // for Socialbar and Scrollbar width size
        outer: {
          width: '0px',
          height: '100vh',
        },
        // for Logo and Navigation / Hamburger Menu column
        inner: {
          width: '48px',
          height: '100vh',
        },
      },
    };
  // default is xl
  else
    return {
      horizontal: {
        height: '48px',
      },
      vertical: {
        // for Socialbar and Scrollbar width size
        outer: {
          width: '48px',
          height: '100vh',
        },
        // for Logo and Navigation / Hamburger Menu column
        inner: {
          width: '200px',
          height: '100vh',
        },
      },
    };
};

export const CONTENT_WRITE_AREA = (size) => {
  return {
    width: `calc(100% - ${BAR_SIZES('xl').horizontal.height} - ${
      BAR_SIZES('xl').vertical.inner.width
    } - ${BAR_SIZES('xl').horizontal.height} - ${
      BAR_SIZES('xl').vertical.inner.width
    });`,
    left: `calc(${BAR_SIZES('xl').vertical.outer.width} + ${
      BAR_SIZES('xl').vertical.inner.width
    });`,
  };
};

const spacing = [];

export default spacing;
