import "./Accountpage.css"
import React, { Component, useState } from "react"
import {
    Row,
    Col,
    Container,
    Button,
    Form,
    FormGroup,
    Navbar,
} from "react-bootstrap"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useHistory,
    useNavigate,
} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"

function Accountpage() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        med1: "",
        med2: "",
        med3: "",
        tes1: "",
        tes2: "",
        tes3: "",
        rrnt1: "",
        rrnt2: "",
        rrnt3: "",
        op1: "",
        op2: "",
        op3: "",
        total1: "",
        total2: "",
        total3: "",
        rupnum: "",
        rupword: "",
        pno: "",
        sno: "",
    })
    const saveit = async (e) => {
        e.preventDefault()
        const res = await fetch(
            " https://aditya1024.pythonanywhere.com/check_user",
            {
                method: "POST",
                body: JSON.stringify({ user }),
                headers: { "Content-Type": "application/json" },
            }
        )

        if (res.ok) {
            console.log("RESPONSE WORKED1!")
            setUser({
                med1: "",
                med2: "",
                med3: "",
                tes1: "",
                tes2: "",
                tes3: "",
                rrnt1: "",
                rrnt2: "",
                rrnt3: "",
                op1: "",
                op2: "",
                op3: "",
                total1: "",
                total2: "",
                total3: "",
                rupnum: "",
                rupword: "",
                pno: "",
                sno: "",
            })

            //navigate("./Accountpage1")
        }
    }
    return (
        <>
            <Container>
                <div class="container">
                    <nav class="navbar fixed-top navbar-expand-Ig navbar-dark bg-dark">
                        <a class="navbar-brand" href="#"></a>
                    </nav>
                </div>
                <Container>
                    <br></br>
                    <br></br>
                    <div className="acc-section">
                        <h2
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            (For Use by Accounts Section)
                        </h2>
                        <br></br>
                        <Form>
                            <Form.Group>
                                <table id="table">
                                    <tr>
                                        <th>
                                            <h2>Items</h2>
                                        </th>
                                        <th>
                                            <h2>Amount Claimed(In rupees)</h2>
                                        </th>
                                        <th>
                                            <h2>Amount Allowed(In rupees)</h2>
                                        </th>
                                        <th>
                                            <h2>Remarks </h2>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Medicine</h4>
                                        </td>
                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[med1]"
                                                value={user.med1}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        med1: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[med2]"
                                                value={user.med2}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        med2: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[med3]"
                                                value={user.med3}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        med3: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Tests</h4>
                                        </td>

                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[tes1]"
                                                value={user.tes1}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        tes1: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[tes2]"
                                                value={user.tes2}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        tes2: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[tes3]"
                                                value={user.tes3}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        tes3: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>Room Rent</h4>
                                        </td>

                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[rrnt1]"
                                                value={user.rrnt1}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        rrnt1: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[rrnt2]"
                                                value={user.rrnt2}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        rrnt2: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[rrnt3]"
                                                value={user.rrnt3}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        rrnt3: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>
                                                Operation / Procedure charges
                                                etc., Operation, Procedure, ICU
                                                / CCU/ Consultation / Others
                                                Specify)
                                            </h4>
                                        </td>

                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[op1]"
                                                value={user.op1}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        op1: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[op2]"
                                                value={user.op2}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        op2: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[op3]"
                                                value={user.op3}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        op3: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h3>TOTAL</h3>
                                        </td>

                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[total1]"
                                                value={user.total1}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        total1: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[total2]"
                                                value={user.total2}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        total2: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                class="table_input"
                                                type="text"
                                                name="user[total3]"
                                                value={user.total3}
                                                onChange={(e) =>
                                                    setUser({
                                                        ...user,
                                                        total3: e.target.value,
                                                    })
                                                }
                                            />
                                        </td>
                                    </tr>
                                </table>
                            </Form.Group>
                            <br></br>
                            <br></br>
                            <h3>
                                Passed for Rs.
                                <Form.Label column sm="2">
                                    <Form.Control
                                        size="sm"
                                        as="textarea"
                                        name="user[rupnum]"
                                        value={user.rupnum}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                rupnum: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Label>
                                (Rupees
                                <Form.Label column sm="2">
                                    <Form.Control
                                        size="sm"
                                        as="textarea"
                                        name="user[rupword]"
                                        value={user.rupword}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                rupword: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Label>
                                (in words)only.
                                <br></br>
                                Entered in medical reimbursement register page
                                No.
                                <Form.Label column sm="2">
                                    <Form.Control
                                        size="sm"
                                        as="textarea"
                                        name="user[pno]"
                                        value={user.pno}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                pno: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Label>
                                Sr. No.
                                <Form.Label column sm="2">
                                    <Form.Control
                                        size="sm"
                                        as="textarea"
                                        name="user[sno]"
                                        value={user.sno}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                sno: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Label>
                                Expenditure debitable.
                            </h3>
                        </Form>
                        <br></br>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button>save</Button>
                        <Button onClick={saveit}>next</Button>
                    </div>
                    <br></br>
                    <br></br>
                </Container>
            </Container>
            <div class="footer">
                <h6 id="copyright">
                    <b>Copyright &#169; 2022, IIT ROPAR</b>
                </h6>
            </div>
        </>
    )
}
export default Accountpage
