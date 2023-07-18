import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/action/actionCreator";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import PostContent from "./PostContent";

const PostsTable = () => {
  const { posts, loading } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const containerStyle = {
    marginTop: "50px",
    position: "relative",
  };

  const spinnerContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const tableStyle = {
    margin: "auto",
  };

  return (
    <Container style={containerStyle}>
      {loading ? (
        <div style={spinnerContainerStyle}>
          <Container className="loadingContainer text-center">
            <Spinner
              animation="border"
              style={{ width: "5rem", height: "5rem", color: "red" }}
              role="status"
            />
          </Container>
        </div>
      ) : (
        <table style={tableStyle}>
          <tbody>
            {posts.map((post) => (
              <PostContent key={post.id} post={post} />
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
};

export default PostsTable;
