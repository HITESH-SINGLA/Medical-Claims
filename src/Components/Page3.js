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
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Button,
  Container,
  Form,
  Row,
  Col,
} from "react-bootstrap";

function Page3() {
  const email = localStorage.getItem("email");

  const navigate = useNavigate();
  const [user, setUser] = useState({
    page_no: "",
    name: "",
    email: "",
    numDateCon: "",
    amountClaimed: "",
    lessAdvTaken: "",
    netAmntClaimed: "",
    lstOfEncl: "",
    date: "",
  });
  const saveit = async (e) => {
    e.preventDefault();
    user["email"] = email;
    user["page_no"] = 3;

    if (!user.amountClaimed || !user.netAmntClaimed) {
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
          numDateCon: "",
          amountClaimed: "",
          lessAdvTaken: "",
          netAmntClaimed: "",
          lstOfEncl: "",
          date: "",
        });

        navigate("./Accountpage1");
      }
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
        id="sidebar"
        class="d-flex flex-column  flex-shrink-0 p-3 text-white"
        style={{ marginRight: "4rem", position: "sticky", height: "100vh" }}
      >
        <a href="#" class="text-white text-decoration-none">
          <h2 class="text_center">Menu</h2>
        </a>
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
            <a href="/" class="nav-link text-white">
              <i class="fa fa-bookmark"></i>
              <span class="ms-2 font_size_18">Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <Container>
        <h2>(ii) Consultation with Specialist</h2>
        <br />
        <Container>
          <strong>
            Fee paid to specialist or a medical office other than the authorised
            medical attendant indicating
          </strong>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                (a) the name & designation of the Specialist or Medical Officer
                consulted and the hospital to which attached
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  as="textarea"
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
                (b) Number & dates of consultation and the fees paid for each
                consultation
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  as="textarea"
                  name="user[numDateCon]"
                  value={user.numDateCon}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      numDateCon: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                Total amount claimed (required)
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  name="user[amountClaimed]"
                  value={user.amountClaimed}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      amountClaimed: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                Less advance taken
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  name="user[lessAdvTaken]"
                  value={user.lessAdvTaken}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      lessAdvTaken: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                Net amount claimed (required)
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="number"
                  name="user[netAmntClaimed]"
                  value={user.netAmntClaimed}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      netAmntClaimed: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                List of enclosures
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  name="user[lstOfEncl]"
                  value={user.lstOfEncl}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      lstOfEncl: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                Date
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  type="Date"
                  name="user[date]"
                  value={user.date}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      date: e.target.value,
                    })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="It is certified that, I am employed at IIT Ropar and I am not availing the medical facilities or financial / medical allowances
                          in lieu thereof either of myself / of the members of my family from any (other) source. I hereby declare that the statements in 
                          the application are true to the best of my knowledge and belief and that the person for whom medical expenses were incurred is 
                          wholly dependent upon me. I will be solely responsible for this."
              />
            </Form.Group>

            <br />
            <Link to="./Accountpage1">
              <Button type="button" onClick={saveit}>
                Next
              </Button>
            </Link>
          </Form>
        </Container>
      </Container>
    </div>
  );
}

export default Page3;
