import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const QuantityStepper = ({ handleDecrement, handleIncrement, itemsQuantity }) => {
  return (
    <Box mt={3} display="flex" alignItems="center" gap={2}>
      <IconButton
        onClick={handleDecrement}
        sx={{
          border: '1px solid deeppink',
          color: 'deeppink',
          width: '36px',
          height: '36px',
        }}
      >
        <Remove />
      </IconButton>

      <Typography variant="h6" sx={{ minWidth: '20px', textAlign: 'center' }}>
        {itemsQuantity}
      </Typography>

      <IconButton
        onClick={handleIncrement}
        sx={{
          border: '1px solid deeppink',
          color: 'deeppink',
          width: '36px',
          height: '36px',
        }}
      >
        <Add />
      </IconButton>
    </Box>
  );
};

export default QuantityStepper;
