import React, { Component, useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  useNavigate,
  useParams
} from "react-router-dom";

import { Button, Form, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "./Auth";
import "./Home_authority.css";
//import { signInWithGoogle } from "./firebase"
import { Container, Row, Col, Alert, Breadcrumb, Card } from "react-bootstrap";
import ShowApplication from "./ShowApplication";

import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function Registrar() {
  const email = localStorage.getItem("email");

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

  let user_data = {
    email: email,
  };
  const [result_arr, setresult_arr] = useState([]);

  const getApplicationId = async () => {
    const res = await fetch(
      " https://aditya1024.pythonanywhere.com/getallApplicationIdForRegistrar",
      {
        method: "POST",
        body: JSON.stringify({ user_data }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data2 = await res.json();
    console.log(data2["result"]);

    setresult_arr(data2["result"]);

    const updateData = [];
    data2["result"].map((id1) => {
      console.log(id1[0]);
      updateData.push({
        id: parseInt(id1[0]),
        amount: parseInt(JSON.parse(id1[1]).user.netAmntClaimed),
        date: JSON.parse(id1[1]).user.date,
        status: id1[2],
      });
      console.log(data.length);
    });
    setData(updateData);
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
  
  let { param_data } = useParams();

  return (
    <div>
      <div id="top_navbar">
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
          <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">
              <i class="fa fa-home"></i>

              <span class="ms-2 font_size_18">Home </span>
            </a>
          </li>

          <Link
            id="link_to_other_pages"
            to="/Registrar/Registrar_verified_applications"
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
      <div style = {{margin:"20px"}}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          </div>
          <table class = "table" style = {{marginRight: "1000px" }}>
            <thead>
              <tr>
                <th scope="col">
                  
                  <button value="id" onClick={handleSortChange}>    
                    Application ID               
                    <i class="fa-solid fa-sort" style={{marginLeft:"4px"}}></i>                   
                  </button>
                </th>
                <th scope="col">
                  <button value="amount" onClick={handleSortChange}>
                    Net Amount Claimed
                    <i class="fa-solid fa-sort" style={{marginLeft:"4px"}}></i>     
                  </button>
                </th>
                <th scope="col">
                  <button value="date" onClick={handleSortChange}>
                    Date of submission
                    <i class="fa-solid fa-sort" style={{marginLeft:"4px"}}></i>     
                  </button>
                </th>
                <th scope="col">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row) => (
                <tr key={row.id} className = "application_id1" style={{ cursor: "pointer" }} onClick={() => {
                  param_data === "Registrar" ? navigate("ShowAllApplication/" + (row.id)) : navigate("/Registrar/ShowAllApplication/" + (row.id));
                }}>
                  <td>Application {row.id}</td>
                  <td>{row.amount}</td>
                  <td>{row.date}</td>
                  <td>{row.status} </td>
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

export default Registrar;
