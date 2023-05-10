import React, { Component, useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Home_authority.css";
import { Container, Row, Col, Alert, Breadcrumb, Card } from "react-bootstrap";

function Director() {
  const email = localStorage.getItem("email");

  let user_data = {
    email: email,
  };
  const [result_arr, setresult_arr] = useState([]);

  const getApplicationId = async () => {
    const res = await fetch(
      " https://aditya1024.pythonanywhere.com/getallApplicationIdForDirector",
      {
        method: "POST",
        body: JSON.stringify({ user_data }),
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

  return (
    <div>
      <div id="top_navbar">
        <div id="name">Welcome</div>
        <div id="email">{email}</div>
      </div>

      <div
        id="sidebar"
        class="d-flex flex-column  flex-shrink-0 p-3 text-white"
      >
        <a href="#" class="text-white text-decoration-none">
          <h2 class="text_center">Menu</h2>
        </a>
        <br />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">
              <i class="fa fa-home"></i>

              <span class="ms-2 font_size_18">Home </span>
            </a>
          </li>

          <Link
            id="link_to_other_pages"
            to="/Director/Director_verified_applications"
            style={{ textDecoration: "none" }}
          >
            <li>
              <a href="#" class="nav-link text-white">
                <i class="fa fa-first-order"></i>
                <span class="ms-2 font_size_18">Verified Applications</span>
              </a>
            </li>
          </Link>

          <li onClick={handleLogout}>
            <a href="#" class="nav-link text-white">
              <i class="fa fa-bookmark"></i>
              <span class="ms-2 font_size_18">Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <div id="last_heading">
        <h4>Home </h4>
        <h6>(applications which need your approval will appear here)</h6>
      </div>
      <div className="application_list">
        {result_arr.map((id) => (
          <div
            className="application_id"
            onClick={() => {
              navigate("ShowAllApplication/" + id[0]);
            }}
            style={{ cursor: "pointer" }}
          >
            <Container>
              <Row>
                <h6>Application Id : {id[0]}</h6>
                {console.log()}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Date of application : {JSON.parse(id[1]).user.date}</div>
                  <div>
                    Amount claimed : {JSON.parse(id[1]).user.netAmntClaimed}
                  </div>
                </div>
              </Row>
            </Container>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Director;
