// /src/components/RightPanel.jsx
import React, { useState } from 'react';
import { Box, Typography, IconButton, Paper, TextField, Button, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function RightPanel({ type, onClose, onSave, availableNodes, gherkinData }) {
    const isForm = type === 'node' || type === 'relation';
    const isGherkin = type === 'gherkin';

    // Form state inside RightPanel now
    const [formData, setFormData] = useState({
        name: '',
        from: null,
        to: null,
        action: '',
        expect: ''
    });

    const handleChange = (key, value) => {
        setFormData(prev => {
            const newState = { ...prev, [key]: value };

            if (key === 'type' && value === 'changes') {
                newState.action = 'changes'; // default/locked action
            } else if (key === 'type' && value === 'holds') {
                newState.action = ''; // allow user to choose
            }

            return newState;
        });
    };

    const handleSubmit = () => {
        if (type === 'node') {
            onSave({ name: formData.name, type: formData.type }); // type can be optional
        } else if (type === 'relation') {
            if (!formData.from || !formData.to || !formData.type) {
                alert('Please fill all required fields');
                return;
            }
            onSave({ from: formData.from.name, to: formData.to.name, type: formData.type, action: formData.action });
        }
        setFormData({ name: '', from: null, to: null, type: '', action: '' });
    };

    const toOptions = availableNodes.filter(n => n !== formData.from);

    const renderScenarioText = (text) => {
        const lines = text.split('\n');
        const scenarioTitle = lines[0].replace(/_/g, ' ').trim();
        const steps = lines.slice(1).map((line) => {
            const formattedLine = line.replace(/(\w+(_\w+)+)/g, match =>
                `"${match.replace(/_/g, ' ')}"`
            );
            return formattedLine.trim();
        });

        return (
            <>
                <Typography sx={{ color: '#0099FF', fontWeight: 'bold', mb: 1 }}>
                    {scenarioTitle}
                </Typography>
                <ul style={{ paddingLeft: '1.5em', marginTop: 0, marginBottom: '1.5em', color: '#00FFB3' }}>
                    {steps.map((step, i) => (
                        <li key={i} style={{ marginBottom: '4px', fontFamily: 'Space Mono' }}>{step}</li>
                    ))}
                </ul>
            </>
        );
    };


    return (
        <Box
            sx={{
                width: '25%',
                maxHeight: '100%',
                backgroundColor: '#1A1A1A',
                borderLeft: '1px solid #00FFB3',
                boxShadow: '-6px 0 20px rgba(0, 255, 179, 0.1)',
                color: '#00FFB3',
                fontFamily: 'Space Mono',
                overflowY: 'auto',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                    {isForm ? (type === 'node' ? 'Add Node' : 'Add Relation') : 'Gherkin Scenarios'}
                </Typography>
                <IconButton sx={{ color: '#00FFB3' }} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {isForm && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        height: '100%',
                        backgroundColor: '#1A1A1A',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        color: '#E0E0E0',
                        fontFamily: 'Space Mono',
                        borderRadius: 0,
                        boxShadow: 'inset 0 0 8px rgba(0,255,179,0.1)',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                        {type === 'node' ? (
                            <>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={e => handleChange('name', e.target.value)}
                                    InputProps={{ style: { color: '#00FFB3' } }}
                                    InputLabelProps={{ style: { color: '#8C8C8C' } }}
                                />
                                <Autocomplete
                                    fullWidth
                                    options={['Input', 'Value', 'Button', 'Dropdown']}
                                    value={formData.type}
                                    onChange={(e, newValue) => handleChange('type', newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Type (optional)"
                                            variant="outlined"
                                            InputLabelProps={{ style: { color: '#8C8C8C' } }}
                                            InputProps={{
                                                ...params.InputProps,
                                                style: { color: '#00FFB3' },
                                            }}
                                        />
                                    )}
                                />
                            </>
                        ) : (
                            <>
                                <Autocomplete
                                    fullWidth
                                    options={availableNodes}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={formData.from}
                                    onChange={(e, newValue) => handleChange('from', newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="From"
                                            variant="outlined"
                                            InputLabelProps={{ style: { color: '#8C8C8C' } }}
                                            InputProps={{
                                                ...params.InputProps,
                                                style: { color: '#00FFB3' },
                                            }}
                                        />
                                    )}
                                />
                                <Autocomplete
                                    fullWidth
                                    options={toOptions}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={formData.to}
                                    onChange={(e, newValue) => handleChange('to', newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="To"
                                            variant="outlined"
                                            InputLabelProps={{ style: { color: '#8C8C8C' } }}
                                            InputProps={{
                                                ...params.InputProps,
                                                style: { color: '#00FFB3' },
                                            }}
                                        />
                                    )}
                                />
                                <Autocomplete
                                    fullWidth
                                    options={['holds', 'changes']}
                                    value={formData.type}
                                    onChange={(e, newValue) => handleChange('type', newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Type"
                                            variant="outlined"
                                            InputLabelProps={{ style: { color: '#8C8C8C' } }}
                                            InputProps={{
                                                ...params.InputProps,
                                                style: { color: '#00FFB3' },
                                            }}
                                        />
                                    )}
                                />
                                <Autocomplete
                                    fullWidth
                                    options={['click', 'fill', 'hover']}
                                    value={formData.action}
                                    onChange={(e, newValue) => handleChange('action', newValue)}
                                    disabled={formData.type === 'changes'}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Action"
                                            variant="outlined"
                                            InputLabelProps={{ style: { color: '#8C8C8C' } }}
                                            InputProps={{
                                                ...params.InputProps,
                                                style: { color: '#00FFB3' },
                                            }}
                                        />
                                    )}
                                />
                            </>
                        )}
                    </Box>

                    <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button onClick={onClose} sx={{ color: '#8C8C8C' }}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor: '#00FFB3',
                                color: '#000',
                                '&:hover': {
                                    backgroundColor: '#1AFFA3',
                                },
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Paper>
            )}

            {isGherkin && (
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {gherkinData.map((scenario, index) => (
                        <Box key={index} sx={{ mb: 3 }}>
                            {renderScenarioText(scenario)}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
