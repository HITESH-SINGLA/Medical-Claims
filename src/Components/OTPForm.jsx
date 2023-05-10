import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

const OtpForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    const check = email;
    const see = check.split("@")[1];

    if (!(email[0] >= "0" && email[0] <= "9")) {
      const errorOrNOt =
        see !== "iitrpr.ac.in" &&
        check !== "pharmacistxyz901@gmail.com" &&
        check !== "medical.officer.901@gmail.com" &&
        check !== "tempusageww3@gmail.com" &&
        check !== "junioracc.xyz901@gmail.com" &&
        check !== "assessing.officer.901@gmail.com" &&
        check !== "senior.audit.901@gmail.com" &&
        check !== "registrar.officer.901@gmail.com";
      var isPharmacist = check === "pharmacistxyz901@gmail.com";
      var isMediOffi = check === "medical.officer.901@gmail.com";
      var isDirector = check === "tempusageww3@gmail.com";
      var isDAorJAOO = check === "junioracc.xyz901@gmail.com";
      var isAO = check === "assessing.officer.901@gmail.com";
      var isSrAO = check === "senior.audit.901@gmail.com";
      var isRegistrar = check === "registrar.officer.901@gmail.com";

      if (errorOrNOt) {
        alert("Invalid Login");
        navigate("/");
    }}
    event.preventDefault();
    try {
      const response = await axios.post(" https://aditya1024.pythonanywhere.com/login", {
        email,
        otp,
      });
      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", email);
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
        // window.location.href = "http://localhost:3000/Home";
      }
    } catch (error) {
      setMessage(error.response.data.message);
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
        <h4 style={{}}>Login to your account</h4>
        <form id="fm" onSubmit={handleSubmit}>
          <div class="form-group">
            <label htmlFor="email">Email</label>
            <span style={{ color: "red" }}>*</span>
            <input
              type="email"
              id="email2"
              value={email}
              onChange={handleEmailChange}
              class="form-control"
              required
              placeholder={localStorage.email}
            />
          </div>
          <div class="form-group">
            <label htmlFor="otp">OTP</label>
            <span style={{ color: "red" }}>*</span>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              class="form-control"
            />
          </div>
          <Button type="submit" style={{ marginTop: "5px" }}>
            Login
          </Button>
          <br />
        </form>
      </div>
      <div id="footer" style={{ position: "absolute", bottom: "0" }}>
        <h6 id="copyright">
          <b>Copyright &#169; 2022, IIT ROPAR</b>
        </h6>
      </div>
    </div>
  );
};

export default OtpForm;
