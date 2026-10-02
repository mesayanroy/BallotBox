import React from 'react';
import { Box } from '@mui/material';

/** The Maao "M" mark, used next to the wordmark in the header and footer. */
export const BrandMark: React.FC<{ readonly inverted?: boolean; readonly size?: number }> = ({
  inverted = false,
  size = 30,
}) => (
  <Box
    component="img"
    src="/maao-logo.svg"
    alt=""
    aria-hidden
    sx={{
      width: size,
      height: size,
      display: 'block',
      borderRadius: '22%',
      boxShadow: inverted ? '0 0 0 1px rgba(238, 240, 255, 0.18)' : '0 2px 8px rgba(16, 19, 43, 0.18)',
      transition: 'box-shadow 0.35s',
    }}
  />
);
