import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { AuthContext } from "./AuthContext";

const Navbar = (props) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { active } = props;
  const [activeLink, setActiveLink] = useState(active);

  let links = [];
  links = isAuthenticated
    ? [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses/allCourses" },
        { name: "Chatbot", href: "/chatbot" },
        { name: "Logout", href: "/" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Login", href: "/login" },
        { name: "Courses", href: "/courses/allCourses" },
        { name: "Chatbot", href: "/chatbot" },
      ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand fs-4" href="/">
          AI-LMS
        </a>

        {localStorage.getItem("userName") && (
          <div className="d-flex justify-content-start align-items-center">
            <p className="my-0 mx-2 text-info">
              Welcome, {localStorage.getItem("userName")}!
            </p>
          </div>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {links.map((link) => (
              <li className="nav-item" key={link.name}>
                <Link
                  to={link.href}
                  className={`nav-link ${
                    activeLink === link.name ? "active" : ""
                  }`}
                  onClick={() => {
                    if (link.name === "Logout") {
                      logout();
                    } else setActiveLink(link.name);

                    // Collapse the navbar
                    const navbarCollapse = document.getElementById("navbarNav");
                    if (
                      navbarCollapse &&
                      navbarCollapse.classList.contains("show")
                    ) {
                      const bsCollapse = new window.bootstrap.Collapse(
                        navbarCollapse,
                        {
                          toggle: true,
                        }
                      );
                      bsCollapse.hide();
                    }
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
