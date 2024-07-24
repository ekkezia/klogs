/** @jsxImportSource @emotion/react */
import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

const Light = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ tooltip: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme?.palette?.PCLab?.background?.primary,
  },
}));

const CustomTooltip = {
  Light,
};
export default CustomTooltip;
