import React, { useState } from "react";
import "./App.css";

import Header from './Pages/Header/Header';
import About from './Pages/About/About';
import Projects from './Pages/Projects/Projects';
import Skills from './Pages/Skill/Skill';
import Contact from './Pages/Contact/Contact';
import Footer from './Pages/Footer/Footer';
import ResumeForm from './Pages/ResumeForm/ResumeForm';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminCharts from "./Pages/Admin/AdminCharts";

const Home = ({ openResumeForm }) => (
  <>
    <Header openResumeForm={openResumeForm} />
    <About />
    <Projects />
    <Skills />
    <Contact />
    <Footer />
  </>
);

function App() {
  const [showResumeForm, setShowResumeForm] = useState(false);

  return (
    <Router>
      <ResumeForm isOpen={showResumeForm} closeForm={() => setShowResumeForm(false)} />

      <Routes>
        <Route path="/" element={<Home openResumeForm={() => setShowResumeForm(true)} />} />

        <Route
  path="/admin"
  element={
    localStorage.getItem("admin_auth") === "yes"
      ? <AdminDashboard />
      : <AdminLogin onLogin={() => window.location.href = "/admin"} />
  }
/>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/charts" element={<AdminCharts />} />
      </Routes>
    </Router>
  );
}

export default App;
