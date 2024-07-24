import React, { useEffect, useRef, useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import theme, {
  approvalChainTheme,
  blueTheme,
  chattelChainTheme,
  ekycChainTheme,
  orangeTheme,
  parallelWalletTheme,
  preventiveChainTheme,
  mailCatTheme,
} from '../styles/theme';
import { CssBaseline, GlobalStyles } from '@mui/material';
import createEmotionCache from '../utils/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import Layout from '../components/_ui/Layout';
import Head from 'next/head';
import { PLabThemeContext, MouseContext } from '../utils/createContext';
import { useRouter } from 'next/navigation';
import CustomMouse from '../components/_ui/mouse/custom-mouse.component';
import useBreakpoints from '../hooks/useBreakpoints';
import useBoolean from '../hooks/useBoolean';
import { firebaseConfig } from '../utils/firebase_config';
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/analytics';

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      div: {
        backgroundColor: 'yellow',
        height: '100vh',
      },
      a: {
        textDecoration: 'none',
      },
      '*': {
        transition: 'height 0.5s ease',
      },
    }}
  />
);

const clientSideEmotionCache = createEmotionCache();
export const app = initializeApp(firebaseConfig);

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useEffect(() => {
    const analytics = getAnalytics(app);
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  // default user theme
  const [userTheme, setUserTheme] = useState(blueTheme);
  const [productTheme, setProductTheme] = useState(blueTheme);
  const [globalTheme, setGlobalTheme] = useState(blueTheme);

  const router = useRouter();

  useEffect(() => {
    // Override theme when on Product Themed page
    if (router.pathname.includes('ekyc-chain')) setProductTheme(ekycChainTheme);
    else if (router.pathname.includes('preventive-chain'))
      setProductTheme(preventiveChainTheme);
    else if (router.pathname.includes('approval-chain'))
      setProductTheme(approvalChainTheme);
    else if (router.pathname.includes('chattel-chain'))
      setProductTheme(chattelChainTheme);
    else if (router.pathname === '/parallelwallet')
      setProductTheme(parallelWalletTheme);
    else if (router.pathname.includes('mailcat')) setProductTheme(mailCatTheme);
    else {
      setUserTheme(userTheme);
      setGlobalTheme(userTheme);
    } // default theme
  }, [router]);

  const isProduct =
    (router.pathname.split('/')[1] === 'vertical-solutions' &&
      router.pathname.split('/')[2]) ||
    router.pathname === '/parallelwallet';

  useEffect(() => {
    if (isProduct) setGlobalTheme(productTheme);
    else setGlobalTheme(userTheme);
  }, [productTheme, userTheme, router]);

  const { isSmallScreen } = useBreakpoints();

  // Mouse
  // default user theme
  const { value: showMouse, toggle: setShowMouse } = useBoolean(false);

  return (
    <CacheProvider value={emotionCache}>
      <MouseContext.Provider value={{ showMouse, setShowMouse }}>
        <PLabThemeContext.Provider value={{ userTheme, setUserTheme }}>
          <MUIThemeProvider theme={globalTheme}>
            <CssBaseline />
            {/* if i am using global styles, i am unable to use css= and need to use sx= */}
            {/* {inputGlobalStyles} */}
            <Layout>
              <Component {...pageProps} />
            </Layout>
            {/* Only show CustomMouse on Desktop */}
            {!isSmallScreen && showMouse && (
              <CustomMouse
                color={userTheme?.palette?.PCLab?.primary?.lighter}
              />
            )}
          </MUIThemeProvider>
        </PLabThemeContext.Provider>
      </MouseContext.Provider>
    </CacheProvider>
  );
}
