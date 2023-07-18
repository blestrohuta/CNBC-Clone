import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailPost } from "../store/action/actionCreator";
import Spinner from "react-bootstrap/Spinner";

const DetailPage = () => {
  const { post, loading } = useSelector((state) => state.newsDetail);
  const { postId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailPost(postId));
  }, [dispatch, postId]);

  const containerStyle = {
    color: "black",
    backgroundColor: "white",
    margin: "auto",
    padding: "7.5rem",
    maxWidth: "1100px",
  };

  const spinnerContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const titleStyle = {
    textAlign: "center",
  };

  const dateStyle = {
    color: "rgba(0, 85, 148, 255)",
    marginTop: "1rem",
    textAlign: "center",
  };

  const imageContainerStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
  };

  const tagsStyle = {
    marginTop: "1rem",
    color: "rgba(0, 85, 148, 255)",
    textAlign: "center",
  };

  const authorStyle = {
    marginTop: "2rem",
  };

  const contentStyle = {
    marginTop: "2rem",
    textAlign: "justify",
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
        <>
          <h1 style={titleStyle}>{post?.title}</h1>
          <h6 style={dateStyle}>
            {new Date(post.createdAt).toLocaleString("id-ID", {
              dateStyle: "full",
            })}
          </h6>
          <div style={imageContainerStyle}>
            <img src={post.imgUrl} alt="Post" style={imageStyle} />
          </div>
          {post?.Tags?.map((el) => (
            <h6 key={el.id} style={tagsStyle}>
              <b>Tags: {el.name}</b>
            </h6>
          ))}
          <small style={authorStyle}>
            Created by: <b>{post?.User?.username}</b>
          </small>
          <div style={contentStyle}>{post?.content}</div>
        </>
      )}
    </Container>
  );
};

export default DetailPage;
