// theme.js
import { createTheme } from '@mui/material/styles';
import '@fontsource/space-mono'; // Digital-style font

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00FFB3', // neon teal
            contrastText: '#000000',
        },
        secondary: {
            main: '#39FF14', // bright green
            contrastText: '#000000',
        },
        background: {
            default: '#0F0F0F',
            paper: '#1A1A1A',
        },
        text: {
            primary: '#E0E0E0',
            secondary: '#8C8C8C',
        },
        divider: '#2D2D2D',
        success: { main: '#1AFF1A' },
        error: { main: '#FF4C4C' },
        warning: { main: '#FF9900' },
        info: { main: '#1E90FF' },
    },
    typography: {
        fontFamily: "'Space Mono', 'Courier New', monospace",
        fontSize: 14,
        h6: { fontWeight: 600 },
        body1: { fontSize: '0.95rem' },
    },
    shape: {
        borderRadius: 6,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1A1A1A',
                    boxShadow: '0 0 12px rgba(0,255,180,0.1)',
                },
            },
        },
    },
});

export default theme;
