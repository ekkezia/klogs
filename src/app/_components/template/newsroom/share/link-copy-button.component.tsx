/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Tooltip, useTheme } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  HORIZONTAL_BAR_HEIGHT,
  OUTER_BAR_WIDTH,
  OUTER_BAR_WIDTH_LG,
} from '../../../../_ui/Layout';

const LinkCopyButton = () => {
  const theme = useTheme();
  const styles = {
    iconContainer: css`
      width: calc(${OUTER_BAR_WIDTH} - 1px);
      height: ${HORIZONTAL_BAR_HEIGHT};
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: sticky;
      border-bottom: 1px solid ${theme?.palette?.PCLab?.tertiary?.default};
      cursor: pointer;
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
      }
    `,
    icon: css`
      filter: invert(49%) sepia(8%) saturate(0%) hue-rotate(73deg)
        brightness(93%) contrast(92%);
    `,
  };

  const [isCopied, setIsCopied] = useState(false);
  const [copyIcon, setCopyIcon] = useState('copy-link.svg');

  const pathname = usePathname()
  const baseUrl = 'https://parallelchain-lab.io';
  const url = `${baseUrl}${router.asPath}`;

  const handleClick = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(url);
    } else {
      document.execCommand('copy', true, url);
    }
    setIsCopied(true);
  };

  // Change Copy Icon
  useEffect(() => {
    if (isCopied) {
      setCopyIcon('check.svg');
      setTimeout(() => {
        setCopyIcon('copy-link.svg');
      }, 1000);
    }
  }, [isCopied]);

  return (
    <Tooltip
      arrow
      placement="bottom"
      title={isCopied ? 'Copied' : 'Copy'}
      onMouseOut={() => setIsCopied(false)}
    >
      <div css={styles.iconContainer} onClick={handleClick}>
        <Image
          src={`/images/icons/button/${copyIcon}`}
          width={30}
          height={30}
          alt="copy"
          css={styles.icon}
          className="icon"
        />
      </div>
    </Tooltip>
  );
};

export default LinkCopyButton;
