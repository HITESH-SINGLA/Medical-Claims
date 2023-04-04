import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import LoginForm from "./LoginForm";

const PrivateRoute = ({ children }) => {
    const email = localStorage.getItem("email");

    return email ? children : <LoginForm />
}

export default PrivateRoute
