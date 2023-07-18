import { Link } from "react-router-dom";

const PostContent = ({ post }) => {
  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  const dateStyle = {
    color: "black",
    marginRight: "1rem",
  };

  const createdByStyle = {
    color: "rgba(0,85,148,255)",
    fontWeight: "bold",
  };

  const imageStyle = {
    height: "140px",
    width: "250px",
  };

  return (
    <>
      <tr>
        <td style={{ width: "1000px" }}>
          <Link to={`/detail/${post.id}`} style={linkStyle}>
            <h4>{post.title}</h4>
            <span style={dateStyle}>
              {new Date(post.createdAt).toLocaleString("id-ID", {
                dateStyle: "full",
              })}
            </span>
            <span style={createdByStyle}>Created by: {post.User.username}</span>
          </Link>
        </td>
        <td rowSpan={2}>
          <img src={post.imgUrl} alt="..." style={imageStyle} />
        </td>
      </tr>
      <tr></tr>
    </>
  );
};

export default PostContent;
