import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Category({ category, i }) {
  return (
    <tr>
      <td>{++i}</td>
      <td>{category.name}</td>
      <td>
        <div className="d-flex justify-content-center">
          <Link to={`/categories/edit/${category.id}`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Link
            to={`/categories/delete/${category.id}`}
            style={{ marginLeft: "1rem" }}
          >
            <Button variant="danger">Delete</Button>
          </Link>
        </div>
      </td>
    </tr>
  );
}
