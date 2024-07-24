import { Stop } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import DOMPurify from 'isomorphic-dompurify';
import React from 'react';

interface InfoBoxDarkModeProps {
  title: string;
  description: string[];
  titleColor?: string;

  borderColor?: string;
}

const InfoBoxDarkMode: React.FC<InfoBoxDarkModeProps> = ({
  title,
  description,
  titleColor,
  borderColor,
}) => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        paddingX={{ xs: 2 }}
        paddingY={{ xs: 1 }}
        sx={{
          borderTop: borderColor
            ? `1px solid ${borderColor}`
            : `1px solid ${theme.palette?.PCLab?.tertiary?.default}`,
          borderRight: borderColor
            ? `1px solid ${borderColor}`
            : `1px solid ${theme.palette?.PCLab?.tertiary?.default}`,
          borderLeft: borderColor
            ? `1px solid ${borderColor}`
            : `1px solid ${theme.palette?.PCLab?.tertiary?.default}`,
        }}
      >
        <Typography variant="h7" color={titleColor}>
          {title}
        </Typography>
      </Box>
      <Box
        paddingX={{ xs: 2 }}
        paddingY={{ xs: 1 }}
        display="flex"
        flexDirection="column"
        gap={1}
        sx={{
          border: borderColor
            ? `1px solid ${borderColor}`
            : `1px solid ${theme.palette?.PCLab?.tertiary?.default}`,
        }}
      >
        {description.length > 1 ? (
          description.map((item, idx) => (
            <Box display="flex" alignItems="flex-start" key={idx} gap={1}>
              <Stop
                sx={{
                  width: '15px',
                  color: theme?.palette?.PCLab?.neutral?.grey,
                }}
              />
              <Typography
                key={idx}
                variant="body2"
                color={theme.palette.PCLab?.neutral?.white}
                textAlign="left"
                sx={{
                  fontWeight: 400,
                }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item),
                }}
              />
            </Box>
          ))
        ) : (
          <Typography
            variant="body2"
            color={theme.palette.PCLab?.neutral?.white}
            sx={{
              fontWeight: 400,
              textAlign: 'left',
            }}
          >
            {description[0]}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default InfoBoxDarkMode;
