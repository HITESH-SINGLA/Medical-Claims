import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./Home.css";
import "./Autofill.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Autofill() {
  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    Mobile_number: "",
    partner_place: "",
    martial_status: "",
    employee_code_no: "",
    pay: "",
    address: "",
    relation: "",
    place_fell_ill: "",
    ammount_details: "",
  });

  const getBasicDetails = async () => {
    user["email"] = email;

    const res2 = await fetch("http://127.0.0.1:5006/getbasicDetails", {
      method: "POST",
      body: JSON.stringify({ user }),
      headers: { "Content-Type": "application/json" },
    });

    const result_json = await res2.json();
    setUser(result_json["result"]["user"]);
    console.log("line 59", result_json["result"]);
    console.log("line 60", result_json["result"]["user"]);
  };

  useEffect(() => {
    getBasicDetails();
  }, []);

  const saveBasicDetails = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    const requiredFields = [
      "name",
      "martial_status",
      "partner_place",
      "Mobile_number",
      "employee_code_no",
      "pay",
      "address",
    ];
    const emptyFields = requiredFields.filter((field) => !user[field]);

    if (emptyFields.length > 0) {
      alert(`Please fill in the following fields: ${emptyFields.join(", ")}`);
      return;
    }
    user["email"] = email;

    const res = await fetch("http://127.0.0.1:5006/basicDetails", {
      method: "POST",
      body: JSON.stringify({ user }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(JSON.stringify({ user }));

    if (res.ok) {
      console.log("RESPONSE WORKED1!");
      setUser({
        name: "",
        email: "",
        Mobile_number: "",
        partner_place: "",
        martial_status: "",
        employee_code_no: "",
        pay: "",
        address: "",
        relation: "",
        place_fell_ill: "",
        ammount_details: "",
      });

      navigate("/Home");
    }
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
              <a href="#" class="nav-link text-white active">
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
              <a class="nav-link text-white" href="#">
                <i class="fa fa-first-order"></i>
                <span class="ms-2 font_size_18">Approved applications</span>
              </a>
            </li>
          </Link>

          <li onClick={handleLogout}>
            <a href="/" class="nav-link text-white">
              <i class="fa fa-bookmark"></i>
              <span class="ms-2 font_size_18">Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "50px", width: "100%" }}>
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
        </div>

        <div class="heading" style={{ marginLeft: "30px" }}>
          <br />
          <br />
          <h3>Autofill these common details for all applications</h3>
          <p>
            Note: If you want to leave any field blank, Type '-' without quotes
          </p>
        </div>
        <br />
        <br />

        <div style={{ marginLeft: "30px" }}>
          <div class="basic">
            <Container class="center basic" s>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="5">
                    1. Name & Designation of Govt. Servant (In Block Letters) -
                    *
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      required
                      type="text"
                      style={{ padding: "12px", width: "450px" }}
                      name="name"
                      defaultValue={user.name}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          name: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="5">
                    (i) Whether married or unmarried - *
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      required
                      type="text"
                      style={{ padding: "12px", width: "450px" }}
                      name="martial_status"
                      defaultValue={user.martial_status}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          martial_status: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="5">
                    (ii) If married, the place where wife / husband is employed
                    - *
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      required
                      type="text"
                      style={{ padding: "12px", width: "450px" }}
                      name="partner_place"
                      defaultValue={user.partner_place}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          partner_place: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="5">
                    2. Mobile number - *
                  </Form.Label>
                  <Form.Label column sm="7">
                    <PhoneInput
                      country={"in"}
                      value={user.Mobile_number}
                      onChange={(e) => setUser({ ...user, Mobile_number: e })}
                    />
                  </Form.Label>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="5">
                    3. Employees Code No., Deptt/ Section - *
                  </Form.Label>
                  <Form.Label column sm="7">
                    <Form.Control
                      required
                      type="text"
                      style={{ padding: "12px", width: "450px" }}
                      name="employee_code_no"
                      defaultValue={user.employee_code_no}
                      onChange={(e) =>
                        setUser({ ...user, employee_code_no: e.target.value })
                      }
                    />
                  </Form.Label>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="5">
                    4. Pay of Govt. Servant (Band Pay & Grade Pay) - *
                  </Form.Label>
                  <Form.Label column sm="7">
                    <Form.Control
                      required
                      type="text"
                      style={{ padding: "12px", width: "450px" }}
                      name="pay"
                      defaultValue={user.pay}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          pay: e.target.value,
                        })
                      }
                    />
                  </Form.Label>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="5">
                    5. Residential address - *
                  </Form.Label>
                  <Form.Label column sm="7">
                    <Form.Control
                      required
                      type="text"
                      style={{ padding: "12px", width: "450px" }}
                      name="address"
                      defaultValue={user.address}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          address: e.target.value,
                        })
                      }
                    />
                  </Form.Label>
                </Form.Group>

                <br />
                <div class="heading">
                  <Button type="button" onClick={saveBasicDetails}>
                    Save
                  </Button>
                </div>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Autofill;
