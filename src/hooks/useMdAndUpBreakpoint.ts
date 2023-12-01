import { useMediaQuery, useTheme } from '@mui/material';

export const useMdAndUpBreakpoint = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return matches;
};
