import React from 'react';
import { OUTER_BAR_WIDTH } from '@/styles/shared';
import Link from 'next/link';

const SOCIAL_LINKS = Object.freeze([
  {
    name: 'email',
    url: 'mailto:e.kezia@gmail.com',
    symbol: 'E',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/company/parallelchain-lab',
    symbol: 'L',
  },
    {
    name: 'instagram',
    url: 'https://instagram.com/ekezia',
    symbol: 'I',
  },
  {
    name: 'portfolio',
    url: 'https://e-kezia.com',
    symbol: 'Z',
  },
    {
    name: 'github',
    url: 'https://github.com/parallelchain-io',
    symbol: 'K',
  },
]);

const Socials: React.FC = () => {
  return (
    <div className="fixed top-1/2 transform -translate-y-1/2 flex flex-col items-center">
      {SOCIAL_LINKS.map(({ name, url, symbol }) => (
        <Link
        passHref
          href={url}
          target="_blank"
          rel="noreferrer"
          key={name}
          className={`flex items-center justify-center relative border-b first:border-t border-primary hover:bg-secondary`}
          style={{
            width: OUTER_BAR_WIDTH,
            height: OUTER_BAR_WIDTH,
          }}
        >
          <div className="body1 text-primary">{symbol}</div>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
