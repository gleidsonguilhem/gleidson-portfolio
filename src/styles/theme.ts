import { createTheme } from "@mui/material/styles";

//Theme
export const getTheme = (mode: 'light' | 'dark') => 
    createTheme({
        palette: {
            mode,
            primary: {
                main: '#1976d2',
            },
            background: {
                default: mode === 'light' ? '#f4f4f4' : '#121212',
                paper: mode === 'light' ? '#fff' : '#1e1e1e',
            },
        },
    });
