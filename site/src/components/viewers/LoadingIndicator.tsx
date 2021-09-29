import React, { FC } from 'react';
import { Box } from 'theme-ui';

/**
 * Display a 'loading..' flex box
 */
export const LoadingIndicator: FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      p: 3,
    }}
  >
    loading...
  </Box>
);
