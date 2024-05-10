import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landingpage.css";

const Landingpage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Assuming you have a route named "/login", adjust it accordingly
    navigate("/LoginForm");
  };
  const handleSignup = () => {
    // Assuming you have a route named "/login", adjust it accordingly
    navigate("/Signup");
  };
  return (
    <div className="landingpage">
      <div>
        <div>
          <nav className="navbar navbar-dark bg-dark border-bottom border-body">
            <div className="container-fluid">
              <a href="/" className="navbar-brand">
                <img
                  className="logoimg"
                  src="./logo.png"
                  alt="IIT Ropar Logo"
                  height="80"
                />
              </a>

              <h2 id="iit_roparland">
                <b>INDIAN INSTITUTE OF TECHNOLOGY ROPAR</b>
              </h2>

              <div className="d-flex">
                <button
                  className="btn btn-outline-success me-2"
                  type="submit"
                  onClick={handleLogin}
                >
                  Login
                </button>
              
              </div>
            </div>
          </nav>
        </div>
        <div className="half-yellow">
          <div className="title-box1">Medical Claims</div>
          <p className="paragraph">
            An online portal for submitting and tracking medical reimbursement
            requests, thus digitalizing the process, making it more accessible
            and convenient for the staff. They can submit requests from anywhere
            with an internet connection and track the progress of their request
            without having to visit a physical office or make phone calls.{" "}
          </p>
          <div className="title-box2">Medical Department</div>
        </div>
        <div className="sameline">
          <div className="card">
            <div className="top">
              <h2 className="name">Dr. Reena </h2>
              <img
                className="circle-img"
                src="./images/doc1.png"
                alt="avatar_img"
              />
            </div>
            <div className="bottom">
              <p className="info">
                <i className="fas fa-user"></i> Medical Officer
              </p>
              <p className="info">
                <i className="fas fa-phone"></i> 9050477612
              </p>
              <p className="info">
                <i className="fas fa-envelope"></i> reena@iitrpr.ac.in
              </p>
            </div>
          </div>
          <div className="card">
            <div className="top">
              <h2 className="name">Dr. Gurvinder</h2>
              <img
                className="circle-img"
                src="./images/doc2.png"
                alt="avatar_img"
              />
            </div>
            <div className="bottom">
              <p className="info">
                <i className="fas fa-user"></i> Medical Officer
              </p>
              <p className="info">
                <i className="fas fa-phone"></i> 9050477612
              </p>
              <p className="info">
                <i className="fas fa-envelope"></i> drgurvinderk@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="sameline">
          <div className="card">
            <div className="top">
              <h2 className="name">Dr.Charanjit</h2>
              <img
                className="circle-img"
                src="./images/doc3.png"
                alt="avatar_img"
              />
            </div>
            <div className="bottom">
              <p className="info">
                <i className="fas fa-user"></i>Medical Officer
              </p>
              <p className="info">
                <i className="fas fa-phone"></i>9050477612
              </p>
              <p className="info">
                <i className="fas fa-envelope"></i> drcharanjit@iitrpr.ac.in
              </p>
            </div>
          </div>
          <div className="card">
            <div className="top">
              <h2 className="name"> Dr. Dipti</h2>
              <img
                className="circle-img"
                src="./images/doc4.png"
                alt="avatar_img"
              />
            </div>
            <div className="bottom">
              <p className="info">
                <i className="fas fa-user"></i>Medical Officer
              </p>
              <p className="info">
                <i className="fas fa-phone"></i>9050477612
              </p>
              <p className="info">
                <i className="fas fa-envelope"></i>diptiborad4@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div>
          <footer class="footer-distributed">
            <div class="footer-left">
              <h3>
                <img
                  className="logoimg"
                  src="./logo.png"
                  alt="IIT Ropar Logo"
                  height="80"
                />
              </h3>

              <p class="footer-links">
                <a href="https://www.iitrpr.ac.in/" class="link-1">
                  Indian Institute of technology, Ropar
                </a>
              </p>

              <p class="footer-company-name">
                2016 MEDICAL CENTER. All Rights Reserved
              </p>
            </div>

            <div class="footer-center">
              <div>
                <i class="fas fa-building"></i>
                <p>
                  <span>IIT Ropar</span>Rupnagar, Punjab, INDIA 140001
                </p>
              </div>

              <div>
                <i class="fas fa-phone-alt fa-flip-horizontal"></i>
                <p>+91-1881-242124</p>
              </div>

              <div>
                <i class="far fa-envelope"></i>
                <p>
                  <a href="mailto:support@company.com">support@iitrpr.com</a>
                </p>
              </div>
            </div>

            <div class="footer-right">
              <p class="footer-company-about">
                <span>About the company</span>
                An online portal for submitting and tracking medical
                reimbursement requests, thus digitalizing the process, making it
                more accessible and convenient for the staff.
              </p>

              <div class="footer-icons">
                <a href="https://twitter.com/?lang=en">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/school/iitropar/">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://www.instagram.com/iitrpr_iitrpr/">
                  <i class="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
