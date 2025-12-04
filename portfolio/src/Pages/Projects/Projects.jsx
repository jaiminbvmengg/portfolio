import React from 'react';

const Projects = () => {
  const projectList = [
    {
      name: 'Sachchiyay Exports – Organic Spices Website',
      description: 'A clean export showcase for pure organic Indian spices, featuring sustainable sourcing and FSSAI-certified quality control.',
      link: 'https://www.sachchiyayexports.com/'
    }
  ];

  return (
    <section id="projects">
      <h2>Projects</h2>
      {projectList.map((project, index) => (
        <div className="project-card" key={index}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <a href={project.link} target="_blank" rel="noreferrer">View Project</a>
        </div>
      ))}
    </section>
  );
};

export default Projects;
