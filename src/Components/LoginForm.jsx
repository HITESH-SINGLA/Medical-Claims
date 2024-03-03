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
        if (response.data.message === 'User does not exist.') {
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
      var check=email;
      var isPharmacist = check === "pharmacistxyz901@gmail.com";
      var isMediOffi = check === "medical.officer.901@gmail.com";
      var isDirector = check === "tempusageww3@gmail.com";
      var isDAorJAOO = check === "junioracc.xyz901@gmail.com";
      var isAO = check === "assessing.officer.901@gmail.com";
      var isSrAO = check === "senior.audit.901@gmail.com";
      var isRegistrar = check === "registrar.officer.901@gmail.com";


      isPharmacist
        ? navigate("Pharmacist")
        : isMediOffi
        ? navigate("Medical_officer")
        : isDirector
        ? navigate("Director")
        : isDAorJAOO
        ? navigate("DAorJAO")
        : isAO
        ? navigate("AO")
        : isSrAO
        ? navigate("SrAO")
        : isRegistrar
        ? navigate("Registrar")
        : navigate("Home");

    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <div id="header" style={{ marginTop: "0px" }}>
        <img
          src="http://www.iitrpr.ac.in/sites/default/files/image.jpg"
          alt=""
          id="logo"
          style={{ height: "100px", width: "100px" }}
        />
        <h1 id="iit_ropar">
          <b>INDIAN INSTITUTE OF TECHNOLOGY ROPAR</b>
        </h1>
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
      <div id="footer" style={{ position: "absolute", bottom: "0" }}>
        <h6 id="copyright">
          <b>Copyright &#169; 2022, IIT ROPAR</b>
        </h6>
      </div>
    </div>
  );
};

export default LoginForm;
