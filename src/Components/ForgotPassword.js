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
    sendPasswordResetEmail,
} from "firebase/auth"

import { getAuth, linkWithCredential } from "firebase/auth"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

import { auth } from "./firebase"

import { Container, Row, Col, Alert, Breadcrumb, Card } from "react-bootstrap"

function ForgotPassword() {
    const [forgotEmail, setForgotEmail] = useState("")

    // const navigate = useNavigate()

    const forgotPassword = () => {
        sendPasswordResetEmail(auth, forgotEmail).then(() => {
            alert(
                "Password reset link has been sent to your email.\nTry Logging in after resetting the password."
            )
        })
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
            <br />
            <br />
            <h4 style={{ "text-align": "center" }}>
                If you forgot password/ you want to change password, change here
            </h4>
            <br />
            <br />
            <div class="forgot_password">
                <form id="fm_forgot">
                    <div class="form-group">
                        <label>Email address</label>
                        <span style={{ color: "red" }}>*</span>
                        <input
                            type="email"
                            name="forgotEmail"
                            class="form-control"
                            placeholder="Enter your institute email"
                            onChange={(event) => {
                                setForgotEmail(event.target.value)
                            }}
                        />
                    </div>

                    <Button onClick={forgotPassword} type="button">
                        Send Password Reset Link
                    </Button>
                    <br />
                </form>
            </div>

            <div class="forgot_footer">
                <h6 id="copyright">
                    <b>Copyright &#169; 2022, IIT ROPAR</b>
                </h6>
            </div>
        </div>
    )
}

export default ForgotPassword
