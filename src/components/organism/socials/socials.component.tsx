import React from 'react';
import Image from 'next/image';
import { OUTER_BAR_WIDTH } from '@/styles/shared';

const SOCIAL_LINKS = Object.freeze([
  {
    name: 'email',
    url: 'mailto:info@parallelchain.io',
    icon: 'email.svg',
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/ParallelChainLB',
    icon: 'twitter.svg',
  },
  {
    name: 'telegram',
    url: 'https://t.me/parallelchainofficial',
    icon: 'telegram.svg',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/company/parallelchain-lab',
    icon: 'linkedin.svg',
  },
  {
    name: 'discord',
    url: 'https://discord.com/invite/parallelchainofficial',
    icon: 'discord.svg',
  },
  {
    name: 'github',
    url: 'https://github.com/parallelchain-io',
    icon: 'github.svg',
  },
]);

const Socials: React.FC = () => {
  return (
    <div className="fixed top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-1 border-t border-b border-tertiary-default md:border-t-0 md:border-b-0 md:gap-0">
      {SOCIAL_LINKS.map(({ name, url, icon }) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          key={name}
          className={`flex items-center justify-center relative border-b border-tertiary-default md:border-r-0 md:border-b-0 md:border-l first:border-l border-primary`}
          style={{
            width: OUTER_BAR_WIDTH,
            height: OUTER_BAR_WIDTH,
          }}
        >
          <img
            src={`/images/icons/socials/${icon}`}
            width={30}
            height={30}
            alt={`${name}-icon`}
            className="filter invert-49 sepia-8 saturate-0 hue-rotate-73 brightness-93 contrast-92 hover:bg-primary hover:filter-invert-100 hover:filter-sepia-8 hover:filter-saturate-5 hover:filter-hue-rotate-39 hover:filter-brightness-103 hover:filter-contrast-96"
          />
        </a>
      ))}
    </div>
  );
};

export default Socials;
