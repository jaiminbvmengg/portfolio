import React from "react";
import "./Footer.css";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h2>Jaimin Parmar</h2>
          <p>Frontend Developer • React Developer</p>
        </div>

        <div className="footer-middle">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h3>Follow Me</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/jaiminp_07?igsh=NXN1N3V5YWNsd2F0" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/jaimin-parmar-758658284?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com/jaiminbvmengg" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Jaimin Parmar — All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
