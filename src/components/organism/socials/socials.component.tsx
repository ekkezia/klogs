/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import {
  OUTER_BAR_WIDTH,
  OUTER_BAR_WIDTH_LG,
  OUTER_BAR_WIDTH_SM,
} from '../../_ui/Layout';

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
  const theme = useTheme();

  const styles = {
    container: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      &:first-of-type {
        border-top: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
      }
      // background: ${theme?.palette?.PCLab?.background?.primary};
      // LAYOUT BREAK: Socials go inside NavSmall
      @media (max-width: 600px) {
        position: relative;
        flex-direction: row;
        width: 100%;
        height: fit-content;
        top: 0;
        border-top: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
        border-bottom: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
        justify-content: center;
      }
    `,
    iconContainer: css`
      width: calc(${OUTER_BAR_WIDTH} - 1px);
      height: calc(${OUTER_BAR_WIDTH} - 1px);
      border-bottom: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      &:hover {
        background: ${theme?.palette?.PCLab?.primary?.default};
        .icon {
          filter: invert(100%) sepia(8%) saturate(5%) hue-rotate(39deg)
            brightness(103%) contrast(96%);
        }
      }
      @media (max-width: 1200px) {
        width: calc(${OUTER_BAR_WIDTH_LG} - 1px);
        height: calc(${OUTER_BAR_WIDTH_LG} - 1px);
      }
      // LAYOUT BREAK: Socials go inside NavSmall
      @media (max-width: 600px) {
        border-right: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
        border-bottom: 0px solid ${theme?.palette?.PCLab?.tertiary?.default};
        &:first-of-type {
          border-left: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
        }
      }
    `,
    icon: css`
      filter: invert(49%) sepia(8%) saturate(0%) hue-rotate(73deg)
        brightness(93%) contrast(92%);
    `,
  };

  return (
    <div css={styles.container}>
      {SOCIAL_LINKS.map(({ name, url, icon }) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          key={name}
          css={styles.iconContainer}
        >
          <Image
            src={`/images/icons/socials/${icon}`}
            // layout="fill"
            // objectFit="contain"
            width={30}
            height={30}
            alt={`${icon}-icon`}
            css={styles.icon}
            className="icon"
          />
        </a>
      ))}
    </div>
  );
};

export default Socials;
