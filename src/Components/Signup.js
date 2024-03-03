// src/Signup.js
import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    department: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here or simply log the form data
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="signup-container">
      <div className="outer-rectangle">
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            pattern="[0-9]{10}"
            placeholder="Enter 10-digit mobile number"
            value={formData.mobile}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="department">Department:</label>
          <select id="department" name="department" value={formData.department} onChange={handleChange}>
            <option value="">Select Department</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="doctor">Doctor</option>
            <option value="student">Student</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
