import React from 'react';
import ContentBox from '../../../components/atoms/box/content-box.component';
import { Grid, Typography, useTheme } from '@mui/material';
import { CONTACT_US_DATA } from '../../../components/template/about/contact-us/contactUsData';
import CustomHead from '../../../components/organism/custom-head/custom-head.component';
import SingleRowBox from '../../../components/atoms/box/single-row-box.component';
import ContactUsFormikForm from '../../../components/template/about/contact-us/contact-us-form-formik.component';

const ContactUsPage: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <CustomHead
        title="Contact Us | ParallelChain Lab"
        metaTitle="Contact ParallelChain Lab"
        content="Contact us for product, service, and collaboration enquiries. ParallelChain Lab is headquartered in Singapore, but it operates everywhere."
        metaKeywords="Contact ParallelChain, Customer Support, Client, Solution, Demo, IT consultancy, Submit"
      />
      <ContentBox
        mainContent={
          <Grid container>
            <Grid
              item
              xs={12}
              md={5}
              borderRight={`1px solid ${theme.palette.PCLab?.tertiary?.default}`}
            >
              <SingleRowBox padded>
                <Typography variant="h2">Contact Us</Typography>
              </SingleRowBox>
              <SingleRowBox padded>
                <a href={`mailto:${CONTACT_US_DATA.email}`}>
                  <Typography variant="link">
                    {CONTACT_US_DATA.email}
                  </Typography>
                </a>
              </SingleRowBox>
              <SingleRowBox padded>
                <a href={`tel:${CONTACT_US_DATA.phone}`}>
                  <Typography variant="link">
                    {CONTACT_US_DATA.phone}
                  </Typography>
                </a>
              </SingleRowBox>
            </Grid>
            <Grid item xs={12} md={7}>
              <SingleRowBox padded>
                <Typography variant="h2">Inquiry</Typography>
              </SingleRowBox>
              <ContactUsFormikForm />
            </Grid>
          </Grid>
        }
      />
    </>
  );
};

export default ContactUsPage;
