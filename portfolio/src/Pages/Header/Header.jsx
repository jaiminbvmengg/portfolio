import React from 'react';
import './Header.css';

const Header = ({ openResumeForm }) => {
  return (
    <header className="navbar">
      <div className="logo">Jaimin Parmar</div>
      <nav>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Me</a></li>
          <li><a href="#contact">Contact Me</a></li>

          <li 
            onClick={openResumeForm} 
            style={{ cursor: "pointer" }}
          >
            Resume
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
