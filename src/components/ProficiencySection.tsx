import { motion } from "framer-motion";
import { Button } from '@mui/material';
import  ContactModal from './ContactModal';
import React, { useState } from "react";


interface ProficiencySectionProps {
  skills?: string[];
}

const defaultSkills = [
  "JavaScript",
  "React",
  "TypeScript",
  "Node.js",
  "Spring Boot",
  "SQL",
  "Tailwind CSS",
];


const ProficiencySection: React.FC<ProficiencySectionProps> = ({ skills = defaultSkills }) => {
  //Modal
  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-center min-h-screen bg-[#ffffff] dark:bg-gray-900 p-6 overflow-hidden transition-colors duration-300">
      <h2 className="text-4xl font-bold text-brown-800 dark:text-white mb-8 z-10">
        Brewing My Skills
      </h2>

      {/* Coffee Beans Background */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl animate-float text-[#6d4c41] dark:text-[#d7ccc8]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          ☕
        </div>
      ))}

      {/* Coffee Machine */}
      <div className="relative w-60 h-72 bg-[#c69c6d] dark:bg-[#4e342e] rounded-xl shadow-lg flex flex-col items-center justify-end overflow-hidden z-10">
        <div className="absolute top-0 w-full h-16 bg-[#4e342e] dark:bg-[#3e2723] rounded-b-2xl flex items-center justify-center text-white font-bold shadow-inner">
          
        </div>

        {/* Steam */}
        <motion.div
          className="absolute bottom-24 w-6 h-12 z-20"
          animate={{ y: [-10, -30], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        >
          <div className="w-full h-full bg-white rounded-full blur-sm opacity-50"></div>
        </motion.div>

        {/* Cup */}
        <div className="absolute bottom-4 w-20 h-20 bg-white dark:bg-[#d7ccc8] rounded-b-full border-4 border-[#a1887f] z-10"></div>

        {/* Skill drops */}
        <div className="absolute bottom-[6.5rem] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],    // stay visible then fade out
                y: [0, 0, -60, -60],     // move up then hold position
              }}
              transition={{
                delay: index * 0.7,
                duration: 7,
                times: [0, 0.1, 0.7, 1], // timing for keyframes (0%, 28.5%, 100%)
                repeat: Infinity,
                repeatDelay: skills.length * 0.7,
                ease: "linear",
              }}
              className="bg-[#795548] text-white px-4 py-1 rounded-full shadow-md text-sm"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
        <br />    
      <div className="w-full flex justify-center gap-4 mt-6 z-10">
        {/* Download Resume Button */}
        <a
          href="./Gleidson-Guilhem_Resume.pdf"
          download="Gleidson-Guilhem_Resume.pdf"
          className="group px-5 py-2 bg-blue-600 text-white rounded-md font-semibold transition-transform duration-300 ease-in-out inline-flex items-center gap-2 hover:scale-105 hover:text-white"
          >
          Download Resume
          <svg
            className="w-5 h-5 text-white animate-spin"
            style={{ animation: "spin 2.5s linear infinite" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </a>
        <button
          onClick={handleOpenModal}
          className="group px-5 py-2 bg-green-600 text-white rounded-md font-semibold transition-transform duration-300 ease-in-out inline-flex items-center gap-2 hover:scale-105 hover:text-white"
        > Contact Me 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 group-hover:animate-open-envelope transition-transform origin-top"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M3 8l9 6 9-6" />
            <rect x="3" y="8" width="18" height="10" rx="2" ry="2" />
          </svg></button>
      </div>
      <ContactModal open={isModalOpen} onClose={handleCloseModal} />
      </div>
  );
};


export default ProficiencySection;
