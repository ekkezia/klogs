import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
} from '@mui/material';
import theme from '../../../styles/theme';

const Root = styled(Accordion)(() => ({
  boxShadow: 'none',
  background: 'none',
  border: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
  // borderBottom: `1px solid ${theme?.palette?.PCLab?.tertiary?.default}`,
  '& .MuiPaper': {
    borderRadius: 0,
  },
}));
const Summary = styled(AccordionSummary)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  border: 'none',
  padding: 0,
  '& .Mui-expanded': {
    '.MuiAccordionSummary-expandIconWrapper': {
      background: theme?.palette?.PCLab?.primary?.default,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: `${theme.spacing(0)} ${theme.spacing(2)}`,
      margin: 0,
    },
  },
  '& .MuiAccordionSummary-content': {
    width: '100%',
    height: '100%',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    background: theme?.palette?.PCLab?.tertiary?.default,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `${theme.spacing(0)} ${theme.spacing(2)}`,
    margin: 0,
  },
}));
const Details = styled(AccordionDetails)(({ theme }) => ({
  boxShadow: 'none',
  background: 'none',
}));

const CustomAccordion = {
  Root,
  Summary,
  Details,
};

export default CustomAccordion;
