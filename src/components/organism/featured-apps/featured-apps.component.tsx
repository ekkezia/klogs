/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { APPS_INDEX } from '../../template/vertical-solutions/overview/overviewData';
import BlockLink from '../../atoms/utils/blocklink.component';

interface IFeaturedApps {
  darkMode?: boolean;
  apps: string[];
}
const FeaturedApps: React.FC<IFeaturedApps> = ({ darkMode, apps }) => {
  const theme = useTheme();
  const styles = {
    container: css`
      background: ${darkMode
        ? theme?.palette?.PCLab?.neutral?.grey
        : theme?.palette?.PCLab?.tertiary?.default};
      width: fit-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      // flex-wrap: wrap;
      gap: ${theme.spacing(2)};
      border-radius: 200px;
      padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
      // @media (max-width: 600px) {
      //   flex-direction: column;
      //   align-items: flex-start;
      // }
    `,
    logosContainer: css`
      display: flex;
      gap: ${theme.spacing(0.5)};
      @media (max-width: 600px) {
        gap: ${theme.spacing(1)};
      }
    `,
    logoContainer: css`
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: ${theme?.palette?.PCLab?.background?.primary};
      border: 1px solid
        ${darkMode
          ? theme?.palette?.PCLab?.neutral?.grey
          : theme?.palette?.PCLab?.tertiary?.default};
      box-shadow: 0px 3.2px 3.2px 0px rgba(0, 0, 0, 0.5) inset;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${theme.spacing(1)};
      @media (max-width: 600px) {
        padding: ${theme.spacing(0.7)};
        width: 30px;
        height: 30px;
      }
    `,
  };

  return (
    <Box css={styles.container}>
      <Typography
        variant="body2"
        fontWeight={600}
        textTransform="uppercase"
        paddingLeft={1}
        color={
          darkMode
            ? theme?.palette?.PCLab?.neutral?.white
            : theme?.palette?.PCLab?.neutral?.black
        }
        textAlign="center"
      >
        Featured Apps
      </Typography>
      <Box css={styles.logosContainer}>
        {apps.map((app) => (
          //@ts-ignore
          <div css={styles.logoContainer} key={app}>
            <BlockLink
              //@ts-ignore
              href={APPS_INDEX[app].href}
              //@ts-ignore
              center
            >
              <Image
                //@ts-ignore
                src={APPS_INDEX[app].logo}
                alt="eKYC-Chain Logo"
                width={100}
                height={100}
                priority
                placeholder="blur"
                blurDataURL="data:image.svg"
              />
            </BlockLink>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedApps;
