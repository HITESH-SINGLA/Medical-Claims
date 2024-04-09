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
  const [sortBy, setSortBy] = useState("id"); // Default sorting by ID
  const [sortOrder, setSortOrder] = useState("desc"); // Default sorting order
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [sortDirection, setSortDirection] = useState("asc");
  const [data, setData] = useState([]);

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
    // Sort the data initially based on default sorting criteria
    sortData(parsedData, sortBy, sortOrder);
    console.log(parsedData);
    setData(parsedData);
    // setresult_arr(data["result"]);
  };
  useEffect(() => {
    getApplicationId();
  }, [sortBy, sortOrder]);

  const sortData = (data, sortBy, sortOrder) => {
    data.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "id":
          comparison = a[0] - b[0];
          break;
        case "date":
          comparison = new Date(a[4].user.date) - new Date(b[4].user.date);
          break;
        case "amount":
          comparison = a[4].user.amountClaimed - b[4].user.amountClaimed;
          break;
        default:
          break;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });
  };

  const handleSortChange = (selectedSortBy) => {
    // If the same criteria is selected, toggle the order
    if (selectedSortBy === sortBy) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      // If a different criteria is selected, set it as the new sorting criteria
      setSortBy(selectedSortBy);
      setSortOrder("desc"); // Reset order to ascending
    }
  };

  // Filter data based on search query
  const filteredData = data.filter((row) => {
    const searchString = searchQuery.toLowerCase();

    // Check if the search query matches any of the fields (ID, amount, or date)
    return (
      row[0].toString().toLowerCase().includes(searchString) || // ID
      row[4].user.amountClaimed
        .toString()
        .toLowerCase()
        .includes(searchString) || // Amount
      row[4].user.date.toLowerCase().includes(searchString) // Date
    );
  });
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
          <div className="welcome">
            <div className="welcome-icon">
              <i className="fas fa-user-circle"></i>{" "}
              {/* Add margin to move the icon */}
            </div>

            <div className="welcome-text">
              <div className="name">Mohit</div>{" "}
              {/* Replace [Dummy Name] with "Mohit" */}
              <div className="email">
                <i className="fas fa-envelope"></i> {email}{" "}
                {/* You can use envelope icon for email */}
              </div>
            </div>
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

        <div className="search-bar">
          {/* Search input field */}
          <input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="sort-options">
          {/* Sorting options UI */}
          <label htmlFor="sortOptions">Sort by:</label>
          <select
            id="sortOptions"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="amount">Amount Claimed</option>
            <option value="date">Date of Submission</option>
          </select>
          <button onClick={() => handleSortChange(sortBy)}>
            {sortOrder === "desc" ? "Descending" : "Ascending"}
          </button>
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
              {filteredData.map((row, index) => (
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
