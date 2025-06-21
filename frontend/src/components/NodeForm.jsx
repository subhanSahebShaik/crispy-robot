import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function NodeForm({ onSave, onClose }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = () => {
    onSave({ name, type });
    setName('');
    setType('');
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Add Node</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        margin="normal"
      />
      <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
      </Box>
    </Paper>
  );
}
