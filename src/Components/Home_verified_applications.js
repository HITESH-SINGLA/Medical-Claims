import React, { Component, useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useNavigate,
  useParams,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./logo.png";
import "./Home.css";
import { Container, Row, Col, Alert, Breadcrumb, Card } from "react-bootstrap";

function Home_verified_applications() {
  const { home_data } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [data, setData] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortColumn(event.target.value);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = filteredData.sort((a, b) => {
    const isAsc = sortDirection === "asc";
    if (a[sortColumn] < b[sortColumn]) {
      return isAsc ? -1 : 1;
    } else if (a[sortColumn] > b[sortColumn]) {
      return isAsc ? 1 : -1;
    } else {
      return 0;
    }
  });
  const email = localStorage.getItem("email");

  const [result_arr, setresult_arr] = useState([]);

  const getApplicationId = async () => {
    const res = await fetch(
      "http://127.0.0.1:5000/getallApprovedApplicationId",
      {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: { "Content-Type": "application/json" },
      }
    );

    let data2 = await res.json();

    const jsonDataString = JSON.stringify(data2.result);

    const parsedData = JSON.parse(jsonDataString);

    for (let i = 0; i < parsedData.length; i++) {
      parsedData[i][4] = JSON.parse(parsedData[i][4]);
    }

    console.log(parsedData);
    setData(parsedData);
    // setresult_arr(data["result"]);
  };
  useEffect(() => {
    getApplicationId();
  }, []);

  console.log(result_arr);

  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        id="sidebar1"
        class="d-flex flex-column  flex-shrink-0 p-3 text-white"
      >
        <h2 class="text_center">Menu</h2>

        <br />
        <ul class="nav nav-pills flex-column mb-auto">
          <Link
            id="link_to_other_pages"
            to="/Home"
            style={{ textDecoration: "none" }}
          >
            <li class="nav-item">
              <a href="#" class="nav-link text-white">
                <i class="fa fa-home"></i>
                <span class="ms-2 font_size_18">Home </span>
              </a>
            </li>
          </Link>

          <Link
            id="link_to_other_pages"
            to="/Autofill"
            style={{ textDecoration: "none" }}
          >
            <li>
              <a href="#" class="nav-link text-white">
                <i class="fa fa-first-order"></i>
                <span class="ms-2 font_size_18">Auto Fill</span>
              </a>
            </li>
          </Link>

          <Link
            id="link_to_other_pages"
            to="/Home/Home_verified_applications"
            style={{ textDecoration: "none" }}
          >
            <li>
              <a class="nav-link text-white active" href="#">
                <i class="fa fa-first-order"></i>
                <span class="ms-2 font_size_18">Approved applications</span>
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

      <div className="main-content">
        <div className="top-navbar">
          <div className="btns">
            <Link to="/Home/Instructions" className="btn">
              <div className="inst-button">Instructions</div>
            </Link>
            <Link to="/Page1" className="btn">
              <div className="apply-button">Apply for Reimbursement</div>
            </Link>
          </div>
          <div>
            <div className="name">Welcome</div>
            <div className="email">{email}</div>
          </div>
        </div>
        <hr></hr>
        <div className="last-heading">
          <h4>Approved applications </h4>
          <h6>
            (applications which are approved by all authority people will appear
            here)
          </h6>
        </div>

        <div className="application-list">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount Claimed</th>
                <th>Date of submission</th>
                <th>Action</th> {/* Added Action column */}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row[0]}</td>
                  <td>{row[4].user.amountClaimed}</td>
                  <td>{row[4].user.date}</td>
                  <td>
                    <button
                      onClick={() => {
                        home_data === "Home"
                          ? navigate("/ShowApplication/" + row[0])
                          : navigate("/Home/ShowApplication/" + row[0]);
                      }}
                      className="btn btn-primary"
                    >
                      View Application
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home_verified_applications;
