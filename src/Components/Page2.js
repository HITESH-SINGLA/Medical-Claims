import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Page2() {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const initialFormState = {
    name: "",
    numDatesFeeCon: "",
    numDatesFeeInj: "",
    hospitalName: "",
    costMedicine: "",
  };

  const [forms, setForms] = useState([initialFormState]);

  const addForm = () => {
    setForms([...forms, { ...initialFormState }]);
  };

  const removeForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
  };

  const handleFormChange = (index, key, value) => {
    const updatedForms = [...forms];
    updatedForms[index][key] = value;
    setForms(updatedForms);
  };



  const saveAllForms = async () => {
    try {

      const response = await fetch("http://localhost:5000/save_form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "email": email, ...forms }),
      });
      const data = await response.json();
      console.log(data.application_id);
      localStorage.setItem("application_id", data.application_id);

      navigate("./Page3")
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }

    ;

  };







  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const promises = forms.map(saveForm);
  //   const results = await Promise.all(promises);
  //   if (results.every((result) => result)) {
  //     console.log("All forms saved successfully!");
  //     navigate("/Page3");
  //   } else {
  //     console.error("Failed to save all forms");
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div>
      <div className="d-flex flex-row">
        <div
          id="sidebar1"
          style={{ marginRight: "30px" }}
          className="d-flex flex-column  flex-shrink-0 p-3 text-white position-fixed"
        >
          <h2 className="text_center">Menu</h2>
          <br />
          <ul className="nav nav-pills flex-column mb-auto">
            <Link
              id="link_to_other_pages"
              to="/Home"
              style={{ textDecoration: "none" }}
            >
              <li className="nav-item">
                <a href="#" className="nav-link text-white">
                  <i className="fa fa-home"></i>
                  <span className="ms-2 font_size_18">Home </span>
                </a>
              </li>
            </Link>

            <Link
              id="link_to_other_pages"
              to="/Autofill"
              style={{ textDecoration: "none" }}
            >
              <li>
                <a href="#" className="nav-link text-white">
                  <i className="fa fa-first-order"></i>
                  <span className="ms-2 font_size_18">Auto Fill</span>
                </a>
              </li>
            </Link>

            <Link
              id="link_to_other_pages"
              to="/Home/Home_verified_applications"
              style={{ textDecoration: "none" }}
            >
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

        <Container>
          <div className="Page2">
            <br />
            <br />
            <br />
            <br />
            <h2>Medical Attendance</h2>
            <br />
            {forms.map((form, index) => (
              <div key={index}>
                <Container>
                  <Form>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="5">
                        (a) the name & designation of the Medical Officer consulted
                        and hospital or dispensary to which attached
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          type="text"
                          value={form.name}
                          onChange={(e) =>
                            handleFormChange(index, "name", e.target.value)
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="5">
                        (b) the number and dates of consultation and the fee paid
                        for each consultation
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          type="text"
                          value={form.numDatesFeeCon}
                          onChange={(e) =>
                            handleFormChange(index, "numDatesFeeCon", e.target.value)
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="5">
                        (c) the number & dates of injection & the fee paid for each
                        injection
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          type="text"
                          value={form.numDatesFeeInj}
                          onChange={(e) =>
                            handleFormChange(index, "numDatesFeeInj", e.target.value)
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="5">
                        (d) Name of the hospital or laboratory where any radiological
                        tests were undertaken
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          type="text"
                          value={form.hospitalName}
                          onChange={(e) =>
                            handleFormChange(index, "hospitalName", e.target.value)
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="5">
                        (e) Cost of medicines purchased from the market
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Col sm="7">
                        <Form.Control
                          type="number"
                          value={form.costMedicine}
                          onChange={(e) =>
                            handleFormChange(index, "costMedicine", e.target.value)
                          }
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </Container>
                <Button variant="danger" onClick={() => removeForm(index)}>
                  Remove Form
                </Button>
              </div>
            ))}
            <Button onClick={addForm}>Add Form</Button>
            <Button onClick={saveAllForms}>Save All Forms</Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Page2;
