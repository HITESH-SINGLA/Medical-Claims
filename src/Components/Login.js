import React, { Component, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { Button, Form, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Login.css";
// import { signInWithGoogle } from "./firebase"
import { AuthContext } from "./Auth";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import '../img/home.jpg'

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const HandleEmailLogin = async () => {
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
        console.log("line72", userCredentials.user.email);
        console.log(userCredentials);
        const check = userCredentials.user.email;
        const see = check.split("@")[1];

        const errorOrNOt =
          see !== "iitrpr.ac.in" &&
          check !== "pharmacistxyz901@gmail.com" &&
          check !== "medical.officer.901@gmail.com" &&
          check !== "tempusageww3@gmail.com" &&
          check !== "junioracc.xyz901@gmail.com" &&
          check !== "assessing.officer.901@gmail.com" &&
          check !== "senior.audit.901@gmail.com" &&
          check !== "registrar.officer.901@gmail.com";
        const isPharmacist = check === "pharmacistxyz901@gmail.com";
        const isMediOffi = check === "medical.officer.901@gmail.com";
        const isDirector = check === "tempusageww3@gmail.com";
        const isDAorJAOO = check === "junioracc.xyz901@gmail.com";
        const isAO = check === "assessing.officer.901@gmail.com";
        const isSrAO = check === "senior.audit.901@gmail.com";
        const isRegistrar = check === "registrar.officer.901@gmail.com";

        errorOrNOt
          ? navigate("/")
          : isPharmacist
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
      } catch (error) {
        console.log(error.code);
        if (error.code == "auth/user-not-found") {
          alert(
            "Account doesn't exist.\nSign up before logging in for first time"
          );
        }
        if (error.code == "auth/wrong-password") {
          alert("Wrong Password.\nTry again");
        }

        console.log(error.message);
      }
    };

    const HandleEmail = (event)=>{

      event.preventDefault();
      axios
        .post('/send-otp', { loginEmail })
        .then((response) => {
          if (response.data.success) {
            setMessage('OTP sent to your email address');
            // Redirect to OTP verification page
          } else {
            setMessage('Invalid email');
          }
        })
        .catch((error) => {
          console.error(error);
          setMessage('Error sending OTP');
        });
    }

    const provider = new GoogleAuthProvider();
    
    const signInWithGoogle = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          //console.log(result);
          const name = result.user.displayName;
          const email = result.user.email;
          const profilePic = result.user.photoURL;
          console.log("Name " + name);
          console.log("email " + email);
          console.log("profilePicURL " + profilePic);

          const check = email;
          const see = check.split("@")[1];

          if (
            !(email[0] >= "0" && email[0] <= "9") ||
            email === "2020csb1091@iitrpr.ac.in" ||
            email === "2020csb1067@iitrpr.ac.in" ||
            email === "2019csb1043@iitrpr.ac.in" ||
            email === "2019csb1255@iitrpr.ac.in"
          ) {
            const errorOrNOt =
              see !== "iitrpr.ac.in" &&
              check !== "pharmacistxyz901@gmail.com" &&
              check !== "medical.officer.901@gmail.com" &&
              check !== "tempusageww3@gmail.com" &&
              check !== "junioracc.xyz901@gmail.com" &&
              check !== "assessing.officer.901@gmail.com" &&
              check !== "senior.audit.901@gmail.com" &&
              check !== "registrar.officer.901@gmail.com";
            const isPharmacist = check === "pharmacistxyz901@gmail.com";
            const isMediOffi = check === "medical.officer.901@gmail.com";
            const isDirector = check === "tempusageww3@gmail.com";
            const isDAorJAOO = check === "junioracc.xyz901@gmail.com";
            const isAO = check === "assessing.officer.901@gmail.com";
            const isSrAO = check === "senior.audit.901@gmail.com";
            const isRegistrar = check === "registrar.officer.901@gmail.com";

            if (errorOrNOt) {
              alert("Invalid Login");
              navigate("/");
            } else {
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
            }
          } else {
            alert("Invalid Login");
          }
        })
        .catch((error) => {
          //
          console.log(error.code);
          console.log(error.message);
        });
    };

    return (
      <div>
        <div id="header">
          <img
            src="http://www.iitrpr.ac.in/sites/default/files/image.jpg"
            alt=""
            id="logo"
          />
          <h1 id="iit_ropar">
            <b>INDIAN INSTITUTE OF TECHNOLOGY ROPAR</b>
          </h1>
        </div>
        <div id="medical_claims">
          <h1 id="medical_claim_heading">
            <b>Medical Claims</b>
          </h1>
        </div>
        <div id="navbar">
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossorigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            crossorigin="anonymous"
          />
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </nav>
        </div>
        <h4
          style={{
            "text-align": "center",
            "margin-bottom": 0,
            "margin-top": 20,
          }}
        >
          Login to your account
        </h4>
        <div id="center">
          <form id="fm">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <span style={{ color: "red" }}>*</span>

              <input
                type="email"
                name="loginEmail"
                class="form-control"
                placeholder="Enter your institute email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <span style={{ color: "red" }}>*</span>
              <input
                type="password"
                name="loginPassword"
                class="form-control"
                placeholder="Password"
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
              />
            </div>
            <Button onClick={HandleEmailLogin} type="button">
              Login
            </Button>
            <br />

            <button
              onClick={signInWithGoogle}
              className="login-with-google-btn"
              type="button"
            >
              Sign In With Google
            </button>

            <br />
            <br />

            <Link to="/forgotPassword">
              <p>Forgot Password ?</p>
            </Link>

            <Link to="/Signup">
              <Button type="button">Signup</Button>
            </Link>
          </form>
        </div>
        <br />

        <div id="footer">
          <h6 id="copyright">
            <b>Copyright &#169; 2022, IIT ROPAR</b>
          </h6>
        </div>
      </div>
    )
}

export default Login;


