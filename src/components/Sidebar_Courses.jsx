import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li>
            <Link
              to="#submenu1"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle"
            >
              <i className="fs-4 bi-star-fill"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Courses</span>{" "}
            </Link>
            <ul
              className="collapse show nav flex-column ms-1"
              id="submenu1"
              data-bs-parent="#menu"
            >
              <li className="w-100">
                <Link to="/courses/allCourses" className="nav-link px-0">
                  {"A"}
                  <span className="d-none d-sm-inline">ll Courses</span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/recommendedCourses"
                  className="nav-link px-0"
                >
                  {"R"}
                  <span className="d-none d-sm-inline">
                    ecommended Courses
                  </span>{" "}
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/courses/enrollment"
              className="nav-link px-0 align-middle"
            >
              <i className="fs-4 bi-table"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Enrollment</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
