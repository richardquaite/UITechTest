import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export const PageTitle = ({ children }: PropsWithChildren) => {
  return (
    <Typography variant="h4" component="h1">
      {children}
    </Typography>
  );
};
