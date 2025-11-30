import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/login" style={{ marginRight: "20px" }}>
        Login
      </Link>

      <Link to="/topics" style={{ marginRight: "20px" }}>
        Topics
      </Link>

      <Link to="/profile">Profile</Link>
    </nav>
  );
}
