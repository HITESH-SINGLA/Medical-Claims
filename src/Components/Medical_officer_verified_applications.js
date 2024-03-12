import React, { Component, useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Home_authority.css";

function Medical_officer_verified_applications() {
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
  const [result_ar, setresult_ar] = useState([]);

  const getallApplicationIdFromPharmacist = async () => {
    const res = await fetch(
      "http://127.0.0.1:5000/getallApprovedApplicationIdFromMedicalOff",
      {
        method: "POST",
        body: JSON.stringify({ user_data }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data2 = await res.json();
    console.log(data2["result"]);

    setresult_ar(data2["result"]);
    const updateData = [];
    data2["result"].map((id1) => {
      console.log(id1[0]);
      updateData.push({
        id: parseInt(id1[0]),
        amount: parseInt(JSON.parse(id1[1]).user.netAmntClaimed),
        date: JSON.parse(id1[1]).user.date,
      });
      console.log(data.length);
    });
    setData(updateData.reverse());
  };
  useEffect(() => {
    getallApplicationIdFromPharmacist();
  }, []);

  console.log(result_ar);

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
        <a href="#" class="text-white text-decoration-none">
          <h2 class="text_center">Menu</h2>
        </a>
        <br />
        <ul class="nav nav-pills flex-column mb-auto">
          <Link
            id="link_to_other_pages"
            to="/Medical_officer"
            style={{ textDecoration: "none" }}
          >
            <li class="nav-item">
              <a href="#" class="nav-link text-white">
                <i class="fa fa-home"></i>
                <span class="ms-2 font_size_18">Home </span>
              </a>
            </li>
          </Link>

          <li>
            <a href="#" class="nav-link active">
              <i class="fa fa-first-order"></i>
              <span class="ms-2 font_size_18">Verified Applications</span>
            </a>
          </li>

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
          <div className="welcome">
            <div className="welcome-icon">
              <i className="fas fa-user-circle"></i>{" "}
              {/* Add margin to move the icon */}
            </div>

            <div className="welcome-text">
              <div className="name">Medical_officer</div>{" "}
              {/* Replace [Dummy Name] with "Mohit" */}
              <div className="email">
                <i className="fas fa-envelope"></i> {email}{" "}
                {/* You can use envelope icon for email */}
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div id="last_heading">
          <h4>Verfied applications </h4>
          <h6>(applications which are approved by you will appear here)</h6>
        </div>

        <div className="application-list">
          <table className="table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Amount Claimed</th>
                <th>Date of submission</th>
                <th>Action</th> {/* Added Action column */}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>Application {row.id}</td>
                  <td>{row.amount}</td>
                  <td>{row.date}</td>
                  <td>
                    <button
                      onClick={() => {
                        navigate("ShowApplicationtoPharmaMed/" + (row.id));
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

export default Medical_officer_verified_applications;
