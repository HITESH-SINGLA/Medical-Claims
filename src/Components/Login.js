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
        hello
      </div>
    )
}

export default Login;


