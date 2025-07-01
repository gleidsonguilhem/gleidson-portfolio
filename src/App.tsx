import { Box } from '@mui/material';
import { Container, Typography, Stack, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import '../src/styles/App.css';

type Props = {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

export default function App ({ toggleTheme, mode }: Props) {
  return (
      <div className='container'>
        <Box textAlign='center' >
        <Typography variant="h3" component="h1">Gleidson Guilhem</Typography>
        <Typography variant="h6" color="text.secondary">
          Full‑Stack Developer · Java/Spring · JavaScript
        </Typography>
        <IconButton onClick={toggleTheme} sx={{ mt: 1 }}>
          <Brightness4Icon />
        </IconButton>
      </Box>
    </div>
  );
}
