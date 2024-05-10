import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home_authority.css"; // Assuming this is a custom CSS file with your styles
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

function AO() {
  const email = localStorage.getItem("email");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { param_data } = useParams();

  useEffect(() => {
    getApplicationId();
  }, [sortBy, sortOrder]);

  const getApplicationId = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5006/getallApplicationIdForAO", {
        method: "POST",
        body: JSON.stringify({ user_data: { email } }),
        headers: { "Content-Type": "application/json" },
      });
      const data2 = await res.json();
      if (data2.result) {
        const updateData = data2.result.map((item) => ({
          id: parseInt(item[0]),
          amount: parseInt(JSON.parse(item[1]).user.netAmntClaimed),
          date: JSON.parse(item[1]).user.date,
          status: item[2],
        }));
        sortData(updateData);
        setData(updateData);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const sortData = (data) => {
    const sortedData = [...data].sort((a, b) => {
      switch (sortBy) {
        case "id":
          return sortOrder === "desc" ? b.id - a.id : a.id - b.id;
        case "date":
          return sortOrder === "desc"
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date);
        case "amount":
          return sortOrder === "desc"
            ? b.amount - a.amount
            : a.amount - b.amount;
        default:
          return 0;
      }
    });
    setData(sortedData);
  };

  const handleSortChange = (selectedSortBy) => {
    if (selectedSortBy === sortBy) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(selectedSortBy);
      setSortOrder("desc");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const filteredData = data.filter((row) => {
    const searchString = searchQuery.toLowerCase();
    return (
      row.id.toString().toLowerCase().includes(searchString) ||
      row.amount.toString().toLowerCase().includes(searchString) ||
      row.date.toLowerCase().includes(searchString) ||
      row.status.toLowerCase().includes(searchString)
    );
  });

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
          <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">
              <i class="fa fa-home"></i>

              <span class="ms-2 font_size_18">Home </span>
            </a>
          </li>

          <Link
            id="link_to_other_pages"
            to="/AO/AO_verified_applications"
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
      <div className="main-content">
        <div className="top-navbar">
          <div className="welcome">
            <div className="welcome-icon">
              <i className="fas fa-user-circle"></i>{" "}
              {/* Add margin to move the icon */}
            </div>

            <div className="welcome-text">
              <div className="name">AO</div>{" "}
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
          <input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="sort-options">
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
                  <td>Application {row.id}</td>
                  <td>{row.amount}</td>
                  <td>{row.date}</td>
                  <td>{row.status} </td>
                  <td>
                    <button
                      onClick={() => {
                        param_data === "AO"
                          ? navigate("ShowAllApplication/" + row.id)
                          : navigate("/AO/ShowAllApplication/" + row.id);
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

export default AO;
