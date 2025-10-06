import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setMessage("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setMessage("Invalid email format.");
      setIsLoading(false);
      return;
    }

    try {
      // Make API call to backend
      // const apiUrl = process.env.REACT_APP_API_URL;
      const apiUrl = "https://roy-app.com";

      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.success) {
        // Call login from AuthContext with user data and token
        login(
          {
            email: formData.email,
            userName: data.userName,
            userID: data.userID,
          },
          data.token
        );
        setMessage("Login successful!");
        navigate("/");
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setMessage(error.message || "An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* <Navbar active="Login" /> */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="mb-4 text-center">Login to LMS</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-describedby="emailHelp"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            {message && (
              <div
                className={`alert mt-3 alert-${
                  message.includes("successful") ? "success" : "danger"
                } text-center`}
                role="alert"
              >
                {message}
              </div>
            )}

            <div className="mt-3 text-center">
              <Link type="button" className="btn btn-link" to="/register">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
