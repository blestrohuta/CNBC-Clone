import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { fetchPosts } from "../store/action/actionCreator";

export default function CaraouselComp() {
  const { posts, loading } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const carouselStyle = {
    marginTop: "100px",
    marginBottom: "170px",
    width: "1000px",
    margin: "auto",
  };

  const imageStyle = {
    height: "580px",
  };

  const captionStyle = {
    color: "white",
  };

  const controlButtonStyle = {
    background: "white",
    fontSize: "24px",
    fontWeight: "bold",
    color: "black",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    lineHeight: "60px",
    textAlign: "center",
  };

  return (
    <div style={{ marginLeft: "10px" }}>
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
          <Carousel variant="dark" style={carouselStyle}>
            {posts.map((post) => (
              <Carousel.Item key={post.id}>
                <Link to={`/detail/${post.id}`}>
                  <img
                    style={imageStyle}
                    className="d-block w-100"
                    src={post.imgUrl}
                    alt="Carousel"
                  />
                  <Carousel.Caption>
                    <h2 style={captionStyle}>{post.title}</h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
          <style>
            {`
              .carousel-control-prev,
              .carousel-control-next {
                ${controlButtonStyle}
              }
            `}
          </style>
        </>
      )}
    </div>
  );
}
