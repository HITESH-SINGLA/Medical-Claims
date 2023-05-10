import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useHistory,
} from "react-router-dom";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";

import { AuthProvider } from "./Components/Auth";
import PrivateRoute from "./Components/PrivateRoute";

import Home from "./Components/Home";
import Autofill from "./Components/Autofill";
import Page1 from "./Components/Page1";
import Page2 from "./Components/Page2";
import Page3 from "./Components/Page3";
import Accountpage from "./Components/Accountpage";
import Accountpage1 from "./Components/Accountpage1";
import Application from "./Components/Application";
import Errorpage from "./Components/Errorpage";

import Pharmacist from "./Components/Pharmacist";
import ShowAllApplication from "./Components/ShowAllApplication";
import ShowApplication from "./Components/ShowApplication";
import Medical_officer from "./Components/Medical_officer";
import DAorJAO from "./Components/DAorJAO";
import AO from "./Components/AO";
import SrAO from "./Components/SrAO";
import Registrar from "./Components/Registrar";
import ShowApplicationToPharmaMed from "./Components/ShowApplicationToPharmaMed.js";
import Pharmacist_verified_applications from "./Components/Pharmacist_verified_applications";
import Medical_officer_verified_applications from "./Components/Medical_officer_verified_applications";
import DAorJAO_veified_applications from "./Components/DAorJAO_verified_applications";
import AO_verified_applications from "./Components/AO_verified_applications";
import SrAO_verified_applications from "./Components/SrAO_verified_applications";
import Registrar_verified_applications from "./Components/Registrar_verified_applications";
import Director from "./Components/Director";
import Director_verified_applications from "./Components/Director_verified_applications";
import Home_verified_applications from "./Components/Home_verified_applications";

import Instructions from "./Components/Instructions";
import LoginForm from "./Components/LoginForm";
import OTPForm from "./Components/OTPForm";

function App() {
  const roleFinder = ()=>{
    const role = localStorage.getItem("role");
    if(role == null){
      return <LoginForm/>
    }else if(role === "Pharmacist"){
      return <Pharmacist/>
    }else if(role === "Medical_officer"){
      return <Medical_officer/>
    }else if(role === "Director"){
      return <Director/>      
    }else if(role === "DAorJAO"){
      return <DAorJAO/>
    }else if(role === "AO"){
      return <AO/>
    }else if(role === "SrAO"){
      return <SrAO/>
    }else if(role === "Registrar"){
      return <Registrar/>
    }else if(role === "Home"){
      return <Home/>
    }
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute>
                {roleFinder()}
              </PrivateRoute>} />
          <Route path="/otp" element={<OTPForm />} />
          <Route path="*" element={<Errorpage />} />
          <Route
            path="/Home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/Home/Instructions"
            element={
              <PrivateRoute>
                <Instructions />
              </PrivateRoute>
            }
          />
          <Route
            path="/Autofill"
            element={
              <PrivateRoute>
                <Autofill />
              </PrivateRoute>
            }
          />
          <Route
            path="/Page1"
            element={
              <PrivateRoute>
                <Page1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/Home/ShowApplication/:id"
            element={
              <PrivateRoute>
                <ShowApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/Home/Home_verified_applications"
            element={
              <PrivateRoute>
                <Home_verified_applications />
              </PrivateRoute>
            }
          />
          <Route
            path="/Home/Home_verified_applications/ShowApplication/:id"
            element={
              <PrivateRoute>
                <ShowApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/Page1/Page2"
            element={
              <PrivateRoute>
                <Page2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/Page1/Page2/Page3"
            element={
              <PrivateRoute>
                <Page3 />
              </PrivateRoute>
            }
          />
          <Route
            path="/Page1/Page2/Page3/Accountpage1"
            element={
              <PrivateRoute>
                <Accountpage1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/Page1/Page2/Page3/Accountpage1/Application"
            element={
              <PrivateRoute>
                <Application />
              </PrivateRoute>
            }
          />
          <Route
            path="/Pharmacist" //corresponds to pharmacist
            element={
              <PrivateRoute>
                <Pharmacist />
              </PrivateRoute>
            }
          />
          <Route
            path="/Pharmacist/ShowApplicationToPharmaMed/:id"
            element={
              <PrivateRoute>
                <ShowApplicationToPharmaMed />
              </PrivateRoute>
            }
          />
          <Route
            path="/Pharmacist/Pharmacist_verified_applications"
            element={
              <PrivateRoute>
                <Pharmacist_verified_applications />
              </PrivateRoute>
            }
          />
          <Route
            path="/Pharmacist/Pharmacist_verified_applications/ShowApplicationToPharmaMed/:id"
            element={
              <PrivateRoute>
                <ShowApplicationToPharmaMed />
              </PrivateRoute>
            }
          />
          <Route
            path="/Medical_officer" //corresponds to medical officer
            element={
              <PrivateRoute>
                <Medical_officer />
              </PrivateRoute>
            }
          />
          <Route
            path="/Medical_officer/Medical_officer_verified_applications"
            element={
              <PrivateRoute>
                <Medical_officer_verified_applications />
              </PrivateRoute>
            }
          />
          <Route
            path="/Medical_officer/Medical_officer_verified_applications/ShowApplicationToPharmaMed/:id"
            element={
              <PrivateRoute>
                <ShowApplicationToPharmaMed />
              </PrivateRoute>
            }
          />
          <Route
            path="/Medical_officer/ShowApplicationToPharmaMed/:id"
            element={
              <PrivateRoute>
                <ShowApplicationToPharmaMed />
              </PrivateRoute>
            }
          />
          <Route
            path="/DAorJAO" //corresponds to DAorJAO
            element={
              <PrivateRoute>
                <DAorJAO />
              </PrivateRoute>
            }
          />
          <Route
            path="/DAorJAO/DAorJAO_verified_applications"
            element={
              <PrivateRoute>
                <DAorJAO_veified_applications />
              </PrivateRoute>
            }
          />
          <Route
            path="/DAorJAO/DAorJAO_verified_applications/ShowAllApplication/:id"
            element={
              <PrivateRoute>
                <ShowAllApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/DAorJAO/ShowAllApplication/:id"
            element={
              <PrivateRoute>
                <ShowAllApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/AO" //corresponds to AO
            element={
              <PrivateRoute>
                <AO />
              </PrivateRoute>
            }
          />{" "}
          <Route
            path="/AO/AO_verified_applications"
            element={
              <PrivateRoute>
                <AO_verified_applications />
              </PrivateRoute>
            }
          />
          <Route
            path="/AO/ShowAllApplication/:id"
            element={
              <PrivateRoute>
                <ShowAllApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/AO/AO_verified_applications/ShowAllApplication/:id"
            element={
              <PrivateRoute>
                <ShowAllApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/SrAO" //corresponds to srAO
            element={
              <PrivateRoute>
                <SrAO />
              </PrivateRoute>
            }
          />
          <Route
            path="/SrAO/ShowAllApplication/:id"
            element={
              <PrivateRoute>
                <ShowAllApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/SrAO/SrAO_verified_applications"
            element={
              <PrivateRoute>
                <SrAO_verified_applications />
              </PrivateRoute>
            }
          />
          <Route
            path="/SrAO/SrAO_verified_applications/ShowAllApplication/:id"
            element={
              <PrivateRoute>
                <ShowAllApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/Registrar" //corresponds to registrar
            element={
              <PrivateRoute>
                <Registrar />
              </PrivateRoute>
            }
          />{" "}
          <Route
            path="/Registrar/ShowAllApplication/:id"
            element={
              <PrivateRoute>
                <ShowAllApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/Registrar/Registrar_verified_applications"
            element={
              <PrivateRoute>
                <Registrar_verified_applications />
              </PrivateRoute>
            }
          />
          <Route
            path="/Registrar/Registrar_verified_applications/ShowAllApplication/:id"
            element={
              <PrivateRoute>
                <ShowAllApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/Director" //corresponds to Director
            element={
              <PrivateRoute>
                <Director />
              </PrivateRoute>
            }
          />
          <Route
            path="/Director/ShowAllApplication/:id"
            element={
              <PrivateRoute>
                <ShowAllApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/Director/Director_verified_applications"
            element={
              <PrivateRoute>
                <Director_verified_applications />
              </PrivateRoute>
            }
          />
          <Route
            path="/Director/Director_verified_applications/ShowAllApplication/:id"
            element={
              <PrivateRoute>
                <ShowAllApplication />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
