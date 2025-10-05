import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const sidebarItems = [
  // {
  //   title: "Courses",
  //   icon: "bi-book",
  //   submenu: [
  //     { label: "All Courses", to: "/courses/allCourses" },
  //     { label: "Recommended Courses", to: "/courses/recommendedCourses" },
  //   ],
  // },
  {
    title: "All Courses",
    icon: "bi-table",
    to: "/courses/allCourses",
  },
  {
    title: "Recommended Courses",
    icon: "bi-star",
    to: "/courses/recommendedCourses",
  },
  {
    title: "Enrollment",
    icon: "bi-person-check",
    to: "/courses/enrollment",
  },
];

const ResponsiveSidebar = () => {
  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="d-md-none p-2 bg-transparent text-white">
        <button
          className="btn btn-outline-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
          aria-controls="mobileSidebar"
        >
          <i className="bi bi-book fs-3"></i>
        </button>
      </div>

      {/* Offcanvas Sidebar for Mobile */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">
            Course Menu
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <SidebarContent closeOffcanvasOnClick />
        </div>
      </div>

      {/* Static Sidebar for Desktop */}
      <div className="d-none d-md-block col-md-3 col-xl-2 bg-dark text-white min-vh-100">
        <SidebarContent />
      </div>
    </>
  );
};

const SidebarContent = ({ closeOffcanvasOnClick = false }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleItemClick = () => {
    if (closeOffcanvasOnClick) {
      const offcanvasElement = document.getElementById("mobileSidebar");
      const bsOffcanvas =
        window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
      bsOffcanvas?.hide();
    }
  };

  return (
    <div className="p-3">
      <ul className="nav nav-pills flex-column">
        {sidebarItems.map((item, index) => (
          <li key={index} className="nav-item mb-2">
            {item.submenu ? (
              <>
                <button
                  className="nav-link text-white px-0 d-flex align-items-center w-100"
                  onClick={() => toggleSubmenu(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`submenu-${index}`}
                >
                  <i className={`fs-5 ${item.icon}`}></i>
                  <span className="ms-2 flex-grow-1">{item.title}</span>
                  <i
                    className={`bi ${
                      openIndex === index ? "bi-chevron-up" : "bi-chevron-down"
                    }`}
                  ></i>
                </button>
                {openIndex === index && (
                  <ul
                    className="nav flex-column ms-3 mt-1"
                    id={`submenu-${index}`}
                  >
                    {item.submenu.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <NavLink
                          to={sub.to}
                          className={({ isActive }) =>
                            `nav-link text-white px-0 ${
                              isActive ? "fw-bold" : ""
                            }`
                          }
                          onClick={handleItemClick}
                        >
                          {sub.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav-link text-white px-0 d-flex align-items-center ${
                    isActive ? "fw-bold" : ""
                  }`
                }
                onClick={handleItemClick}
              >
                <i className={`fs-5 ${item.icon}`}></i>
                <span className="ms-2">{item.title}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsiveSidebar;
