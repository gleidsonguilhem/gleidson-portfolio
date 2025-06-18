import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { Code as CodeIcon, Launch as LaunchIcon } from "@mui/icons-material";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveDemoUrl: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  liveDemoUrl,
}: ProjectCardProps) {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 4px 20px rgba(255,255,255,0.05)"
            : "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor:
          theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 10px 30px rgba(255,255,255,0.12)"
              : "0 10px 30px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, minHeight: 60 }}>
          {description}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" color="primary" />
          ))}
        </Box>
      </CardContent>

      <Box
        sx={{
          alignContent: 'center',
          display: "flex",
          gap: 2,
          p: 2,
          borderTop: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.12)"
              : "rgba(0,0,0,0.08)"
          }`,
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          href={githubUrl}
          startIcon={<CodeIcon />}
          target="_blank"
          rel="noopener noreferrer"
        >
          Code
        </Button>

        <Button
          variant="contained"
          size="small"
          href={liveDemoUrl}
          startIcon={<LaunchIcon />}
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo
        </Button>
      </Box>
    </Card>
  );
}