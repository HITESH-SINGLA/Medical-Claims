import React, { Component, useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "./Auth";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  FormGroup,
  Navbar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import "./Page1.css";
import logo from "./iitrpr_logo.png";


const Page1 = () => {
  const email = localStorage.getItem("email");

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const [user, setUser] = useState({
    page_no: "",
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

    const res2 = await fetch(
      "http://127.0.0.1:5000/getbasicDetails",
      {
        method: "POST",
        body: JSON.stringify({ user }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const result_json = await res2.json();
    setUser(result_json["result"]["user"]);
    console.log("line 59", result_json["result"]);
    console.log("line 60", result_json["result"]["user"]);
  };

  useEffect(() => {
    getBasicDetails();
  }, []);

  const saveit = async (e) => {
    e.preventDefault();
    user["email"] = email;
    user["page_no"] = 1;
    if (
      !user.name ||
      !user.email ||
      !user.Mobile_number ||
      !user.partner_place ||
      !user.martial_status ||
      !user.employee_code_no ||
      !user.pay ||
      !user.address ||
      !user.relation ||
      !user.place_fell_ill ||
      !user.ammount_details
    ) {
      alert(
        "Fields which are marked as 'required' are compulsory to fill.\nMake sure you fill them all."
      );
    } else {
      const res = await fetch(
          "http://127.0.0.1:5000/check_user",
          {
              method: "POST",
              body: JSON.stringify({ user }),
              headers: { "Content-Type": "application/json" },
          }
      )

      if (res.ok) {
        console.log("RESPONSE WORKED1!");
        setUser({
          page_no: "",
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

        navigate("./Page2");
      }
    }
  };

  return (
    <div class="d-flex flex-row">
      <div
        id="sidebar"
        class="d-flex flex-column  flex-shrink-0 p-3 text-white"
        style={{ marginRight: "4rem", position: "sticky", height: "100vh" }}
      >
       
        <h2 class="text_center">Menu</h2>
        
        <br />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="/Home" class="nav-link text-white">
              <i class="fa fa-home"></i>
              <span class="ms-2 font_size_18">Home </span>
            </a>
          </li>

          <li>
            <a href="/Autofill" class="nav-link text-white">
              <i class="fa fa-first-order"></i>
              <span class="ms-2 font_size_18">Auto Fill</span>
            </a>
          </li>

          {/* <Link
            id="link_to_other_pages"
            
            style={{ textDecoration: "none" }}
          > */}
          <li>
            <a
              class="nav-link text-white"
              href="/Home/Home_verified_applications"
            >
              <i class="fa fa-first-order"></i>
              <span class="ms-2 font_size_18">Approved applications</span>
            </a>
          </li>

          <li onClick={handleLogout}>
            <a href="# 
            " class="nav-link text-white">
              <i class="fa fa-bookmark"></i>
              <span class="ms-2 font_size_18">Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <Container>
        <div className="App-header d-flex flex-column">
          {/* <div id="logo">
                    <img src={logo}></img>
                </div> */}
          <div id="text_part">
            <br />
            <h3>भारतीय प्रौद्योगिकी संस्थान रोपड़</h3>
            <h3>INDIAN INSTITUTE OF TECHNOLOGY ROPAR</h3>
            <h3>रूपनगर, पंजाब-140001, Rupnagar, Punjab-140001</h3>
            <h5>
              Medical Claim Form - For Outdoor (Part A) /Indoor (Part B)
              Treatment
            </h5>
          </div>
          <br />
        </div>
        <h3>
          ----------------------------------------------------------------------------------------------------
        </h3>

        <div className="page1">
          <h3>
            Form of application claiming reimbursement of medical expenses
            incurred in connection with medical attendance and/or treatment for
            self and family members/dependents.
          </h3>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                1. Name & Designation of Govt. Servant (In Block Letters) -
                (required)
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  as="textarea"
                  name="user[name]"
                  defaultValue={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                (i) Whether married or unmarried - (required)
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  as="textarea"
                  name="user[martial_status]"
                  defaultValue={user.martial_status}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      martial_status: e.target.value,
                    })
                  }
                />
                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                (ii) If married, the place where wife / husband is employed -
                (required)
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  as="textarea"
                  name="user[partner_place]"
                  defaultValue={user.partner_place}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      partner_place: e.target.value,
                    })
                  }
                />
                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                2. Mobile number (required)
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  as="textarea"
                  name="Mobile_number"
                  defaultValue={user.Mobile_number}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      Mobile_number: e.target.value,
                    })
                  }
                />
                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                3. Employees Code No., Deptt/ Section - (required)
              </Form.Label>
              <Form.Label column sm="7">
                <Form.Control
                  as="textarea"
                  name="user[employee_code_no]"
                  defaultValue={user.employee_code_no}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      employee_code_no: e.target.value,
                    })
                  }
                />
                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
              </Form.Label>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                4. Pay of Govt. Servant (Band Pay & Grade Pay) - (required)
              </Form.Label>
              <Form.Label column sm="7">
                <Form.Control
                  as="textarea"
                  name="user[pay]"
                  defaultValue={user.pay}
                  onChange={(e) => setUser({ ...user, pay: e.target.value })}
                />
                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
              </Form.Label>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                5. Residential address - (required)
              </Form.Label>
              <Form.Label column sm="7">
                <Form.Control
                  as="textarea"
                  name="user[address]"
                  defaultValue={user.address}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: e.target.value,
                    })
                  }
                />
                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
              </Form.Label>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                6. Name of the patient & his /her relationship with the
                Government Servant (in case of Children state age also) -
                (required)
              </Form.Label>
              <Form.Label column sm="7">
                <Form.Control
                  required
                  as="textarea"
                  name="user[relation]"
                  defaultValue={user.relation}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      relation: e.target.value,
                    })
                  }
                />
                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
              </Form.Label>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                7. Place at which the patient fell ill - (required)
              </Form.Label>
              <Form.Label column sm="7">
                <Form.Control
                  as="textarea"
                  name="user[place_fell_ill]"
                  defaultValue={user.place_fell_ill}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      place_fell_ill: e.target.value,
                    })
                  }
                />
                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
              </Form.Label>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                8. Details of the amount claimed - (required)
              </Form.Label>
              <Form.Label column sm="7">
                <Form.Control
                  as="textarea"
                  name="user[ammount_details]"
                  defaultValue={user.ammount_details}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      ammount_details: e.target.value,
                    })
                  }
                />
                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
              </Form.Label>
            </Form.Group>
          </Form>
        </div>

        <div>
          <Link to="./Page2">
            <Button type="button" onClick={saveit}>
              Next
            </Button>
          </Link>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </Container>
    </div>
  );
};
export default Page1;
