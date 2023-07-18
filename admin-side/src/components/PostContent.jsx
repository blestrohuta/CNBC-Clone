import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function PostContent({ post, i }) {
  return (
    <tr>
      <td>{++i}</td>
      <td>{post.title}</td>
      <td>{post.Category.name}</td>
      <td>{post.content}</td>
      <td>{post.User.username}</td>
      <td>
        <img src={post.imgUrl} width="100" alt="img"></img>
      </td>
      <td>
        <div className="d-flex gap-2">
          <Link to={`/posts/edit/${post.id}`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Link to={`/posts/delete/${post.id}`}>
            <Button variant="danger">Delete</Button>
          </Link>
        </div>
      </td>
    </tr>
  );
}
