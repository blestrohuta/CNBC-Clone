import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../store/actions/actionCreator";
import {
  CATEGORIES_CREATE,
  CATEGORIES_CREATE_ERROR,
} from "../store/actions/actionType";

function Example({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Warning!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Category Name Cannot be empty</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function AddCategoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryDetail, errorMessage } = useSelector(
    (state) => state.category
  );
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch({ type: CATEGORIES_CREATE_ERROR, payload: "" });
    dispatch({ type: CATEGORIES_CREATE, payload: null });
  }, [dispatch]);

  useEffect(() => {
    if (categoryDetail) {
      navigate("/categories");
    }
  }, [categoryDetail, navigate]);

  useEffect(() => {
    if (errorMessage) {
      setModalShow(true);
    }

    return () => dispatch({ type: CATEGORIES_CREATE_ERROR, payload: "" });
  }, [errorMessage, dispatch]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    dispatch(addCategory(newCategory));
  };

  return (
    <Container className="w-50 mt-5">
      <h1 className="text-center">Add a New Category</h1>
      <Form onSubmit={submitFormHandler}>
        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            value={newCategory.name}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Example show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}
