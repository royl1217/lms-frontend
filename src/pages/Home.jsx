import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

import Navbar from "../components/Navbar";
import CourseRecommender from "../components/CourseRecommender";
import TypeaheadSearch from "../components/TypeaheadSearch";
import FuzzySearchTool from "../components/FuzzySearchTool";

export default function Home() {
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);

  const buttonName = [
    "Rule-Based Recommender",
    "React Typeahead",
    "Fuzzy Search",
  ];

  const [activeButton, setActiveButton] = useState(0);

  const navigate = useNavigate();

  const handleLoginRegister = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate("/Login");
    }
  };

  const handleButtonToggle = (index) => {
    setActiveButton((prev) => index);
  };

  return (
    <>
      {/* <Navbar active="Home" role="" /> */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h2 className="mb-4 text-center text-light">
              Welcome to the Learning Management System!
            </h2>

            {!isAuthenticated && (
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary w-50"
                  onClick={handleLoginRegister}
                >
                  Login / Register
                </button>
              </div>
            )}

            {isAuthenticated && (
              <>
                <div className="text-center">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Card Buttons"
                  >
                    {buttonName.map((btn, index) => (
                      <button
                        key={index}
                        className={`btn btn-sm ${
                          index === activeButton
                            ? "btn-secondary text-light"
                            : "btn-light text-secondary"
                        }
                        `}
                        onClick={() => handleButtonToggle(index)}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-5">
                  {activeButton === 0 && <CourseRecommender />}
                  {activeButton === 1 && <TypeaheadSearch />}
                  {activeButton === 2 && <FuzzySearchTool />}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
