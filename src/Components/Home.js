import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./logo.png";
import "./Home.css";
import "./Autofill.css";
import { Container, Row } from "react-bootstrap";

function Home() {
  const email = localStorage.getItem("email");

  const [result_arr, setresult_arr] = useState([]);

  const getApplicationId = async () => {
    const res = await fetch(
      "http://127.0.0.1:5000/getallApplicationIdForHome",
      {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();
    console.log(data["result"]);

    setresult_arr(data["result"]);
  };
  
  useEffect(() => {
    getApplicationId();
  }, []);

  console.log(result_arr);

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const printString = (str) => {
    let s = str.substr(2,10);
    return s;

  }

  return (
    <div style={{ display: "flex" }}>
      <div id="sidebar1" class="d-flex flex-column  flex-shrink-0 p-3 text-white">
        <h2 class="text_center">Menu</h2>
        <br />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="/Home" class="nav-link text-white active">
              <i class="fa fa-home"></i>
              <span class="ms-2 font_size_18">Home </span>
            </a>
          </li>

          <li>
            <a href="/Autofill" class="nav-link text-white">
              <i class="fa fa-first-order"></i>
              <span class="ms-2 font_size_18">Auto Fill</span>
            </a>
          </li>

          <li>
            <a
              class="nav-link text-white"
              href="/Home/Home_verified_applications"
            >
              <i class="fa fa-first-order"></i>
              <span class="ms-2 font_size_18">Approved applications</span>
            </a>
          </li>

          <li onClick={handleLogout}>
            <a href="/" class="nav-link text-white">
              <i class="fa fa-bookmark"></i>
              <span class="ms-2 font_size_18">Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "50px", width: "100%" }}>
        <div id="top_navbar">
          <div id="btns">
            <Link to="/Home/Instructions" style={{ textDecoration: "none" }}>
              <div id="inst_button1"> Instructions</div>
            </Link>
            <Link to="/Page1" style={{ textDecoration: "none" }}>
              <div id="apply_button1"> Apply for Reimbursement</div>
            </Link>
          </div>
          <div>
            {/* <div id="profilepic1">
              {" "}
              <img src={currentUser.photoURL} alt=""></img>{" "}
            </div>*/}
            <div id="name1">Welcome</div>
            <div id="email1">{email}</div>
          </div>
        </div>

        <div id="last_heading" style={{ marginLeft: "30px" }}>
          <h4>Home </h4>
          <h6>
            (applications which are yet to be approved by all authority people
            will appear here)
          </h6>
        </div>

        <div className="application_list">
          {result_arr.map((id) => (
            <div
              className="application_id"
              onClick={() => {
                navigate("ShowApplication/" + id[0]);
              }}
            >
              {/* {console.log(res)} */}
              <Container style={{ cursor: "pointer" }}>
                <Row>
                  <h6>Application Id : {id[0]}</h6>
                  {console.log()}
                  <div style={{ display:'flex',justifyContent:'space-between' }}><div>Date of application : {JSON.parse(id[1]).user.date}</div>                  
                  <div>Amount claimed : {JSON.parse(id[1]).user.netAmntClaimed}</div></div>
                  {/* {((id[1].split(":"))[10])} */}
                </Row>
              </Container>
            </div>
          ))}
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Home;
