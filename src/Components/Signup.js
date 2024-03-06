import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Signup.css";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
const navigate=useNavigate();
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
    <div className="back">
      <div>
        <nav className="navbar navbar-dark bg-dark border-bottom border-body">
          <div className="container-fluid">
            <a href="http://localhost:3000/" className="navbar-brand">
              <img
                className="logoimg"
                src="./logo.png"
                alt="IIT Ropar Logo"
                height="80"
              />
            </a>
            <div className="d-flex">
              <h1 id="iit_ropar">
                <b>INDIAN INSTITUTE OF TECHNOLOGY ROPAR</b>
              </h1>
            </div>
          </div>
        </nav>
      </div>
      <div className="signup-overlay">
        <div className="signup-popup">
          <h1 className="signup-title-box1">Signup</h1>
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
                 <input
                type="email"
                placeholder="mobile"
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
              <div class="buttonc">
                <button className="signup-button" onClick={handleGetOTP}>
                  Get OTP
                </button>
                <a href="#" class="login-link" onClick={navigate("/LoginForm")}>Already?Login</a>
              </div>


            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="enter OTP"
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
      <div>
        <footer class="footer-distributed">
          <div class="footer-left">
            <h3>
              <img
                className="logoimg"
                src="./logo.png"
                alt="IIT Ropar Logo"
                height="80"
              />
            </h3>

            <p class="footer-links">
              <a href="https://www.iitrpr.ac.in/" class="link-1">
                Indian Institute of technology, Ropar
              </a>
            </p>

            <p class="footer-company-name">
              2016 MEDICAL CENTER. All Rights Reserved
            </p>
          </div>

          <div class="footer-center">
            <div>
              <i class="fas fa-building"></i>
              <p>
                <span>IIT Ropar</span>Rupnagar, Punjab, INDIA 140001
              </p>
            </div>

            <div>
              <i class="fas fa-phone-alt fa-flip-horizontal"></i>
              <p>+91-1881-242124</p>
            </div>

            <div>
              <i class="far fa-envelope"></i>
              <p>
                <a href="mailto:support@company.com">support@iitrpr.com</a>
              </p>
            </div>
          </div>

          <div class="footer-right">
            <p class="footer-company-about">
              <span>About the company</span>
              An online portal for submitting and tracking medical reimbursement
              requests, thus digitalizing the process, making it more accessible
              and convenient for the staff.
            </p>

            <div class="footer-icons">
              <a href="https://twitter.com/?lang=en">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com/school/iitropar/">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="https://www.instagram.com/iitrpr_iitrpr/">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SignupPage;
