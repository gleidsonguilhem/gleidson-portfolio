import { motion } from "framer-motion";
import ContactModal from '../features/contact/ContactModal.js';
import React, { useState } from "react";
import ContactForm from "../features/contact/components/ContactForm.js";
import { Box, Typography, Button, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

interface Skill {
  name: string;
  level: number;
  label: string;
  color?: string;
}

interface ProficiencySectionProps {
  skills?: Skill[];
}

// ✅ ADD NEW SKILLS HERE — just append to this array
const defaultSkills: Skill[] = [
  { name: "JavaScript",  level: 92, label: "",   color: "#f7df1e" },
  { name: "TypeScript",  level: 85, label: "",   color: "#3178c6" },
  { name: "React",       level: 88, label: "",   color: "#61dafb" },
  { name: "Node.js",     level: 78, label: "", color: "#68a063" },
  { name: "Spring Boot", level: 70, label: "", color: "#6db33f" },
  { name: "SQL",         level: 75, label: "", color: "#f29111" },
  { name: "Tailwind CSS",level: 82, label: "",   color: "#38bdf8" },
  { name: "n8n",         level: 90, label: "",   color: "#e535ab" },
  // { name: "GraphQL",  level: 60, label: "Familiar",   color: "#e535ab" },
];

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const neonColor = skill.color ?? '#534AB7';

  const cardBg     = theme.palette.background.paper;
  const cardBorder = theme.palette.mode === 'dark'
    ? 'rgba(255,255,255,0.1)'
    : 'rgba(0,0,0,0.12)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${neonColor}12` : cardBg,
        border: `1px solid ${hovered ? neonColor : cardBorder}`,
        borderRadius: 12,
        padding: '28px 50px',
        cursor: 'default',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered
          ? `0 0 12px ${neonColor}66, 0 0 28px ${neonColor}33`
          : 'none',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
        <Typography
          variant="body1"
          fontWeight={500}
          sx={{
            color: hovered ? neonColor : 'text.primary',
            transition: 'color 0.3s',
            fontSize: '0.95rem',
          }}
        >
          {skill.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: hovered ? neonColor : 'text.secondary',
            transition: 'color 0.3s',
            fontWeight: hovered ? 600 : 400,
            fontSize: '0.72rem',
            letterSpacing: '0.04em',
          }}
        >
          {skill.label}
        </Typography>
      </Box>

      {/* Track */}
      <Box
        sx={{
          width: '100%',
          height: 7,
          bgcolor: 'action.hover',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            borderRadius: 4,
            background: neonColor,
            boxShadow: hovered ? `0 0 8px ${neonColor}` : 'none',
            transition: 'box-shadow 0.3s',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ delay: index * 0.07 + 0.2, duration: 0.7, ease: "easeOut" }}
        />
      </Box>

      {/* Percentage on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Typography
          variant="caption"
          sx={{ color: neonColor, fontWeight: 600, fontSize: '0.7rem' }}
        >
          {skill.level}%
        </Typography>
      </motion.div>
    </motion.div>
  );
};

const ProficiencySection: React.FC<ProficiencySectionProps> = ({ skills = defaultSkills }) => {
  const theme = useTheme();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: { xs: 2, sm: 4, md: 8 },
        py: 12,
        transition: 'background-color 0.3s',
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={7}>
        <Typography
          variant="h4"
          component="h2"
          fontWeight={500}
          gutterBottom
          sx={{ color: 'text.primary', letterSpacing: '-0.5px' }}
        >
          Technical skills
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Hover a card to see details
        </Typography>
      </Box>

      {/* Skills Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 5,
          width: '100%',
          maxWidth: 960,
          mb: 8,
        }}
      >
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </Box>

      {/* CTA Buttons */}
      <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          href="./Gleidson-Guilhem_Resume.pdf"
          download="Gleidson-Guilhem_Resume.pdf"
          disableElevation
          size="large"
          sx={{ textTransform: 'none', fontWeight: 500, borderRadius: 2, px: 3 }}
        >
          Download resume
        </Button>

        <Button
          variant="outlined"
          startIcon={<MailOutlineIcon />}
          onClick={() => setModalOpen(true)}
          size="large"
          sx={{ textTransform: 'none', fontWeight: 500, borderRadius: 2, px: 3 }}
        >
          Contact me
        </Button>
      </Box>

      <ContactModal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <ContactForm />
      </ContactModal>
    </Box>
  );
};

export default ProficiencySection;