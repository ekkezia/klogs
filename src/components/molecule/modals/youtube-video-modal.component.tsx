/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import YouTube from 'react-youtube';
import { Box, Modal } from '@mui/material';

type IFunction = (...args: any[]) => any;

interface IYoutubeVideoModalProps {
  videoId: string;
  open: boolean;
  onClose: IFunction;
}

const YouTubeVideoModal: React.FC<IYoutubeVideoModalProps> = ({
  videoId,
  open,
  onClose,
}) => {
  const styles = {
    modal: css`
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
      cursor: pointer;
    `,
  };

  if (!open) return null;

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box css={styles.modal} onClick={onClose}>
        <YouTube videoId={videoId} opts={opts} />
      </Box>
    </Modal>
  );
};

export default YouTubeVideoModal;
