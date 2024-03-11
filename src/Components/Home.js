import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import "./Autofill.css";

function Home() {
  let { home_data } = useParams();
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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

        const data2 = await res.json();
        const parsedData = data2.result.map((item) => {
          item[4] = JSON.parse(item[4]);
          return item;
        });
        parsedData.sort((a, b) => new Date(b[4].user.date) - new Date(a[4].user.date));

        setData(parsedData);
      } catch (error) {
        console.error("Error fetching application data:", error);
      }
    };

    getApplicationId();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <h2 className="text-center">Menu</h2>
        <br />
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <Link to="/Home" className="nav-link active">
              <i className="fa fa-home"></i>
              <span className="ms-2 font-size-18">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/Autofill" className="nav-link">
              <i className="fa fa-first-order"></i>
              <span className="ms-2 font-size-18">Auto Fill</span>
            </Link>
          </li>
          <li>
            <Link to="/Home/Home_verified_applications" className="nav-link">
              <i className="fa fa-first-order"></i>
              <span className="approved-applications ms-3 font-size-20">Approved applications</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link to="/" className="nav-link">
              <i className="fa fa-bookmark"></i>
              <span className="ms-2 font-size-18">Logout</span>
            </Link>
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

        <div className="last-heading">
          <h4>Home</h4>
          {/* <h6>(applications which are yet to be approved by all authority people will appear here)</h6> */}
        </div>

        <div className="application-list">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount Claimed</th>
                <th>Date of submission</th>
                <th>Pharmacist Status</th>
                <th>Medical Officer Status</th>
                <th>Account Section Status</th>
                <th>Registrar Status</th>
                <th>Action</th> {/* Added Action column */}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row[0]}</td>
                  <td>{row[4].user.amountClaimed}</td>
                  <td>{row[4].user.date}</td>
                  <td>{row[6]}</td>
                  <td>{row[8]}</td>
                  <td>{row[12]}</td>
                  <td>{row[16]}</td>
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

export default Home;
