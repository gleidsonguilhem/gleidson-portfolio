import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '../src/styles/theme';
import JavaProjects from './features/projects/pages/JavaProjects';
import ProficiencySection from './components/ProficiencySection';
import '../src/styles/index.css';
import { useEffect } from 'react';
import { Box, Container, Stack } from '@mui/material'

const Root = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box>
      <Container maxWidth="md" >
        <Stack spacing={4} alignItems="center">
          <App toggleTheme={toggleTheme} mode={mode} />
          <JavaProjects />
          <ProficiencySection />
        </Stack>
      </Container>
    </Box>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);