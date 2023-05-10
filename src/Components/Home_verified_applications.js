import React, { Component, useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useNavigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import logo from "./logo.png";
import "./Home.css";
import { Container, Row, Col, Alert, Breadcrumb, Card } from "react-bootstrap";

function Home_verified_applications() {
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
      " https://aditya1024.pythonanywhere.com/getallApprovedApplicationId",
      {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data2 = await res.json();
    console.log(data2["result"]);
    const updateData = [];
    data2["result"].map((id1) => {
      console.log(id1[0]);
      updateData.push({id: parseInt(id1[0]), amount: parseInt(JSON.parse(id1[1]).user.netAmntClaimed), date: JSON.parse(id1[1]).user.date});
    });

    setData(updateData);

    setresult_arr(data["result"]);
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
    <div>
      <div id="top_navbar">
        <Link to="/Page1" style={{ textDecoration: "none" }}>
          <div id="apply_button"> Apply for Reimbursement</div>
        </Link>

        {/* <div id="profilepic">
                    {" "}
                    <img src={currentUser.photoURL} alt=""></img>{" "}
                </div> */}
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
          {/* <li onClick={gotoForgotPassword}>
                        <a href="#" class="nav-link text-white">
                            <i class="fa fa-cog"></i>
                            <span class="ms-2 font_size_18">
                                Change Password
                            </span>
                        </a>
                    </li> */}
          <li onClick={handleLogout}>
            <a href="#" class="nav-link text-white">
              <i class="fa fa-bookmark"></i>
              <span class="ms-2 font_size_18">Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <div id="last_heading">
        <h4>Approved applications </h4>
        <h6>
          (applications which are approved by all authority people will appear
          here)
        </h6>
      </div>
      <div className="application_list">
          <div style = {{margin:"20px"}}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          </div>

          <table class = "table">
            <thead>
              <tr>
                <th scope="col">
                  
                  <button class = "thbtn" value="id" onClick={handleSortChange}>    
                    ID               
                    <i class="fa-solid fa-sort" style={{marginLeft:"4px"}}></i>                   
                  </button>
                </th>
                <th scope="col">
                  <button class = "thbtn" value="amount" onClick={handleSortChange}>
                    Amount Claimed
                    <i class="fa-solid fa-sort" style={{marginLeft:"4px"}}></i>     
                  </button>
                </th>
                <th scope="col">
                  <button class = "thbtn" value="date" onClick={handleSortChange}>
                    Date of submission
                    <i class="fa-solid fa-sort" style={{marginLeft:"4px"}}></i>     
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row) => (
                <tr key={row.id} className = "application_id1" style={{ cursor: "pointer" }} onClick={() => {
                  navigate("/Home/ShowApplication/" + (row.id));
                }}>
                  <td>{row.id}</td>
                  <td>{row.amount}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
        </div>
    </div>
  );
}

export default Home_verified_applications;
