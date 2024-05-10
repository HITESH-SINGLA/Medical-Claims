import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [buttonText, setButtonText] = useState("Send OTP");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://172.30.2.244:5006/login", {
        email,
      });

      if (response.status === 200) {
        if (response.data.message === "User does not exist.") {
          alert("User does not exist. Please sign up first.");
          navigate("/signup");
        } else {
          // setSentOtp(response.data.otp);
          setSentOtp("1234");
          console.log("1234");
          // console.log(response.data.otp);
          setButtonText("Validate OTP");
          alert("OTP sent to your email successfully.");
        }
        // alert(response.data.message)
      } else {
        alert("Failed to send OTP. Please try again later.");
      }
    } catch (error) {
      alert("Failed to send OTP. Please try again later.");
    }
  };

  const handleValidate = async (event) => {
    event.preventDefault();
    if (sentOtp === otp) {
      alert("OTP Validated!");
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("email", email);
      var check = email;
      var isPharmacist = check === "pharmacistxyz901@gmail.com";
      var isMediOffi = check === "medical.officer.901@gmail.com";
      var isDirector = check === "directorxyz@gmail.com";
      var isDAorJAOO = check === "junioracc.xyz901@gmail.com";
      var isAO = check === "assessing.officer.901@gmail.com";
      var isSrAO = check === "senior.audit.901@gmail.com";
      var isRegistrar = check === "registrar.officer.901@gmail.com";

      isPharmacist
        ? navigate("/Pharmacist")
        : isMediOffi
        ? navigate("/Medical_officer")
        : isDirector
        ? navigate("/Director")
        : isDAorJAOO
        ? navigate("/DAorJAO")
        : isAO
        ? navigate("/AO")
        : isSrAO
        ? navigate("/SrAO")
        : isRegistrar
        ? navigate("/Registrar")
        : navigate("/Home");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <div className="back">
        <div>
          <nav className="navbar navbar-dark bg-dark border-bottom border-body">
            <div className="container-fluid">
              <a href="/" className="navbar-brand">
                <img
                  className="logoimg"
                  src="./logo.png"
                  alt="IIT Ropar Logo"
                  height="80"
                />
              </a>

              <h2 id="iit_roparland">
                <b>INDIAN INSTITUTE OF TECHNOLOGY ROPAR</b>
              </h2>

              <div className="d-flex"></div>
            </div>
          </nav>
        </div>

        <div id="center">
          {buttonText === "Send OTP" && (
            <div className="ccc">
              <form id="fm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <h4>Login to your account</h4>
                  <label htmlFor="email" style={{ margin: 3, fontSize: 20 }}>
                    Email
                  </label>
                  <span style={{ color: "red" }}>*</span>
                  <input
                    type="email"
                    id="email2"
                    placeholder="enter email"
                    value={email}
                    onChange={handleEmailChange}
                    className="signup-input-field"
                    required
                  />
                </div>
                <Button type="submit" className="signup-button">
                  {buttonText}
                </Button>
              </form>
            </div>
          )}
          {buttonText === "Validate OTP" && (
            <div className="ccc">
              <form id="fm" onSubmit={handleValidate}>
                <div className="form-group">
                  <label htmlFor="otp">OTP</label>
                  <span style={{ color: "red" }}>*</span>
                  <input
                    type="text"
                    id="otp"
                    placeholder="enter otp"
                    value={otp}
                    onChange={handleOtpChange}
                    className="signup-input-field"
                    required
                  />
                </div>
                <Button type="submit" className="signup-button">
                  Validate
                </Button>
              </form>
            </div>
          )}
        </div>
        <div>
          <footer className="footer-distributed">
            <div className="footer-left">
              <h3>
                <img
                  className="logoimg"
                  src="./logo.png"
                  alt="IIT Ropar Logo"
                  height="80"
                />
              </h3>

              <p className="footer-links">
                <a href="https://www.iitrpr.ac.in/" className="link-1">
                  Indian Institute of technology, Ropar
                </a>
              </p>

              <p className="footer-company-name">
                2016 MEDICAL CENTER. All Rights Reserved
              </p>
            </div>

            <div className="footer-center">
              <div>
                <i className="fas fa-building"></i>
                <p>
                  <span>IIT Ropar</span>Rupnagar, Punjab, INDIA 140001
                </p>
              </div>

              <div>
                <i className="fas fa-phone-alt fa-flip-horizontal"></i>
                <p>+91-1881-242124</p>
              </div>

              <div>
                <i className="far fa-envelope"></i>
                <p>
                  <a href="mailto:support@company.com">support@iitrpr.com</a>
                </p>
              </div>
            </div>

            <div className="footer-right">
              <p className="footer-company-about">
                <span>About the company</span>
                An online portal for submitting and tracking medical
                reimbursement requests, thus digitalizing the process, making it
                more accessible and convenient for the staff.
              </p>

              <div className="footer-icons">
                <a href="https://twitter.com/?lang=en">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/school/iitropar/">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://www.instagram.com/iitrpr_iitrpr/">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
