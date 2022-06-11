import './Login.css';
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h2>Ini adalah halaman Masuk</h2>
      <Link to="/dashboard"> Masuk </Link>
    </div>
  );
}
