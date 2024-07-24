/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Box, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import ContentBox from '../../atoms/box/content-box.component';
import ScrollTriggerBox from '../../atoms/box/scroll-trigger-box.component';
import { useRouter } from 'next/navigation';

interface IAutoRoutingBox {
  index: number | string;
  url: string;
  background?: string;
  children: ReactNode;
}

const AutoRoutingBox: React.FC<IAutoRoutingBox> = ({
  index,
  url,
  background,
  children,
}) => {
  const theme = useTheme();
  const styles = {
    container: css`
      width: 100%;
      height: 50vh;
      padding: ${theme.spacing(2)};
      background: ${theme?.palette?.PCLab?.background?.primary};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    `,
  };

  const router = useRouter();

  const handleTrigger = () => {
    router.push(url);
    window.scrollTo({ top: 0, left: 0 });
  };

  // if box is SINGLE ITEM (not part of Grid)
  return (
    <ScrollTriggerBox index={index} handleTrigger={handleTrigger}>
      <ContentBox
        noBorderBottom
        mainContent={
          <Box css={styles.container}>
            <Typography
              variant="suptitle"
              color={theme?.palette?.PCLab?.text?.primary}
            >
              Scroll to Next
            </Typography>
            {children}
          </Box>
        }
      />
    </ScrollTriggerBox>
  );
};

export default AutoRoutingBox;
