import React from 'react';
import Masonry from '@mui/lab/Masonry';
import { Box, Paper } from '@mui/material';
import './Gallery.css';
import XContainer from '../../components/Container/XContainer';
import YContainer from '../../components/Container/YContainer';

const sampleImages = [
 "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
 "https://images.unsplash.com/photo-1616690710400-a16d146927c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNha2VzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1654851364020-3120600ee043?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNha2VzfGVufDB8fDB8fHww",
 "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
 "https://images.unsplash.com/photo-1616690710400-a16d146927c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNha2VzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1654851364020-3120600ee043?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNha2VzfGVufDB8fDB8fHww",
 "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
 "https://images.unsplash.com/photo-1616690710400-a16d146927c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNha2VzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1654851364020-3120600ee043?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNha2VzfGVufDB8fDB8fHww",
 "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
 "https://images.unsplash.com/photo-1616690710400-a16d146927c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNha2VzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1654851364020-3120600ee043?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNha2VzfGVufDB8fDB8fHww",
 "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
 "https://images.unsplash.com/photo-1616690710400-a16d146927c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNha2VzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1654851364020-3120600ee043?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNha2VzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNha2VzfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1654851364020-3120600ee043?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNha2VzfGVufDB8fDB8fHww",
];

const Gallery = () => {
  const items = Array.from({ length: 10 }, (_, i) => i);

  return (
    <XContainer>
      <YContainer>
        <Box sx={{ width: '100%', paddingY: 4 }}>
          <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
  {sampleImages.map((src, index) => (
    <Paper
      key={index}
      elevation={3}
      sx={{
        overflow: 'hidden',
        borderRadius: '10px',
        p: 0,
      }}
    >
      <img
        src={src}
        alt={`Gallery item ${index + 1}`}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </Paper>
  ))}
</Masonry>

        </Box>
      </YContainer>
    </XContainer>
  );
};

export default Gallery;
