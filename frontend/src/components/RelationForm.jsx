// components/RelationForm.js
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

export default function RelationForm({ onSave, onClose }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = () => {
    onSave({ from, to, type });
    setFrom('');
    setTo('');
    setType('');
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Add Relation</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <TextField
        fullWidth
        label="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
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
