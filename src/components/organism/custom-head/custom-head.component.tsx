import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import 'firebase/analytics'; // Import the analytics module
import { app } from '../../../pages/_app';

interface ICustomHeadProps {
  title: string;
  content?: string;
  metaTitle?: string;
  metaKeywords?: string;
}

const CustomHead: React.FC<ICustomHeadProps> = ({
  title,
  content,
  metaTitle,
  metaKeywords,
}) => {
  const router = useRouter();
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content ?? ''} />
      <meta name="keywords" content={metaKeywords ?? ''} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={metaTitle ?? ''} />
      <meta
        property="og:url"
        content={`https://parallelchain-lab.io${router.pathname}`}
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
};

export default CustomHead;
