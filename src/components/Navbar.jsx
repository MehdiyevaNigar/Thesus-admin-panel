import { Link } from "react-router-dom";
import logo from "../assets/images/logo.avif";
export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/" className="thesusLogo">
              <img src={logo} alt="thesusLogo" />
            </Link>
          </div>
          <div className="create">
            <Link to="/create" className="create2">
              Create
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
