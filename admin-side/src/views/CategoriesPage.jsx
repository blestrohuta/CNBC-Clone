import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CategoryContent from "../components/CategoryContent";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/actions/actionCreator";
import Spinner from "react-bootstrap/Spinner";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchCategories()), [dispatch]);
  const { categories, loading } = useSelector((state) => state.category);

  const renderTableContent = () => {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="fs-4 mb-3">List of Categories</h3>
          <Button
            as={Link}
            to={"/categories/add"}
            className="btn btn-primary mb-3"
          >
            Add Categories
          </Button>
        </div>
        <Table className="table bg-white rounded shadow-sm  table-hover">
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {categories.map((category, i) => (
              <CategoryContent category={category} i={i} key={category.id} />
            ))}
          </tbody>
        </Table>
      </>
    );
  };

  return (
    <div id="page-content-wrapper">
      <div className="container-fluid px-4">
        {loading ? (
          <div
            className="d-flex align-items-center justify-content-center vh-100"
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Container className="loadingContainer text-center">
              <Spinner
                animation="border"
                className="iconSpinner"
                style={{ width: "5rem", height: "5rem", color: "red" }}
                role="status"
              />
            </Container>
          </div>
        ) : (
          <div className="row my-5">
            <div className="col">{renderTableContent()}</div>
          </div>
        )}
      </div>
    </div>
  );
}
