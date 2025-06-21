// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1F2937',
        },
        primary: {
            main: '#3B82F6',
        },
        secondary: {
            main: '#10B981',
        },
        text: {
            primary: '#F9FAFB',
            secondary: '#9CA3AF',
        },
    },
});

export default theme;
