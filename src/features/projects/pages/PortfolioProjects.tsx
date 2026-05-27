import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import GlobalStyles from "@mui/material/GlobalStyles";
import { alpha, useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// ─────────────────────────────────────────────────────────────
// PROJECT DATA
// ─────────────────────────────────────────────────────────────
// This is the only section you need to edit to add new projects.
//
// Each project has:
//   title       — displayed as the node heading
//   description — short blurb shown in the node body
//   tags        — tech stack chips rendered at the bottom
//   color       — any hex color; drives the cup fill, icon ring,
//                 hover glow, and button accent for this node
//   brewMethod  — (optional) flavour label next to the title
//   github      — (optional) link shown as GitHub icon button
//   liveDemo    — (optional) link shown as external-link button
//
// TO ADD A NEW PROJECT:
//   1. Copy the commented-out object below the existing one.
//   2. Fill in the fields.
//   3. Pick a unique `color` hex so each node looks distinct.
// ─────────────────────────────────────────────────────────────
interface Project {
  title: string;
  description: string;
  tags: string[];
  color: string;
  brewMethod?: string;
  github?: string;
  liveDemo?: string;
}

const projects: Project[] = [
  // ── Project 1 ───────────────────────────────────────────────
  {
    title: "AI-Powered Browser Automation with Stagehand",
    description:
      "Built an AI-powered browser automation tool using Stagehand, Playwright, TypeScript, and Docker. The application executes web-based tasks through natural language instructions, enabling intelligent navigation, data extraction, and workflow automation.",
    tags: ["TypeScript",
            "Stagehand",
            "Playwright",
            "AI",
            "Docker",
            "Browser Automation",
            "LLM",
            "Web Automation"
          ],
    color: "#ff6d5a",
    brewMethod: "pour-over",
    github: "https://github.com/gleidsonguilhem/springboot-todo-api",
    liveDemo: "https://your-deployment-link.com",
  },

  // ── Add more projects here ───────────────────────────────────
  // {
  //   title: "Auth Service",
  //   description: "JWT-based authentication with Spring Security and OAuth2.",
  //   tags: ["Java", "Spring Security", "OAuth2", "JWT"],
  //   color: "#7b61ff",
  //   brewMethod: "espresso",
  //   github: "https://github.com/you/auth-service",
  //   liveDemo: "https://live-url.com",  // remove if no demo
  // },
];
// ─────────────────────────────────────────────────────────────
// END OF EDITABLE SECTION — rendering logic below
// ─────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────
// CSS KEYFRAME ANIMATIONS
// Injected once globally via MUI's GlobalStyles.
// Activates coffee fill + smoke when the node is hovered.
// ─────────────────────────────────────────────────────────────
const animationStyles = (
  <GlobalStyles
    styles={`
      @keyframes coffeeFill {
        0%   { transform: scaleY(0); opacity: 0; }
        60%  { opacity: 1; }
        100% { transform: scaleY(1); opacity: 1; }
      }
      @keyframes smokeRise {
        0%   { transform: translateY(0) scaleX(1);    opacity: 0; }
        20%  { opacity: 0.7; }
        100% { transform: translateY(-8px) scaleX(1.4); opacity: 0; }
      }
      @keyframes coffeePulse {
        0%, 100% { opacity: 0.85; }
        50%       { opacity: 1; }
      }
      .project-node:hover .coffee-fill {
        animation: coffeeFill 0.6s ease forwards,
                   coffeePulse 2s ease 0.6s infinite;
      }
      .project-node:hover .smoke-1 { animation: smokeRise 1.4s ease 0.5s infinite; }
      .project-node:hover .smoke-2 { animation: smokeRise 1.4s ease 0.8s infinite; }
      .project-node:hover .smoke-3 { animation: smokeRise 1.4s ease 1.1s infinite; }
    `}
  />
);


// ─────────────────────────────────────────────────────────────
// PAGE WRAPPER
// Uses theme tokens so the canvas background, text, and borders
// all respond correctly to light (#f4f4f4) and dark (#121212).
// ─────────────────────────────────────────────────────────────
export default function PortfolioProjects() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Canvas colors: dark mode keeps the n8n look; light mode uses
  // theme.background tokens so it feels native to your light theme.
  const canvasBg   = isDark ? "#1a1a2e" : theme.palette.background.default;
  const dotColor   = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <>
      {animationStyles}

      <Box
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          background: canvasBg,
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      >
        {/* Section label */}
        <Typography
          variant="overline"
          sx={{
            display: "block",
            // text.secondary adapts: muted dark in light mode, muted light in dark mode
            color: "text.secondary",
            letterSpacing: "0.12em",
            mb: 2.5,
            textAlign: "center",
          }}
        >
          Projects · workflow
        </Typography>

        {/* Render each project node, with a dashed connector between them */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {projects.map((project, i) => (
            <Box key={project.title}>
              <ProjectNode project={project} />
              {i < projects.length - 1 && <Connector />}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}


// ─────────────────────────────────────────────────────────────
// PROJECT NODE
// Layout: [port] [icon] [title + desc + tags] [buttons] [port]
// All colors reference the theme so they adapt to light/dark.
// ─────────────────────────────────────────────────────────────
function ProjectNode({ project }: { project: Project }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const c = project.color; // accent color — drives icon, hover glow, etc.

  // Node card background: dark uses a deep navy; light uses theme paper (#fff)
  const nodeBg = isDark ? "#252542" : theme.palette.background.paper;

  // Border: dark uses a faint white line; light uses MUI's theme divider
  const nodeBorder = isDark
    ? "rgba(255,255,255,0.08)"
    : theme.palette.divider;

  // Section dividers inside the node (icon separator, action separator)
  const innerDivider = isDark
    ? "rgba(255,255,255,0.06)"
    : theme.palette.divider;

  // Tag chip text and background: inverted per mode
  const tagBg   = isDark ? "rgba(255,255,255,0.07)" : alpha(theme.palette.text.primary, 0.06);
  const tagColor = isDark ? "rgba(255,255,255,0.5)"  : theme.palette.text.secondary;
  const tagBorder = isDark ? "rgba(255,255,255,0.1)" : theme.palette.divider;

  return (
    <Box
      className="project-node"
      sx={{
        display: "flex",
        alignItems: "stretch",
        borderRadius: "10px",
        background: nodeBg,
        border: `1px solid ${nodeBorder}`,
        overflow: "hidden",
        transition: "border-color 0.2s",
        "&:hover": { borderColor: alpha(c, 0.5) },
        "&:hover .node-port": {
          borderColor: c,
          background: alpha(c, 0.25),
        },
      }}
    >
      {/* Left connection port */}
      <Port isDark={isDark} />

      {/* ── Icon block ── */}
      <Box
        sx={{
          width: 56,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: `1px solid ${innerDivider}`,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "8px",
            background: alpha(c, 0.15),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          {/* Animated SVG coffee cup — color-matched to project accent */}
          <CoffeeCupIcon color={c} />
        </Box>
      </Box>

      {/* ── Node body: title, brew label, description, tags ── */}
      <Box sx={{ flex: 1, p: "12px 14px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          {/* Title uses text.primary — near-black in light, near-white in dark */}
          <Typography
            sx={{ fontSize: 13, fontWeight: 500, color: "text.primary" }}
          >
            {project.title}
          </Typography>
          {/* Optional brew method label */}
          {project.brewMethod && (
            <Typography
              sx={{
                fontSize: 9,
                color: "text.secondary",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              {project.brewMethod}
            </Typography>
          )}
        </Box>

        {/* Description uses text.secondary — muted in both modes */}
        <Typography
          sx={{
            fontSize: 11,
            color: "text.secondary",
            lineHeight: 1.55,
            mb: 1.25,
          }}
        >
          {project.description}
        </Typography>

        {/* Tech stack chips */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              className="project-tag"
              sx={{
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 500,
                background: tagBg,
                color: tagColor,
                border: `1px solid ${tagBorder}`,
                borderRadius: "4px",
                transition: "all 0.25s ease",

                ".project-node:hover &": {
                color: c,
                borderColor: alpha(c, 0.6),
                background: alpha(c, 0.12),
                boxShadow: `0 0 6px ${alpha(c, 0.4)}`,
              },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* ── Action buttons: GitHub + live demo ── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 0.75,
          px: 1.25,
          borderLeft: `1px solid ${innerDivider}`,
        }}
      >
        {/* GitHub button — only shown when github URL is provided */}
        {project.github && (
          <Tooltip title="Source" placement="left">
            <IconButton
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                width: 28,
                height: 28,
                borderRadius: "6px",
                background: alpha(theme.palette.text.primary, 0.05),
                border: `1px solid ${theme.palette.divider}`,
                color: "text.secondary",
                "&:hover": {
                  background: alpha(c, 0.15),
                  color: c,
                  borderColor: alpha(c, 0.4),
                },
              }}
            >
              <GitHubIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        )}

        {/* Live demo button — only shown when liveDemo URL is provided */}
        {project.liveDemo && (
          <Tooltip title="Live demo" placement="left">
            <IconButton
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                width: 28,
                height: 28,
                borderRadius: "6px",
                background: alpha(theme.palette.text.primary, 0.05),
                border: `1px solid ${theme.palette.divider}`,
                color: "text.secondary",
                "&:hover": {
                  background: alpha(c, 0.15),
                  color: c,
                  borderColor: alpha(c, 0.4),
                },
              }}
            >
              <OpenInNewIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Right connection port */}
      <Port isDark={isDark} />
    </Box>
  );
}


// ─────────────────────────────────────────────────────────────
// ANIMATED COFFEE CUP ICON
// SVG with a rising liquid fill and drifting smoke on hover.
// The fill, smoke, and outline all use the project's accent color.
// ─────────────────────────────────────────────────────────────
function CoffeeCupIcon({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      {/* Smoke wisps — float upward on hover via smokeRise keyframe */}
      <path className="smoke-1" d="M8 5 Q7 3 8 1"   stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0" />
      <path className="smoke-2" d="M11 4 Q10 2 11 0" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0" />
      <path className="smoke-3" d="M14 5 Q13 3 14 1" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0" />

      {/* Cup body outline */}
      <path
        d="M5 7 L6.5 18 Q6.6 19 7.5 19 L14.5 19 Q15.4 19 15.5 18 L17 7 Z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round" fill="none"
      />

      {/* Liquid fill — rises from bottom via coffeeFill keyframe on hover */}
      <clipPath id={`cup-clip-${color.replace("#", "")}`}>
        <path d="M5.3 7.5 L6.7 17.5 Q6.8 18.5 7.5 18.5 L14.5 18.5 Q15.2 18.5 15.3 17.5 L16.7 7.5 Z" />
      </clipPath>
      <rect
        className="coffee-fill"
        x="4" y="7" width="14" height="12"
        fill={color}
        opacity="0.85"
        clipPath={`url(#cup-clip-${color.replace("#", "")})`}
        style={{ transformOrigin: "bottom center", transform: "scaleY(0)" }}
      />

      {/* Cup handle */}
      <path d="M17 10 Q20 10 20 13 Q20 16 17 16" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" />

      {/* Saucer */}
      <line x1="4" y1="20.5" x2="18" y2="20.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────
// CONNECTION PORT
// Small dot on each side of the node mimicking n8n handles.
// Port background adapts: dark canvas color in dark, paper in light.
// ─────────────────────────────────────────────────────────────
function Port({ isDark }: { isDark: boolean }) {
  const theme = useTheme();

  // Port background should blend into the canvas behind the node
  const portBg = isDark ? "#1a1a2e" : theme.palette.background.default;

  return (
    <Box sx={{ width: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box
        className="node-port"
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          border: `1.5px solid ${theme.palette.divider}`,
          background: portBg,
          transition: "border-color 0.2s, background 0.2s",
        }}
      />
    </Box>
  );
}


// ─────────────────────────────────────────────────────────────
// CONNECTOR
// Dashed line with arrow between consecutive nodes.
// Uses theme divider so it's visible in both light and dark.
// ─────────────────────────────────────────────────────────────
function Connector() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", px: 2, height: 16 }}>
      <Box sx={{ flex: 1, borderTop: "1px dashed", borderColor: "divider" }} />
      <Box sx={{ fontSize: 8, color: "text.disabled", mx: 0.25 }}>▶</Box>
      <Box sx={{ flex: 1, borderTop: "1px dashed", borderColor: "divider" }} />
    </Box>
  );
}