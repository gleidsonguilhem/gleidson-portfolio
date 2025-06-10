
import { Container, Typography, Stack, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type Props = {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

export default function App ({ toggleTheme, mode }: Props) {
  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="flex-end">
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Stack>
      <Typography variant="h3" align="center" gutterBottom>
        Hello, Gleidson!
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary">
        Full-Stack Developer · Java Spring Boot Microservices · Tech Explorer
      </Typography>
    </Container>
  );
}


/*
const App = () => {
  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Stack spacing={4} alignItems="center">
        <Avatar
          alt="Gleidson Guilhem"
          src="/profile.jpg"
          sx={{ width: 120, height: 120 }}
        />
        <Typography variant="h3" align="center" fontWeight="bold">
          Gleidson Guilhem
        </Typography>
        <Typography variant="h6" align="center" color="text.white">
          Full-Stack Developer · Java Spring Boot Microservices · Cloud & DevOps Learner
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            href="mailto:gleidson@example.com"
            sx={{ mr: 2 }}
          >
            Contact Me
          </Button>
          <Button variant="outlined" href="/resume.pdf" target="_blank">
            View Resume
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default App;
*/