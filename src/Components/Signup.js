import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleGetOTP = () => {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    console.log("Generated OTP:", generatedOTP);
    setShowOtpField(true);
  };

  const handleValidateOTP = () => {
    if (otp === "123456") {
      console.log("OTP validated successfully!");
    } else {
      console.log("Invalid OTP. Please try again.");
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="signup-overlay">
      <div className="signup-popup">
        <h1 className="signup-title-box1">SignUp</h1>
        {!showOtpField ? (
          <>
            <input
              type="text"
              placeholder="name"
              className="signup-input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              className="signup-input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              value={selectedOption}
              onChange={handleDropdownChange}
              className="signup-input-field"
              
            >
              <option>department</option>
              <option >pharmacist</option>
              <option >medical officer</option>
              <option>Sr_AO</option>
              <option >DA_JAO</option>
              <option >Registrar</option>
              <option >Director</option>
              <option >Accountant</option>
            </select>
            <div className="stray8"> 
            <button className="signup-button" onClick={handleGetOTP}>
              Get OTP
            </button>
            
            <Link className="signup-login-link" to="/login">Already have an account? Login</Link>
          </div>
            
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="signup-input-field"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="signup-button" onClick={handleValidateOTP}>
              Validate
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
