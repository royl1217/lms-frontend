import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { checkPasswordStrength } from "../components/PasswordStrength";
import { useNavigate } from "react-router-dom";

// Login Component
export default function Register() {
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
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

      // Check if email already used
      const response_existEmail = await fetch(`${apiUrl}/api/users`);
      const data_existEmail = await response_existEmail.json();

      if (!response_existEmail.ok) {
        throw new Error(
          data_existEmail.message || "Retrieving Existing Email List failed"
        );
      }

      const emailList = data_existEmail.map((obj) => obj.email.toLowerCase());
      if (emailList.includes(formData.email.toLowerCase())) {
        throw new Error("Email is already used.");
      }

      // Return if password is weak
      if (passwordStrength === "Weak") {
        setFormData({ ...formData, password: "" });
        throw new Error("Password is weak, enter again!");
      }

      // Add new account
      const response = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email.toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Register failed");
      }

      if (data.success) {
        setMessage("Registration successful!");
        navigate("/login");
      } else {
        setMessage(data.message || "Failed in registration");
      }
    } catch (error) {
      setMessage(error.message || "An error occurred. Please try again.");
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      setPasswordStrength(checkPasswordStrength(e.target.value));
    }
  };

  return (
    <>
      {/* <Navbar active="Login" /> */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="mb-4 text-center">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  User Name
                </label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter your user name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

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
                  placeholder="Enter your password (Minimum 6 characters with 1 number)"
                  value={formData.password}
                  // onChange={(e) => {
                  //   setPassword(e.target.value);
                  //   setPasswordStrength(checkPasswordStrength(e.target.value));
                  // }}
                  onChange={handleChange}
                  required
                />
                <p className="mt-1 text-info">{passwordStrength}</p>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Confirm
              </button>
            </form>

            {message && (
              <div className="alert mt-3 alert-info text-center" role="alert">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
