import React, { Component, useContext, useState } from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useNavigate,
} from "react-router-dom"

import { Button, Form, FormGroup } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import logo from "./logo.png"
import "./Login.css"
import { signInWithGoogle } from "./firebase"
import { AuthContext } from "./Auth"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    EmailAuthProvider,
} from "firebase/auth"
import { getAuth, linkWithCredential } from "firebase/auth"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

import { auth } from "./firebase"

import { Container, Row, Col, Alert, Breadcrumb, Card } from "react-bootstrap"

function Signup() {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const navigate = useNavigate()

    const provider = new GoogleAuthProvider()

    const HandleEmailSignup = async () => {
        if (registerEmail.split("@")[1] !== "iitrpr.ac.in") {
            alert("Your email id should be institute email id only")
        } else if (registerEmail[0] >= "0" && registerEmail[0] <= "9") {
            //that means email starts with digit
            alert("Students are not allowed to sign up")
        } else if (registerPassword.length < 6) {
            //that means email starts with digit
            alert(
                "Weak Password. \nPassword must be at least 6 characters long"
            )
        } else {
            try {
                signInWithPopup(auth, provider).then((result) => {
                    const credential = EmailAuthProvider.credential(
                        registerEmail,
                        registerPassword
                    )

                    //const auth = getAuth();
                    linkWithCredential(auth.currentUser, credential)
                        .then((usercred) => {
                            const user = usercred.user
                            console.log("Account linking success", user)
                        })
                        .catch((error) => {
                            console.log("Account linking error", error)
                            if (error.code === "auth/provider-already-linked") {
                                alert("Account already exist")
                            }
                            if (error.code === "auth/weak-password") {
                                alert(
                                    "Password must be at least 6-20 characters long"
                                )
                            }
                        })
                    const name = result.user.displayName
                    const email = result.user.email
                    const profilePic = result.user.photoURL
                    console.log("Name " + name)
                    console.log("email " + email)
                    console.log("profilePicURL " + profilePic)
                    navigate("/")
                })
            } catch (error) {
                console.log(error.code)
            }
        }
    }

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
                    "margin-top": 20,
                    "margin-bottom": 20,
                }}
            >
                Create a new account
            </h4>
            <div id="center_signup">
                <form id="fm">
                    <div class="form-group">
                        <label>Email address</label>
                        <span style={{ color: "red" }}>*</span>
                        <input
                            type="email"
                            name="registerEmail"
                            class="form-control"
                            placeholder="Enter your institute email"
                            onChange={(event) => {
                                setRegisterEmail(event.target.value)
                            }}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Email must be institute mail id
                        </Form.Text>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <span style={{ color: "red" }}>*</span>
                        <input
                            type="password"
                            name="registerPassword"
                            class="form-control"
                            placeholder="Password"
                            onChange={(event) => {
                                setRegisterPassword(event.target.value)
                            }}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be atleast 6-20 characters long.
                        </Form.Text>
                    </div>
                    <Button onClick={HandleEmailSignup} type="button">
                        Signup
                    </Button>
                    <br />
                </form>
            </div>

            <div id="footer" class="signup_footer">
                <h6 id="copyright">
                    <b>Copyright &#169; 2022, IIT ROPAR</b>
                </h6>
            </div>
        </div>
    )
}

export default Signup
