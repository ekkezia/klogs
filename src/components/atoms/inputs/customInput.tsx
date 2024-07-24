import React, { FC } from 'react';
import {
  Box,
  FormLabel,
  Grid,
  Input,
  TextField,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { FieldInputProps, FieldMetaProps } from 'formik';

const StyledInput = styled(Input)(({ theme }) => ({
  width: '100%',
  fontFamily: 'Barlow',
  fontSize: '16px',
  fontWeight: 400,
  textTransform: 'none',
  lineHeight: '120%',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
}));
const StyledTitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
}));
const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  width: 'fit-content',
  fontFamily: 'Barlow',
  fontSize: '14px !important',
  fontWeight: 600,
  textTransform: 'uppercase',
  lineHeight: '120%',
}));

interface CustomInputProps {
  field: FieldInputProps<string>;
  meta: FieldMetaProps<string>;
  borderRight?: boolean;
  label: string;
  multiline?: boolean;
  testId?: string;
}

const CustomInput: FC<CustomInputProps> = ({
  field,
  meta,
  borderRight,
  label,
  multiline,
  testId,
}) => {
  const theme = useTheme();

  return (
    <Grid container display="flex" flexDirection="column">
      <Grid item>
        <StyledTitleBox
          sx={{
            borderRight: borderRight
              ? `1px solid ${theme.palette.PCLab?.tertiary?.default}`
              : '',
          }}
        >
          <StyledFormLabel htmlFor={label}>{label}</StyledFormLabel>
          {meta.touched && meta.error && (
            <Typography
              variant="h7"
              color={theme?.palette?.PCLab?.error?.default}
            >
              Invalid
            </Typography>
          )}
        </StyledTitleBox>
      </Grid>
      <Grid
        item
        sx={{
          border:
            meta.touched && meta.error
              ? `1px solid ${theme?.palette?.PCLab?.error?.default}`
              : '',
          borderRight:
            meta.touched && meta.error
              ? `1px solid ${theme?.palette?.PCLab?.error?.default}`
              : borderRight
              ? `1px solid ${theme.palette.PCLab?.tertiary?.default}`
              : '',
          borderTop:
            meta.touched && meta.error
              ? `1px solid ${theme?.palette?.PCLab?.error?.default}`
              : `1px solid ${theme.palette.PCLab?.tertiary?.default}`,
          borderBottom:
            meta.touched && meta.error
              ? `1px solid ${theme?.palette?.PCLab?.error?.default}`
              : `1px solid ${theme.palette.PCLab?.tertiary?.default}`,
          ...(meta.touched &&
            !meta.error && {
              '&:focus-within': {
                borderBottom: `1px solid ${theme.palette.PCLab?.primary?.lighter}`,
              },
            }),
        }}
      >
        <StyledInput
          disableUnderline
          multiline
          data-testid={testId}
          {...field} // Spread the field props from Formik
        />
      </Grid>
    </Grid>
  );
};

export default CustomInput;
