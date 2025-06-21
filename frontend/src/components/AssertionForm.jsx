// components/AssertionForm.js
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

export default function AssertionForm({ onSave, onClose }) {
  const [expectation, setExpectation] = useState('');

  const handleSubmit = () => {
    onSave({ expectation });
    setExpectation('');
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Add Assertion</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <TextField
        fullWidth
        label="Expectation"
        value={expectation}
        onChange={(e) => setExpectation(e.target.value)}
        margin="normal"
      />

      <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
      </Box>
    </Paper>
  );
}
