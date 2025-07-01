import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

import ProjectCard from "../components/ProjectCard";  // <-- import the reusable card here

const projects = [
  {
    title: "Task Manager API",
    description:
      "A RESTful API built with Spring Boot to manage tasks. Includes CRUD operations, Spring Data JPA, and optional user login.",
    tags: ["Java", "Spring Boot", "REST", "MySQL"],
    github: "https://github.com/gleidsonguilhem/springboot-todo-api",
    liveDemo: "https://your-deployment-link.com",
  },
  // Add more projects here later as needed
];

export default function JavaProjects() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fafafa",
        borderRadius: 5
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: theme.palette.text.primary,
          mb: 3,
          textAlign: "center",
        }}
      >
        Java Projects
      </Typography>
      <Grid container spacing={4}>
        {Array.isArray(projects) && projects.map((project) => (
          <Grid>
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.tags}
              githubUrl={project.github}
              liveDemoUrl={project.liveDemo}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}