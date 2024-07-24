import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { PRIVACY_POLICY_DATA } from './privacyPolicyData';
import DOMPurify from 'isomorphic-dompurify';
import ContentBox from '../../../atoms/box/content-box.component';

const PrivacyPolicyItems: React.FC = () => {
  const theme = useTheme();
  return (
    <section>
      {PRIVACY_POLICY_DATA.items.map(({ title, text }, index) => {
        return (
          <ContentBox
            key={index}
            mainContent={
              <>
                <Typography
                  variant="h6"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(title),
                  }}
                  color={theme?.palette?.PCLab?.primary?.default}
                  padding={{ xs: 1, sm: 2 }}
                  borderBottom={`1px solid ${theme?.palette?.PCLab?.tertiary?.default}`}
                />
                {text.map((p, index) => {
                  return (
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(p),
                      }}
                      padding={{ xs: 1, sm: 2 }}
                      key={index}
                    />
                  );
                })}
              </>
            }
          />
        );
      })}
    </section>
  );
};

export default PrivacyPolicyItems;
