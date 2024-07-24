// @ts-nocheck
import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from 'next/document';
import DOMPurify from 'isomorphic-dompurify';
import theme from '../styles/theme';
import createEmotionCache from '../utils/createEmotionCache';
import { AppType } from 'next/dist/shared/lib/utils';
import { MyAppProps } from './_app';
import createEmotionServer from '@emotion/server/create-instance';
import { NavbarContext } from '../utils/createContext';
import Script from 'next/script';
// import { ServerStyleSheets } from '@mui/styles';
// import { ServerStyleSheet } from 'styled-components';

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  //   static async getInitialProps(ctx) {
  //   const muiSheets = new ServerStyleSheets();
  //   const styledSheets = new ServerStyleSheet();
  //   const originalRenderPage = ctx.renderPage;

  //   try {
  //     ctx.renderPage = () =>
  //       originalRenderPage({
  //         enhanceApp: (App) => (props) =>
  //           muiSheets.collect(styledSheets.collectStyles(<App {...props} />)),
  //       });

  //     const initialProps = await Document.getInitialProps(ctx);

  //     return {
  //       ...initialProps,
  //       styles: [
  //         ...React.Children.toArray(initialProps.styles),
  //         muiSheets.getStyleElement(),
  //         styledSheets.getStyleElement(),
  //       ],
  //     };
  //   } finally {
  //     styledSheets.seal();
  //   }
  // }
  return (
    <Html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <Head>
        <meta
          name="theme-color"
          content={theme?.palette?.PCLab?.primary?.default}
        />

        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(`
            <!-- Google tag (gtag.js) -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-REX4TG32BY"></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-REX4TG32BY');
            </script>
              `),
          }}
        />
        <meta
          name="google-site-verification"
          content="ES3vNLr_gLDZ5-Jgk2D7HoqaLIDRsSboCM_RZM8_dfU"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body id="body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>,
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
