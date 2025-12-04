import React from 'react';
import './Skills.css';
import { FaHtml5, FaCss3, FaJs, FaPython, FaPhp, FaJava, FaDatabase, FaReact } from "react-icons/fa";

const Skills = () => {
  const skills = [
    { name: "C / C++", icon: <FaPython /> },
    { name: "HTML", icon: <FaHtml5 /> },
    { name: "CSS", icon: <FaCss3 /> },
    { name: "JavaScript", icon: <FaJs /> },
    { name: "SQL", icon: <FaDatabase /> },
    { name: "Java", icon: <FaJava /> },
    { name: "PHP", icon: <FaPhp /> },
    { name: "Django", icon: <FaPython /> },
    { name: "MERN Stack", icon: <FaReact /> }
  ];

  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-title">My Skills</h2>
      
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <div className="skill-icon">{skill.icon}</div>
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
