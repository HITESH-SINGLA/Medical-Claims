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
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
      });

      if (response.status === 200) {
        if (response.data.message === "User does not exist.") {
          alert("User does not exist. Please sign up first.");
        } else {
          // If email exists and OTP sent successfully
          setSentOtp(response.data.otp);
          console.log(response.data.otp);
          setButtonText("Validate OTP");
          alert("OTP sent to your email successfully.");
        }
      } else {
        // If other error occurs
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
      var isDirector = check === "tempusageww3@gmail.com";
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
      {/* <div id="header" style={{ marginTop: "0px" }}>
        <img
          src="http://www.iitrpr.ac.in/sites/default/files/image.jpg"
          alt=""
          id="logo"
          style={{ height: "100px", width: "100px" }}
        />
        <h1 id="iit_ropar">
          <b>INDIAN INSTITUTE OF TECHNOLOGY ROPAR</b>
        </h1>
      </div> */}

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

      <div
        id="center"
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h4>Login to your account</h4>
        {buttonText === "Send OTP" && (
          <form id="fm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <span style={{ color: "red" }}>*</span>
              <input
                type="email"
                id="email2"
                value={email}
                onChange={handleEmailChange}
                className="form-control"
                required
              />
            </div>
            <Button type="submit" style={{ marginTop: "5px" }}>
              {buttonText}
            </Button>
          </form>
        )}
        {buttonText === "Validate OTP" && (
          <form id="otpForm" onSubmit={handleValidate}>
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <span style={{ color: "red" }}>*</span>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                className="form-control"
                required
              />
            </div>
            <Button type="submit" style={{ marginTop: "5px" }}>
              Validate
            </Button>
          </form>
        )}
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
                An online portal for submitting and tracking medical
                reimbursement requests, thus digitalizing the process, making it
                more accessible and convenient for the staff.
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
};

export default LoginForm;
