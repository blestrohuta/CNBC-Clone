import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../helper";

export default function DeleteCategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const deleteHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseUrl}users/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      if (response.ok) {
        await response.json();
        navigate("/categories");
      } else {
        throw new Error("something wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center" style={{ width: "17rem" }}>
        <Card.Header style={{ color: "black", fontWeight: "bold" }}>
          Warning
        </Card.Header>
        <Card.Body>
          <Card.Title>Are You sure?</Card.Title>
          <div className="d-flex gap-2 justify-content-center">
            <Button
              style={{ backgroundColor: "rgba(0,85,148,255)" }}
              onClick={deleteHandler}
            >
              Yes
            </Button>
            <Link to="/categories">
              <Button variant="danger">No</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
