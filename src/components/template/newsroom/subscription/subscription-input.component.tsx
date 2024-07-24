import React, { useState } from 'react';
import ContentBox from '../../../../atoms/box/content-box.component';
import {
  Box,
  Checkbox,
  Grid,
  Input,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import subscriptionImage from '../../../../../../public/images/icons/newsroom/subscription.png';
import CustomButton from '../../../../atoms/buttons/custom-button.component';
import { enrollSubscriber } from '../../../../../api-service/newsroom';
import { shake } from '../../../../../styles/animation';

// interface SubscriptionInputProps {}
const SubscriptionInput: React.FC = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('Input your email address');
  const [checkboxErrorMsg, setCheckboxErrorMsg] = useState('');

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (buttonDisabled) {
      setErrorMsg('Input your email address');
      setCheckboxErrorMsg('Please check the box to give consent');
      return;
    } else {
      setCheckboxErrorMsg('');
    }
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      setEmail('');
      setErrorMsg('Please input a valid email');
    } else if (email.length === 0) {
      setErrorMsg('Input your email address');
    } else {
      await enrollSubscriber({ email: email })
        .then(() => {
          setErrorMsg('Subscription successfully sent!');
          setEmail('');
          setButtonDisabled(true);
        })
        .catch(() => {
          setErrorMsg('Input your email address');
          setCheckboxErrorMsg(
            'Oops! Something went wrong, please input your email again!',
          );
        });
    }
  };

  const styledInput = {
    width: '100%',
    fontFamily: 'Barlow',
    fontSize: '14px',
    fontWeight: 400,
    textTransform: 'none',
    lineHeight: '120%',
    paddingLeft: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.PCLab?.tertiary?.default}`,
    border:
      errorMsg === 'Input your email address'
        ? ''
        : errorMsg === 'Subscription successfully sent!'
        ? `1px solid ${theme.palette.PCLab?.success?.default}`
        : `1px solid ${theme.palette.PCLab?.error?.default}`,
    '& input': {
      '::placeholder': {
        color:
          errorMsg === 'Input your email address'
            ? 'inherit'
            : errorMsg === 'Subscription successfully sent!'
            ? theme.palette.PCLab?.success?.default
            : theme.palette.PCLab?.error?.default,
      },
      animation: `${errorMsg === 'Input your email address' ? shake : ''} 0.5s`,
    },
  };

  const StyledTypography = styled(Typography)(({ theme }) => ({
    paddingLeft: theme.spacing(1),
  }));

  const StyledErrorTypography = styled(Typography)(({ theme }) => ({
    // paddingLeft: theme.spacing(1),
    padding: 0,
    color: theme.palette.PCLab?.error?.default,
  }));

  const StyledGrid = styled(Grid)(({ theme }) => ({
    padding: `${theme.spacing(1)} ${theme.spacing(2)} ${theme.spacing(
      1,
    )} ${theme.spacing(1)}`,
  }));

  return (
    <ContentBox
      noBorderBottom
      mainContent={
        <Box>
          <form
            onSubmit={handleSubmit}
            style={{ width: '100%', display: 'flex' }}
          >
            <Box
              borderRight={`1px solid ${theme.palette.PCLab?.tertiary?.default}`}
              borderBottom={`1px solid ${theme.palette.PCLab?.tertiary?.default}`}
              display="flex"
              alignItems="center"
            >
              <Image
                src={subscriptionImage}
                width={40}
                height={40}
                priority
                placeholder="blur"
                blurDataURL={`data:image.png`}
                alt="Subscribe"
              />
            </Box>
            <Input
              error={true}
              placeholder={errorMsg}
              disableUnderline={true}
              sx={styledInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomButton
              fitContent
              variant="primary"
              disabled={buttonDisabled}
              // action={handleSubmit}
            >
              Submit
            </CustomButton>
          </form>
          <StyledGrid container>
            <Grid item md={12} display="flex">
              <Checkbox
                checked={!buttonDisabled}
                onChange={() => {
                  setButtonDisabled(!buttonDisabled);
                  setCheckboxErrorMsg('');
                }}
                style={{
                  color: theme?.palette?.PCLab?.text?.secondary,
                }}
              />
              <StyledTypography
                variant="body3"
                color={theme?.palette?.PCLab?.text?.secondary}
              >
                I consent to receive commercial information in the form of a
                newsletter with the email address provided to ParallelChain Lab.
                Your consent is voluntary, and you may unsubscribe anytime.
              </StyledTypography>
            </Grid>
            <Grid item>
              <StyledErrorTypography variant="body3">
                {checkboxErrorMsg}
              </StyledErrorTypography>
            </Grid>
          </StyledGrid>
        </Box>
      }
    />
  );
};

export default SubscriptionInput;
