// components/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HubIcon from '@mui/icons-material/Hub';

export default function Header({ onSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (type) => {
    handleClose();
    onSelect(type);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HubIcon /> Test Developer
        </Typography>
        <IconButton color="inherit" onClick={handleOpen}>
          <AddIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleSelect('node')}>Add Node</MenuItem>
          <MenuItem onClick={() => handleSelect('relation')}>Add Relation</MenuItem>
          <MenuItem onClick={() => handleSelect('assertion')}>Add Assertion</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
