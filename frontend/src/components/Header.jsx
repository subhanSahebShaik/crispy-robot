// /src/components/Header.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HubIcon from '@mui/icons-material/Hub';

export default function Header({ onSelect, onGherkinView }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (type) => {
    handleClose();
    onSelect(type);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#0f0f0f',
        borderBottom: '2px solid #00ffb3',
        boxShadow: '0 0 10px rgba(0, 255, 179, 0.2)',
        height: '10%'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HubIcon sx={{ color: '#00ffb3' }} />
          <Typography
            variant="h6"
            sx={{
              color: '#00ffb3',
              fontFamily: 'Space Mono, monospace',
              textShadow: '0 0 5px #00ffb3',
            }}
          >
            Test Developer
          </Typography>
        </Box>

        {/* Right: Show Gherkin + Add */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ color: '#00ffb3' }} onClick={onGherkinView}>
            <Typography sx={{ fontSize: '0.9rem', fontFamily: 'Space Mono' }}>Gherkin</Typography>
          </IconButton>

          <IconButton sx={{ color: '#00ffb3' }} onClick={handleOpen}>
            <AddIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: '#1a1a1a',
              border: '1px solid #00ffb3',
              boxShadow: '0 0 12px rgba(0,255,179,0.3)',
            },
          }}
        >
          <MenuItem
            onClick={() => handleSelect('node')}
            sx={{
              color: '#00ffb3',
              fontFamily: 'Space Mono, monospace',
              '&:hover': {
                backgroundColor: '#0f0f0f',
                color: '#39ff14',
              },
            }}
          >
            + Node
          </MenuItem>
          <MenuItem
            onClick={() => handleSelect('relation')}
            sx={{
              color: '#00ffb3',
              fontFamily: 'Space Mono, monospace',
              '&:hover': {
                backgroundColor: '#0f0f0f',
                color: '#39ff14',
              },
            }}
          >
            + Relation
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar >
  );
}
