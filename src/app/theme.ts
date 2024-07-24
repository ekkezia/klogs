// @ts-nocheck
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      PCLab?: {
        primary?: {
          default?: string; // default color: corporate blue
          lighter?: string;
          defaultFilter?: string;
          lighterFilter?: string;
        };
        secondary?: {
          default?: string; // secondary color: cream yellow
        };
        tertiary?: {
          default?: string;
        };
        error?: {
          default?: string;
        };
        success?: {
          default?: string;
        };
        brand?: {
          blue?: string;
          green?: string; // Celadon green
          turquoise?: string;
          orange?: string; // Calamansi orange
          fuschia?: string;
        };
        // neutral color/value will be fixed even on mode change
        neutral?: {
          black?: string;
          white?: string;
          grey?: string;
        };
        products?: {
          ekycChain?: {
            default?: string;
            gradient?: string;
            filter?: string;
          };
          preventiveChain?: {
            default?: string;
            gradient?: string;
            filter?: string;
          };
          approvalChain?: {
            default?: string;
            gradient?: string;
            filter?: string;
          };
          chattelChain?: {
            default?: string;
            gradient?: string;
            filter?: string;
          };
          parallelWallet?: {
            default?: string;
            gradient?: string;
            filter?: string;
          };
          mailCat?: {
            default?: string;
            gradient?: string;
            filter?: string;
          };
          fintech360?: {
            default?: string;
            gradient?: string;
            hover?: string;
            filter?: string;
          };
          tokenization?: {
            default?: string;
            gradient?: string;
            hover?: string;
            filter?: string;
          };
          intraEnterprise?: {
            default?: string;
            gradient?: string;
            hover?: string;
            filter?: string;
          };
          nexus?: {
            default?: string;
            gradient?: string;
            hover?: string;
            filter?: string;
          };
        };
        background?: {
          primary?: string; // Off White; default background color
          secondary?: string;
          contrast?: string; // Off Black
          pure?: string; // Pure White
          transparent?: string; // Slightly transparent
        };
        text?: {
          primary?: string; // Off Black
          secondary?: string; // Sonic Silver
          contrast?: string; // white
          lighter?: string;
          active?: string;
          link?: string; // brand green
        };
      };
    };
  }

  interface PaletteOptions {
    PCLab?: {
      primary?: {
        default?: string; // default color: corporate blue
        lighter?: string;
        defaultFilter?: string;
        lighterFilter?: string;
      };
      secondary?: {
        default?: string; // secondary color: cream yellow
      };
      tertiary?: {
        default?: string;
      };
      error?: {
        default?: string;
      };
      success?: {
        default?: string;
      };
      brand?: {
        blue?: string;
        green?: string; // Celadon green
        turquoise?: string;
        orange?: string; // Calamansi orange
        fuschia?: string; // fuschia
      };
      // neutral color/value will be fixed even on mode change
      neutral?: {
        black?: string;
        white?: string;
        grey?: string;
      };
      products?: {
        ekycChain?: {
          default?: string;
          gradient?: string;
          filter?: string;
        };
        preventiveChain?: {
          default?: string;
          gradient?: string;
          filter?: string;
        };
        approvalChain?: {
          default?: string;
          gradient?: string;
          filter?: string;
        };
        chattelChain?: {
          default?: string;
          gradient?: string;
          filter?: string;
        };
        parallelWallet?: {
          default?: string;
          gradient?: string;
          filter?: string;
        };
        mailCat?: {
          default?: string;
          gradient?: string;
          filter?: string;
        };
        fintech360?: {
          default?: string;
          gradient?: string;
          hover?: string;
          filter?: string;
        };
        tokenization?: {
          default?: string;
          gradient?: string;
          hover?: string;
          filter?: string;
        };
        intraEnterprise?: {
          default?: string;
          gradient?: string;
          hover?: string;
          filter?: string;
        };
        nexus?: {
          default?: string;
          gradient?: string;
          hover?: string;
          filter?: string;
        };
      };
      background?: {
        primary?: string; // Off White; default background color
        secondary?: string;
        contrast?: string; // Off Black
        pure?: string; // Pure White
        transparent?: string; // Slightly transparent
      };
      text?: {
        primary?: string; // Off Black
        secondary?: string; // Sonic Silver
        contrast?: string; // white
        lighter?: string;
        active?: string;
        link?: string; // brand green
      };
    };
  }

  interface TypographyVariants {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    h6: React.CSSProperties;
    h7: React.CSSProperties;
    suptitle: React.CSSProperties;
    article: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    link: React.CSSProperties;
    verticalHeading: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1?: React.CSSProperties;
    h2?: React.CSSProperties;
    h3?: React.CSSProperties;
    h4?: React.CSSProperties;
    h5?: React.CSSProperties;
    h6?: React.CSSProperties;
    h7?: React.CSSProperties;
    suptitle?: React.CSSProperties;
    article?: React.CSSProperties;
    body1?: React.CSSProperties;
    body2?: React.CSSProperties;
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
    link?: React.CSSProperties;
    verticalHeading?: React.CSSProperties;
  }

  // allow Breakpoints Overrides
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

// allow Typography Overrides
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1?: true;
    h2?: true;
    h3?: true;
    h4?: true;
    h5?: true;
    h6?: true;
    suptitle: true;
    h7: true;
    body1?: true;
    body2?: true;
    body3?: true;
    body4?: true;
    link?: true;
    verticalHeading?: true;
  }
}

// Initialize theme with custom Palette & Breakpoints, because the typography needs to use it in this same file
const initCustomTheme = createTheme({
  palette: {
    PCLab: {
      primary: {
        default: '#2B648D', // default color: corporate blue
        lighter: '#3CADFF',
        defaultFilter:
          'invert(34%) sepia(10%) saturate(3337%) hue-rotate(163deg) brightness(95%) contrast(85%)',
        lighterFilter:
          'invert(70%) sepia(61%) saturate(4388%) hue-rotate(181deg) brightness(102%) contrast(101%)',
      },
      secondary: {
        default: '#EBC67E', // secondary color: cream yellow
      },
      tertiary: {
        default: '#D9D9D9', // for Background Lines
      },
      error: {
        default: '#D82D38',
      },
      success: {
        default: '#19867F',
      },
      brand: {
        blue: '#2B648D',
        green: '#19867F', // Celadon green
        turquoise: '#10BEB3',
        orange: '#FE600E', // Calamansi orange
        fuschia: '#CD2DD8',
      },
      // neutral color/value will be fixed even on mode change
      neutral: {
        black: '#404040',
        white: '#FAFAFA',
        grey: '#7A7A7A',
      },
      products: {
        ekycChain: {
          default: '#003E4F',
          gradient:
            'linear-gradient(90deg, #02E2D5 0%, #076A79 50%, #003E4F 100%)',
          filter:
            'invert(22%) sepia(7%) saturate(6111%) hue-rotate(173deg) brightness(95%) contrast(81%)',
        },
        preventiveChain: {
          default: '#F06A23',
          gradient: 'linear-gradient(90deg, #f8d75f 0%, #F06A23 100%)',
          filter:
            'invert(56%) sepia(23%) saturate(6921%) hue-rotate(346deg) brightness(96%) contrast(95%)',
        },
        approvalChain: {
          default: '#19867F',
          gradient: 'linear-gradient(90deg, #18F3BD 0%, #076A79 100%)',
          filter:
            'invert(39%) sepia(89%) saturate(359%) hue-rotate(127deg) brightness(92%) contrast(96%)',
        },
        chattelChain: {
          default: '#00B4B6',
          gradient: 'linear-gradient(90deg, #70C9CC 0%, #00B4B6 100%)',
          filter:
            'invert(51%) sepia(53%) saturate(2740%) hue-rotate(144deg) brightness(96%) contrast(101%)',
        },
        parallelWallet: {
          default: '#426057',
          gradient: 'linear-gradient(90deg, #426057 0%, #252F2C 100%)',
          filter:
            'invert(58%) sepia(35%) saturate(5982%) hue-rotate(145deg) brightness(96%) contrast(104%)',
        },
        mailCat: {
          default: '#27C13D', // default color: corporate blue
          gradient: 'linear-gradient(90deg, #27C13D 0%, #000000 100%)',
          gradient: 'linear-gradient(90deg, #70C9CC 0%, #00B4B6 100%)',
          filter:
            'invert(61%) sepia(81%) saturate(465%) hue-rotate(76deg) brightness(84%) contrast(96%)',
        },
        fintech360: {
          default: '#00B0F0', // default color: light blue
          gradient: 'linear-gradient(90deg, #00B0F0 28.18%, #404040 100%)',
          hover:
            'linear-gradient(180deg, rgba(0, 176, 240, 0.10) 0%, rgba(0, 176, 240, 0.00) 100%)',
          filter:
            'invert(52%) sepia(72%) saturate(2476%) hue-rotate(161deg) brightness(99%) contrast(99%)',
        },
        tokenization: {
          default: '#7030A0', // default color: corporate purple
          gradient:
            'linear-gradient(90deg, rgba(112, 48, 160, 1) 0%, #404040 100%)',
          hover:
            'linear-gradient(180deg, rgba(112, 48, 160, 0.1) 0%, rgba(112, 48, 160, 0.00) 100%)',
          filter:
            'invert(61%) sepia(81%) saturate(465%) hue-rotate(76deg) brightness(84%) contrast(96%)',
        },
        intraEnterprise: {
          default: '#ED7D31', // default color: light orange
          gradient:
            'linear-gradient(90deg, rgba(237, 125, 49, 1) 0%, #404040 100%)',
          hover:
            'linear-gradient(180deg, rgba(237, 125, 49, 0.1) 0%, rgba(237, 125, 49, 0.00) 100%)',
          filter:
            'invert(61%) sepia(81%) saturate(465%) hue-rotate(76deg) brightness(84%) contrast(96%)',
        },
        nexus: {
          default: '#00B050', // default color: corporate green
          gradient:
            'linear-gradient(90deg, rgba(0, 176, 80, 1) 0%, #404040 100%)',
          hover:
            'linear-gradient(180deg, rgba(0, 176, 80, 0.1) 0%, rgba(0, 176, 80, 0.00) 100%)',
          filter:
            'invert(61%) sepia(81%) saturate(465%) hue-rotate(76deg) brightness(84%) contrast(96%)',
        },
      },
      background: {
        primary: '#fafafa', // Off White, default background color
        secondary: '#f0f0f0',
        contrast: '#404040', // Off Blacks
        pure: '#ffffff', // Pure White
        transparent: 'rgba(250, 250, 250, 0.9)',
      },
      text: {
        primary: '#404040', // Off Black
        secondary: '#7A7A7A', // Sonic Silver
        contrast: '#fafafa', // White
        lighter: '#D9D9D9',
        link: '#3CADFF',
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
});

const theme = createTheme({
  ...initCustomTheme,
  typography: {
    // Heading 1, for page main headline
    h1: {
      fontFamily: 'Barlow',
      fontSize: '72px',
      fontWeight: 600,
      lineHeight: '120%',
      textTransform: 'uppercase',
      letterSpacing: '0.4em',
      textAlign: 'left',
      [initCustomTheme.breakpoints.down('lg')]: {
        letterSpacing: '0.3em',
        fontSize: '64px',
      },
      [initCustomTheme.breakpoints.down('md')]: {
        letterSpacing: '0.1em',
        fontSize: '48px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        letterSpacing: '0.05em',
        // fontSize: '32px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        letterSpacing: '0em',
        fontSize: '32px',
      },
    },

    // Heading 2, gradient primary-dark color
    h2: {
      fontFamily: 'Barlow',
      fontSize: '64px',
      fontWeight: 500,
      textTransform: 'none',
      lineHeight: '120%',
      textAlign: 'left',
      background: `linear-gradient(90deg, ${initCustomTheme.palette?.PCLab?.primary?.default} 0%, ${initCustomTheme.palette?.PCLab?.text?.primary} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      TextFillColor: 'transparent',
      [initCustomTheme.breakpoints.down('lg')]: {
        fontSize: '54px',
      },
      [initCustomTheme.breakpoints.down('md')]: {
        fontSize: '48px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '32px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '24px',
      },
    },

    // Heading 3, primary color, for News Article Title
    h3: {
      fontFamily: 'Barlow',
      fontSize: '38px',
      fontWeight: 600,
      textTransform: 'none',
      lineHeight: '120%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.primary?.default,
      [initCustomTheme.breakpoints.down('md')]: {
        fontSize: '32px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '24px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '20px',
      },
    },

    // Heading 4, primary color
    h4: {
      fontFamily: 'Barlow',
      fontSize: '32px',
      fontWeight: 500,
      textTransform: 'none',
      lineHeight: '150%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.primary?.default,
      [initCustomTheme.breakpoints.down('md')]: {
        fontSize: '24px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '20px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '16px',
      },
    },

    // Heading 5, dark color
    h5: {
      fontFamily: 'Barlow',
      fontSize: '24px',
      fontWeight: 500,
      textTransform: 'none',
      lineHeight: '120%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '20px',
      },
    },

    // Heading 6, dark color
    h6: {
      fontFamily: 'Barlow',
      fontSize: '20px',
      fontWeight: 500,
      textTransform: 'none',
      lineHeight: '150%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('md')]: {
        fontSize: '18px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '16px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '14px',
      },
    },

    // Small Title (Bold)
    h7: {
      fontFamily: 'Barlow',
      fontSize: '14px',
      fontWeight: 700,
      textTransform: 'uppercase',
      lineHeight: '120%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '12px',
      },
    },

    // suptitle placed above heading
    suptitle: {
      fontFamily: 'Barlow',
      fontSize: '20px',
      fontWeight: 300,
      textTransform: 'uppercase',
      lineHeight: '120%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('lg')]: {
        fontSize: '16px',
      },
      [initCustomTheme.breakpoints.down('md')]: {
        fontSize: '14px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '12px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '10px',
      },
    },

    // Text for News Article <p> element
    article: {
      fontFamily: 'Barlow',
      fontSize: '20px',
      fontWeight: 400,
      textTransform: 'none',
      lineHeight: '200%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '16px',
      },
    },

    // Text for paragraph that are inside headliners
    body1: {
      fontFamily: 'Barlow',
      fontSize: '20px',
      fontWeight: 400,
      textTransform: 'none',
      lineHeight: '150%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('lg')]: {
        fontSize: '18px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '16px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '14px',
      },
    },

    // Standard text for paragraph
    body2: {
      fontFamily: 'Barlow',
      fontSize: '16px',
      fontWeight: 400,
      textTransform: 'none',
      lineHeight: '150%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '12px',
      },
    },

    // Small text, for buttons, footer
    body3: {
      fontFamily: 'Barlow',
      fontSize: '14px',
      fontWeight: 400,
      textTransform: 'none',
      lineHeight: '120%',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '12px',
      },
    },

    // Extra small text, for minor captions
    body4: {
      fontFamily: 'Barlow',
      fontSize: '12px',
      fontWeight: 400,
      textTransform: 'none',
      lineHeight: '120%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.text?.primary,
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '10px',
      },
    },

    // Link
    link: {
      fontFamily: 'Barlow',
      fontSize: '16px',
      fontWeight: 300,
      textTransform: 'none',
      lineHeight: '120%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.primary?.lighter,
      '&:hover': {
        color: initCustomTheme.palette?.PCLab?.background?.primary,
        background: initCustomTheme.palette?.PCLab?.primary?.lighter,
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
    },

    // Vertical Heading
    verticalHeading: {
      fontFamily: 'Barlow',
      fontSize: '28px',
      fontWeight: 500,
      textTransform: 'none',
      lineHeight: '150%',
      textAlign: 'left',
      color: initCustomTheme.palette?.PCLab?.primary?.lighter,
      [initCustomTheme.breakpoints.down('md')]: {
        fontSize: '24px',
      },
      [initCustomTheme.breakpoints.down('sm')]: {
        fontSize: '20px',
      },
      [initCustomTheme.breakpoints.down('xs')]: {
        fontSize: '16px',
      },
    },
  },
});

export default theme;

// Default: Blue Theme
export const blueTheme = theme;

// Orange Theme
export const orangeTheme = {
  ...theme,
  palette: {
    ...theme.palette,
    PCLab: {
      ...theme.palette.PCLab,
      primary: {
        default: '#FE600E', // default color: orange
        lighter: '#F8D75F',
        defaultFilter:
          'invert(56%) sepia(72%) saturate(4940%) hue-rotate(354deg) brightness(100%) contrast(101%)',
        lighterFilter:
          'invert(96%) sepia(73%) saturate(874%) hue-rotate(325deg) brightness(92%) contrast(114%)',
      },
    },
  },
  typography: {
    ...theme.typography,
    h2: {
      ...theme.typography.h2,
      background: `linear-gradient(90deg, #f8d75f 0%, #FE600E 100%)`,
    },
    // Vertical Heading
    verticalHeading: {
      ...theme.typography.verticalHeading,
      color: '#F8D75F',
    },
  },
};

// Green Theme
export const greenTheme = {
  ...theme,
  palette: {
    ...theme.palette,
    PCLab: {
      ...theme.palette.PCLab,
      primary: {
        default: '#19867F', // default color: green
        lighter: '#18F3BD',
        defaultFilter:
          'invert(31%) sepia(80%) saturate(4940%) hue-rotate(163deg) brightness(94%) contrast(80%)',
        lighterFilter:
          'invert(86%) sepia(59%) saturate(991%) hue-rotate(83deg) brightness(105%) contrast(90%)',
      },
    },
  },
  typography: {
    ...theme.typography,
    h2: {
      ...theme.typography.h2,
      background: `linear-gradient(90deg, #18F3BD 0%, #19867F 100%)`,
    },
    // Vertical Heading
    verticalHeading: {
      ...theme.typography.verticalHeading,
      color: '#18F3BD',
    },
  },
};

// PRODUCTS THEME
// eKYCChain Theme
export const ekycChainTheme = {
  ...theme,
  palette: {
    ...theme.palette,
    PCLab: {
      ...theme.palette.PCLab,
      primary: {
        default: '#003E4F', // default color: eKYC blue
        lighter: '#02E2D5',
        defaultFilter:
          'invert(14%) sepia(49%) saturate(3439%) hue-rotate(171deg) brightness(97%) contrast(103%)',
        lighterFilter:
          ' invert(67%) sepia(87%) saturate(1964%) hue-rotate(127deg) brightness(101%) contrast(98%)',
      },
    },
  },
  typography: {
    ...theme.typography,
    // Vertical Heading
    verticalHeading: {
      ...theme.typography.verticalHeading,
      color: '#02E2D5',
    },
  },
};

// PreventiveChain Theme
export const preventiveChainTheme = {
  ...theme,
  palette: {
    ...theme.palette,
    PCLab: {
      ...theme.palette.PCLab,
      primary: {
        default: '#F06A23', // default color: preventiveChain orange
        lighter: '#F8D75F',
        defaultFilter:
          'invert(48%) sepia(59%) saturate(1253%) hue-rotate(344deg) brightness(94%) contrast(100%)',
        lighterFilter:
          'invert(100%) sepia(55%) saturate(2737%) hue-rotate(319deg) brightness(105%) contrast(95%)',
      },
    },
  },
  typography: {
    ...theme.typography,
    // Vertical Heading
    verticalHeading: {
      ...theme.typography.verticalHeading,
      color: '#F8D75F',
    },
  },
};

// Approval Theme
export const approvalChainTheme = {
  ...theme,
  palette: {
    ...theme.palette,
    PCLab: {
      ...theme.palette.PCLab,
      primary: {
        default: '#19867F', // default color: green
        lighter: '#18F3BD',
        defaultFilter:
          'invert(31%) sepia(80%) saturate(4940%) hue-rotate(163deg) brightness(94%) contrast(80%)',
        lighterFilter:
          'invert(86%) sepia(59%) saturate(991%) hue-rotate(83deg) brightness(105%) contrast(90%)',
      },
    },
  },
  typography: {
    ...theme.typography,
    // Vertical Heading
    verticalHeading: {
      ...theme.typography.verticalHeading,
      color: '#18F3BD',
    },
  },
};

// ChattelChain Theme
export const chattelChainTheme = {
  ...theme,
  palette: {
    ...theme.palette,
    PCLab: {
      ...theme.palette.PCLab,
      primary: {
        default: '#00B4B6', // default color: chattelChain blue
        lighter: '#70C9CC',
        defaultFilter:
          'invert(51%) sepia(63%) saturate(2882%) hue-rotate(145deg) brightness(96%) contrast(101%)',
        lighterFilter:
          'invert(94%) sepia(99%) saturate(1716%) hue-rotate(156deg) brightness(86%) contrast(82%)',
      },
      secondary: {
        default: '#18F3BD', // secondary color: cream yellow
      },
    },
  },
  typography: {
    ...theme.typography,
    // Vertical Heading
    verticalHeading: {
      ...theme.typography.verticalHeading,
      color: '#70C9CC',
    },
  },
};

// ParallelWallet Theme
export const parallelWalletTheme = {
  ...theme,
  palette: {
    ...theme.palette,
    PCLab: {
      ...theme.palette.PCLab,
      primary: {
        default: '#426057', // default color: parallelWallet green
        lighter: '#EBC67E',
        defaultFilter:
          'invert(35%) sepia(26%) saturate(370%) hue-rotate(111deg) brightness(92%) contrast(94%)',
        lighterFilter:
          'invert(76%) sepia(28%) saturate(650%) hue-rotate(351deg) brightness(108%) contrast(84%)',
      },
    },
  },
  typography: {
    ...theme.typography,
    // Vertical Heading
    verticalHeading: {
      ...theme.typography.verticalHeading,
      color: '#EBC67E',
    },
  },
};

// MailCat Theme
export const mailCatTheme = {
  ...theme,
  palette: {
    ...theme.palette,
    PCLab: {
      ...theme.palette.PCLab,
      primary: {
        default: '#27C13D', // default color: mail cat green
        lighter: '#42FF00',
        defaultFilter:
          'invert(61%) sepia(81%) saturate(465%) hue-rotate(76deg) brightness(84%) contrast(96%)',
        lighterFilter:
          'invert(79%) sepia(78%) saturate(796%) hue-rotate(152deg) brightness(88%) contrast(89%)',
      },
    },
  },
  typography: {
    ...theme.typography,
    // Vertical Heading
    verticalHeading: {
      ...theme.typography.verticalHeading,
      color: '#42FF00',
    },
  },
};
