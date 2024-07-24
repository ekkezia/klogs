/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import {
  HORIZONTAL_BAR_HEIGHT,
  OUTER_BAR_WIDTH,
  OUTER_BAR_WIDTH_LG,
} from '../../../../_ui/Layout';
import { usePathname } from 'next/navigation';
import { Tooltip } from '@mui/material';

const SocialShareButtons: React.FC = () => {
  const theme = useTheme();

  const styles = {
    iconContainer: css`
      width: calc(${OUTER_BAR_WIDTH} - 1px);
      height: ${HORIZONTAL_BAR_HEIGHT};
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
      // LAYOUT BREAK: Buttons fill up the whole width on inner left bar
      @media (max-width: 1200px) {
        width: 100%;
        height: ${HORIZONTAL_BAR_HEIGHT};
        border-bottom: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
      }
    `,
    icon: css`
      filter: invert(49%) sepia(8%) saturate(0%) hue-rotate(73deg)
        brightness(93%) contrast(92%);
    `,
  };

  const pathname = usePathname()
  const baseUrl = 'https://parallelchain-lab.io';

  const SOCIAL_LINKS = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer.php?u=${baseUrl}${router.asPath}`,
      icon: 'facebook.svg',
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${baseUrl}${router.asPath}`,
      icon: 'twitter.svg',
    },
    {
      name: 'Linkedin',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${baseUrl}${router.asPath}`,
      icon: 'linkedin.svg',
    },
  ];

  return (
    <>
      {SOCIAL_LINKS.map(({ name, url, icon }, idx) => (
        <Tooltip arrow placement="bottom" title={`Share on ${name}`} key={idx}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            key={name}
            css={styles.iconContainer}
          >
            <Image
              src={`/images/icons/socials/${icon}`}
              width={30}
              height={30}
              alt={`${icon}-icon`}
              css={styles.icon}
              className="icon"
            />
          </a>
        </Tooltip>
      ))}
    </>
  );
};

export default SocialShareButtons;
