import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Pharmacist.css";

function Pharmacist() {
  const email = localStorage.getItem("email");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortBy, setSortBy] = useState("id"); // Default sorting by ID
  const [sortOrder, setSortOrder] = useState("desc"); // Default sorting order
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [sortDirection, setSortDirection] = useState("asc");
  const [data, setData] = useState([]);

  let user_data = {
    email: email,
  };
  const [result_arr, setresult_arr] = useState([]);

  const getApplicationId = async () => {
    const res = await fetch("http://172.30.2.244:5006/getallApplicationId", {
      method: "POST",
      body: JSON.stringify({ user_data }),
      headers: { "Content-Type": "application/json" },
    });

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

    sortData(updateData, sortBy, sortOrder);
    setData(updateData);
  };

  useEffect(() => {
    getApplicationId();
  }, [sortBy, sortOrder]);

  console.log(result_arr);

  let navigate = useNavigate();
  const sortData = (data, sortBy, sortOrder) => {
    data.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "id":
          comparison = a.id - b.id;
          break;
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a.amount - b.amount;
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
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  let { home_data } = useParams();
  // Filter data based on search query
  const filteredData = data.filter((row) => {
    const searchString = searchQuery.toLowerCase();

    // Check if the search query matches any of the fields (ID, amount, or date)
    return (
      row.id.toString().toLowerCase().includes(searchString) || // ID
      row.amount.toString().toLowerCase().includes(searchString) || // Amount
      row.date.toLowerCase().includes(searchString) // Date
    );
  });

  return (
    <div style={{ display: "flex" }}>
      <div
        id="sidebar1"
        className="d-flex flex-column  flex-shrink-0 p-3 text-white"
      >
        <a href="#" className="text-white text-decoration-none">
          <h2 className="text_center">Menu</h2>
        </a>
        <br />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              <i className="fa fa-home"></i>

              <span className="ms-2 font_size_18">Home </span>
            </a>
          </li>

          <Link
            id="link_to_other_pages"
            to="/Pharmacist/Pharmacist_verified_applications"
            style={{ textDecoration: "none" }}
          >
            <li>
              <a href="#" className="nav-link text-white">
                <i className="fa fa-first-order"></i>
                <span className="ms-2 font_size_18">Verified Applications</span>
              </a>
            </li>
          </Link>

          <li onClick={handleLogout}>
            <a href="#" className="nav-link text-white">
              <i className="fa fa-bookmark"></i>
              <span className="ms-2 font_size_18">Logout</span>
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
              <div className="name">Pharmacist</div>{" "}
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
          <h4>Home </h4>
          <h6>(applications which need your approval will appear here)</h6>
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
        {filteredData && (
          <table className="table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Amount Claimed</th>
                <th>Date of submission</th>
                <th>Status</th>
                <th>Action</th> {/* Added Action column */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td>{row.id ? `Application ${row.id}` : "N/A"}</td>
                  <td>{row.amount != null ? row.amount.toString() : "N/A"}</td>
                  <td>{row.date ? row.date : "N/A"}</td>
                  <td>{row.status ? row.status : "N/A"}</td>
                  <td>
                    <button
                      onClick={() => {
                        home_data === "Pharmacist"
                          ? navigate("ShowApplicationtoPharmaMed/" + row.id)
                          : navigate(
                              "/Pharmacist/ShowApplicationtoPharmaMed/" + row.id
                            );
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
        )}
        </div>
      </div>
    </div>
  );
}

export default Pharmacist;
