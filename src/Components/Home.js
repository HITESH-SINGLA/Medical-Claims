import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import "./Autofill.css";

function Home() {
  let { home_data } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (column) => {
    setSortColumn(column);
    setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    const getEmail = localStorage.getItem("email");
    setEmail(getEmail);

    const getApplicationId = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/getallApplicationIdForHome", {
          method: "POST",
          body: JSON.stringify({ email: getEmail }),
          headers: { "Content-Type": "application/json" },
        });

        let data = await res.json();
        data=data.result
        for(let i=0;i<data.length;i++)
        {
          let datai=data[i]
          let num=datai[0]
          let username=datai[1]
          for(let j=2;j<=num;j++)
          {
            datai[j]=JSON.parse(datai[j])
          }
          data[i]=datai
        }
        console.log(data)
  setData(data)
        // const applicationId = data.result[0][0];
        // const dateOfClaim = JSON.parse(data.result[0][5]).user.date;
        // const netAmount = JSON.parse(data.result[0][4]).user.netAmntClaimed;
        // const status1 = data.result[0][6];
        // const status2 = data.result[0][8];
        // const status3 = data.result[0][10];
        // const status4=data.result[0][14];
        // console.log(status4);
        // console.log(data.result[0][16]);
        // console.log(data.result[0][22]);
        // const updatedData = data.result.map((id1) => ({
        //   id: applicationId,
        //   amount: netAmount,
        //   date: dateOfClaim,
        //   s1: status1,
        //   s2: status2,
        //   s3: status3,
        //   s4:status4,
        // }));

        // setData(updatedData);
      } catch (error) {
        console.error("Error fetching application data:", error);
      }
    };

    getApplicationId();
  }, []);

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
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

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div id="sidebar1" className="d-flex flex-column flex-shrink-0 p-3 text-white">
        <h2 className="text_center">Menu</h2>
        <br />
        <ul className="nav nav-pills flex-column mb-auto">
          <Link to="/Home" style={{ textDecoration: "none" }}>
            <li className="nav-item">
              <a href="#" className="nav-link text-white active">
                <i className="fa fa-home"></i>
                <span className="ms-2 font_size_18">Home </span>
              </a>
            </li>
          </Link>
          <Link to="/Autofill" style={{ textDecoration: "none" }}>
            <li>
              <a href="#" className="nav-link text-white">
                <i className="fa fa-first-order"></i>
                <span className="ms-2 font_size_18">Auto Fill</span>
              </a>
            </li>
          </Link>
          <Link to="/Home/Home_verified_applications" style={{ textDecoration: "none" }}>
            <li>
              <a className="nav-link text-white" href="#">
                <i className="fa fa-first-order"></i>
                <span className="ms-2 font_size_18">Approved applications</span>
              </a>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <a href="/" className="nav-link text-white">
              <i className="fa fa-bookmark"></i>
              <span className="ms-2 font_size_18">Logout</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ marginBottom: "50px", width: "100%" }}>
        {/* Top Navbar */}
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
            <div id="name1">Welcome</div>
            <div id="email1">{email}</div>
          </div>
        </div>

        {/* Last Heading */}
        <div id="last_heading" style={{ marginLeft: "30px" }}>
          <h4>Home </h4>
          <h6>(applications which are yet to be approved by all authority people will appear here)</h6>
        </div>

        {/* Application List */}
        <div className="application_list">
          <div style={{ margin: "20px" }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-bar"
            />
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <button className="thbtn" onClick={() => handleSortChange("id")}>
                    ID
                    <i className="fa-solid fa-sort" style={{ marginLeft: "4px" }}></i>
                  </button>
                </th>
                <th scope="col">
                  <button className="thbtn" onClick={() => handleSortChange("amount")}>
                    Amount Claimed
                    <i className="fa-solid fa-sort" style={{ marginLeft: "4px" }}></i>
                  </button>
                </th>
                <th scope="col">
                  <button className="thbtn" onClick={() => handleSortChange("date")}>
                    Date of submission
                    <i className="fa-solid fa-sort" style={{ marginLeft: "4px" }}></i>
                  </button>
                </th>
                <th>Pharmacist Status</th>
                <th>Medical Officer Status</th>
                <th>Account Section Status</th>
                <th>Registrar Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="application_id1"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    home_data === "Home"
                      ? navigate("/ShowApplication/" + row[0])
                      : navigate("/Home/ShowApplication/" + row[0]);
                  }}
                >
                  <td>{row[0]}</td>
                  {row[4].user.amountClaimed && <td>{row[4].user.amountClaimed}</td>}
                  {row[4].user.date && <td>{row[4].user.date}</td>}
                  {row[6]&& <td>{row[6]}</td>}
                  {row[8]&& <td>{row[8]}</td>}
                  {row[12]&& <td>{row[12]}</td>}
                  {row[16]&& <td>{row[16]}</td>}
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Home;
