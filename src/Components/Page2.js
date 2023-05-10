import React, { Component, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
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
//import Page3 from "./Page2/Page3"

function Page2() {
  const email = localStorage.getItem("email");

  const navigate = useNavigate();
  const [user, setUser] = useState({
    page_no: "",
    name: "",
    email: "",
    numDatesFeeCon: "",
    numDatesFeeInj: "",
    hospitalName: "",
    costMedicine: "",
  });
  const saveit = async (e) => {
    e.preventDefault();
    user["email"] = email;
    user["page_no"] = 2;

    const res = await fetch(
      " https://aditya1024.pythonanywhere.com/check_user",
      {
        method: "POST",
        body: JSON.stringify({ user }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) {
      console.log("RESPONSE WORKED1!");
      setUser({
        page_no: "",
        name: "",
        email: "",
        numDatesFeeCon: "",
        numDatesFeeInj: "",
        hospitalName: "",
        costMedicine: "",
      });

      navigate("./Page3");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div class="d-flex flex-row">
       <div
        id="sidebar1"
        style={{marginRight: "30px"}}
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

      <Container>
        <div className="Page2">
          <br />
          <br />
          <br />
          <br />
          <h2>Medical Attendance</h2>
          <br />
          <Container>
            <h5>(i) Fee for consultation indicating - </h5>

            <Container>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="5">
                    (a) the name & designation of the Medical Officer consulted
                    and hospital or dispensary to which attached
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      style={{ padding: "14px", width: "500px" }}
                      name="user[name]"
                      value={user.name}
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
                    (b) the number and dates of consultation and the fee paid
                    for each consultation
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      style={{ padding: "14px", width: "500px" }}
                      name="user[numDatesFeeCon]"
                      value={user.numDatesFeeCon}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          numDatesFeeCon: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="5">
                    (c) the number & dates of injection & the fee paid for each
                    injection
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      style={{ padding: "14px", width: "500px" }}
                      name="user[numDatesFeeInj]"
                      value={user.numDatesFeeInj}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          numDatesFeeInj: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Container>

            <h5>
              (ii) Charges for pathological, Radiological or other similar tests
              undertaken during diagnosis indicating the test name and the
              charges incurred
            </h5>
            <Container>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="5">
                    (a) Name of the hospital or laboratory where any
                    radiological tests were undertaken
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      style={{ padding: "14px", width: "500px" }}
                      name="user[hospitalName]"
                      value={user.hospitalName}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          hospitalName: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Container>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="5">
                  <h5>(iii) Cost of medicines purchased from the market</h5>
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    type="number"
                    style={{ padding: "14px", width: "500px" }}
                    name="user[costMedicine]"
                    value={user.costMedicine}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        costMedicine: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>
              <br />
              <Link to="./Page3">
                <Button type="button" onClick={saveit}>
                  Next
                </Button>
              </Link>
              <br></br>
              <br></br>
              <br></br>
            </Form>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export default Page2;
