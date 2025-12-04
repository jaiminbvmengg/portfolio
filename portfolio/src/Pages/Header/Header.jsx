import React, { useState } from "react";
import "./Header.css";

const Header = ({ openResumeForm }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="logo">Jaimin Parmar</div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Me</a></li>
            <li><a href="#contact">Contact Me</a></li>
            <li onClick={openResumeForm}>Resume</li>
          </ul>
        </nav>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="hamburger" onClick={() => setDrawerOpen(true)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${drawerOpen ? "show" : ""}`}>
        <button className="drawer-close" onClick={() => setDrawerOpen(false)}>
          ✕
        </button>

        <ul>
          <li onClick={() => setDrawerOpen(false)}>
            <a href="#home">Home</a>
          </li>

          <li onClick={() => setDrawerOpen(false)}>
            <a href="#about">About Me</a>
          </li>

          <li onClick={() => setDrawerOpen(false)}>
            <a href="#contact">Contact Me</a>
          </li>

          <li
            onClick={() => {
              setDrawerOpen(false);
              openResumeForm();
            }}
          >
            Resume
          </li>
        </ul>
      </div>

      {/* Background Overlay */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)}></div>
      )}
    </>
  );
};

export default Header;
