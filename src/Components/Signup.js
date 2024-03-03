import React, { useState } from "react";
import "./Signup.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

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

  return (
    <div className="signup-overlay">
      <div className="signup-popup">
        <h1 className="signup-title-box1">Signup</h1>
        {!showOtpField ? (
          <>
            <input
              type="text"
              placeholder="Name"
              className="signup-input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="signup-input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="signup-button" onClick={handleGetOTP}>
              Get OTP
            </button>
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
