/** @jsxImportSource @emotion/react */
// @ts-nocheck
import { css } from '@emotion/react';
import React, { useContext } from 'react';
import Image from 'next/image';
import { useTheme } from '@mui/material';
import { MouseContext } from '@/contextStore/mouse-context';

const MouseSwitch: React.FC<IMouseSwitchProps> = () => {
  const { setShowMouse } = useContext(MouseContext);
  const theme = useTheme();
  const styles = {
    container: css`
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      filter: ${theme?.palette?.PCLab?.primary?.defaultFilter};
      &:hover {
        filter: ${theme?.palette?.PCLab?.primary?.lighterFilter};
      }
    `,
  };

  return (
    <div css={styles.container} onClick={setShowMouse}>
      <Image
        src={`/images/icons/mouse-switch/mouse-switch.svg`}
        width={20}
        height={20}
        alt="mouse switch"
      />
    </div>
  );
};

export default MouseSwitch;
