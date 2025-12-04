import React from 'react';
import './About.css';
import profilePic from '../About/myphoto.jpg';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">

        {/* Profile Image */}
        <div className="about-image">
          <img src={profilePic} alt="Jaimin Parmar" />
        </div>

        {/* About Me Text */}
        <div className="about-text">
          <h2>About Me</h2>

          <p>
            Hi, I’m <span className="highlight">Jaimin Parmar</span>, a passionate learner and technology enthusiast. 
            I enjoy exploring different areas of web development and creating simple, clean and meaningful digital experiences.
          </p>

          <p>
            I love understanding how things work, solving problems, and learning new tools that help me grow as a developer. 
            My focus is on writing neat, user-friendly code and continuously improving through practice, curiosity, and real-world application.
          </p>

          <p>
            With an interest in both frontend and backend technologies, I aim to build modern, responsive, and efficient web applications 
            that deliver value and provide a smooth user experience.
          </p>

        </div>

      </div>
    </section>
  );
};

export default About;
