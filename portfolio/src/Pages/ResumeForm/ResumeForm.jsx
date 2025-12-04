import React, { useState } from "react";
import "./ResumeForm.css";

const ResumeForm = ({ isOpen, closeForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://portfolio-f8i9.onrender.com/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Submitted successfully!");
        setFormData({ name: "", phone: "", email: "", message: "" });

        setTimeout(() => {
          setSuccess("");
          closeForm();
        }, 1500);
      } else {
        setSuccess("Failed to submit");
      }
    } catch (error) {
      console.error(error);
      setSuccess("Something went wrong");
    }
  };

  return (
    <div className="resume-overlay">
      <div className="resume-popup">
        <button className="close-btn" onClick={closeForm}>×</button>

        <h2>Request Resume</h2>

        {success && <p className="success-msg">{success}</p>}

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="number"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            placeholder="Message (optional)"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">Submit</button>  
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;
