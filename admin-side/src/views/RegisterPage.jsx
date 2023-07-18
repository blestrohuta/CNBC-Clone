import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../helper";
import Alert from "react-bootstrap/Alert";

export default function RegAdminPage() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(() => false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const changeHandler = (e) => {
    const obj = { ...userData, [e.target.name]: e.target.value };
    setUserData(obj);
  };

  const onClickRegister = async (e) => {
    e.preventDefault();
    const objToPass = { ...userData, role: "admin" };

    try {
      const response = await fetch(baseUrl + "users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(objToPass),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      navigate("/");
    } catch (error) {
      setErrorMessage(error?.message);
      setShowAlert(true);
    } finally {
      const afterSubmitObj = {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      };
      setUserData(afterSubmitObj);
    }
  };

  return (
    <Container className="mt-5" style={{ width: "400px" }}>
      <h2 style={{ textAlign: "center" }}>Add New Admin</h2>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Form onSubmit={onClickRegister}>
        <Form.Group className="mb-3" controlId="addUserForm.username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="username"
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="addUserForm.email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="name@example.com"
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="addUserForm.password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="password"
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="addUserForm.phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="addUserForm.address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="address"
            onChange={changeHandler}
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}
