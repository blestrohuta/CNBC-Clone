import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import PostContent from "../components/PostContent";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../store/actions/actionCreator";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

export default function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchPost()), [dispatch]);
  const { posts, loading } = useSelector((state) => state.post);

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
          <>
            <h3 className="fs-4 mb-3">List of Posts</h3>
            <div
              className="myButton"
              style={{ marginBottom: "5px", textAlign: "right" }}
            >
              <Button
                as={Link}
                to={"/posts/add"}
                className="btn btn-primary mb-3"
              >
                Add Post
              </Button>
            </div>
            <Table className="table bg-white rounded shadow-sm  table-hover">
              <thead className="text-center">
                <tr>
                  <th>#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Content</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Image</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {posts.map((post, i) => {
                  return <PostContent post={post} key={post.id} i={i} />;
                })}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}
